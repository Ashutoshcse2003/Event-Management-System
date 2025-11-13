import React, { useState } from "react";

export default function GuestList() {
  const [guests, setGuests] = useState([{ id: "g1", name: "Bob" }]);

  function remove(id) {
    setGuests(guests.filter((g) => g.id !== id));
  }

  return (
    <div>
      <h2>Guest List</h2>
      <ul>
        {guests.map((g) => (
          <li key={g.id}>
            {g.name}{" "}
            <button onClick={() => remove(g.id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
