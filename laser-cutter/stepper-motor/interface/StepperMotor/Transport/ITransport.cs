using System.Threading.Tasks;
using StepperMotorInterface.StepperMotor.Message;

namespace StepperMotorInterface.StepperMotor.Transport
{
    public interface ITransport
    {
        Task<T> SendMessageWithResonse<T>(IMessageRequest request) where T: IMessageResponse;
        Task SendMessage(IMessageRequest request);
    }
}