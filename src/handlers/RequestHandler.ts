import { BaseRequestHandler } from "./IRequestHandler";
import WebSocket from 'ws';

class RequestHandler implements BaseRequestHandler {
  private socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
    this.socket.addEventListener("message", (event) => this.handleMessage(event.data.toString()));
    this.socket.addEventListener("close", () => console.log("Client disconnected"));
    this.socket.addEventListener("error", (err) => console.error(err));
    this.socket.addEventListener("open", (message) => console.log("Client connected", message));
  }

  // handleOpen() {
  //   console.log("Client connected");
  // }

  handleRequest(req: string): void {
    throw new Error("Method not implemented");
  }

  handleMessage(req: string) {
    console.log(`Received: ${req}`);
    this.socket.send(`Echo: ${req}`);
  }
}

export default RequestHandler;
