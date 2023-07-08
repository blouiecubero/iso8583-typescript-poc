import net from 'net';
import { parseISO8583Message } from './iso8583_parser';

// Server settings
const serverPort = 1234;

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected');

  // Handle received data from the client
  socket.on('data', (data) => {
    const receivedMessage = data.toString();
    console.log('Received ISO 8583 message:', receivedMessage);

    // Process the received ISO 8583 message
    processISO8583Message(receivedMessage);

    // Send a response back to the client (if needed)
    const responseMessage = 'ISO8583_RESPONSE';
    socket.write(responseMessage);

    // Close the connection after sending the response
    socket.end();
  });

  // Handle client connection close event
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start listening for connections
server.listen(serverPort, () => {
  console.log(`ISO 8583 server started and listening on port ${serverPort}`);
});

// Function to process the received ISO 8583 message
function processISO8583Message(message: string) {
  // TODO: Implement your logic to parse and process the ISO 8583 message
  console.log('Processing ISO 8583 message:', message);

  const parsedISO8583Message = parseISO8583Message(message)

  console.log(JSON.stringify(parsedISO8583Message, null, 2));
}