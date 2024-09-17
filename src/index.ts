import WebSocket from 'ws';
import RequestHandler from './handlers/RequestHandler';

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

server.on('connection', (socket: WebSocket) => {
  console.log('Client connected');

  new RequestHandler(socket);
});

console.log(`WebSocket server is running on ${allowedOrigin}`);