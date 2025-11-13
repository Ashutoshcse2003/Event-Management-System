const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getEvents() {
  const res = await fetch(`${BASE}/api/events`);
  if (!res.ok) throw new Error("Failed to load events");
  const data = await res.json();
  return data.events || [];
}

export async function registerForEvent(eventId, payload) {
  const res = await fetch(`${BASE}/api/events/${eventId}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
}

export async function getParticipants(eventId) {
  const res = await fetch(`${BASE}/api/events/${eventId}/participants`);
  if (!res.ok) throw new Error("Failed to load participants");
  return res.json();
}
