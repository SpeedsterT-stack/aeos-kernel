import express from "express";
import fs from "fs";

const app = express();
const PORT = 3333;

function readLogs() {
  try {
    return fs.readFileSync("./aeos.log", "utf-8").split("\n").slice(-200);
  } catch {
    return [];
  }
}

// SYSTEM STATUS
app.get("/status", (req, res) => {
  res.json({
    system: "AEOS",
    status: "online",
    time: new Date().toISOString(),
  });
});

// LOG STREAM
app.get("/logs", (req, res) => {
  res.json({
    logs: readLogs(),
  });
});

// SIMPLE METRICS
app.get("/metrics", (req, res) => {
  const logs = readLogs();

  res.json({
    totalEvents: logs.length,
    lastEvent: logs[logs.length - 1] || null,
  });
});

app.listen(PORT, () => {
  console.log(`📊 AEOS Control Center running on http://localhost:${PORT}`);
});
