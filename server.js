const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

let clients = {};

wss.on("connection", ws => {
  const id = Math.random().toString(36).substring(2, 8);
  clients[id] = ws;

  ws.send(JSON.stringify({ type: "id", id }));

  ws.on("message", msg => {
    const data = JSON.parse(msg);
    const target = clients[data.target];
    if (target) target.send(JSON.stringify(data));
  });

  ws.on("close", () => delete clients[id]);
});

console.log("✅ Signalling server running on ws://localhost:3000");
