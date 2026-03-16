import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "../utils/constants";

export default function GrowthTrends({ growth }) {
  if (!growth?.fiscal_years?.length) return null;

  const data = growth.fiscal_years.map((year, i) => ({
    year,
    revenueGrowth: (growth.revenue_growth?.[i] ?? 0) * 100,
    earningsGrowth: (growth.earnings_growth?.[i] ?? 0) * 100,
    fcfGrowth: (growth.fcf_growth?.[i] ?? 0) * 100,
  }));

  return (
    <div>
      <h2>Growth Trends</h2>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
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
            <Legend wrapperStyle={{ fontSize: "0.72rem" }} />
            <Line
              type="monotone"
              dataKey="revenueGrowth"
              name="Revenue Growth"
              stroke={CHART_COLORS.accent}
              strokeWidth={1.5}
              dot={{ r: 3, fill: CHART_COLORS.accent }}
            />
            <Line
              type="monotone"
              dataKey="earningsGrowth"
              name="Earnings Growth"
              stroke={CHART_COLORS.gold}
              strokeWidth={1.5}
              dot={{ r: 3, fill: CHART_COLORS.gold }}
            />
            <Line
              type="monotone"
              dataKey="fcfGrowth"
              name="FCF Growth"
              stroke="#00cec9"
              strokeWidth={1.5}
              dot={{ r: 3, fill: "#00cec9" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
