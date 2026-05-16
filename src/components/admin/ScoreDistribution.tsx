"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ScoreDistributionProps {
  data: {
    range: string;
    min: number;
    max: number;
    count: number;
  }[];
}

const SCORE_COLORS = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#059669"];

export default function ScoreDistribution({ data }: ScoreDistributionProps) {
  const chartData = data.map((d) => ({
    rango: d.range,
    cantidad: d.count,
  }));

  if (chartData.every((d) => d.cantidad === 0)) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Distribución de Puntuaciones
        </h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No hay datos de evaluaciones
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Distribución de Puntuaciones
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(128,128,128,0.15)"
            />
            <XAxis
              dataKey="rango"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
              formatter={((value: number) => [`${value} evaluaciones`, "Cantidad"]) as any}
            />
            <Bar
              dataKey="cantidad"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SCORE_COLORS[index % SCORE_COLORS.length]}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
