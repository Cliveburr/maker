using MetricLibrary;
using StepperMotorInterface.StepperMotor;
using StepperMotorInterface.StepperMotor.Enum;
using StepperMotorInterface.StepperMotor.Transport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml.Serialization;

namespace StepperMotorInterface.Windows
{
    public partial class StepperMotorWindow : Window
    {
        private StepperMotorDriver _driver;

        public StepperMotorWindow(ITransport transport)
        {
            InitializeComponent();

            _driver = new StepperMotorDriver(transport);

            Task.Run(GetDriverInfo);
        }

        private async Task GetDriverInfo()
        {
            try
            {
                await _driver.GetDriverInfo();

                fcDriverInfoClock.SetFrequency(new Frequency(_driver.Info.Clock));

                tbDriverInfoChannels.Text = _driver.Info.Channels.ToString();
            }
            catch (Exception err)
            {
                Program.ErrorHandler(err);
            }
        }

        private async Task btGetDriverInfo_Click(object sender, RoutedEventArgs e)
        {
            await GetDriverInfo();
        }

        private async Task btChannel0_GetChannelInfo_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var channelInfo = await _driver.GetChannelInfo(0);

                cbChannel0_Mode.SelectedIndex = (int)channelInfo.Mode;

                fcChannel0_Running.SetFrequency(_driver.TransformValueIntoFrequency(channelInfo.RunningValue));

                var totalTorque = (uint)channelInfo.TorqueOnValue + channelInfo.TorqueOffValue;
                fcChannel0_Torque.SetFrequency(_driver.TransformValueIntoFrequency(totalTorque));

                var duty = (channelInfo.TorqueOnValue * 100) / totalTorque;
                slChannel0_TorqueDuty.Value = duty;
            }
            catch (Exception err)
            {
                Program.ErrorHandler(err);
            }
        }

        private async Task btChannel0_SetChannelInfo_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var mode = (ChannelModeEnum)cbChannel0_Mode.SelectedIndex;

                var runningValue = _driver.TransformFrequencyIntoValue(fcChannel0_Running.GetFrequency());

                var totalTorque = _driver.TransformFrequencyIntoValue(fcChannel0_Torque.GetFrequency());
                var torqueOnValue = (ushort)((totalTorque * slChannel0_TorqueDuty.Value) / 100);
                var torqueOffValue = (ushort)(totalTorque - torqueOnValue);

                await _driver.SetChannelInfo(0, mode, runningValue, torqueOnValue, torqueOffValue);
            }
            catch (Exception err)
            {
                Program.ErrorHandler(err);
            }
        }

        private async Task btChannel0_SendSteps_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var foward = rbChannel0_Foward.IsChecked ?? false;

                var continuous = cbChannel0_Continuous.IsChecked ?? false;

                ushort steps = 0;
                ushort.TryParse(tbChannel0_Steps.Text, out steps);
                if (steps == 0 && !continuous)
                    throw new Exception("Invalid steps value!");

                await _driver.SetChannelSteps(0, steps, foward, continuous);
            }
            catch (Exception err)
            {
                Program.ErrorHandler(err);
            }
        }

        private void slChannel0_TorqueDuty_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            try
            {
                lbChannel0_TorqueDutyDisplay.Content = $"Torque duty: {slChannel0_TorqueDuty.Value.ToString()}%";
            }
            catch (Exception err)
            {
                Program.ErrorHandler(err);
            }
        }

        //private async void tabControlManual_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        //{
        //    try
        //    {
        //        await Program.Motor.ChannelChangeMode(_index, ChannelModeEnum.CM_Manual);
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }
        //}

        //private async void tabControlAutomatic_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        //{
        //    try
        //    {
        //        await Program.Motor.ChannelChangeMode(_index, ChannelModeEnum.CM_Automatic);
        //    }
        //    catch (Exception err)
        //    {
        //        e.Handled = true;

        //        Program.ErrorHandler(err);
        //    }
        //}

        //private async void tgbManualOnOff_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        //{
        //    try
        //    {
        //        var state = tgbManualOnOff.IsChecked ?? false ?
        //            ChannelStateEnum.CS_ManualOff :
        //            ChannelStateEnum.CS_ManualOn;

        //        await Program.Motor.ChannelChangeState(_index, state);
        //    }
        //    catch (Exception err)
        //    {
        //        e.Handled = true;

        //        Program.ErrorHandler(err);
        //    }
        //    SetManualGroups(true);
        //}

        //private void SetManualGroups(bool inverse = false)
        //{
        //    grbManualStep.IsEnabled = tgbManualOnOff.IsChecked ?? false;
        //    grbManualPwm.IsEnabled = tgbManualOnOff.IsChecked ?? false;

        //    if (inverse)
        //    {
        //        grbManualStep.IsEnabled ^= true;
        //        grbManualPwm.IsEnabled ^= true;
        //    }
        //}

        //#region ChannelManualConfig
        //private void tgbManualDirection_Click(object sender, RoutedEventArgs e)
        //{
        //    SendManualConfig(false);
        //}

        //public void btManualOneStep_Click(object sender, RoutedEventArgs e)
        //{
        //    SendManualConfig(true);
        //}

        //private async void SendManualConfig(bool oneStep)
        //{
        //    try
        //    {
        //        var direction = tgbManualDirection.IsChecked ?? false ? 1 : 0;
        //        var oneStepByte = oneStep ? 1: 0;

        //        await Program.Motor.ChannelManualConfig(_index, (byte)direction, (byte)oneStepByte);
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }
        //}
        //#endregion

        //#region ChannelManualStep
        //private async void slManualStepRPM_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        //{
        //    if (!_afterIni)
        //        return;

        //    try
        //    {
        //        await SendManualStep();
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }
        //}

        //private async void tbManualSteps_KeyDown(object sender, KeyEventArgs e)
        //{
        //    if (e.Key != Key.Enter)
        //        return;

        //    try
        //    {
        //        await SendManualStep();
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }
        //}

        //private void tbManualRPMmax_KeyDown(object sender, KeyEventArgs e)
        //{
        //    if (e.Key != Key.Enter)
        //        return;

        //    try
        //    {
        //        var rpmMax = int.Parse(tbManualRPMmax.Text);
        //        slManualStepRPM.Maximum = rpmMax;
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }
        //}

        //private async Task SendManualStep()
        //{
        //    var steps = int.Parse(tbManualSteps.Text);
        //    var value = slManualStepRPM.Value;

        //    var hertz = value / 60;    // converte o rpm em hertz
        //    var period = 1 / hertz;    // converte hertz para periodo
        //    var tick = period / timer_value;     // calcula o valor do timer para o periodo
        //    var tick_step = (uint)(tick / steps);    // divide entre os passos do motor

        //    await Program.Motor.ChannelManualStep(_index, tick_step);

        //    var onestepperiodinus = (period / steps * 1000000);

        //    lbManualRPMlabel.Content = $"RPM: {value.ToString("0")}";
        //    lbManualRPMdisplay.Content = $"RPM tick: {tick.ToString("#,##0.000")} - Step tick: {tick_step.ToString("#,##0.000")}";
        //    lbStepWidth.Content = $"{onestepperiodinus.ToString("#,##0.000")}us";
        //}
        //#endregion

        //#region old
        //private void UISafe(Func<Task> action)
        //{
        //    Dispatcher.Invoke(() =>
        //    {
        //        try
        //        {
        //            action();
        //        }
        //        catch (AggregateException aggErr)
        //        {
        //            var err = aggErr.InnerExceptions.First();
        //            Program.ErrorHandler(err);
        //        }
        //        catch (Exception err)
        //        {
        //            Program.ErrorHandler(err);
        //        }
        //    });
        //}

        ////private void _device_OnMessageReceive(byte[] msg)
        ////{
        ////    if (msg.Length == 0)
        ////        return;

        ////    switch (msg[0])
        ////    {
        ////        case 1: label.Content = "press"; break;
        ////        case 2: label.Content = ""; break;
        ////    }
        ////}

        ////private void button_Click(object sender, RoutedEventArgs e)
        ////{
        ////    try
        ////    {
        ////        var msg = new byte[] { 1 };
        ////        //_device.SendMessage(msg);
        ////    }
        ////    catch (Exception err)
        ////    {
        ////        MessageBox.Show(err.ToString());
        ////    }
        ////}

        //private const double adc = 0.0048828125;   // 5 / 1023

        ////private async void _timer_Elapsed(object sender, ElapsedEventArgs e)
        ////{
        ////    _timer.Stop();
        ////    try
        ////    {
        ////        var msg = new byte[] { 2 };
        ////        var read = await _device.WriteAndRead(msg);

        ////        Dispatcher.Invoke(() =>
        ////        {

        ////            // read[0] = 0000 0011
        ////            // read[1] = 1111 1111

        ////            //var text = $"low: {read[0]}, high: {read[1]}";
        ////            var value = (read[1] << 8) | (read[0]);
        ////            var volt = value * adc;

        ////            // VADC_in = (VREF +−VREF−)⋅n212−1 + VREF−
        ////            //var tt = (5 - 0) * (value / ((2 ^ 10) - 1)) + 5;

        ////            label.Content = $"volt: {volt.ToString("#.000000")}V";
        ////            //switch (read[0])
        ////            //{
        ////            //    case 1: label.Content = "press"; break;
        ////            //    case 0: label.Content = ""; break;
        ////            //}
        ////        });
        ////    }
        ////    catch (Exception err)
        ////    {
        ////    }
        ////    _timer.Start();
        ////}

        ////private void Probe_Click(object sender, RoutedEventArgs e)
        ////{
        ////    try
        ////    {
        ////        if (_probeWindow == null)
        ////        {
        ////            _probeWindow = new ProbeWindow(_device);
        ////            _probeWindow.Closed += (object sender2, EventArgs e2) => { _probeWindow = null; };
        ////            _probeWindow.Show();
        ////        }
        ////        else
        ////        {
        ////            _probeWindow.Activate();
        ////        }
        ////    }
        ////    catch (Exception err)
        ////    {
        ////        MessageBox.Show(err.ToString());
        ////    }
        ////}
        //#endregion

        //#region ChannelManualPWM
        //private async void tbManualPWMwidth_KeyDown(object sender, KeyEventArgs e)
        //{
        //    if (e.Key != Key.Enter)
        //        return;

        //    try
        //    {
        //        await SendPWMValuesChange();
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }

        //    //    var hertz = double.Parse(tbPWMwidth.Text);
        //    //var period = 1 / hertz;    // converte hertz para periodo
        //    //var tick = (uint)(period / timer_value);     // calcula o valor do timer para o periodo

        //    //var tick_bytes = BitConverter.GetBytes(tick);

        //    //var msg = new byte[] { 6, tick_bytes[0], tick_bytes[1], tick_bytes[2], tick_bytes[3] };
        //    //_device.SendMessage(msg);

        //    //PWM_Slider.Value = tick / 2;
        //    //PWM_Slider.Maximum = tick;
        //}

        //private async void slManualPWM_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        //{
        //    if (!_afterIni)
        //        return;

        //    try
        //    {
        //        await SendPWMValuesChange();
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }

        //    //var value = PWM_Slider.Value;

        //    //PWM_Label.Content = $"PWM: {value.ToString("0")}";

        //    //var pwm_on = (uint)(value);

        //    //var pwm_on_bytes = BitConverter.GetBytes(pwm_on);

        //    //var msg = new byte[] { 4, pwm_on_bytes[0], pwm_on_bytes[1], pwm_on_bytes[2], pwm_on_bytes[3] };
        //    //_device.SendMessage(msg);

        //    //PWM_Display.Content = $"PWM Maxium tick: {PWM_Slider.Maximum.ToString("#,000")} - On tick: {pwm_on.ToString("#,000")} - Off tick: {(PWM_Slider.Maximum - pwm_on).ToString("#,000")}";
        //}

        //private async void slManualPWMadcon_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        //{
        //    if (!_afterIni)
        //        return;

        //    try
        //    {
        //        await SendPWMValuesChange();
        //    }
        //    catch (Exception err)
        //    {
        //        Program.ErrorHandler(err);
        //    }
        //}

        //private async Task SendPWMValuesChange()
        //{
        //    var pwmhertz = double.Parse(tbManualPWMwidth.Text);
        //    var pwmperiod = 1 / pwmhertz;    // converte hertz para periodo
        //    var pwmtick = (uint)(pwmperiod / timer_value);     // calcula o valor do timer para o periodo

        //    slManualPWM.Maximum = pwmtick;

        //    var onvalue = slManualPWM.Value;
        //    var onvaluebeforeadcpercent = slManualPWMadcon.Value;
        //    var onvaluebeforeadc = (onvaluebeforeadcpercent * onvalue) / 100;
        //    var onvalueafteradc = onvalue - onvaluebeforeadc;
        //    var onvalueoff = pwmtick - onvalue;

        //    //var pwmonbeforeadc_bytes = BitConverter.GetBytes((uint)onvaluebeforeadc);
        //    //var pwmonafteradc_bytes = BitConverter.GetBytes((uint)onvalueafteradc);
        //    //var pwmoff_bytes = BitConverter.GetBytes((uint)onvalueoff);

        //    //var msg = new byte[] { 4,
        //    //    pwmonbeforeadc_bytes[0], pwmonbeforeadc_bytes[1], pwmonbeforeadc_bytes[2], pwmonbeforeadc_bytes[3],
        //    //    pwmonafteradc_bytes[0], pwmonafteradc_bytes[1], pwmonafteradc_bytes[2], pwmonafteradc_bytes[3],
        //    //    pwmoff_bytes[0], pwmoff_bytes[1], pwmoff_bytes[2], pwmoff_bytes[3]
        //    //};
        //    //_device.SendMessage(msg);
        //    await Program.Motor.ChannelManualPWM(_index, (ushort)onvaluebeforeadc, (ushort)onvalueafteradc, (ushort)onvalueoff);

        //    var pwmperiodus = pwmperiod * 1000000;
        //    var onvaluebeforeadcus = onvaluebeforeadc * timer_value * 1000000;

        //    lbManualPWM.Content = $"PWM on: {onvalue.ToString("#.000")}";
        //    lbManualPWMadcon.Content = $"Adc aquisition: {slManualPWMadcon.Value.ToString("#.000")}%";
        //    lbPWMwidth.Content = $"{pwmperiodus.ToString("#.000")}us";
        //    lbAdcTiming.Content = $"{onvaluebeforeadcus.ToString("#.000")}us";
        //    lbDispalyPWM.Content = $"PWM Maxium tick: {slManualPWM.Maximum.ToString("#,000")} - On tick: {onvalue.ToString("#,000")} - Off tick: {(slManualPWM.Maximum - onvalue).ToString("#,000")}";
        //}
        //#endregion

        //private async void tgbAutoOnOff_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        //{
        //    try
        //    {
        //        var state = tgbAutoOnOff.IsChecked ?? false ?
        //            ChannelStateEnum.CS_AutomaticOff :
        //            ChannelStateEnum.CS_AutomaticOn;

        //        await Program.Motor.ChannelChangeState(_index, state);
        //    }
        //    catch (Exception err)
        //    {
        //        e.Handled = true;

        //        Program.ErrorHandler(err);
        //    }
        //    //SetManualGroups(true);
        //}

        //private void tbCoutingRPM_Click(object sender, RoutedEventArgs e)
        //{
        //    if (tabControl.SelectedIndex == 0)
        //    {
        //        if (tbManualCoutingRPM.IsChecked ?? false)
        //        {
        //            _stepCoutingtimer.Start();
        //        }
        //    }
        //    else
        //    {
        //        if (tbAutoCoutingRPM.IsChecked ?? false)
        //        {
        //            _stepCoutingtimer.Start();
        //        }
        //    }
        //}

        //private void _stepCoutingtimer_Elapsed(object sender, ElapsedEventArgs e)
        //{
        //    Dispatcher.Invoke(_stepCoutingtimer_Safe);
        //}

        //private async void _stepCoutingtimer_Safe()
        //{
        //    _stepCoutingtimer.Stop();

        //    var isManualTab = tabControl.SelectedIndex == 0;
        //    var coutingRPMChecked = isManualTab ?
        //        tbManualCoutingRPM.IsChecked ?? false :
        //        tbAutoCoutingRPM.IsChecked ?? false;

        //    if (coutingRPMChecked)
        //    {
        //        try
        //        {
        //            var response = await Program.Motor.ChannelStepCounting(_index);

        //            var totalStep = response.StepCounting * 5 * 60;

        //            var steps = int.Parse(tbManualSteps.Text);  //TODO: change this config

        //            totalStep = totalStep / steps;

        //            if (isManualTab)
        //            {
        //                lbManualCoutingRPM.Content = totalStep.ToString();
        //            }
        //            else
        //            {
        //                lbAutoCoutingRPM.Content = totalStep.ToString();
        //            }
        //        }
        //        catch (Exception err)
        //        {
        //            tbManualCoutingRPM.IsChecked = false;
        //            tbAutoCoutingRPM.IsChecked = false;

        //            Program.ErrorHandler(err);
        //        }

        //        tbCoutingRPM_Click(null, null);
        //    }
        //}

        //private void btAutoSend_Click(object sender, RoutedEventArgs e)
        //{

        //}

        //private void fcAutoPWM_OnValidationEvent(MetricLibrary.Frequency value)
        //{

        //}

        //private void rbDirection_Click(object sender, RoutedEventArgs e)
        //{

        //}
    }
}