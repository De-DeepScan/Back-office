import { useEffect, useRef } from "react";

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: "connection" | "action" | "error" | "state_change" | "audio";
  message: string;
  gameId?: string;
  status?: "success" | "error" | "info";
}

interface EventTimelineProps {
  events: TimelineEvent[];
}

export function EventTimeline({ events }: EventTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new event
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getStatusIcon = (event: TimelineEvent) => {
    if (event.status === "success") return "✓";
    if (event.status === "error") return "✕";
    return "●";
  };

  const getStatusClass = (event: TimelineEvent) => {
    if (event.status === "success") return "success";
    if (event.status === "error") return "error";
    if (event.type === "connection") return "connection";
    if (event.type === "audio") return "audio";
    return "info";
  };

  return (
    <aside className="event-timeline">
      <header className="timeline-header">
        <h2 className="timeline-title">Timeline / Events</h2>
        <svg viewBox="0 0 200 180" className="aria-logo-mini">
          <path
            d="M 35 110 L 30 35 L 65 75 Q 100 55, 135 75 L 170 35 L 165 110 C 175 140, 145 175, 100 175 C 55 175, 25 140, 35 110 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 55 115 Q 65 100, 100 85 Q 135 100, 145 115 Q 135 130, 100 145 Q 65 130, 55 115 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="100"
            y1="95"
            x2="100"
            y2="135"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="logo-pupil"
          />
          <line
            x1="0"
            y1="100"
            x2="45"
            y2="115"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="-5"
            y1="120"
            x2="45"
            y2="125"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="0"
            y1="140"
            x2="45"
            y2="135"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="155"
            y1="115"
            x2="200"
            y2="100"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="155"
            y1="125"
            x2="205"
            y2="120"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="155"
            y1="135"
            x2="200"
            y2="140"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </header>
      <div className="timeline-events" ref={scrollRef}>
        {events.length === 0 ? (
          <div className="timeline-empty">
            <span className="empty-message">En attente d'événements...</span>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`timeline-event ${getStatusClass(event)}`}
            >
              <span className="event-time">{formatTime(event.timestamp)}</span>
              <span className="event-icon">{getStatusIcon(event)}</span>
              <span className="event-message">{event.message}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
