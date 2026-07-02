import { useEffect, useState } from "react";
import { connectEventStream } from "../lib/eventClient";

export default function EventStream() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const disconnect = connectEventStream((event) => {
      setEvents((prev) => [event, ...prev]);
    });

    return () => disconnect();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2>🧠 AEOS Control Center</h2>

      <div>
        {events.map((e) => (
          <div key={e.id} style={{
            border: "1px solid #333",
            margin: "8px 0",
            padding: 10
          }}>
            <div>🟢 {e.type} - {e.name}</div>
            <pre>{JSON.stringify(e.payload, null, 2)}</pre>
            <small>{e.ts}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
