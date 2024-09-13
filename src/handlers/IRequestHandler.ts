export interface BaseRequestHandler {
  handleRequest(req: string): void;
}

export type MessageHandler = (message: string) => void;
export type OnMessage = (handler: MessageHandler) => void;
export type Send = (message: string) => void;