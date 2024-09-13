import WebSocket from 'ws';
import RequestHandler from './handlers/RequestHandler';
import { MessageHandler } from './handlers';

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const server = new WebSocket.Server({
  port: 8080,
  verifyClient: (info, done) => {
    console.log(`Origin: ${info.origin}`);
    if (info.origin === allowedOrigin) {
      done(true);
    } else {
      done(false, 403, 'Forbidden');
    }
  }
});

server.on('connection', (socket) => {
  console.log('Client connected');

  // Create an instance of RequestHandler for each connection
  new RequestHandler(
    (handler: MessageHandler) => socket.on('message', (data: WebSocket.RawData) => handler(data.toString())),
    (message: string) => socket.send(message)
  );

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ${allowedOrigin}`);