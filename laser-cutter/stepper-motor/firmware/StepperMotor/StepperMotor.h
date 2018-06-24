#ifndef STEPPER_MOTOR_H
#define	STEPPER_MOTOR_H

#include "../Timer/Timer_Events.h"

union UInt16ConvertionUnion {
   unsigned int value;
   unsigned char bytes[2];
} UInt16Convertion;

union ULong32ConvertionUnion {
   unsigned long value;
   unsigned char bytes[4];
} ULong32Convertion;

struct StepperMotor_ChannelBitStruct {
    unsigned char active: 1;
    unsigned char foward: 1;
    unsigned char pwmState: 1;
};

typedef void (*StepperMotorSetChannelValueCallback)(unsigned char index, unsigned char step, unsigned char value);

struct StepperMotor_ChannelStruct {
    struct StepperMotor_ChannelBitStruct bits;
    unsigned char step;
    struct TimerEventRotine stepTimer;
    StepperMotorSetChannelValueCallback setChannelValue;
    struct TimerEventRotine pwmTimer;
    unsigned long pwmLow;
    unsigned long pwmHigh;
};

struct StepperMotor_ChannelStruct StepperMotor_Channels[2];

void StepperMotor_Initialize();

void StepperMotor_Task();


#endif	/* STEPPER_MOTOR */