import { IMessageHandler, IMessageSender } from "../interfaces";

class SystemMessageHandler implements IMessageHandler {
  private sender: IMessageSender;

  constructor(sender: IMessageSender) {
    this.sender = sender;
  }

  handle(message: any): void {
    this.sender.send(
      JSON.stringify({
        type: "system_message",
        message: "System message received",
      })
    );
  }
}

export { SystemMessageHandler };