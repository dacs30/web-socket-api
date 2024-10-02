import { BaseRequestHandler } from "./IRequestHandler";
import WebSocket from 'ws';

class RequestHandler implements BaseRequestHandler {
  private socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
    this.socket.addEventListener("message", (event) => this.handleMessage(event));
    this.socket.addEventListener("close", () => console.log("Client disconnected"));
    this.socket.addEventListener("error", (err) => console.error(err));
    this.socket.addEventListener("open", (message) => console.log("Client connected", message));
  }

  handleRequest(req: string): void {
    throw new Error("Method not implemented");
  }

  handleMessage(req: WebSocket.MessageEvent) {
    const jsonReq = JSON.parse(req.data.toString());
    // Would be better to create classes for each message handlers and use a factory to create the correct handler
    // passing the socket as a parameter
    switch (jsonReq.type) {
      case "user_message":
        this.socket.send(JSON.stringify({ type: "user_message", message: "User message received" }));
        break;
      case "system_message":
        this.socket.send(JSON.stringify({ type: "system_message", message: "System message received" }));
        break;
      case "ping":
        this.socket.send(JSON.stringify({ type: "pong", message: "Pong" }));
        break;
      default:
        this.socket.send('Unknown message type');
    }
  }
}

export default RequestHandler;
