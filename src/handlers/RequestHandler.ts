import { BaseRequestHandler, OnMessage, Send } from "./IRequestHandler";

class RequestHandler implements BaseRequestHandler {
  private onMessage: OnMessage;
  private send: Send;

  constructor(onMessage: OnMessage, send: Send) {
    this.onMessage = onMessage;
    this.send = send;

    // Bind the handleMessage method to the current instance
    this.handleMessage = this.handleMessage.bind(this);

    // Attach the message handler
    this.onMessage(this.handleMessage);
  }

  handleRequest(req: string): void {
    throw new Error("Method not implemented");
  }

  handleMessage(req: string) {
    console.log(`Received: ${req}`);
    this.send(`Echo: ${req}`);
  }
}

export default RequestHandler;
