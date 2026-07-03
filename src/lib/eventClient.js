export function connectEventStream(onEvent) {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onmessage = (msg) => {
    const event = JSON.parse(msg.data);
    onEvent(event);
  };

  return () => ws.close();
}
