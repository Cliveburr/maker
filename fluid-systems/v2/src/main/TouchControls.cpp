#include "TouchControls.h"

#include "Config.h"
#include "DebugLog.h"
#include "StepperControl.h"

#if defined(ARDUINO_ARCH_AVR) && ENABLE_AVR_SLEEP_MODE
#include <avr/interrupt.h>
#endif

namespace {
uint8_t touchStates[Config::TOUCH_PIN_COUNT] = {LOW, LOW, LOW};
unsigned long lastTouchEventMs[Config::TOUCH_PIN_COUNT] = {0, 0, 0};
unsigned long touchPressedAtMs[Config::TOUCH_PIN_COUNT] = {0, 0, 0};
unsigned long lastRepeatAtMs[Config::TOUCH_PIN_COUNT] = {0, 0, 0};

void logSpeedStateFromTouch() {
  DebugLog::printLine(StepperControl::isSystemEnabled() ? "system ON" : "system OFF");
  DebugLog::printSpeedState(
    StepperControl::isSystemEnabled(),
    StepperControl::getSpeedLevel(),
    StepperControl::getSelectedTargetRpm()
  );
}

void configureWakeInterrupts() {
#if defined(ARDUINO_ARCH_AVR) && ENABLE_AVR_SLEEP_MODE
  *digitalPinToPCICR(Config::TOUCH_PIN_ON_OFF) |= _BV(digitalPinToPCICRbit(Config::TOUCH_PIN_ON_OFF));
  *digitalPinToPCICR(Config::TOUCH_PIN_FORWARD) |= _BV(digitalPinToPCICRbit(Config::TOUCH_PIN_FORWARD));
  *digitalPinToPCICR(Config::TOUCH_PIN_BACKWARD) |= _BV(digitalPinToPCICRbit(Config::TOUCH_PIN_BACKWARD));

  *digitalPinToPCMSK(Config::TOUCH_PIN_ON_OFF) |= _BV(digitalPinToPCMSKbit(Config::TOUCH_PIN_ON_OFF));
  *digitalPinToPCMSK(Config::TOUCH_PIN_FORWARD) |= _BV(digitalPinToPCMSKbit(Config::TOUCH_PIN_FORWARD));
  *digitalPinToPCMSK(Config::TOUCH_PIN_BACKWARD) |= _BV(digitalPinToPCMSKbit(Config::TOUCH_PIN_BACKWARD));
#endif
}

void logRawTouchState(uint8_t touchIndex, uint8_t currentState) {
  if (Config::DEBUG_SERIAL_ENABLED && Config::DEBUG_RAW_TOUCH_STATE) {
    static uint8_t lastRawState[Config::TOUCH_PIN_COUNT] = {LOW, LOW, LOW};
    if (lastRawState[touchIndex] != currentState) {
      lastRawState[touchIndex] = currentState;
      DebugLog::printRawTouchState(Config::TOUCH_PINS[touchIndex], currentState);
    }
  }
}

bool consumeTouchClickEvent(uint8_t touchIndex, uint8_t currentState, unsigned long now) {
  logRawTouchState(touchIndex, currentState);

  if (currentState == touchStates[touchIndex]) {
    return false;
  }

  touchStates[touchIndex] = currentState;

  if (currentState == HIGH) {
    touchPressedAtMs[touchIndex] = now;
    lastRepeatAtMs[touchIndex] = now;
  } else {
    touchPressedAtMs[touchIndex] = 0;
    lastRepeatAtMs[touchIndex] = 0;
  }

  if (now - lastTouchEventMs[touchIndex] < Config::TOUCH_EVENT_GUARD_MS) {
    return false;
  }

  lastTouchEventMs[touchIndex] = now;

  return currentState == HIGH;
}

bool consumeTouchAutoRepeatEvent(uint8_t touchIndex, uint8_t currentState, unsigned long now) {
  if (currentState != HIGH || touchStates[touchIndex] != HIGH) {
    return false;
  }

  if (touchPressedAtMs[touchIndex] == 0) {
    return false;
  }

  if (now - touchPressedAtMs[touchIndex] < Config::TOUCH_REPEAT_START_MS) {
    return false;
  }

  if (now - lastRepeatAtMs[touchIndex] < Config::TOUCH_REPEAT_INTERVAL_MS) {
    return false;
  }

  lastRepeatAtMs[touchIndex] = now;
  lastTouchEventMs[touchIndex] = now;
  return true;
}
}

#if defined(ARDUINO_ARCH_AVR) && ENABLE_AVR_SLEEP_MODE
ISR(PCINT2_vect) {
}
#endif

namespace TouchControls {
void initialize() {
  pinMode(Config::TOUCH_PIN_ON_OFF, INPUT);
  pinMode(Config::TOUCH_PIN_FORWARD, INPUT);
  pinMode(Config::TOUCH_PIN_BACKWARD, INPUT);

  const unsigned long now = millis();

  for (uint8_t index = 0; index < Config::TOUCH_PIN_COUNT; index++) {
    touchStates[index] = digitalRead(Config::TOUCH_PINS[index]);
    if (touchStates[index] == HIGH) {
      touchPressedAtMs[index] = now;
      lastRepeatAtMs[index] = now;
    }
  }

  configureWakeInterrupts();
}

void logSpeedState() {
  logSpeedStateFromTouch();
}

void update() {
  const unsigned long now = millis();
  const uint8_t onOffState = digitalRead(Config::TOUCH_PIN_ON_OFF);
  const uint8_t forwardState = digitalRead(Config::TOUCH_PIN_FORWARD);
  const uint8_t backwardState = digitalRead(Config::TOUCH_PIN_BACKWARD);

  if (consumeTouchClickEvent(0, onOffState, now)) {
    DebugLog::printTouchEvent("on_off", Config::TOUCH_PIN_ON_OFF, touchStates[0]);
    StepperControl::toggleSystemEnabled();
    logSpeedStateFromTouch();
  }

  if (consumeTouchClickEvent(1, forwardState, now) || consumeTouchAutoRepeatEvent(1, forwardState, now)) {
    DebugLog::printTouchEvent("forward", Config::TOUCH_PIN_FORWARD, touchStates[1]);
    StepperControl::changeSpeedLevel(1);
    logSpeedStateFromTouch();
  }

  if (consumeTouchClickEvent(2, backwardState, now) || consumeTouchAutoRepeatEvent(2, backwardState, now)) {
    DebugLog::printTouchEvent("backward", Config::TOUCH_PIN_BACKWARD, touchStates[2]);
    StepperControl::changeSpeedLevel(-1);
    logSpeedStateFromTouch();
  }
}
}