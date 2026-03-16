import { formatPercent } from "../utils/format";

export default function DividendHealth({ dividendAnalysis }) {
  if (!dividendAnalysis) return null;

  const { sustainability_score, sustainability_assessment, current_yield, payout_ratio, fcf_payout_ratio, years_of_growth, dividend_cagr_3yr } = dividendAnalysis;

  return (
    <div>
      <h2>Dividend Health</h2>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Sustainability Score</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>{sustainability_score}/10</div>
          </div>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            border: `3px solid ${sustainability_score >= 7 ? "var(--signal-positive)" : sustainability_score >= 5 ? "var(--signal-neutral)" : "var(--signal-negative)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.88rem", fontWeight: 500,
          }}>
            {sustainability_score}
          </div>
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.75rem" }}>
          {sustainability_assessment}
        </p>

        <div className="metrics-grid">
          {current_yield != null && (
            <div className="metric-item">
              <div className="metric-label">Current Yield</div>
              <div className="metric-value">{formatPercent(current_yield * 100)}</div>
            </div>
          )}
          {payout_ratio != null && (
            <div className="metric-item">
              <div className="metric-label">Payout Ratio</div>
              <div className="metric-value">{formatPercent(payout_ratio * 100)}</div>
            </div>
          )}
          {fcf_payout_ratio != null && (
            <div className="metric-item">
              <div className="metric-label">FCF Payout</div>
              <div className="metric-value">{formatPercent(fcf_payout_ratio * 100)}</div>
            </div>
          )}
          {dividend_cagr_3yr != null && (
            <div className="metric-item">
              <div className="metric-label">3yr CAGR</div>
              <div className="metric-value">{formatPercent(dividend_cagr_3yr * 100)}</div>
            </div>
          )}
          <div className="metric-item">
            <div className="metric-label">Growth Streak</div>
            <div className="metric-value">{years_of_growth} yr{years_of_growth !== 1 ? "s" : ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
