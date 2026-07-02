import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState({});

  async function fetchData() {
    const statusRes = await fetch("http://localhost:3333/status");
    const logRes = await fetch("http://localhost:3333/logs");
    const metricsRes = await fetch("http://localhost:3333/metrics");

    setStatus(await statusRes.json());
    setLogs((await logRes.json()).logs || []);
    setMetrics(await metricsRes.json());
  }

  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ fontFamily: "monospace", padding: 20, background: "#0b0f14", color: "#00ff9d", minHeight: "100vh" }}>
      
      <h1>🧠 AEOS CONTROL CENTER</h1>

      {/* STATUS CARD */}
      <div style={{ padding: 10, border: "1px solid #00ff9d", marginBottom: 20 }}>
        <h3>System Status</h3>
        <pre>{JSON.stringify(status, null, 2)}</pre>
      </div>

      {/* METRICS */}
      <div style={{ padding: 10, border: "1px solid #00ff9d", marginBottom: 20 }}>
        <h3>Metrics</h3>
        <pre>{JSON.stringify(metrics, null, 2)}</pre>
      </div>

      {/* LOG STREAM */}
      <div style={{ padding: 10, border: "1px solid #00ff9d" }}>
        <h3>Live AEOS Logs</h3>
        <div style={{ maxHeight: 400, overflow: "auto" }}>
          {logs.slice(-50).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
