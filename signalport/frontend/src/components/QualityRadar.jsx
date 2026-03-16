import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "../utils/constants";

const DIMENSIONS = [
  { key: "profitability", label: "Profitability" },
  { key: "growth", label: "Growth" },
  { key: "financial_health", label: "Financial Health" },
  { key: "valuation", label: "Valuation" },
  { key: "cash_generation", label: "Cash Generation" },
];

export default function QualityRadar({ qualityScore }) {
  if (!qualityScore) return null;

  const data = DIMENSIONS.map(({ key, label }) => ({
    dimension: label,
    value: qualityScore[key] ?? 0,
  }));

  return (
    <div>
      <h2>Quality Score</h2>
      <div style={{ textAlign: "center", marginBottom: "-1rem" }}>
        <span style={{ fontSize: "1.4rem", fontWeight: 500 }}>
          {qualityScore.overall?.toFixed(1) ?? "—"}
        </span>
        <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}> / 10</span>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke={CHART_COLORS.grid} />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fontSize: 10, fill: "var(--muted)" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={{ fontSize: 9, fill: "#6b8a5e" }}
              tickCount={6}
            />
            <Radar
              dataKey="value"
              stroke={CHART_COLORS.accent}
              fill={CHART_COLORS.accent}
              fillOpacity={0.2}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
