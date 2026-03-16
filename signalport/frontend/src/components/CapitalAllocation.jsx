import { formatPercent } from "../utils/format";
import { RISK_COLORS } from "../utils/constants";

export default function CapitalAllocation({ capitalAllocation }) {
  if (!capitalAllocation) return null;

  const { fiscal_years, dividend_pct_of_fcf, buyback_pct_of_fcf, retained_pct_of_fcf, avg_shareholder_return_pct, capital_allocation_grade } = capitalAllocation;

  const gradeColors = {
    excellent: RISK_COLORS.low,
    good: "#55efc4",
    fair: RISK_COLORS.moderate,
    poor: RISK_COLORS.high,
  };

  return (
    <div>
      <h2>Capital Allocation</h2>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            Avg shareholder return: {formatPercent(avg_shareholder_return_pct * 100)}
          </span>
          <span style={{
            display: "inline-block",
            padding: "0.15rem 0.5rem",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: gradeColors[capital_allocation_grade] || "var(--muted)",
            border: `1px solid ${gradeColors[capital_allocation_grade] || "var(--accent-green-dim)"}`,
          }}>
            {capital_allocation_grade}
          </span>
        </div>

        {/* Stacked bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {fiscal_years.map((year, i) => {
            const div = dividend_pct_of_fcf[i] || 0;
            const bb = buyback_pct_of_fcf[i] || 0;
            const ret = retained_pct_of_fcf[i] || 0;
            const total = div + bb + ret;
            if (total === 0) return null;

            return (
              <div key={year} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.68rem", color: "var(--muted)", width: "32px", textAlign: "right" }}>{year}</span>
                <div style={{ flex: 1, display: "flex", height: "16px", background: "var(--bg-surface-alt)" }}>
                  {div > 0 && (
                    <div style={{ width: `${(div / total) * 100}%`, background: "var(--signal-positive)", opacity: 0.7 }} title={`Dividends: ${(div * 100).toFixed(0)}%`} />
                  )}
                  {bb > 0 && (
                    <div style={{ width: `${(bb / total) * 100}%`, background: "var(--chip-cyan)", opacity: 0.7 }} title={`Buybacks: ${(bb * 100).toFixed(0)}%`} />
                  )}
                  {ret > 0 && (
                    <div style={{ width: `${(ret / total) * 100}%`, background: "var(--bg-surface-alt)" }} title={`Retained: ${(ret * 100).toFixed(0)}%`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", fontSize: "0.68rem", color: "var(--muted)" }}>
          <span><span style={{ display: "inline-block", width: "8px", height: "8px", background: "var(--signal-positive)", opacity: 0.7, marginRight: "0.3rem" }}></span>Dividends</span>
          <span><span style={{ display: "inline-block", width: "8px", height: "8px", background: "var(--chip-cyan)", opacity: 0.7, marginRight: "0.3rem" }}></span>Buybacks</span>
          <span><span style={{ display: "inline-block", width: "8px", height: "8px", background: "var(--bg-surface-alt)", marginRight: "0.3rem" }}></span>Retained</span>
        </div>
      </div>
    </div>
  );
}
