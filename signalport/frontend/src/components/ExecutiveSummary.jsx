export default function ExecutiveSummary({ executiveSummary }) {
  if (!executiveSummary) return null;

  const { one_liner, signal, key_number, entry_guidance, top_risk, data_freshness } = executiveSummary;

  return (
    <div className="card" style={{ marginBottom: "1.5rem", borderLeft: "4px solid var(--accent-green)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <span className={`signal-badge signal-${signal.toLowerCase()}`}>{signal}</span>
        <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{data_freshness}</span>
      </div>

      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "1rem",
        fontStyle: "italic",
        lineHeight: 1.6,
        marginBottom: "0.75rem",
        color: "var(--text-body)",
      }}>
        {one_liner}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", fontSize: "0.75rem" }}>
        <div>
          <div style={{ color: "var(--muted)", marginBottom: "0.15rem" }}>Key Number</div>
          <div style={{ fontWeight: 500 }}>{key_number}</div>
        </div>
        <div>
          <div style={{ color: "var(--muted)", marginBottom: "0.15rem" }}>Entry Guidance</div>
          <div style={{ fontWeight: 500 }}>{entry_guidance}</div>
        </div>
        <div>
          <div style={{ color: "var(--muted)", marginBottom: "0.15rem" }}>Top Risk</div>
          <div style={{ fontWeight: 500, color: "var(--signal-negative)" }}>{top_risk}</div>
        </div>
      </div>
    </div>
  );
}
