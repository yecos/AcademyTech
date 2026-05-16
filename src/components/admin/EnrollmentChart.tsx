"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface EnrollmentChartProps {
  data: {
    id: string;
    name: string;
    icon: string;
    color: string;
    enrollments: number;
  }[];
}

const COLORS = ["#10b981", "#3b82f6", "#ef4444", "#8b5cf6", "#f59e0b", "#06b6d4", "#ec4899"];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {name.length > 10 ? name.substring(0, 9) + "…" : name}
    </text>
  );
};

export default function EnrollmentChart({ data }: EnrollmentChartProps) {
  const chartData = data
    .filter((d) => d.enrollments > 0)
    .map((d, idx) => ({
      name: d.name,
      value: d.enrollments,
      color: d.color || COLORS[idx % COLORS.length],
    }));

  if (chartData.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Distribución de Inscripciones
        </h3>
        <div className="h-72 flex items-center justify-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No hay datos de inscripciones
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Distribución de Inscripciones
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel as any}
              outerRadius={100}
              innerRadius={40}
              dataKey="value"
              strokeWidth={2}
              stroke="rgba(255,255,255,0.8)"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
              formatter={((value: number, name: string) => [
                `${value} inscripciones`,
                name,
              ]) as any}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
