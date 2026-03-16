import { useState, useEffect } from "react";
import { fetchEarnings } from "../api";
import EarningsCalendar from "../components/EarningsCalendar";

export default function EarningsPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchEarnings(filter || undefined);
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filter]);

  return (
    <div>
      <h1>Earnings Calendar</h1>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {["", "upcoming", "reported"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              padding: "0.3rem 0.75rem",
              border: "1px solid var(--accent-green-dim)",
              background: filter === status ? "var(--bg-surface)" : "transparent",
              fontWeight: filter === status ? 500 : 300,
              cursor: "pointer",
              color: "var(--text-body)",
            }}
          >
            {status || "All"}
          </button>
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="loading">Error: {error}</div>}
      {!loading && !error && <EarningsCalendar events={events} />}
    </div>
  );
}
