import { useState } from "react";
import { Socket } from "socket.io-client";
import "./Messaging.css";

const MESSAGES_PRESETS = [
  "Regardez bien les murs.",
  "Il vous reste 10 minutes.",
  "Indice : Utilisez la lumière UV.",
  "Code incorrect. Réessayez.",
  "Attention : Oxygène faible.",
  "Ceci est un message du Gamemaster.",
];

interface MessagingPanelProps {
  socket: Socket;
}

export default function MessagingPanel({ socket }: MessagingPanelProps) {
  const [customText, setCustomText] = useState("");
  const [lastSent, setLastSent] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Emit to server -> Broadcasts to all screens
    socket.emit("admin:message", { text });

    setLastSent(text);
    setTimeout(() => setLastSent(null), 3000);
  };

  const toggleRecording = () => {
    if (isRecording) {
      socket.emit("admin:record_stop");
      setIsRecording(false);
    } else {
      socket.emit("admin:record_start");
      setIsRecording(true);
    }
  };

  return (
    <div className="messaging-container">
      <div className="crt-overlay"></div>

      <header className="msg-header">
        <div className="header-title">MESSAGERIE GÉNÉRALE</div>
        <div style={{ fontSize: "0.7rem", opacity: 0.7, letterSpacing: "2px" }}>
          BROADCAST: ALL SCREENS
        </div>
      </header>

      <div className="msg-grid">
        {/* LEFT: PRESETS */}
        <div className="panel">
          <div className="panel-header">MESSAGES PRÉDÉFINIS</div>
          <div className="scrollable-content">
            {MESSAGES_PRESETS.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(msg)}
                className="msg-item"
              >
                <span style={{ fontWeight: "bold", color: "#fff" }}>
                  MESSAGE {idx + 1}
                </span>
                <div
                  style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "5px" }}
                >
                  "{msg}"
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: CUSTOM MESSAGE & MIC */}
        <div className="panel" style={{ borderRight: "none" }}>
          <div className="panel-header">COMMANDES</div>
          <div
            className="scrollable-content"
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            {/* TEXT INPUT */}
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  marginBottom: "5px",
                  letterSpacing: "2px",
                }}
              >
                ENVOI MANUEL
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="message-box"
                  placeholder="Message à afficher sur tous les écrans..."
                  style={{ height: "80px" }}
                />
                <button
                  onClick={() => {
                    sendMessage(customText);
                    setCustomText("");
                  }}
                  className="msg-btn"
                  style={{ height: "auto" }}
                >
                  ENVOYER
                </button>
              </div>
              {lastSent && (
                <div
                  style={{
                    color: "#00ff00",
                    fontSize: "0.8rem",
                    marginTop: "5px",
                  }}
                >
                  ✓ Envoyé aux écrans : "{lastSent}"
                </div>
              )}
            </div>

            <div
              style={{
                height: "1px",
                background: "var(--color-primary)",
                opacity: 0.3,
              }}
            ></div>

            {/* RECORDING CONTROLS */}
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  marginBottom: "15px",
                  letterSpacing: "2px",
                }}
              >
                MICROPHONE SALLE
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  background: "rgba(0,0,0,0.3)",
                  padding: "20px",
                  border: "1px dashed var(--color-primary)",
                }}
              >
                <button
                  onClick={toggleRecording}
                  className="msg-btn"
                  style={{
                    backgroundColor: isRecording
                      ? "var(--color-primary)"
                      : "transparent",
                    color: isRecording ? "#000" : "var(--color-primary)",
                    flexGrow: 1,
                  }}
                >
                  {isRecording
                    ? "⏹ STOP ENREGISTREMENT"
                    : "⏺ START ENREGISTREMENT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
