using StepperMotorInterface.StepperMotor.Enum;
using System.IO;

namespace StepperMotorInterface.StepperMotor.Message
{
    public class GetDriverInfoRequest : IMessageRequest
    {
        public byte[] GetBytes()
        {
            using (var mem = new MemoryStream())
            using (var binary = new BinaryWriter(mem))
            {
                binary.Write((byte)MessageIndexEnum.DriverInfo);

                return mem.ToArray();
            }
        }
    }

    public class GetDriverInfoResponse : IMessageResponse
    {
        public uint Clock { get; set; }
        public byte Channels { get; set; }

        public void Parse(byte[] msg)
        {
            using (var mem = new MemoryStream(msg))
            using (var binary = new BinaryReader(mem))
            {
                Clock = binary.ReadUInt32();

                Channels = binary.ReadByte();
            }
        }
    }
}