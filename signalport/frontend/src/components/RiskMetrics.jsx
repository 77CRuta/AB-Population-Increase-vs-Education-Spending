import { formatPercent } from "../utils/format";
import { RISK_COLORS } from "../utils/constants";

export default function RiskMetrics({ riskMetrics }) {
  if (!riskMetrics) return null;

  return (
    <div>
      <h2>Risk Metrics</h2>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Volatility Classification</span>
          <span style={{
            display: "inline-block",
            padding: "0.15rem 0.6rem",
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--bg-base)",
            background: RISK_COLORS[riskMetrics.risk_classification] || "var(--text-muted)",
          }}>
            {riskMetrics.risk_classification.replace("_", " ")}
          </span>
        </div>

        <div className="metrics-grid">
          {riskMetrics.beta != null && (
            <div className="metric-item">
              <div className="metric-label">Beta</div>
              <div className="metric-value">{riskMetrics.beta.toFixed(2)}</div>
            </div>
          )}
          {riskMetrics.annualized_volatility != null && (
            <div className="metric-item">
              <div className="metric-label">Ann. Volatility</div>
              <div className="metric-value">{formatPercent(riskMetrics.annualized_volatility * 100)}</div>
            </div>
          )}
          {riskMetrics.max_drawdown_1yr != null && (
            <div className="metric-item">
              <div className="metric-label">Max Drawdown (1yr)</div>
              <div className="metric-value" style={{ color: "var(--signal-negative)" }}>-{formatPercent(riskMetrics.max_drawdown_1yr * 100)}</div>
            </div>
          )}
          {riskMetrics.sharpe_ratio_approx != null && (
            <div className="metric-item">
              <div className="metric-label">Sharpe Ratio</div>
              <div className="metric-value">{riskMetrics.sharpe_ratio_approx.toFixed(2)}</div>
            </div>
          )}
          {riskMetrics.downside_deviation != null && (
            <div className="metric-item">
              <div className="metric-label">Downside Dev.</div>
              <div className="metric-value">{formatPercent(riskMetrics.downside_deviation * 100)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
