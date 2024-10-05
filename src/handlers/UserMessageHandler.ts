import { IMessageHandler, IMessageSender } from "../interfaces";

class UserMessageHandler implements IMessageHandler {
  private sender: IMessageSender;

  constructor(sender: IMessageSender) {
    this.sender = sender;
  }

  handle(message: any): void {
    this.sender.send(
      JSON.stringify({ type: "user_message", message: "User message received" })
    );
  }
}

export { UserMessageHandler };
