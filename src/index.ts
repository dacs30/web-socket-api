import WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import http from 'http';
import RequestHandlerManager from './handlers/RequestHandlerManager';
import url from 'url';

declare module 'http' {
  interface IncomingMessage {
    user?: any;
  }
}

// Secret key for JWT
const secretKey = 'your_secret_key';

// Create an HTTP server to serve the WebSocket server
// and provide a way to generate JWTs
const server = http.createServer((req, res) => {
  // Enable CORS
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (!req.url) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/get-token' && req.method === 'GET') {
    const { username } = parsedUrl.query;
    if (username) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ token }));
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing username parameter');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Create a WebSocket server from the server
const wss = new WebSocket.Server({ server });

// Middleware to verify JWT
wss.on('headers', (_headers, req) => {
  const token = req.headers['sec-websocket-protocol'];
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
    } catch (err) {
      console.log('Invalid token');
    }
  } 
});

wss.on('connection', (ws, req) => {
  if (!req.user) {
    ws.close(1008, 'Unauthorized');
    return;
  }
  new RequestHandlerManager(ws);
});

// Start the server
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});