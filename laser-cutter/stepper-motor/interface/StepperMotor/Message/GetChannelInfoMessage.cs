using StepperMotorInterface.StepperMotor.Enum;
using System.IO;

namespace StepperMotorInterface.StepperMotor.Message
{
    public class GetChannelInfoRequest : IMessageRequest
    {
        public int Index { get; set; }

        public byte[] GetBytes()
        {
            using (var mem = new MemoryStream())
            using (var binary = new BinaryWriter(mem))
            {
                binary.Write((byte)MessageIndexEnum.GetChannelInfo);

                binary.Write((byte)Index);

                return mem.ToArray();
            }
        }
    }

    public class GetChannelInfoResponse : IMessageResponse
    {
        public ChannelModeEnum Mode { get; set; }
        public uint RunningValue { get; set; }
        public ushort TorqueOnValue { get; set; }
        public ushort TorqueOffValue { get; set; }

        public void Parse(byte[] msg)
        {
            using (var mem = new MemoryStream(msg))
            using (var binary = new BinaryReader(mem))
            {
                Mode = (ChannelModeEnum)binary.ReadByte();

                RunningValue = binary.ReadUInt32();

                TorqueOnValue = binary.ReadUInt16();

                TorqueOffValue = binary.ReadUInt16();
            }
        }
    }
}