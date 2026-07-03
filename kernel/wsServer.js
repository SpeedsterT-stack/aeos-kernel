import { WebSocketServer } from "ws";

let clients = [];

export function startWSServer(port = 8080) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    clients.push(ws);

    ws.on("close", () => {
      clients = clients.filter(c => c !== ws);
    });
  });

  console.log("📡 AEOS WS Server running on port", port);
}

export function broadcast(event) {
  const msg = JSON.stringify(event);

  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(msg);
    }
  }
}
