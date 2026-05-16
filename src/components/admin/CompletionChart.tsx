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

interface CompletionChartProps {
  data: {
    id: string;
    title: string;
    completionRate: number;
  }[];
}

export default function CompletionChart({ data }: CompletionChartProps) {
  const chartData = data
    .sort((a, b) => a.completionRate - b.completionRate)
    .map((course) => ({
      name:
        course.title.length > 25
          ? course.title.substring(0, 24) + "…"
          : course.title,
      completado: course.completionRate,
      fullName: course.title,
    }));

  if (chartData.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Tasa de Completado por Curso
        </h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No hay cursos publicados
          </p>
        </div>
      </div>
    );
  }

  const getBarColor = (rate: number) => {
    if (rate >= 70) return "#10b981";
    if (rate >= 50) return "#f59e0b";
    if (rate >= 30) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Tasa de Completado por Curso
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(128,128,128,0.15)"
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
              formatter={((value: number, _: string, props: any) => [
                `${value}% completado`,
                props.payload.fullName,
              ]) as any}
            />
            <Bar
              dataKey="completado"
              radius={[0, 6, 6, 0]}
              maxBarSize={24}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.completado)}
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
