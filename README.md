# WebSocket Server API

A WebSocket API can be very useful for real-time connection applications and chat apps. More recently, with the giant flow of apps using LLM tools, it has become unviable to use classical HTTP APIs to run those LLM services.
With that said, this code serves as a basis for developers to create their own intelligent service provider.

## How to use

### 1. Install the dependencies

```bash
npm install
```

### 2. Run the server

```bash
npm start
```
_run from the root directory_

### 3. Connect to the server

```javascript
const ws = new WebSocket('ws://localhost:8080');
```

## General structure

```mermaid
sequenceDiagram
    participant Client
    participant HTTPServer
    participant WebSocketServer
    participant RequestHandler

    Client->>HTTPServer: GET /get-token?username=user1
    HTTPServer-->>Client: 200 OK { token: "JWT" }

    Client->>WebSocketServer: WebSocket Connection with JWT
    WebSocketServer->>WebSocketServer: Verify JWT
    WebSocketServer-->>Client: Connection Established

    WebSocketServer->>RequestHandler: Instantiate RequestHandler(ws)
    RequestHandler->>WebSocketServer: Add Event Listeners

    Client->>RequestHandler: Send Message
    RequestHandler->>RequestHandler: handleMessage(event.data)
    RequestHandler->>Client: Echo: {message}

    Client->>WebSocketServer: Close Connection
    WebSocketServer->>RequestHandler: Trigger Close Event
    RequestHandler->>RequestHandler: Log "Client disconnected"
```

You can modify the `RequestHandler` class to handle the messages as you wish. Or even turn that into a factory to instantiate different handlers for different types of clients.
