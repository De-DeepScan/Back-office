import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import {
  setupGamemaster,
  getConnectedGames,
  sendCommand,
} from "./socket/gamemaster.js";
import { setupAudioRelay } from "./socket/audio-relay.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e6,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use("/audio", express.static(path.join(__dirname, "audio")));

// List connected mini-games
app.get("/api/games", (_req, res) => {
  res.json(getConnectedGames());
});

// Send a command to a mini-game
app.post("/api/games/:gameId/command", (req, res) => {
  const { gameId } = req.params;
  const { action, payload } = req.body as {
    action: string;
    payload?: Record<string, unknown>;
  };
  const sent = sendCommand(io, gameId, action, payload);
  if (!sent) {
    res.status(404).json({ error: "Game not found" });
    return;
  }

  // Intercept enable_dilemma to pause Labyrinth
  if (gameId === "aria" && action === "enable_dilemma") {
    sendCommand(io, "labyrinthe:explorer", "dilemma_start", {});
    sendCommand(io, "labyrinthe:protector", "dilemma_start", {});
    console.log("[relay] Paused Labyrinth for dilemma");
  }

  // Intercept disable_dilemma to resume Labyrinth
  if (gameId === "aria" && action === "disable_dilemma") {
    sendCommand(io, "labyrinthe:explorer", "dilemma_end", {});
    sendCommand(io, "labyrinthe:protector", "dilemma_end", {});
    console.log("[relay] Resumed Labyrinth after dilemma disabled");
  }

  res.json({ ok: true });
});

setupGamemaster(io);
setupAudioRelay(io);

function getLocalIP(): string | null {
  const nets = networkInterfaces();
  for (const addrs of Object.values(nets)) {
    if (!addrs) continue;
    for (const addr of addrs) {
      if (addr.family === "IPv4" && !addr.internal) return addr.address;
    }
  }
  return null;
}

const PORT = 3000;
httpServer.listen(PORT, () => {
  const ip = getLocalIP();
  console.log(`[server] Backoffice running on http://localhost:${PORT}`);
  if (ip) {
    console.log(`[server] Réseau local : http://${ip}:${PORT}`);
  }
});
