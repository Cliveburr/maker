#ifndef STEPPER_MOTOR_COMMANDS_H
#define	STEPPER_MOTOR_COMMANDS_H


void StepperMotor_SetChannelInfo(unsigned char index, enum ChannelModeEnum mode, unsigned long runningValue, unsigned long torqueOnValue, unsigned long torqueOffValue);

void StepperMotor_SetChannelSteps(unsigned char index, unsigned int walkSteps, unsigned char foward, unsigned char continuous);

void StepperMotor_CheckChannelStates();

#endif	/* STEPPER_MOTOR_COMMANDS_H */