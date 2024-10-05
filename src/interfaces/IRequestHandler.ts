import WebSocket from "ws";

export interface BaseRequestHandler {
  handleMessage(req: WebSocket.MessageEvent): void;
}

export type MessageHandler = (message: string) => void;
export type OnMessage = (handler: MessageHandler) => void;
export type Send = (message: string) => void;
