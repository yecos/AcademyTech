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

interface CategoryBarChartProps {
  data: {
    id: string;
    name: string;
    icon: string;
    color: string;
    totalCourses: number;
    publishedCourses: number;
    draftCourses: number;
    pendingCourses: number;
  }[];
}

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
  const chartData = data.map((cat) => ({
    name: cat.name,
    cursos: cat.totalCourses,
    publicados: cat.publishedCourses,
    color: cat.color || "#10b981",
  }));

  if (chartData.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Cursos por Categoría
        </h3>
        <div className="h-72 flex items-center justify-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No hay categorías disponibles
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Cursos por Categoría
      </h3>
      <div className="h-72">
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
              dataKey="name"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
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
              formatter={((value: number) => [`${value} cursos`, "Total"]) as any}
            />
            <Bar
              dataKey="cursos"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
