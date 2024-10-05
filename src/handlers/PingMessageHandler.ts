import { IMessageHandler, IMessageSender } from "../interfaces";

class PingMessageHandler implements IMessageHandler {
  private sender: IMessageSender;

  constructor(sender: IMessageSender) {
    this.sender = sender;
  }

  handle(message: any): void {
    this.sender.send(JSON.stringify({ type: "pong", message: "Pong" }));
  }
}

export { PingMessageHandler };
