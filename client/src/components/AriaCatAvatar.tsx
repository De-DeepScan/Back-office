interface AriaCatAvatarProps {
  isEvil: boolean;
  isSpeaking: boolean;
}

export function AriaCatAvatar({ isEvil, isSpeaking }: AriaCatAvatarProps) {
  return (
    <div className={`aria-cat-avatar ${isEvil ? "evil" : ""}`}>
      <svg viewBox="0 0 200 180" className="aria-cat-mini">
        <path
          d={
            isEvil
              ? "M 35 110 L 15 55 L 55 80 Q 100 60, 145 80 L 185 55 L 165 110 C 175 140, 145 175, 100 175 C 55 175, 25 140, 35 110 Z"
              : "M 35 110 L 30 35 L 65 75 Q 100 55, 135 75 L 170 35 L 165 110 C 175 140, 145 175, 100 175 C 55 175, 25 140, 35 110 Z"
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cat-line"
        />
        <g className="eye-group">
          <path
            d={
              isEvil
                ? "M 50 115 Q 65 105, 100 100 Q 135 105, 150 115 Q 135 125, 100 130 Q 65 125, 50 115 Z"
                : "M 55 115 Q 65 100, 100 85 Q 135 100, 145 115 Q 135 130, 100 145 Q 65 130, 55 115 Z"
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="100"
            y1={isEvil ? 103 : 95}
            x2="100"
            y2={isEvil ? 127 : 135}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="eye-pupil"
          />
        </g>
        <line
          x1={isEvil ? -10 : 0}
          y1={isEvil ? 95 : 100}
          x2="45"
          y2="115"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="whisker"
        />
        <line
          x1={isEvil ? -15 : -5}
          y1="120"
          x2="45"
          y2={isEvil ? 120 : 125}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="whisker"
        />
        <line
          x1={isEvil ? -10 : 0}
          y1={isEvil ? 145 : 140}
          x2="45"
          y2="135"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="whisker"
        />
        <line
          x1="155"
          y1="115"
          x2={isEvil ? 210 : 200}
          y2={isEvil ? 95 : 100}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="whisker"
        />
        <line
          x1="155"
          y1={isEvil ? 120 : 125}
          x2={isEvil ? 215 : 205}
          y2="120"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="whisker"
        />
        <line
          x1="155"
          y1="135"
          x2={isEvil ? 210 : 200}
          y2={isEvil ? 145 : 140}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="whisker"
        />
      </svg>
      {isSpeaking && (
        <div className="speaking-indicator">
          <span className="sound-wave"></span>
          <span className="sound-wave"></span>
          <span className="sound-wave"></span>
        </div>
      )}
    </div>
  );
}
