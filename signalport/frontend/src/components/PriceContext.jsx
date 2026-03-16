import { formatCurrency } from "../utils/format";

function TrendBadge({ above }) {
  const color = above ? "var(--signal-positive)" : "var(--signal-negative)";
  const text = above ? "Above" : "Below";
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.6rem",
        fontWeight: 500,
        padding: "0.1rem 0.35rem",
        border: `1px solid ${color}`,
        color,
        marginLeft: "0.35rem",
        letterSpacing: "0.03em",
      }}
    >
      {text}
    </span>
  );
}

export default function PriceContext({ marketContext, currentPrice }) {
  if (!marketContext) return null;

  const { fifty_two_week_high, fifty_two_week_low, fifty_day_average, two_hundred_day_average } = marketContext;

  const range = fifty_two_week_high - fifty_two_week_low;
  const positionPct = range > 0 ? ((currentPrice - fifty_two_week_low) / range) * 100 : 50;
  const clampedPct = Math.min(Math.max(positionPct, 0), 100);

  return (
    <div>
      <h2>Price & Range</h2>

      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.35rem" }}>
          52-Week Range
        </div>
        <div className="range-bar">
          <div
            className="range-marker"
            style={{ left: `${clampedPct}%` }}
            title={`Current: ${formatCurrency(currentPrice)}`}
          >
            <div style={{ width: "2px", height: "14px", background: "var(--fg)" }} />
            <span style={{ fontSize: "0.6rem", position: "absolute", top: "16px", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
              {formatCurrency(currentPrice)}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--muted)", marginTop: "1.25rem" }}>
          <span>{formatCurrency(fifty_two_week_low)}</span>
          <span>{formatCurrency(fifty_two_week_high)}</span>
        </div>
      </div>

      <div className="metrics-grid">
        {fifty_day_average > 0 && (
          <div className="metric-item">
            <div className="metric-label">50-Day MA</div>
            <div className="metric-value">
              {formatCurrency(fifty_day_average)}
              <TrendBadge label="50-day" above={currentPrice > fifty_day_average} />
            </div>
          </div>
        )}
        {two_hundred_day_average > 0 && (
          <div className="metric-item">
            <div className="metric-label">200-Day MA</div>
            <div className="metric-value">
              {formatCurrency(two_hundred_day_average)}
              <TrendBadge label="200-day" above={currentPrice > two_hundred_day_average} />
            </div>
          </div>
        )}
        <div className="metric-item">
          <div className="metric-label">52W High</div>
          <div className="metric-value">{formatCurrency(fifty_two_week_high)}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">52W Low</div>
          <div className="metric-value">{formatCurrency(fifty_two_week_low)}</div>
        </div>
      </div>
    </div>
  );
}
