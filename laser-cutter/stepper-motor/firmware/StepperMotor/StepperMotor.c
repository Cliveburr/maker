#include <stdint.h>
#include <xc.h>
#include <htc.h>

#include "system.h"
#include "StepperMotor.h"
#include "StepperMotor_User.h"
#include "StepperMotor_OnePhaseFullStep.h"

void DoChannelTask(unsigned char index);
void DoChannelPWM(unsigned char index);

void StepperMotor_Initialize() {
    
    ENABLE = 0;

    // Defautls value for channel 0
    C0_AAH = 0;
    C0_AAL = 0;
    C0_ABH = 0;
    C0_ABL = 0;
    StepperMotor_Channels[0].bits.active = 0;
    StepperMotor_Channels[0].bits.foward = 1;
    StepperMotor_Channels[0].bits.pwmState = 0;
    StepperMotor_Channels[0].bits.continuous = 0;
    StepperMotor_Channels[0].walkSteps = 0;
    StepperMotor_Channels[0].stepTimer.value = 24000000;
    StepperMotor_Channels[0].stepTimer.tag = 0;
    StepperMotor_Channels[0].stepTimer.callback = OnePhaseFullStep_StepTimerRotine;
    StepperMotor_Channels[0].setChannelValue = OnePhaseFullStep_SetChannelValue;
    StepperMotor_Channels[0].pwmHigh = 1500000;
    StepperMotor_Channels[0].pwmLow = 4500000;
    StepperMotor_Channels[0].pwmTimer.value = StepperMotor_Channels[0].pwmHigh;  // ao redefinir os pwm tem q setar o value tbm
    StepperMotor_Channels[0].pwmTimer.tag = 0;
    StepperMotor_Channels[0].pwmTimer.callback = DoChannelPWM;

    ENABLE = 1;
}

void StepperMotor_Task() {
    
    DoChannelTask(0);
    //DoChannelTask(1);
}

void DoChannelTask(unsigned char index) {
    struct StepperMotor_ChannelStruct* channel = &StepperMotor_Channels[index];
    
    if (!channel->bits.active)
        return;

    TimerEventRotine_Tick(&channel->pwmTimer);
    
    TimerEventRotine_Tick(&channel->stepTimer);
}

void DoChannelPWM(unsigned char index) {
    struct StepperMotor_ChannelStruct* channel = &StepperMotor_Channels[index];
    
    channel->bits.pwmState ^= 1;
    
    channel->setChannelValue(index, channel->step, channel->bits.pwmState);
    
    channel->pwmTimer.missing = channel->bits.pwmState ?
        channel->pwmHigh :
        channel->pwmLow;
}