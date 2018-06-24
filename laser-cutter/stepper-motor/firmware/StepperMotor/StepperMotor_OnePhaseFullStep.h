#ifndef STEPPER_MOTOR_ONEPHASEFULLSTEP_H
#define	STEPPER_MOTOR_ONEPHASEFULLSTEP_H

void OnePhaseFullStep_StepTimerRotine(unsigned char tag);

void OnePhaseFullStep_SetChannelValue(unsigned char index, unsigned char step, unsigned char value);

#endif	/* STEPPER_MOTOR_ONEPHASEFULLSTEP_H */