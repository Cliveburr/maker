#ifndef STEPPER_MOTOR_H
#define	STEPPER_MOTOR_H

#include "../Timer/Timer_Events.h"

enum ChannelModeEnum {
    CM_FullStep = 0
};

struct StepperMotor_ChannelBitStruct {
    unsigned char active: 1;
    unsigned char foward: 1;
    unsigned char pwmState: 1;
    unsigned char continuous: 1;
};

typedef void (*StepperMotorSetChannelValueCallback)(unsigned char index, unsigned char step, unsigned char value);

struct StepperMotor_ChannelStruct {
    struct StepperMotor_ChannelBitStruct bits;
    unsigned char step;
    unsigned int walkSteps;
    struct TimerEventRotine stepTimer;
    StepperMotorSetChannelValueCallback setChannelValue;
    struct TimerEventRotine pwmTimer;
    unsigned long pwmLow;
    unsigned long pwmHigh;
    enum ChannelModeEnum mode;
};

struct StepperMotor_ChannelStruct StepperMotor_Channels[2];

void StepperMotor_Initialize();

void StepperMotor_Task();


#endif	/* STEPPER_MOTOR */