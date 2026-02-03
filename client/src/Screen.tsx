import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Screen.css";

// Point this to your SERVER PC's IP Address later.
// For now, if testing on the same machine, localhost is fine.
const SOCKET_URL = "http://10.14.73.192:3000";

export default function Screen() {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ready, setReady] = useState(false); // To handle "Click to Start" (Audio policy)

  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Connect to Socket
    const socket = io(SOCKET_URL);

    // 2. Identify as the screen
    socket.emit("register:screen");

    // 3. Listen for Messages
    socket.on(
      "screen:display_message",
      (data: { text: string; duration: number; playSound: boolean }) => {
        setMessage(data.text);
        setIsVisible(true);

        // Play Beep
        if (data.playSound && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current
            .play()
            .catch((e) => console.error("Audio blocked:", e));
        }

        // Hide after duration (default 10s)
        setTimeout(
          () => {
            setIsVisible(false);
            setMessage(null);
          },
          (data.duration || 10) * 1000
        );
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  // Browsers block sound until you click the page at least once.
  if (!ready) {
    return (
      <div className="click-to-start" onClick={() => setReady(true)}>
        <h1>CLIQUEZ POUR INITIALISER L'ÉCRAN</h1>
        <p>(Nécessaire pour le son)</p>
      </div>
    );
  }

  return (
    <div className={`screen-container ${isVisible ? "active" : ""}`}>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/presets/beep.mp3" />

      {/* The Message Box */}
      {isVisible && (
        <div className="message-popup">
          <div className="popup-header">MESSAGE ENTRANT</div>
          <div className="popup-content">{message}</div>
          <div className="popup-footer">FIN DE TRANSMISSION...</div>
        </div>
      )}
    </div>
  );
}
