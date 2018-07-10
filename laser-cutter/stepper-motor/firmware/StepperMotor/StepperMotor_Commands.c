#include "StepperMotor.h"
#include "StepperMotor_User.h"
#include "StepperMotor_Commands.h"
#include "StepperMotor_OnePhaseFullStep.h"

void StepperMotor_SetChannelInfo(unsigned char index, enum ChannelModeEnum mode, unsigned char active, unsigned long runningValue, unsigned long torqueOnValue, unsigned long torqueOffValue) {
    struct StepperMotor_ChannelStruct* channel = &StepperMotor_Channels[index];

    switch (mode) {
        case CM_FullStep:
        {
            channel->stepTimer.callback = OnePhaseFullStep_StepTimerRotine;
            channel->setChannelValue = OnePhaseFullStep_SetChannelValue;
            channel->mode = mode;
            break;
        }
    }

    channel->bits.active = active;

    channel->stepTimer.value = runningValue;

    channel->pwmHigh = torqueOnValue;

    channel->pwmLow = torqueOffValue;

    //TODO: determinar o ENABLE se nenhum canal esta ativado
}

void StepperMotor_SetChannelSteps(unsigned char index, unsigned int walkSteps, unsigned char foward, unsigned char continuous) {
    struct StepperMotor_ChannelStruct* channel = &StepperMotor_Channels[index];

    channel->walkSteps = steps;

    channel->bits.foward = foward;

    channel->bits.continuous = continuous;

    //TODO: determinar o WALK_SIGNAL baseado se tem steps ou se esta continuous setado
}