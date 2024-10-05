export interface IMessageSender {
  send(data: string): void;
}

export interface IMessageHandler {
  handle(message: any): void;
}
