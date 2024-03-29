let connectedDevice;

async function sendCommand(input) {
  if (!connectedDevice) {
    console.error('No device connected');
    return;
  }

  try {
    const result = await connectedDevice.controlTransferOut({
      requestType: 'vendor',
      recipient: 'device',
      request: 721301, // Custom request code
      value: 0,
      index: 0
    }, input);

    console.log('Command sent successfully:', result);
  } catch (error) {
    console.error('Error sending command:', error);
  }
}

async function connectToDevice() {
  try {
    connectedDevice = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1430, productId: 0x0150 }] });
    setStatus('green'); // Update UI
    console.log('Device connected:', connectedDevice);
  } catch (error) {
    console.error('Error connecting to device:', error);
    setStatus('red'); // Update UI
    connectedDevice = null;
  }
}

function setStatus(color) {
  document.getElementById('status').style.backgroundColor = color;
}

function initiateConnectionCheck() {
  connectToDevice();
}
