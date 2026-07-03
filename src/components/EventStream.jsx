import { useEffect, useState } from "react";

export default function EventStream() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prev => [
        {
          id: crypto.randomUUID(),
          ts: new Date().toISOString(),
          type: "EVENT",
          name: "kernel_tick",
          payload: { status: "alive" }
        },
        ...prev
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live AEOS Events</h2>

      {events.map(e => (
        <div key={e.id} style={{ border: "1px solid #333", margin: 8, padding: 8 }}>
          <div>{e.type} — {e.name}</div>
          <pre>{JSON.stringify(e.payload, null, 2)}</pre>
          <small>{e.ts}</small>
        </div>
      ))}
    </div>
  );
}
