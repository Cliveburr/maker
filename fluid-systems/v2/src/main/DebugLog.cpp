#include "DebugLog.h"

#include "Config.h"

namespace DebugLog {
void begin() {
  if (!Config::DEBUG_SERIAL_ENABLED) {
    return;
  }

  Serial.begin(Config::SERIAL_BAUD_RATE);
}

void printLine(const char* message) {
  if (!Config::DEBUG_SERIAL_ENABLED) {
    return;
  }

  Serial.println(message);
}

void printTouchEvent(const char* label, uint8_t pin, uint8_t state) {
  if (!Config::DEBUG_SERIAL_ENABLED || !Config::DEBUG_TOUCH_EVENTS_ENABLED) {
    return;
  }

  Serial.print("touch ");
  Serial.print(label);
  Serial.print(" pin=");
  Serial.print(pin);
  Serial.print(" state=");
  Serial.println(state == HIGH ? "HIGH" : "LOW");
}

void printSpeedState(bool enabled, int8_t speedLevel, float targetRpm) {
  if (!Config::DEBUG_SERIAL_ENABLED || !Config::DEBUG_SPEED_EVENTS_ENABLED) {
    return;
  }

  Serial.print("motor enabled=");
  Serial.print(enabled ? "true" : "false");
  Serial.print(" level=");
  Serial.print(speedLevel);
  Serial.print(" targetRpm=");
  Serial.println(targetRpm, 2);
}

void printRawTouchState(uint8_t pin, uint8_t state) {
  if (!Config::DEBUG_SERIAL_ENABLED) {
    return;
  }

  Serial.print("raw touch pin=");
  Serial.print(pin);
  Serial.print(" state=");
  Serial.println(state == HIGH ? "HIGH" : "LOW");
}
}