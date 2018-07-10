#include "usb.h"
#include "usb_device_hid.h"

#include "system.h"
//#include "BLDC_Esc.h"

unsigned char ReceivedDataBuffer[64] @ HID_CUSTOM_OUT_DATA_BUFFER_ADDRESS;
unsigned char ToSendDataBuffer[64] @ HID_CUSTOM_IN_DATA_BUFFER_ADDRESS;

volatile USB_HANDLE USBOutHandle;    
volatile USB_HANDLE USBInHandle;

void APP_DeviceInitialize()
{
    //initialize the variable holding the handle for the last
    // transmission
    USBInHandle = 0;

    //enable the HID endpoint
    USBEnableEndpoint(CUSTOM_DEVICE_HID_EP, USB_IN_ENABLED|USB_OUT_ENABLED|USB_HANDSHAKE_ENABLED|USB_DISALLOW_SETUP);

    //Re-arm the OUT endpoint for the next packet
    USBOutHandle = (volatile USB_HANDLE)HIDRxPacket(CUSTOM_DEVICE_HID_EP,(uint8_t*)&ReceivedDataBuffer,64);
}

void APP_DeviceTasks()
{   
    if(HIDRxHandleBusy(USBOutHandle) == false)
    {   
        //uwrite_array(0, (char*)&ReceivedDataBuffer);
        
        switch(ReceivedDataBuffer[0])
        {
            case 1:  // GetDriverInfo
            {
                // Request
                
                // Response

                // Clock
                UInt16Convertion.value = _XTAL_FREQ;
                ToSendDataBuffer[0] = UInt16Convertion.bytes[0];
                ToSendDataBuffer[1] = UInt16Convertion.bytes[1];

                // Channels
                ToSendDataBuffer[2] = 1;
                
                USBInHandle = HIDTxPacket(CUSTOM_DEVICE_HID_EP, (uint8_t*)&ToSendDataBuffer[0], 64);
                
                break;
            }
            case 2:  // GetChannelInfo
            {
                // Request

                // Index of channel
                unsigned char index = ReceivedDataBuffer[1];
                struct StepperMotor_ChannelStruct* channel = &StepperMotor_Channels[index];

                // Response

                // Mode 
                ToSendDataBuffer[0] = channel->mode;

                // RunningValue
                ULong32Convertion.value = channel->stepTimer.value;
                ToSendDataBuffer[1] = ULong32Convertion.bytes[0];
                ToSendDataBuffer[2] = ULong32Convertion.bytes[1];
                ToSendDataBuffer[3] = ULong32Convertion.bytes[2];
                ToSendDataBuffer[4] = ULong32Convertion.bytes[3];

                // TorqueOnValue
                ULong32Convertion.value = channel->pwmHigh;
                ToSendDataBuffer[5] = ULong32Convertion.bytes[0];
                ToSendDataBuffer[6] = ULong32Convertion.bytes[1];
                ToSendDataBuffer[7] = ULong32Convertion.bytes[2];
                ToSendDataBuffer[8] = ULong32Convertion.bytes[3];

                // TorqueOffValue
                ULong32Convertion.value = channel->pwmLow;
                ToSendDataBuffer[9] = ULong32Convertion.bytes[0];
                ToSendDataBuffer[10] = ULong32Convertion.bytes[1];
                ToSendDataBuffer[11] = ULong32Convertion.bytes[2];
                ToSendDataBuffer[12] = ULong32Convertion.bytes[3];
                
                USBInHandle = HIDTxPacket(CUSTOM_DEVICE_HID_EP, (uint8_t*)&ToSendDataBuffer[0], 64);
                
                break;
            }
            case 3:  // SetChannelInfo
            {
                // Request

                // Index of channel
                unsigned char index = ReceivedDataBuffer[1];                

                // Mode
                enum ChannelModeEnum mode = ReceivedDataBuffer[2];

                // Active
                unsigned char active = ReceivedDataBuffer[3];

                // RunningValue
                ULong32Convertion.bytes[0] = ReceivedDataBuffer[4];
                ULong32Convertion.bytes[1] = ReceivedDataBuffer[5];
                ULong32Convertion.bytes[2] = ReceivedDataBuffer[6];
                ULong32Convertion.bytes[3] = ReceivedDataBuffer[7];
                unsigned long runningValue = ULong32Convertion.value;

                // TorqueOnValue
                ULong32Convertion.bytes[0] = ReceivedDataBuffer[8];
                ULong32Convertion.bytes[1] = ReceivedDataBuffer[9];
                ULong32Convertion.bytes[2] = ReceivedDataBuffer[10];
                ULong32Convertion.bytes[3] = ReceivedDataBuffer[11];
                unsigned long torqueOnValue = ULong32Convertion.value;

                // TorqueOffValue
                ULong32Convertion.bytes[0] = ReceivedDataBuffer[12];
                ULong32Convertion.bytes[1] = ReceivedDataBuffer[13];
                ULong32Convertion.bytes[2] = ReceivedDataBuffer[14];
                ULong32Convertion.bytes[3] = ReceivedDataBuffer[15];
                unsigned long torqueOffValue = ULong32Convertion.value;

                StepperMotor_SetChannelInfo(index, mode, active, runningValue, torqueOnValue, torqueOffValue);

                break;
            }
            case 4:  // SetChannelSteps
            {
                // Request
                unsigned char index = ReceivedDataBuffer[1];
                
                // Steps
                UInt16Convertion.bytes[0] = ReceivedDataBuffer[2];
                UInt16Convertion.bytes[1] = ReceivedDataBuffer[3];
                unsigned int walkSteps = UInt16Convertion.value;

                // Foward
                unsigned char foward = ReceivedDataBuffer[4];

                // Continuous
                unsigned char continuous = ReceivedDataBuffer[5];

                StepperMotor_SetChannelSteps(index, walkSteps, foward, continuous);

                break;
            }
        }

        USBOutHandle = HIDRxPacket(CUSTOM_DEVICE_HID_EP, (uint8_t*)&ReceivedDataBuffer, 64);
    }
}

bool USER_USB_CALLBACK_EVENT_HANDLER(USB_EVENT event, void *pdata, uint16_t size)
{
    switch((int)event)
    {
        case EVENT_TRANSFER:
            break;

        case EVENT_SOF:
            /* We are using the SOF as a timer to time the LED indicator.  Call
             * the LED update function here. */
            //APP_LEDUpdateUSBStatus();
            break;

        case EVENT_SUSPEND:
            /* Update the LED status for the suspend event. */
            //APP_LEDUpdateUSBStatus();

            //Call the hardware platform specific handler for suspend events for
            //possible further action (like optionally going reconfiguring the application
            //for lower power states and going to sleep during the suspend event).  This
            //would normally be done in USB compliant bus powered applications, although
            //no further processing is needed for purely self powered applications that
            //don't consume power from the host.
            //SYSTEM_Initialize(SYSTEM_STATE_USB_SUSPEND);
            break;

        case EVENT_RESUME:
            /* Update the LED status for the resume event. */
            //APP_LEDUpdateUSBStatus();

            //Call the hardware platform specific resume from suspend handler (ex: to
            //restore I/O pins to higher power states if they were changed during the 
            //preceding SYSTEM_Initialize(SYSTEM_STATE_USB_SUSPEND) call at the start
            //of the suspend condition.
            //SYSTEM_Initialize(SYSTEM_STATE_USB_RESUME);
            break;

        case EVENT_CONFIGURED:
            /* When the device is configured, we can (re)initialize the demo
             * code. */
            APP_DeviceInitialize();
            break;

        case EVENT_SET_DESCRIPTOR:
            break;

        case EVENT_EP0_REQUEST:
            /* We have received a non-standard USB request.  The HID driver
             * needs to check to see if the request was for it. */
            USBCheckHIDRequest();
            break;

        case EVENT_BUS_ERROR:
            break;

        case EVENT_TRANSFER_TERMINATED:
            break;

        default:
            break;
    }
    return true;
}

void interrupt SYS_InterruptHigh(void)
{
    #if defined(USB_INTERRUPT)
        USBDeviceTasks();
    #endif
}