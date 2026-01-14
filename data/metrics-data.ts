import { Activity, Server, Cpu, LucideIcon } from "lucide-react";

export interface MetricItem {
  id: string;
  name: string;
  value: string;
  status: string;
  statusColor: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const STATIC_METRICS: MetricItem[] = [
  {
    id: "nodes",
    name: "Active Nodes",
    value: "3",
    status: "Operational",
    statusColor: "text-emerald-400",
    icon: Server,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    id: "jobs",
    name: "Total Compute Jobs",
    value: "1,284",
    status: "+12% this week",
    statusColor: "text-emerald-400",
    icon: Activity,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: "latency",
    name: "Network Latency",
    value: "24ms",
    status: "Optimal",
    statusColor: "text-emerald-400",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];
