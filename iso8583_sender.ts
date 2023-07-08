import net from 'net';

// ISO 8583 message to send

const isoMessage = 'ISO0150000500200B238800128A180180000000000400000000000000000000081000000000000000000000000012345678901234567890123456789'

// Server settings
const serverAddress = 'localhost';
const serverPort = 1234;

// Create a TCP socket client
const client = new net.Socket();

// Connect to the server
client.connect(serverPort, serverAddress, () => {
  console.log('Connected to the server');

  // Send the ISO 8583 message
  client.write(isoMessage);
});

// Handle received data from the server (optional)
client.on('data', (data) => {
  const receivedMessage = data.toString();
  console.log('Received message from server:', receivedMessage);
});

// Handle connection close event (optional)
client.on('close', () => {
  console.log('Connection closed');
});
