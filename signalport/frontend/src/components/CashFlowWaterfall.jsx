import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "../utils/constants";
import { formatLargeNumber } from "../utils/format";

const POSITIVE_COLOR = CHART_COLORS.accent;
const NEGATIVE_COLOR = CHART_COLORS.negative;

export default function CashFlowWaterfall({ cashFlowAnalysis }) {
  if (!cashFlowAnalysis) return null;

  const lastIdx = cashFlowAnalysis.fiscal_years.length - 1;
  const ocf = cashFlowAnalysis.operating_cash_flow?.[lastIdx] ?? 0;
  const capex = cashFlowAnalysis.capital_expenditure?.[lastIdx] ?? 0;
  const fcf = cashFlowAnalysis.free_cash_flow?.[lastIdx] ?? 0;
  const dividends = cashFlowAnalysis.dividend_paid?.[lastIdx] ?? 0;
  const buybacks = cashFlowAnalysis.share_buyback?.[lastIdx] ?? 0;
  const retained = fcf - dividends - buybacks;

  const data = [
    { name: "Operating CF", value: ocf },
    { name: "CapEx", value: -capex },
    { name: "Free CF", value: fcf },
    { name: "Dividends", value: -dividends },
    { name: "Buybacks", value: -buybacks },
    { name: "Retained", value: retained },
  ];

  return (
    <div>
      <h2>Cash Flow Waterfall ({cashFlowAnalysis.fiscal_years[lastIdx]})</h2>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: "#6b8a5e" }}
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
              formatter={(value) => [formatLargeNumber(value)]}
            />
            <Bar dataKey="value" name="Amount">
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.value >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
