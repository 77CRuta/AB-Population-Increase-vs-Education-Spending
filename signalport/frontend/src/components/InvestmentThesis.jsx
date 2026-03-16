import { SIGNAL_COLORS } from "../utils/constants";

export default function InvestmentThesis({ thesis }) {
  if (!thesis) return null;

  const signal = thesis.signal?.toUpperCase() ?? "HOLD";
  const signalKey = signal.toLowerCase();

  return (
    <div>
      <h2>Investment Thesis</h2>

      <div style={{ marginBottom: "0.75rem" }}>
        <span
          className={`signal-badge signal-${signalKey}`}
          style={{
            display: "inline-block",
            padding: "0.15rem 0.6rem",
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--bg-base)",
            background: SIGNAL_COLORS[signalKey] ?? SIGNAL_COLORS.hold,
          }}
        >
          {signal}
        </span>
      </div>

      {thesis.headline && (
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          fontStyle: "italic",
          marginBottom: "1rem",
          lineHeight: 1.6,
        }}>
          {thesis.headline}
        </p>
      )}

      <div className="thesis-columns" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
        marginBottom: "1rem",
      }}>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--signal-positive)", marginBottom: "0.5rem" }}>
            Bull Case
          </div>
          <ul style={{ paddingLeft: "1rem", fontSize: "0.8rem", lineHeight: 1.8 }}>
            {thesis.bull_points?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--signal-negative)", marginBottom: "0.5rem" }}>
            Bear Case
          </div>
          <ul style={{ paddingLeft: "1rem", fontSize: "0.8rem", lineHeight: 1.8 }}>
            {thesis.bear_points?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {thesis.catalysts?.length > 0 && (
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, marginBottom: "0.5rem" }}>
            Catalysts
          </div>
          <ul style={{ paddingLeft: "1rem", fontSize: "0.8rem", lineHeight: 1.8 }}>
            {thesis.catalysts.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
