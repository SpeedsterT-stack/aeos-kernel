export function connectEventStream(onEvent) {
  // simpele mock stream (later WebSocket / SSE)
  const interval = setInterval(() => {
    onEvent({
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      type: "EVENT",
      name: "heartbeat",
      payload: { status: "alive" }
    });
  }, 2000);

  return () => clearInterval(interval);
}
