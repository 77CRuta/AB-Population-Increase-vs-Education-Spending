import { formatPercent, formatCurrency } from "../utils/format";

export default function ReverseDcf({ reverseDcf, marginOfSafety }) {
  if (!reverseDcf && !marginOfSafety) return null;

  return (
    <div>
      <h2>Reverse DCF & Entry Zones</h2>

      {reverseDcf && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-label">Implied Growth Rate</div>
              <div className="metric-value">{formatPercent(reverseDcf.implied_growth_rate * 100)}</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Discount Rate</div>
              <div className="metric-value">{formatPercent(reverseDcf.discount_rate * 100)}</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Terminal Growth</div>
              <div className="metric-value">{formatPercent(reverseDcf.terminal_growth_rate * 100)}</div>
            </div>
          </div>
          <p style={{ marginTop: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)" }}>
            {reverseDcf.interpretation}
          </p>
        </div>
      )}

      {marginOfSafety && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>Entry Zone</span>
            <span className={`entry-zone-badge entry-zone-${marginOfSafety.entry_zone}`}>
              {marginOfSafety.entry_zone.replace("_", " ")}
            </span>
          </div>

          {/* Price band visualization */}
          <div style={{ position: "relative", height: "32px", background: "var(--bg-surface-alt)", borderRadius: "2px", marginBottom: "0.75rem" }}>
            {/* Buy zone */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${Math.min(100, Math.max(0, (marginOfSafety.buy_below / marginOfSafety.sell_above) * 100))}%`,
              background: "rgba(61, 220, 61, 0.1)",
              borderRight: "2px dashed rgba(61, 220, 61, 0.4)",
            }} />
            {/* Sell zone */}
            <div style={{
              position: "absolute", right: 0, top: 0, bottom: 0,
              width: `${Math.min(100, Math.max(0, 100 - (marginOfSafety.fair_value / marginOfSafety.sell_above) * 100))}%`,
              background: "rgba(225, 112, 85, 0.06)",
              borderLeft: "2px dashed rgba(225, 112, 85, 0.3)",
            }} />
            {/* Current price marker */}
            <div style={{
              position: "absolute",
              left: `${Math.min(98, Math.max(2, (marginOfSafety.current_price / marginOfSafety.sell_above) * 100))}%`,
              top: 0, bottom: 0, width: "3px",
              background: "var(--fg)",
              transform: "translateX(-50%)",
            }}>
              <div style={{ position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", fontSize: "0.62rem", whiteSpace: "nowrap", fontWeight: 500 }}>
                ${marginOfSafety.current_price.toFixed(0)}
              </div>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-label">Buy Below</div>
              <div className="metric-value" style={{ color: "var(--signal-positive)" }}>{formatCurrency(marginOfSafety.buy_below)}</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Fair Value</div>
              <div className="metric-value">{formatCurrency(marginOfSafety.fair_value)}</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Sell Above</div>
              <div className="metric-value" style={{ color: "var(--signal-negative)" }}>{formatCurrency(marginOfSafety.sell_above)}</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Margin of Safety</div>
              <div className="metric-value">{formatPercent(marginOfSafety.margin_of_safety_pct * 100)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
