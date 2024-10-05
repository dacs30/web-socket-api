import { IMessageHandler, IMessageSender } from "../interfaces";

class DefaultMessageHandler implements IMessageHandler {
  private sender: IMessageSender;

  constructor(sender: IMessageSender) {
    this.sender = sender;
  }

  handle(message: any): void {
    this.sender.send("Unknown message type");
  }
}

export { DefaultMessageHandler };
