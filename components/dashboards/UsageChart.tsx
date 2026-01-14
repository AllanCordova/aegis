"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRealTimeMetrics } from "@/hooks/useRealTimeMetrics";

export function UsageChart() {
  const data = useRealTimeMetrics(2000);

  return (
    <div className="h-[400px] w-full rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-white">
            Real-time Node Performance
          </h3>
          <p className="text-sm text-slate-400">
            Live telemetry from Ritual compute nodes
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Live Feed
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#e2e8f0", fontSize: "12px" }}
              cursor={{ stroke: "#334155", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="memory"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
