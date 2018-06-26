using MetricLibrary;
using StepperMotorInterface.StepperMotor.Enum;
using StepperMotorInterface.StepperMotor.Message;
using StepperMotorInterface.StepperMotor.Transport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace StepperMotorInterface.StepperMotor
{
    public class StepperMotorDriver
    {
        public Frequency ClockFrequency { get; set; }
        public int Steps { get; set; }
        public GetDriverInfoResponse Info { get; private set; }

        private ITransport _transport;
        private uint _clockTickPeriod;

        public StepperMotorDriver(ITransport transport)
        {
            _transport = transport;
        }

        public async Task GetDriverInfo()
        {
            var request = new GetDriverInfoRequest
            {
            };

            Info = await _transport.SendMessageWithResonse<GetDriverInfoResponse>(request);
        }

        public async Task<GetChannelInfoResponse> GetChannelInfo(int index)
        {
            var request = new GetChannelInfoRequest
            {
                Index = index
            };

            return await _transport.SendMessageWithResonse<GetChannelInfoResponse>(request);
        }

        public async Task SetChannelInfo(int index, ChannelModeEnum mode, uint runningValue, ushort torqueOnValue, ushort torqueOffValue)
        {
            var request = new SetChannelInfoRequest
            {
                Index = index,
                Mode = mode,
                RunningValue = runningValue,
                TorqueOnValue = torqueOnValue,
                TorqueOffValue = torqueOffValue
            };

            await _transport.SendMessage(request);
        }

        public async Task SetChannelSteps(int index, ushort steps, bool foward, bool continuous)
        {
            var request = new SetChannelStepsRequest
            {
                Index = index,
                Steps = steps,
                Foward = foward,
                Continuous = continuous
            };

            await _transport.SendMessage(request);
        }

        public uint ClockTickPeriod
        {
            get
            {
                if (_clockTickPeriod == 0)
                {
                    var clockCicles = Info.Clock / 4;
                    _clockTickPeriod = 1 / clockCicles;
                }
                return _clockTickPeriod;
            }
        }

        public uint TransformFrequencyIntoValue(Frequency frequency)
        {
            var ticks = 1 / frequency.Value;
            return (uint)(ticks / ClockTickPeriod);
        }

        public Frequency TransformValueIntoFrequency(uint value)
        {
            var period = value * ClockTickPeriod;
            return new Frequency(1 / period);
        }
    }
}