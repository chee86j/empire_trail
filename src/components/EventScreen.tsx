import React from "react";
import { Event, events } from "../assets/gameData";

interface Props {
  event: Event | null;
  onClose: () => void;
}

const EventScreen: React.FC<Props> = ({ event, onClose }) => {
  if (!event) {
    return null;
  }

  return (
    <div className="screen">
      <h2>Event</h2>
      <p>
        {event.type}: {event.description}
      </p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default EventScreen;
