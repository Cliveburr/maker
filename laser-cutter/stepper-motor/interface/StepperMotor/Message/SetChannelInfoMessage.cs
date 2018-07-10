using StepperMotorInterface.StepperMotor.Enum;
using System.IO;

namespace StepperMotorInterface.StepperMotor.Message
{
    public class SetChannelInfoRequest : IMessageRequest
    {
        public int Index { get; set; }
        public ChannelModeEnum Mode { get; set; }
        public bool Active { get; set; }
        public uint RunningValue { get; set; }
        public uint TorqueOnValue { get; set; }
        public uint TorqueOffValue { get; set; }

        public byte[] GetBytes()
        {
            using (var mem = new MemoryStream())
            using (var binary = new BinaryWriter(mem))
            {
                binary.Write((byte)MessageIndexEnum.SetChannelInfo);

                binary.Write((byte)Index);

                binary.Write((byte)Mode);

                binary.Write((byte)(Active ? 1: 0));

                binary.Write(RunningValue);

                binary.Write(TorqueOnValue);

                binary.Write(TorqueOffValue);

                return mem.ToArray();
            }
        }
    }
}