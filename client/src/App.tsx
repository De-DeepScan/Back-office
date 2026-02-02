import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000";
const GAME_ID = "game"; // ID du mini-jeu

type ActionStatus = "idle" | "loading" | "success" | "error";

interface GameAction {
  id: string;
  label: string;
  description: string;
  variant: "primary" | "danger" | "success" | "warning";
}

const GAME_ACTIONS: GameAction[] = [
  {
    id: "start",
    label: "Start",
    description: "Démarre la partie sur les deux écrans",
    variant: "success",
  },
  {
    id: "reset",
    label: "Reset",
    description: "Réinitialise complètement la partie",
    variant: "danger",
  },
  {
    id: "enable_ai",
    label: "Activer IA",
    description: "Active l'IA",
    variant: "primary",
  },
  {
    id: "disable_ai",
    label: "Désactiver IA",
    description: "Désactive l'IA (elle ne bouge plus)",
    variant: "warning",
  },
];

function App() {
  const [statuses, setStatuses] = useState<Record<string, ActionStatus>>({});
  const [lastAction, setLastAction] = useState<string | null>(null);

  const sendCommand = async (actionId: string) => {
    setStatuses((prev) => ({ ...prev, [actionId]: "loading" }));

    try {
      const response = await fetch(`${API_URL}/api/games/${GAME_ID}/command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionId, payload: {} }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatuses((prev) => ({ ...prev, [actionId]: "success" }));
      setLastAction(actionId);

      setTimeout(() => {
        setStatuses((prev) => ({ ...prev, [actionId]: "idle" }));
      }, 2000);
    } catch (error) {
      console.error(`Erreur commande ${actionId}:`, error);
      setStatuses((prev) => ({ ...prev, [actionId]: "error" }));

      setTimeout(() => {
        setStatuses((prev) => ({ ...prev, [actionId]: "idle" }));
      }, 3000);
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Gamemaster</h1>
        <p className="subtitle">Contrôle du jeu</p>
      </header>

      <main className="controls">
        <div className="button-grid">
          {GAME_ACTIONS.map((action) => {
            const status = statuses[action.id] || "idle";
            return (
              <button
                key={action.id}
                className={`control-btn ${action.variant} ${status}`}
                onClick={() => sendCommand(action.id)}
                disabled={status === "loading"}
                title={action.description}
              >
                <span className="btn-label">{action.label}</span>
                <span className="btn-description">{action.description}</span>
                {status === "loading" && <span className="spinner" />}
                {status === "success" && <span className="check">✓</span>}
                {status === "error" && <span className="error-icon">✗</span>}
              </button>
            );
          })}
        </div>
      </main>

      {lastAction && (
        <footer className="status-bar">
          Dernière action : <strong>{lastAction}</strong>
        </footer>
      )}
    </div>
  );
}

export default App;
