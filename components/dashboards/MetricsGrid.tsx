"use client";

import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

export function MetricsGrid() {
  const metrics = useDashboardMetrics();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center">
            <div className={`rounded-lg p-3 ${item.bg}`}>
              <item.icon
                className={`h-6 w-6 ${item.color}`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-slate-400">
                  {item.name}
                </dt>
                <dd>
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {item.value}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-xs font-medium ${item.statusColor}`}>
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
