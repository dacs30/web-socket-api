import WebSocket from 'ws';

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

  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    socket.send(`Echo: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ${allowedOrigin}`);