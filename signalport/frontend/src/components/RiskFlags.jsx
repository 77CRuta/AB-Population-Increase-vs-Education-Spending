import { RISK_COLORS } from "../utils/constants";

export default function RiskFlags({ riskAnalysis }) {
  if (!riskAnalysis) return null;

  const { red_flags, flag_count_warning, flag_count_critical, overall_risk_level } = riskAnalysis;

  return (
    <div>
      <h2>Risk Analysis</h2>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span className="risk-badge" style={{
            display: "inline-block",
            padding: "0.15rem 0.6rem",
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--bg-base)",
            background: RISK_COLORS[overall_risk_level] || "var(--text-muted)",
          }}>
            {overall_risk_level} risk
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
            {flag_count_critical} critical &middot; {flag_count_warning} warning
          </span>
        </div>

        {red_flags.length === 0 ? (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)" }}>
            No red flags detected. Company passes all quantitative risk checks.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {red_flags.map((flag, i) => (
              <div key={i} style={{
                padding: "0.5rem 0.75rem",
                background: flag.severity === "critical" ? "rgba(225, 112, 85, 0.06)" : "rgba(212, 184, 92, 0.06)",
                borderLeft: `3px solid ${flag.severity === "critical" ? "var(--signal-negative)" : "var(--signal-neutral)"}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 500 }}>{flag.title}</span>
                  <span className={flag.severity === "critical" ? "gate-fail" : "z-badge z-badge-grey"}>
                    {flag.severity}
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.2rem" }}>
                  {flag.detail}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
