#ifndef STEPPER_CONTROL_H
#define STEPPER_CONTROL_H

#include <Arduino.h>

namespace StepperControl {
void initialize();
void update();
void setSystemEnabled(bool enabled);
void toggleSystemEnabled();
void changeSpeedLevel(int8_t delta);
bool isSystemEnabled();
int8_t getSpeedLevel();
float getSelectedTargetRpm();
void enterLowPowerMode();
}

#endif