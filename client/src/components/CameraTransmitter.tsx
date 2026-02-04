import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

// 1. Define a "Shape" for the internal socket options to satisfy the linter
interface SocketManager {
  opts: {
    query: Record<string, string> | string;
  };
}

export function CameraTransmitter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | null>(null);

  const [status, setStatus] = useState("INITIALIZING...");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [isRebooting, setIsRebooting] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  // --- 1. SETUP & AUTO-START ---
  useEffect(() => {
    async function init() {
      try {
        // A. REGISTER AS CAMERA
        const params = new URLSearchParams(window.location.search);
        const name = params.get("name") || "Unknown Cam";

        // Update handshake query to identify as camera
        // FIX: Cast to 'unknown' then to our custom interface instead of 'any'
        (socket.io as unknown as SocketManager).opts.query = {
          type: "camera",
          name,
        };

        // Force reconnect to apply the new identity
        if (socket.connected) {
          socket.disconnect().connect();
        } else {
          socket.connect();
        }

        socket.on("connect", () =>
          setStatus("CONNECTED - WAITING FOR PERMISSION")
        );
        socket.on("disconnect", () => setStatus("DISCONNECTED"));

        // Listen for Reboot Command
        socket.on("cmd:reboot", () => {
          setStatus("⚠️ REBOOTING SYSTEM ⚠️");
          setIsRebooting(true);
          setTimeout(() => window.location.reload(), 2000);
        });

        // B. ATTEMPT AUTO-START (Ask Permission)
        await attemptAutoStart();
      } catch (err) {
        console.error(err); // Log the error so it counts as "used"
        setStatus("ERROR INITIALIZING");
      }
    }

    init();

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("cmd:reboot");
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  // --- 2. PERMISSION & STREAMING LOGIC ---

  async function attemptAutoStart() {
    try {
      // This line triggers the browser's "Allow Camera?" popup
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // If we get here, they clicked "Allow"!
      // We stop this temporary stream immediately.
      stream.getTracks().forEach((t) => t.stop());

      // Now we can list the real device names
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter((d) => d.kind === "videoinput");
      setDevices(videoDevices);

      if (videoDevices.length > 0) {
        setStatus("AUTO-STARTING...");
        // Automatically start the first camera found
        startStream(videoDevices[0].deviceId);
      } else {
        setStatus("NO CAMERAS FOUND");
      }
    } catch (err) {
      // Log error to satisfy linter
      console.log("Browser blocked auto-start. Waiting for user click.", err);
      setNeedsInteraction(true);
      setStatus("WAITING FOR PERMISSION");
    }
  }

  const startStream = async (deviceId: string) => {
    try {
      setStatus("STARTING STREAM...");

      // Get the live video stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId }, width: 320, height: 240 },
      });

      // Show it in the video tag (Preview)
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setStatus("BROADCASTING LIVE");

      // Start the transmission loop
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Clear any existing interval
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      // Store interval in ref
      intervalRef.current = window.setInterval(() => {
        if (!isRebooting && videoRef.current && ctx && socket.connected) {
          canvas.width = 320;
          canvas.height = 240;
          ctx.drawImage(videoRef.current, 0, 0, 320, 240);

          // Send frame to server
          const base64 = canvas.toDataURL("image/jpeg", 0.4);
          socket.emit("cam:frame", base64);
        }
      }, 150); // ~6 FPS
    } catch (e) {
      console.error(e); // Log error to satisfy linter
      setStatus("ERROR STARTING STREAM");
    }
  };

  // --- 3. RENDER ---

  if (isRebooting) {
    return <div style={styles.fullscreenAlert}>SYSTEM REBOOTING...</div>;
  }

  // If browser blocked auto-play, show a big button
  if (needsInteraction) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>/// SECURITY CHECK ///</h1>
        <button
          onClick={() => {
            setNeedsInteraction(false);
            attemptAutoStart();
          }}
          style={styles.bigButton}
        >
          CLICK TO ACTIVATE CAMERA
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>/// DEEPSCAN TRANSMITTER ///</h1>
      <h3 style={styles.status}>STATUS: {status}</h3>

      <select
        onChange={(e) => startStream(e.target.value)}
        style={styles.select}
      >
        {devices.map((d, i) => (
          <option key={d.deviceId} value={d.deviceId}>
            {d.label || `Camera Source ${i + 1}`}
          </option>
        ))}
      </select>

      <div style={styles.videoBox}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="320"
          style={styles.video}
        />
      </div>
    </div>
  );
}

// Simple styles object
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "2rem",
    height: "100vh",
    background: "black",
    color: "#00ffff",
    fontFamily: "monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    borderBottom: "1px solid #00ffff",
    paddingBottom: "1rem",
    width: "100%",
    textAlign: "center",
  },
  status: { marginBottom: "20px", color: "#0f0" },
  select: {
    padding: "10px",
    background: "#111",
    color: "#00ffff",
    border: "1px solid #00ffff",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
  },
  videoBox: {
    border: "2px solid #00ffff",
    display: "inline-block",
    background: "#000",
  },
  video: { display: "block", width: "100%", maxWidth: "640px" },
  fullscreenAlert: {
    height: "100vh",
    background: "red",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  bigButton: {
    padding: "2rem",
    fontSize: "1.5rem",
    background: "#00ffff",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20%",
  },
};
