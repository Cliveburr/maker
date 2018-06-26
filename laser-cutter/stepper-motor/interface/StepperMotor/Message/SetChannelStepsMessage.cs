using StepperMotorInterface.StepperMotor.Enum;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StepperMotorInterface.StepperMotor.Message
{
    public class SetChannelStepsRequest : IMessageRequest
    {
        public int Index { get; set; }
        public ushort Steps { get; set; }
        public bool Foward { get; set; }
        public bool Continuous { get; set; }

        public byte[] GetBytes()
        {
            using (var mem = new MemoryStream())
            using (var binary = new BinaryWriter(mem))
            {
                binary.Write((byte)MessageIndexEnum.SetChannelSteps);

                binary.Write((byte)Index);

                binary.Write(Steps);

                binary.Write(Foward);

                binary.Write(Continuous);

                return mem.ToArray();
            }
        }
    }
}