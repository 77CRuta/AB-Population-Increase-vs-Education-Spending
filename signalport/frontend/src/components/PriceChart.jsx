import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "../utils/constants";
import { formatCurrency } from "../utils/format";

export default function PriceChart({ data }) {
  if (!data || data.length === 0) return null;

  const thinned = data.filter((_, i) => i % Math.ceil(data.length / 120) === 0 || i === data.length - 1);

  return (
    <div>
      <h2>Price History (1Y)</h2>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={thinned} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.grid}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#6b8a5e" }}
              tickLine={false}
              axisLine={{ stroke: CHART_COLORS.grid }}
              tickFormatter={(v) => v.slice(5)}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#6b8a5e" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(value) => [formatCurrency(value), "Close"]}
              labelFormatter={(label) => label}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke={CHART_COLORS.primary}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: CHART_COLORS.primary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
