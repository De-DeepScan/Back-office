import { useState, useEffect, useCallback } from "react";
import { socket } from "../socket";
import "./MusicWidget.css";

export function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onState = (data: { isPaused: boolean }) => {
      setIsPlaying(!data.isPaused);
    };
    socket.on("spotify:state", onState);
    return () => {
      socket.off("spotify:state", onState);
    };
  }, []);

  const toggleMusic = useCallback(() => {
    socket.emit("spotify:toggle", {});
  }, []);

  // Show opposite icon on hover (preview of action)
  const showPlayIcon = isHovered ? isPlaying : !isPlaying;

  return (
    <button
      className={`music-widget ${isPlaying ? "playing" : "paused"}`}
      onClick={toggleMusic}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isPlaying ? "Pause Musique" : "Play Musique"}
    >
      {/* Music note icon background */}
      <span className="music-widget-bg">
        <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </span>
      {showPlayIcon ? (
        // Play icon
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="music-widget-action"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : (
        // Pause icon
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="music-widget-action"
        >
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
      )}
    </button>
  );
}
