import express from "express";
import fs from "fs";

const app = express();
const PORT = 3333;

app.get("/health", (req, res) => {
  res.json({ status: "AEOS OK", time: new Date().toISOString() });
});

// simple log stream
app.get("/logs", (req, res) => {
  const logs = fs.existsSync("./aeos.log")
    ? fs.readFileSync("./aeos.log", "utf-8")
    : "";

  res.send(`
    <html>
      <body style="background:#0b0f14;color:#00ff9d;font-family:monospace">
        <h2>AEOS Observability</h2>
        <pre>${logs}</pre>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`📊 AEOS Dashboard running on http://localhost:${PORT}`);
});
