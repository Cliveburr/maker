#include "Config.h"
#include "DebugLog.h"
#include "StepperControl.h"
#include "TouchControls.h"

void setup() {
  DebugLog::begin();
  StepperControl::initialize();
  TouchControls::initialize();
  DebugLog::printLine("stepper controller ready");
  TouchControls::logSpeedState();
}

void loop() {
  StepperControl::update();
  TouchControls::update();

  if (!StepperControl::isSystemEnabled()) {
    StepperControl::enterLowPowerMode();
  }
}