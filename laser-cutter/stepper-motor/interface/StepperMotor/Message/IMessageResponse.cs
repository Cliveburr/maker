namespace StepperMotorInterface.StepperMotor.Message
{
    public interface IMessageResponse
    {
        void Parse(byte[] msg);
    }
}