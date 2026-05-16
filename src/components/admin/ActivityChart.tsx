"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ActivityChartProps {
  data: { date: string; count: number }[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  const formattedData = data.map((d) => {
    const dateObj = new Date(d.date + "T12:00:00");
    const label = dateObj.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
    return { ...d, label };
  });

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Usuarios Activos (30 días)
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(128,128,128,0.15)"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
              interval="preserveStartEnd"
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
              labelStyle={{ fontWeight: 600, color: "#374151" }}
              itemStyle={{ color: "#0ea5e9" }}
              formatter={((value: number) => [`${value} activos`, "Usuarios"]) as any}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#0ea5e9"
              strokeWidth={2.5}
              fill="url(#skyGradient)"
              dot={false}
              activeDot={{ r: 5, fill: "#0ea5e9", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
