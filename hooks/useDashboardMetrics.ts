import { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { STATIC_METRICS, MetricItem } from "@/data/metrics-data";

export function useDashboardMetrics() {
  const [earnings, setEarnings] = useState(450.0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => prev + 0.0042);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const earningsMetric: MetricItem = {
    id: "earnings",
    name: "Est. Earnings",
    value: `${earnings.toFixed(4)} RIT`,
    status: "Pending payout",
    statusColor: "text-amber-400",
    icon: Wallet,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  };

  return [...STATIC_METRICS, earningsMetric];
}
