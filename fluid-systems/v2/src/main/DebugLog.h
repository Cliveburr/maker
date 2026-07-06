#ifndef DEBUG_LOG_H
#define DEBUG_LOG_H

#include <Arduino.h>

namespace DebugLog {
void begin();
void printLine(const char* message);
void printTouchEvent(const char* label, uint8_t pin, uint8_t state);
void printSpeedState(bool enabled, int8_t speedLevel, float targetRpm);
void printRawTouchState(uint8_t pin, uint8_t state);
}

#endif