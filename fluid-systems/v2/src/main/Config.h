#ifndef CONFIG_H
#define CONFIG_H

#include <Arduino.h>

#define ENABLE_AVR_SLEEP_MODE 0

namespace Config {
constexpr uint8_t MOTOR_PIN_IN1 = 8;
constexpr uint8_t MOTOR_PIN_IN2 = 9;
constexpr uint8_t MOTOR_PIN_IN3 = 10;
constexpr uint8_t MOTOR_PIN_IN4 = 11;

constexpr uint8_t TOUCH_PIN_ON_OFF = 2;
constexpr uint8_t TOUCH_PIN_FORWARD = 3;
constexpr uint8_t TOUCH_PIN_BACKWARD = 4;

constexpr bool DEBUG_SERIAL_ENABLED = true;
constexpr bool DEBUG_TOUCH_EVENTS_ENABLED = false;
constexpr bool DEBUG_SPEED_EVENTS_ENABLED = true;
constexpr bool DEBUG_RAW_TOUCH_STATE = false;
constexpr unsigned long SERIAL_BAUD_RATE = 115200;

constexpr uint16_t STEPS_PER_REVOLUTION = 2048;

constexpr float MIN_ROTATION_RPM = 1.00f;
constexpr float MAX_ROTATION_RPM = 26.0f;
constexpr float SPEED_LEVEL_STEP_RPM = 1.00f;
constexpr float SPEED_RAMP_STEP_RPM = 0.25f;
constexpr unsigned long SPEED_RAMP_INTERVAL_MS = 60;
constexpr float FULL_STEP_SWITCH_RPM = 7.0f;

constexpr uint16_t toCentiRpm(float rpm) {
  return rpm <= 0.0f ? 0 : (uint16_t)(rpm * 100.0f + 0.5f);
}

constexpr uint8_t getSpeedLevelCount() {
  return (toCentiRpm(SPEED_LEVEL_STEP_RPM) == 0 || toCentiRpm(MAX_ROTATION_RPM) <= toCentiRpm(MIN_ROTATION_RPM))
    ? 1
    : (uint8_t)(((toCentiRpm(MAX_ROTATION_RPM) - toCentiRpm(MIN_ROTATION_RPM)) / toCentiRpm(SPEED_LEVEL_STEP_RPM)) + 1);
}

constexpr unsigned long TOUCH_EVENT_GUARD_MS = 60;
constexpr unsigned long TOUCH_REPEAT_START_MS = 500;
constexpr unsigned long TOUCH_REPEAT_INTERVAL_MS = 200;
constexpr uint8_t MAX_TIMING_SLIP_STEPS = 2;

constexpr uint8_t TOUCH_PIN_COUNT = 3;

static const uint8_t TOUCH_PINS[TOUCH_PIN_COUNT] = {
  TOUCH_PIN_ON_OFF,
  TOUCH_PIN_FORWARD,
  TOUCH_PIN_BACKWARD
};

}

#endif