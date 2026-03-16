import { formatPercent, formatCurrency } from "../utils/format";

export default function ScenarioAnalysis({ scenarioAnalysis }) {
  if (!scenarioAnalysis) return null;

  const { bull, base, bear, expected_value, expected_upside_pct } = scenarioAnalysis;

  const cases = [
    { data: bull, color: "var(--signal-positive)", bg: "rgba(61, 220, 61, 0.06)" },
    { data: base, color: "var(--text-body)", bg: "var(--bg-surface-alt)" },
    { data: bear, color: "var(--signal-negative)", bg: "rgba(225, 112, 85, 0.06)" },
  ];

  return (
    <div>
      <h2>Scenario Analysis</h2>
      <div className="card">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          {cases.map(({ data, color, bg }) => (
            <div key={data.label} style={{
              padding: "0.75rem",
              background: bg,
              borderTop: `3px solid ${color}`,
            }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 500, color, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {data.label}
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.35rem" }}>
                {formatCurrency(data.intrinsic_value)}
              </div>
              <div style={{ fontSize: "0.72rem", color: data.upside_pct >= 0 ? "var(--signal-positive)" : "var(--signal-negative)" }}>
                {data.upside_pct >= 0 ? "+" : ""}{formatPercent(data.upside_pct * 100)} upside
              </div>
              <div style={{ marginTop: "0.5rem", fontSize: "0.68rem", color: "var(--muted)" }}>
                Growth: {formatPercent(data.growth_rate * 100)}<br />
                WACC: {formatPercent(data.discount_rate * 100)}
              </div>
            </div>
          ))}
        </div>

        {/* Expected value bar */}
        <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-surface-alt)", borderTop: "1px solid var(--accent-green-dim)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
              Expected Value (25/50/25 weighted)
            </span>
            <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>
              {formatCurrency(expected_value)}
              <span style={{ fontSize: "0.72rem", color: expected_upside_pct >= 0 ? "var(--signal-positive)" : "var(--signal-negative)", marginLeft: "0.5rem" }}>
                {expected_upside_pct >= 0 ? "+" : ""}{formatPercent(expected_upside_pct * 100)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
