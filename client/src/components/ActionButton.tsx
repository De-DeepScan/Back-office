import { useState, useRef, useEffect } from "react";
import {
  Play,
  MonitorPlay,
  Square,
  RotateCcw,
  Plus,
  Minus,
  FastForward,
  Lightbulb,
  BotOff,
  Bot,
  Flame,
  Shield,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle,
  Key,
  Loader2,
  Check,
  X,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ActionStatus = "idle" | "loading" | "success" | "error";
type ActionVariant = "primary" | "success" | "danger" | "warning";

interface GameAction {
  id: string;
  label: string;
  params?: string[];
}

interface ActionButtonProps {
  action: GameAction;
  variant: ActionVariant;
  status: ActionStatus;
  onClick: (params?: Record<string, unknown>) => void;
  disabled?: boolean;
}

// Icon mapping
const ACTION_ICONS: Record<string, LucideIcon> = {
  start: Play,
  start_screen: MonitorPlay,
  stop: Square,
  reset: RotateCcw,
  add_points: Plus,
  remove_points: Minus,
  skip_phase: FastForward,
  hint: Lightbulb,
  disable_ai: BotOff,
  enable_ai: Bot,
  enable_evil: Flame,
  disable_evil: Shield,
  enable_speaking: Volume2,
  disable_speaking: VolumeX,
  enable_dilemma: AlertTriangle,
  disable_dilemma: CheckCircle,
  set_code: Key,
};

export function ActionButton({
  action,
  variant,
  status,
  onClick,
  disabled,
}: ActionButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const Icon = ACTION_ICONS[action.id] || Play;

  const handleClick = () => {
    if (disabled || status === "loading") return;

    // If action has params and it's "hint", show menu
    if (action.params && action.params.length > 0 && action.id === "hint") {
      setMenuOpen(!menuOpen);
    } else if (action.params && action.params.length > 0) {
      // For other params (like set_code), use prompt
      const payload: Record<string, unknown> = {};
      for (const param of action.params) {
        const value = window.prompt(`Valeur pour "${param}" :`);
        if (value === null) return; // cancelled
        payload[param] = value;
      }
      onClick(payload);
    } else {
      // No params, direct click
      onClick();
    }
  };

  const handleParamSelect = (paramValue: string) => {
    setMenuOpen(false);
    // For hint, the param is "level"
    onClick({ level: paramValue });
  };

  const showChevron =
    action.params && action.params.length > 0 && action.id === "hint";

  return (
    <div className="action-button-wrapper" ref={menuRef}>
      <button
        className={`action-button ${variant} ${status}`}
        onClick={handleClick}
        disabled={disabled || status === "loading"}
      >
        {status === "loading" ? (
          <Loader2 className="action-icon spinning" size={20} />
        ) : (
          <Icon className="action-icon" size={20} />
        )}
        <span className="action-label">{action.label}</span>
        {showChevron && <ChevronDown className="chevron-icon" size={16} />}
        {status === "success" && (
          <Check className="feedback-icon success" size={16} />
        )}
        {status === "error" && <X className="feedback-icon error" size={16} />}
      </button>

      {/* Dropdown menu for hint levels */}
      {menuOpen && action.id === "hint" && (
        <div className="param-menu">
          <button
            className="param-option"
            onClick={() => handleParamSelect("1")}
          >
            Level 1
          </button>
          <button
            className="param-option"
            onClick={() => handleParamSelect("2")}
          >
            Level 2
          </button>
          <button
            className="param-option"
            onClick={() => handleParamSelect("3")}
          >
            Level 3
          </button>
        </div>
      )}
    </div>
  );
}
