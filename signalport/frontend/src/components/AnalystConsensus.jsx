import { formatCurrency, formatPercent } from "../utils/format";

const REC_COLORS = {
  strong_buy: "var(--signal-positive)",
  buy: "var(--signal-positive)",
  hold: "var(--signal-neutral)",
  underperform: "var(--signal-negative)",
  sell: "var(--signal-negative)",
};

function RecommendationBadge({ recKey }) {
  if (!recKey) return null;
  const label = recKey.toUpperCase().replace("_", " ");
  const bg = REC_COLORS[recKey] || "var(--muted)";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.6rem",
        fontSize: "0.68rem",
        fontWeight: 500,
        letterSpacing: "0.05em",
        color: "var(--bg-base)",
        background: bg,
      }}
    >
      {label}
    </span>
  );
}

function TargetRangeBar({ low, mean, high, current }) {
  if (!low || !high || high <= low) return null;

  const range = high - low;
  const currentPct = Math.min(Math.max(((current - low) / range) * 100, 0), 100);
  const meanPct = Math.min(Math.max(((mean - low) / range) * 100, 0), 100);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.35rem" }}>
        Analyst Target Range
      </div>
      <div className="range-bar">
        <div
          className="range-marker"
          style={{ left: `${currentPct}%` }}
          title={`Current: ${formatCurrency(current)}`}
        >
          <div style={{ width: "2px", height: "14px", background: "var(--text-body)" }} />
          <span style={{ fontSize: "0.6rem", position: "absolute", top: "16px", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
            Current
          </span>
        </div>
        {mean && (
          <div
            className="range-marker"
            style={{ left: `${meanPct}%` }}
            title={`Mean Target: ${formatCurrency(mean)}`}
          >
            <div style={{ width: "2px", height: "14px", background: "var(--accent-green)", opacity: 0.7 }} />
            <span style={{ fontSize: "0.6rem", position: "absolute", top: "-14px", transform: "translateX(-50%)", whiteSpace: "nowrap", color: "var(--accent-green)" }}>
              Target
            </span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--muted)", marginTop: "1.25rem" }}>
        <span>{formatCurrency(low)}</span>
        <span>{formatCurrency(high)}</span>
      </div>
    </div>
  );
}

export default function AnalystConsensus({ analyst, dcf }) {
  if (!analyst) return null;

  const upside =
    analyst.target_mean_price && dcf?.current_price
      ? ((analyst.target_mean_price - dcf.current_price) / dcf.current_price) * 100
      : null;

  return (
    <div>
      <h2>Analyst Consensus</h2>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
        <RecommendationBadge recKey={analyst.recommendation_key} />
        {analyst.number_of_analysts > 0 && (
          <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
            {analyst.number_of_analysts} analyst{analyst.number_of_analysts !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <TargetRangeBar
        low={analyst.target_low_price}
        mean={analyst.target_mean_price}
        high={analyst.target_high_price}
        current={dcf?.current_price || 0}
      />

      <div className="metrics-grid" style={{ marginBottom: "1.25rem" }}>
        <div className="metric-item">
          <div className="metric-label">Mean Target</div>
          <div className="metric-value">
            {formatCurrency(analyst.target_mean_price)}
            {upside != null && (
              <span style={{ fontSize: "0.72rem", marginLeft: "0.5rem", color: upside >= 0 ? "var(--signal-positive)" : "var(--signal-negative)" }}>
                {formatPercent(upside)}
              </span>
            )}
          </div>
        </div>
        {dcf && (
          <div className="metric-item">
            <div className="metric-label">DCF Intrinsic Value</div>
            <div className="metric-value">
              {formatCurrency(dcf.intrinsic_value_per_share)}
            </div>
          </div>
        )}
        <div className="metric-item">
          <div className="metric-label">Forward EPS</div>
          <div className="metric-value">{analyst.forward_eps != null ? `$${analyst.forward_eps.toFixed(2)}` : "\u2014"}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Trailing EPS</div>
          <div className="metric-value">{analyst.trailing_eps != null ? `$${analyst.trailing_eps.toFixed(2)}` : "\u2014"}</div>
        </div>
        {analyst.earnings_growth != null && (
          <div className="metric-item">
            <div className="metric-label">Earnings Growth (fwd)</div>
            <div className="metric-value">{formatPercent(analyst.earnings_growth * 100)}</div>
          </div>
        )}
        {analyst.revenue_growth != null && (
          <div className="metric-item">
            <div className="metric-label">Revenue Growth (fwd)</div>
            <div className="metric-value">{formatPercent(analyst.revenue_growth * 100)}</div>
          </div>
        )}
      </div>

      {analyst.recent_upgrades && analyst.recent_upgrades.length > 0 && (
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
            Recent Rating Changes
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Firm</th>
                <th>Action</th>
                <th>To Grade</th>
              </tr>
            </thead>
            <tbody>
              {analyst.recent_upgrades.map((u, i) => (
                <tr key={i}>
                  <td>{u.date || "\u2014"}</td>
                  <td>{u.firm || "\u2014"}</td>
                  <td>{u.action || "\u2014"}</td>
                  <td>{u.to_grade || "\u2014"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
