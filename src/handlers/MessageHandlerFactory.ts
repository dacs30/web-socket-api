import { IMessageHandler, IMessageSender } from "../interfaces";
import { DefaultMessageHandler } from "./DefaultMessageHandler";
import { PingMessageHandler } from "./PingMessageHandler";
import { SystemMessageHandler } from "./SystemMessageHandler";
import { UserMessageHandler } from "./UserMessageHandler";

class MessageHandlerFactory {
  private static userMessageHandler: IMessageHandler;
  private static systemMessageHandler: IMessageHandler;
  private static pingMessageHandler: IMessageHandler;
  private static defaultMessageHandler: IMessageHandler;

  /**
   * Creates a message handler based on the type of the message.
   *
   * - If the handler is stateful, the same instance is used for all messages of that type to track the state of requests.
   * - If the handler is stateless, a new instance should be created for each message.
   *
   * @param type - The type of the message to be handled.
   * @param sender - The WebSocket sender used to send messages.
   * @returns The message handler that will handle the message.
   */
  static createHandler(type: string, sender: IMessageSender): IMessageHandler {
    switch (type) {
      case "user_message":
        if (!this.userMessageHandler) {
          this.userMessageHandler = new UserMessageHandler(sender);
        }
        return this.userMessageHandler;
      case "system_message":
        if (!this.systemMessageHandler) {
          this.systemMessageHandler = new SystemMessageHandler(sender);
        }
        return this.systemMessageHandler;
      case "ping":
        if (!this.pingMessageHandler) {
          this.pingMessageHandler = new PingMessageHandler(sender);
        }
        return this.pingMessageHandler;
      default:
        if (!this.defaultMessageHandler) {
          this.defaultMessageHandler = new DefaultMessageHandler(sender);
        }
        return this.defaultMessageHandler;
    }
  }
}

export { MessageHandlerFactory };
