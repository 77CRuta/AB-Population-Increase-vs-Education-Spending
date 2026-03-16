function OwnershipMetric({ label, value, suffix, warn }) {
  if (value == null) return null;
  const displayVal = typeof value === "number" ? (value * 100).toFixed(1) + "%" : value;
  return (
    <div className="metric-item">
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={warn ? { color: "var(--signal-negative)" } : {}}>
        {displayVal}
        {suffix && <span style={{ fontSize: "0.68rem", color: "var(--muted)", marginLeft: "0.25rem" }}>{suffix}</span>}
      </div>
    </div>
  );
}

export default function OwnershipBreakdown({ ownership }) {
  if (!ownership) return null;

  const shortWarn = ownership.short_pct_of_float != null && ownership.short_pct_of_float > 0.10;
  const payoutWarn = ownership.payout_ratio != null && ownership.payout_ratio > 0.90;

  return (
    <div>
      <h2>Ownership & Sentiment</h2>

      <div className="metrics-grid" style={{ marginBottom: "1.25rem" }}>
        <OwnershipMetric label="Insider Ownership" value={ownership.held_pct_insiders} />
        <OwnershipMetric label="Institutional Ownership" value={ownership.held_pct_institutions} />
        <OwnershipMetric label="Short Ratio" value={ownership.short_ratio != null ? ownership.short_ratio.toFixed(1) + " days" : null} />
        <OwnershipMetric label="Short % of Float" value={ownership.short_pct_of_float} warn={shortWarn} />
        <OwnershipMetric label="Payout Ratio" value={ownership.payout_ratio} warn={payoutWarn} />
      </div>

      {ownership.top_holders && ownership.top_holders.length > 0 && (
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
            Top Institutional Holders
          </div>
          <table>
            <thead>
              <tr>
                <th>Holder</th>
                <th className="numeric">Shares</th>
                <th className="numeric">% Out</th>
              </tr>
            </thead>
            <tbody>
              {ownership.top_holders.map((h, i) => (
                <tr key={i}>
                  <td>{h.holder || "\u2014"}</td>
                  <td className="numeric">{h.shares ? h.shares.toLocaleString() : "\u2014"}</td>
                  <td className="numeric">{h.pct_out != null ? (h.pct_out * 100).toFixed(2) + "%" : "\u2014"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
