import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "../utils/constants";

export default function ProfitabilityChart({ profitability }) {
  if (!profitability?.fiscal_years?.length) return null;

  const data = profitability.fiscal_years.map((year, i) => ({
    year,
    grossMargin: (profitability.gross_margin?.[i] ?? 0) * 100,
    operatingMargin: (profitability.operating_margin?.[i] ?? 0) * 100,
    netMargin: (profitability.net_margin?.[i] ?? 0) * 100,
    roe: (profitability.roe?.[i] ?? 0) * 100,
  }));

  return (
    <div>
      <h2>Profitability</h2>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
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
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
            />
            <Area
              type="monotone"
              dataKey="grossMargin"
              name="Gross Margin"
              stroke="rgba(61, 220, 61, 0.4)"
              fill={CHART_COLORS.accent}
              fillOpacity={0.15}
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="operatingMargin"
              name="Operating Margin"
              stroke="rgba(61, 220, 61, 0.55)"
              fill={CHART_COLORS.accent}
              fillOpacity={0.25}
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="netMargin"
              name="Net Margin"
              stroke="rgba(61, 220, 61, 0.7)"
              fill={CHART_COLORS.accent}
              fillOpacity={0.35}
              strokeWidth={1}
            />
            <Line
              type="monotone"
              dataKey="roe"
              name="ROE"
              stroke={CHART_COLORS.accent}
              strokeWidth={2.5}
              dot={{ r: 3, fill: CHART_COLORS.accent }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
