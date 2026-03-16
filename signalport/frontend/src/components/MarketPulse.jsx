import { formatPercent } from "../utils/format";

export default function MarketPulse({ pulse }) {
  if (!pulse) return null;

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1.5rem",
      alignItems: "center",
      padding: "0.6rem 1rem",
      background: "var(--bg-surface)",
      border: "1px solid var(--accent-green-dim)",
      marginBottom: "1.25rem",
      fontSize: "0.75rem",
    }}>
      <span style={{ color: "var(--muted)" }}>
        {pulse.universe_count} covered
      </span>
      <span>
        <span style={{ color: "var(--signal-positive)", fontWeight: 500 }}>{pulse.buy_count}</span> BUY
        {" "}<span style={{ color: "var(--signal-neutral)", fontWeight: 500 }}>{pulse.hold_count}</span> HOLD
        {" "}<span style={{ color: "var(--signal-negative)", fontWeight: 500 }}>{pulse.sell_count}</span> SELL
      </span>
      {pulse.avg_dcf_upside_pct != null && (
        <span>
          Avg upside: <span style={{ fontWeight: 500 }}>{formatPercent(pulse.avg_dcf_upside_pct * 100)}</span>
        </span>
      )}
      {pulse.avg_quality_score != null && (
        <span>
          Avg quality: <span style={{ fontWeight: 500 }}>{pulse.avg_quality_score}/10</span>
        </span>
      )}
      {pulse.last_updated && (
        <span style={{ color: "var(--muted)", marginLeft: "auto", fontSize: "0.68rem" }}>
          Updated: {pulse.last_updated}
        </span>
      )}
    </div>
  );
}
