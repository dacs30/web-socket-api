import { BaseRequestHandler } from "../interfaces/IRequestHandler";
import WebSocket from "ws";
import { MessageHandlerFactory } from "./MessageHandlerFactory";

class RequestHandlerManager implements BaseRequestHandler {
  private socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
    this.socket.addEventListener("message", (event) =>
      this.handleMessage(event)
    );
    this.socket.addEventListener("close", () =>
      console.log("Client disconnected")
    );
    this.socket.addEventListener("error", (err) => console.error(err));
    this.socket.addEventListener("open", (message) =>
      console.log("Client connected", message)
    );
  }

  handleMessage(req: WebSocket.MessageEvent) {
    const jsonReq = JSON.parse(req.data.toString());
    const handler = MessageHandlerFactory.createHandler(jsonReq.type, this.socket);
    handler.handle(jsonReq);
  }
}

export default RequestHandlerManager;
