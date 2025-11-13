import React from "react";

export default function EventCard({ event }) {
  return (
    <article className="card">
      <h4>{event.title}</h4>
      <p className="meta">
        {event.category} • {event.date} • {event.venue}
      </p>
    </article>
  );
}
