using StepperMotorInterface.StepperMotor.Transport;
using StepperMotorInterface.Windows;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace StepperMotorInterface
{
    public static class Program
    {
        public static Application App { get; private set; }
        public static MainWindow MainWindow { get; private set; }
        public static StepperMotorWindow[] StepperMotorWindow { get; private set; }

        [STAThread]
        public static void Main()
        {
            StepperMotorWindow = new StepperMotorWindow[1];

            MainWindow = new MainWindow();
            MainWindow.Show();

            App = new Application();
            App.ShutdownMode = ShutdownMode.OnExplicitShutdown;
            App.Run();
        }

        public static void Close()
        {
            App.Shutdown();
        }

        public static void ErrorHandler(Exception err)
        {
            if (err is AggregateException)
            {
                err = ((AggregateException)err).InnerExceptions.First();
            }

            MainWindow.Dispatcher.Invoke(() =>
            {
                MessageBox.Show(err.ToString());
            });
        }

        public static void ShowStepperMotorWindow<T>(int index) where T: ITransport
        {
            var stepperMotorWindow = StepperMotorWindow[index];

            if (stepperMotorWindow == null)
            {
                var transport = Activator.CreateInstance<T>();
                stepperMotorWindow = new StepperMotorWindow(transport);
                StepperMotorWindow[index] = stepperMotorWindow;
                stepperMotorWindow.Closed += (object sender, EventArgs e) =>
                {
                    StepperMotorWindow[index] = null;
                };

                stepperMotorWindow.Show();
            }
            else
            {
                stepperMotorWindow.Activate();
            }
        }
    }
}