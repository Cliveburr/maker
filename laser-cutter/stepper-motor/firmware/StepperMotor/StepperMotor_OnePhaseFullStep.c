#include <stdint.h>
#include <xc.h>
#include <htc.h>

#include "system.h"
#include "StepperMotor.h"
#include "StepperMotor_User.h"
#include "StepperMotor_OnePhaseFullStep.h"
#include "../Timer/Timer_Events.h"

void OnePhaseFullStep_StepTimerRotine(unsigned char index) {
    struct StepperMotor_ChannelStruct* channel = &StepperMotor_Channels[index];
    
    OnePhaseFullStep_SetChannelValue(index, channel->step, 0);
    
    if (channel->bits.foward) {
        if (channel->step == 2)
            channel->step = 1;
        else
            channel->step++;
    }
    else {
        if (channel->step <= 1)
            channel->step = 2;
        else
            channel->step--;
    }
    
    OnePhaseFullStep_SetChannelValue(index, channel->step, 1);

    channel->bits.pwmState = 1;
    TimerEventRotine_Reset(&channel->pwmTimer);
}

void OnePhaseFullStep_SetChannelValue(unsigned char index, unsigned char step, unsigned char value) {
    switch (index) {
        case 0:
        {
            switch(step) {
                case 1:
                    C0_AAH = value;
                    C0_ABL = value;
                    break;
                case 2:
                    C0_ABH = value;
                    C0_AAL = value;
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
            }
            break;
        }
    }
}