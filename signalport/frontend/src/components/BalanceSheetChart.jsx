import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "../utils/constants";
import { formatLargeNumber } from "../utils/format";

const BAR_COLORS = {
  assets: CHART_COLORS.accent,
  liabilities: CHART_COLORS.negative,
  equity: "#55efc4",
};

export default function BalanceSheetChart({ balanceSheet }) {
  if (!balanceSheet) return null;

  const data = balanceSheet.fiscal_years.map((year, i) => ({
    year,
    assets: balanceSheet.total_assets?.[i] ?? 0,
    liabilities: balanceSheet.total_liabilities?.[i] ?? 0,
    equity: balanceSheet.shareholders_equity?.[i] ?? 0,
  }));

  const lastIdx = balanceSheet.fiscal_years.length - 1;
  const latestMetrics = [
    { label: "Current Ratio", value: balanceSheet.current_ratio?.[lastIdx] },
    { label: "D/E Ratio", value: balanceSheet.debt_to_equity?.[lastIdx] },
    { label: "Interest Coverage", value: balanceSheet.interest_coverage?.[lastIdx] },
  ];

  return (
    <div>
      <h2>Balance Sheet</h2>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10, fill: "#6b8a5e" }}
              tickLine={false}
              axisLine={{ stroke: CHART_COLORS.grid }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#6b8a5e" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatLargeNumber}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(value, name) => [formatLargeNumber(value), name]}
            />
            <Legend wrapperStyle={{ fontSize: "0.72rem" }} />
            <Bar dataKey="assets" name="Assets" fill={BAR_COLORS.assets} />
            <Bar dataKey="liabilities" name="Liabilities" fill={BAR_COLORS.liabilities} />
            <Bar dataKey="equity" name="Equity" fill={BAR_COLORS.equity} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="metrics-grid" style={{ marginTop: "1rem" }}>
        {latestMetrics.map(({ label, value }) => (
          <div key={label} className="metric-item">
            <div className="metric-label">{label}</div>
            <div className="metric-value">
              {value != null ? value.toFixed(2) : "\u2014"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
