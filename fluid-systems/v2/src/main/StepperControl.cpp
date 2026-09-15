#include "StepperControl.h"

#include "Config.h"

#if defined(ARDUINO_ARCH_AVR) && ENABLE_AVR_SLEEP_MODE
#include <avr/power.h>
#include <avr/sleep.h>
#endif

namespace {
enum class DriveMode : uint8_t {
  HalfStep,
  FullStep,
};

constexpr uint8_t HALF_STEP_SEQUENCE_LENGTH = 8;
constexpr uint8_t FULL_STEP_SEQUENCE_LENGTH = 4;

static const uint8_t HALF_STEP_SEQUENCE[HALF_STEP_SEQUENCE_LENGTH][4] = {
  {1, 0, 0, 0},
  {1, 1, 0, 0},
  {0, 1, 0, 0},
  {0, 1, 1, 0},
  {0, 0, 1, 0},
  {0, 0, 1, 1},
  {0, 0, 0, 1},
  {1, 0, 0, 1}
};

static const uint8_t FULL_STEP_SEQUENCE[FULL_STEP_SEQUENCE_LENGTH][4] = {
  {1, 1, 0, 0},
  {0, 1, 1, 0},
  {0, 0, 1, 1},
  {1, 0, 0, 1}
};

uint8_t currentStepIndex = 0;
unsigned long stepIntervalUs = 0;
unsigned long lastStepAtUs = 0;

volatile uint8_t* motorOutputRegister = nullptr;
uint8_t motorOutputMask = 0;
uint8_t motorBitMasks[4] = {0, 0, 0, 0};
bool useDirectPortWrite = false;

float currentSpeedRpm = 0.0f;
float targetSpeedRpm = 0.0f;
DriveMode currentDriveMode = DriveMode::FullStep;

bool systemEnabled = false;
int8_t speedLevel = 1;
bool speedLevelDirty = false;

DriveMode getDriveModeForSelectedRpm(float rpm) {
  return rpm < Config::FULL_STEP_SWITCH_RPM ? DriveMode::HalfStep : DriveMode::FullStep;
}

uint8_t getSequenceLengthForDriveMode(DriveMode driveMode) {
  return driveMode == DriveMode::HalfStep ? HALF_STEP_SEQUENCE_LENGTH : FULL_STEP_SEQUENCE_LENGTH;
}

uint16_t getStepsPerRevolutionForDriveMode(DriveMode driveMode) {
  return driveMode == DriveMode::HalfStep
    ? (uint16_t)(Config::STEPS_PER_REVOLUTION * 2U)
    : Config::STEPS_PER_REVOLUTION;
}

void updateStepIntervalForCurrentMode() {
  const float stepsPerMinute = currentSpeedRpm * getStepsPerRevolutionForDriveMode(currentDriveMode);
  const float stepsPerSecond = stepsPerMinute / 60.0f;
  stepIntervalUs = (unsigned long)(1000000.0f / stepsPerSecond);
}

void setDriveMode(DriveMode driveMode) {
  if (currentDriveMode == driveMode) {
    return;
  }

  if (currentDriveMode == DriveMode::FullStep && driveMode == DriveMode::HalfStep) {
    currentStepIndex = (uint8_t)((currentStepIndex * 2U + 1U) % HALF_STEP_SEQUENCE_LENGTH);
  } else if (currentDriveMode == DriveMode::HalfStep && driveMode == DriveMode::FullStep) {
    currentStepIndex = (uint8_t)((currentStepIndex / 2U) % FULL_STEP_SEQUENCE_LENGTH);
  }

  currentDriveMode = driveMode;

  if (currentSpeedRpm > 0.0f) {
    updateStepIntervalForCurrentMode();
  }
}

void setMotorOutputs(uint8_t in1, uint8_t in2, uint8_t in3, uint8_t in4) {
  if (useDirectPortWrite && motorOutputRegister != nullptr) {
    uint8_t outputState = *motorOutputRegister & (uint8_t)(~motorOutputMask);

    if (in1) {
      outputState |= motorBitMasks[0];
    }

    if (in2) {
      outputState |= motorBitMasks[1];
    }

    if (in3) {
      outputState |= motorBitMasks[2];
    }

    if (in4) {
      outputState |= motorBitMasks[3];
    }

    *motorOutputRegister = outputState;
    return;
  }

  digitalWrite(Config::MOTOR_PIN_IN1, in1);
  digitalWrite(Config::MOTOR_PIN_IN2, in2);
  digitalWrite(Config::MOTOR_PIN_IN3, in3);
  digitalWrite(Config::MOTOR_PIN_IN4, in4);
}

void releaseMotor() {
  setMotorOutputs(LOW, LOW, LOW, LOW);
}

float getSpeedForLevel(uint8_t level) {
  const uint8_t speedLevelCount = Config::getSpeedLevelCount();

  if (level < 1) {
    level = 1;
  }

  if (level > speedLevelCount) {
    level = speedLevelCount;
  }

  if (speedLevelCount == 1) {
    return Config::MAX_ROTATION_RPM;
  }

  float rpm = Config::MIN_ROTATION_RPM + ((float)(level - 1) * Config::SPEED_LEVEL_STEP_RPM);
  if (rpm > Config::MAX_ROTATION_RPM) {
    rpm = Config::MAX_ROTATION_RPM;
  }

  return rpm;
}

void setMotorSpeedRpm(float rpm) {
  const bool wasStopped = stepIntervalUs == 0;

  if (rpm <= 0.0f) {
    currentSpeedRpm = 0.0f;
    stepIntervalUs = 0;
    lastStepAtUs = micros();
    return;
  }

  if (rpm > Config::MAX_ROTATION_RPM) {
    rpm = Config::MAX_ROTATION_RPM;
  }

  currentSpeedRpm = rpm;
  updateStepIntervalForCurrentMode();

  if (wasStopped) {
    lastStepAtUs = micros();
  }
}

void setMotorTargetSpeedRpm(float rpm) {
  if (rpm < 0.0f) {
    rpm = 0.0f;
  }

  if (rpm > Config::MAX_ROTATION_RPM) {
    rpm = Config::MAX_ROTATION_RPM;
  }

  setDriveMode(getDriveModeForSelectedRpm(rpm));
  targetSpeedRpm = rpm;
}

void applySpeedLevel() {
  if (!systemEnabled) {
    setMotorTargetSpeedRpm(0.0f);
    return;
  }

  int8_t absoluteLevel = speedLevel;
  if (absoluteLevel < 0) {
    absoluteLevel = -absoluteLevel;
  }

  if (absoluteLevel < 1) {
    absoluteLevel = 1;
  }

  setMotorTargetSpeedRpm(getSpeedForLevel((uint8_t)absoluteLevel));
}

void updateMotorSpeedRamp() {
  static unsigned long lastRampUpdateMs = 0;
  const unsigned long now = millis();

  if (speedLevelDirty) {
    applySpeedLevel();
    speedLevelDirty = false;
  }

  if (now - lastRampUpdateMs < Config::SPEED_RAMP_INTERVAL_MS) {
    return;
  }

  lastRampUpdateMs = now;

  if (currentSpeedRpm < targetSpeedRpm) {
    float nextSpeed = currentSpeedRpm + Config::SPEED_RAMP_STEP_RPM;
    if (nextSpeed > targetSpeedRpm) {
      nextSpeed = targetSpeedRpm;
    }
    setMotorSpeedRpm(nextSpeed);
  } else if (currentSpeedRpm > targetSpeedRpm) {
    float nextSpeed = currentSpeedRpm - Config::SPEED_RAMP_STEP_RPM;
    if (nextSpeed < targetSpeedRpm) {
      nextSpeed = targetSpeedRpm;
    }
    setMotorSpeedRpm(nextSpeed);
  }
}

void stepMotor(int direction) {
  const uint8_t sequenceLength = getSequenceLengthForDriveMode(currentDriveMode);
  const uint8_t (*sequence)[4] = currentDriveMode == DriveMode::HalfStep
    ? HALF_STEP_SEQUENCE
    : FULL_STEP_SEQUENCE;

  if (direction > 0) {
    currentStepIndex = (currentStepIndex + 1) % sequenceLength;
  } else {
    currentStepIndex = (currentStepIndex + sequenceLength - 1) % sequenceLength;
  }

  setMotorOutputs(
    sequence[currentStepIndex][0],
    sequence[currentStepIndex][1],
    sequence[currentStepIndex][2],
    sequence[currentStepIndex][3]
  );
}
}

namespace StepperControl {
void initialize() {
  pinMode(Config::MOTOR_PIN_IN1, OUTPUT);
  pinMode(Config::MOTOR_PIN_IN2, OUTPUT);
  pinMode(Config::MOTOR_PIN_IN3, OUTPUT);
  pinMode(Config::MOTOR_PIN_IN4, OUTPUT);

  const uint8_t portIn1 = digitalPinToPort(Config::MOTOR_PIN_IN1);
  const uint8_t portIn2 = digitalPinToPort(Config::MOTOR_PIN_IN2);
  const uint8_t portIn3 = digitalPinToPort(Config::MOTOR_PIN_IN3);
  const uint8_t portIn4 = digitalPinToPort(Config::MOTOR_PIN_IN4);

  useDirectPortWrite = false;
  motorOutputRegister = nullptr;
  motorOutputMask = 0;

  if (portIn1 != NOT_A_PIN &&
      portIn1 == portIn2 &&
      portIn1 == portIn3 &&
      portIn1 == portIn4) {
    motorBitMasks[0] = digitalPinToBitMask(Config::MOTOR_PIN_IN1);
    motorBitMasks[1] = digitalPinToBitMask(Config::MOTOR_PIN_IN2);
    motorBitMasks[2] = digitalPinToBitMask(Config::MOTOR_PIN_IN3);
    motorBitMasks[3] = digitalPinToBitMask(Config::MOTOR_PIN_IN4);

    motorOutputMask = motorBitMasks[0] | motorBitMasks[1] | motorBitMasks[2] | motorBitMasks[3];
    motorOutputRegister = portOutputRegister(portIn1);
    useDirectPortWrite = motorOutputRegister != nullptr;
  }

  releaseMotor();
}

void update() {
  if (!systemEnabled) {
    return;
  }

  updateMotorSpeedRamp();

  if (stepIntervalUs == 0 || currentSpeedRpm <= 0.0f) {
    return;
  }

  const unsigned long nowUs = micros();
  const unsigned long elapsedUs = nowUs - lastStepAtUs;
  if (elapsedUs < stepIntervalUs) {
    return;
  }

  const int direction = speedLevel > 0 ? 1 : -1;
  if (elapsedUs > (stepIntervalUs * Config::MAX_TIMING_SLIP_STEPS)) {
    lastStepAtUs = nowUs;
  } else {
    lastStepAtUs += stepIntervalUs;
  }

  stepMotor(direction);
}

void setSystemEnabled(bool enabled) {
  systemEnabled = enabled;

  if (!systemEnabled) {
    setMotorTargetSpeedRpm(0.0f);
    setMotorSpeedRpm(0.0f);
    releaseMotor();
    return;
  }

  if (speedLevel == 0) {
    speedLevel = 1;
  }

  speedLevelDirty = true;
  lastStepAtUs = micros();
}

void toggleSystemEnabled() {
  setSystemEnabled(!systemEnabled);
}

void changeSpeedLevel(int8_t delta) {
  if (!systemEnabled || delta == 0) {
    return;
  }

  const int16_t speedLevelLimit = (int16_t)Config::getSpeedLevelCount();

  int16_t nextLevel = speedLevel + delta;
  if (nextLevel == 0) {
    nextLevel = (delta > 0) ? 1 : -1;
  }

  if (nextLevel > speedLevelLimit) {
    nextLevel = speedLevelLimit;
  }

  if (nextLevel < -speedLevelLimit) {
    nextLevel = -speedLevelLimit;
  }

  speedLevel = (int8_t)nextLevel;
  speedLevelDirty = true;
}

bool isSystemEnabled() {
  return systemEnabled;
}

int8_t getSpeedLevel() {
  return speedLevel;
}

float getSelectedTargetRpm() {
  return systemEnabled ? targetSpeedRpm : 0.0f;
}

void enterLowPowerMode() {
  if (systemEnabled) {
    return;
  }

  releaseMotor();

#if defined(ARDUINO_ARCH_AVR) && ENABLE_AVR_SLEEP_MODE
  power_adc_disable();
  set_sleep_mode(SLEEP_MODE_PWR_DOWN);

  noInterrupts();
  sleep_enable();
  interrupts();

  sleep_cpu();

  sleep_disable();
  power_adc_enable();
#else
  delay(20);
#endif
}
}