import { formatCurrency, formatPercent, formatRate, formatLargeNumber } from "../utils/format";

export default function DcfSummary({ dcf, skipReason }) {
  if (skipReason) {
    return (
      <div>
        <h2>DCF Valuation</h2>
        <div className="card" style={{ color: "var(--muted)" }}>
          {skipReason}
        </div>
      </div>
    );
  }

  if (!dcf) return null;

  const upside = dcf.upside_pct != null ? dcf.upside_pct * 100 : null;
  const gaugeWidth = upside != null ? Math.min(Math.max(upside + 50, 0), 100) : 0;

  return (
    <div>
      <h2>DCF Valuation</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="card">
          <div className="metric-label">Intrinsic Value / Share</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>
            {formatCurrency(dcf.intrinsic_value_per_share)}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.25rem" }}>
            vs. {formatCurrency(dcf.current_price)} current
          </div>
        </div>
        <div className="card">
          <div className="metric-label">DCF Upside</div>
          <div className="upside-gauge" style={{ marginTop: "0.35rem" }}>
            <div className="upside-bar">
              <div className="upside-fill" style={{ width: `${gaugeWidth}%` }} />
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 500, minWidth: "4.5rem", textAlign: "right" }}>
              {upside != null ? formatPercent(upside) : "\u2014"}
            </span>
          </div>
        </div>
      </div>

      <div className="metrics-grid" style={{ marginBottom: "1.5rem" }}>
        <div className="metric-item">
          <div className="metric-label">Enterprise Value</div>
          <div className="metric-value">{formatLargeNumber(dcf.enterprise_value)}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Equity Value</div>
          <div className="metric-value">{formatLargeNumber(dcf.equity_value)}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Net Debt</div>
          <div className="metric-value">{formatLargeNumber(dcf.net_debt)}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Terminal Value</div>
          <div className="metric-value">{formatLargeNumber(dcf.terminal_value)}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Growth Rate</div>
          <div className="metric-value">{dcf.assumptions ? formatRate(dcf.assumptions.growth_rate) : "\u2014"}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Discount Rate</div>
          <div className="metric-value">
            {dcf.assumptions ? formatRate(dcf.assumptions.discount_rate) : "\u2014"}
            {dcf.assumptions && dcf.assumptions.discount_rate_source && (
              <span style={{ fontSize: "0.68rem", color: "var(--muted)", marginLeft: "0.35rem" }}>
                ({dcf.assumptions.discount_rate_source === "wacc" ? "WACC" : "fixed"})
              </span>
            )}
          </div>
        </div>
      </div>

      {dcf.projected_fcf && dcf.projected_fcf.length > 0 && (
        <ProjectedFcfChart projectedFcf={dcf.projected_fcf} />
      )}

      <ValueBridge dcf={dcf} />

      {dcf.sensitivity_table && <SensitivityTable dcf={dcf} />}
    </div>
  );
}

function ProjectedFcfChart({ projectedFcf }) {
  if (!projectedFcf || projectedFcf.length === 0) return null;

  const maxFcf = Math.max(...projectedFcf.map(Math.abs));

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
        Projected Free Cash Flow
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "80px" }}>
        {projectedFcf.map((fcf, i) => {
          const heightPct = maxFcf > 0 ? (Math.abs(fcf) / maxFcf) * 100 : 0;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
              <div
                style={{
                  width: "100%",
                  height: `${heightPct}%`,
                  minHeight: "2px",
                  background: fcf >= 0 ? "var(--accent-green)" : "var(--signal-negative)",
                  opacity: 0.7 + (i / projectedFcf.length) * 0.3,
                }}
              />
              <span style={{ fontSize: "0.6rem", color: "var(--muted)" }}>Y{i + 1}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", color: "var(--muted)", marginTop: "0.25rem" }}>
        <span>{formatLargeNumber(projectedFcf[0])}</span>
        <span>{formatLargeNumber(projectedFcf[projectedFcf.length - 1])}</span>
      </div>
    </div>
  );
}

function ValueBridge({ dcf }) {
  if (!dcf || dcf.pv_of_fcfs == null) return null;

  const steps = [
    { label: "PV of FCFs", value: dcf.pv_of_fcfs, sign: "+" },
    { label: "PV of Terminal", value: dcf.pv_of_terminal, sign: "+" },
    { label: "= Enterprise Value", value: dcf.enterprise_value, sign: "" },
    { label: "− Net Debt", value: dcf.net_debt, sign: "−" },
    { label: "= Equity Value", value: dcf.equity_value, sign: "" },
  ];

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
        Value Bridge
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.35rem 0.5rem",
              fontSize: "0.78rem",
              background: step.sign === "" ? "var(--bg-surface-alt)" : "transparent",
              fontWeight: step.sign === "" ? 500 : 300,
              borderBottom: "1px solid rgba(42, 138, 42, 0.2)",
            }}
          >
            <span>{step.label}</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatLargeNumber(step.value)}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.35rem 0.5rem",
            fontSize: "0.78rem",
            fontWeight: 500,
            background: "rgba(61, 220, 61, 0.08)",
            borderTop: "2px solid var(--accent-green)",
          }}
        >
          <span>Intrinsic Value / Share</span>
          <span>{formatCurrency(dcf.intrinsic_value_per_share)}</span>
        </div>
      </div>
    </div>
  );
}

function SensitivityTable({ dcf }) {
  const { sensitivity_table, sensitivity_growth_rates, sensitivity_discount_rates } = dcf;
  if (!sensitivity_table || !sensitivity_growth_rates || !sensitivity_discount_rates) return null;

  const baseGrowth = dcf.assumptions.growth_rate;
  const baseDiscount = dcf.assumptions.discount_rate;

  return (
    <div>
      <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
        Sensitivity: Intrinsic Value per Share
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ fontSize: "0.68rem" }}>Growth \ WACC</th>
            {sensitivity_discount_rates.map((d, i) => {
              const isBase = Math.abs(d - baseDiscount) < 0.001;
              return (
                <th key={i} className="numeric" style={isBase ? { fontWeight: 500, border: "1px solid var(--accent-green)" } : {}}>
                  {formatRate(d)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sensitivity_table.map((row, gi) => {
            const isBaseRow = Math.abs(sensitivity_growth_rates[gi] - baseGrowth) < 0.001;
            return (
              <tr key={gi}>
                <td style={isBaseRow ? { fontWeight: 500, background: "var(--bg-surface-alt)" } : {}}>
                  {formatRate(sensitivity_growth_rates[gi])}
                </td>
                {row.map((val, di) => {
                  const isBaseCol = Math.abs(sensitivity_discount_rates[di] - baseDiscount) < 0.001;
                  const isCenter = isBaseRow && isBaseCol;
                  return (
                    <td
                      key={di}
                      className="numeric"
                      style={isCenter
                        ? { fontWeight: 500, border: "1px solid var(--accent-green)", background: "var(--bg-surface-alt)" }
                        : {}}
                    >
                      {formatCurrency(val)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
