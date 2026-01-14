"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { MetricsGrid } from "../components/dashboards/MetricsGrid";
import { UsageChart } from "../components/dashboards/UsageChart";
import Header from "@/components/layouts/Header";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
              Monitor your{" "}
              <span className="text-emerald-400">AI Infrastructure</span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-400">
              Decentralized compute monitoring for the Ritual chain. Track
              uptime, latency, and rewards in real-time.
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Dashboard Overview
              </h2>
              <p className="text-slate-400">
                Real-time metrics from your registered infernet nodes.
              </p>
            </div>

            <MetricsGrid />
            <UsageChart />

            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Recent Activity Logs
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 text-emerald-400">
                  <span className="opacity-50">[10:42:12]</span>
                  <span>✔ Node-01 completed inference job #8821</span>
                </div>
                <div className="flex items-center gap-3 text-blue-400">
                  <span className="opacity-50">[10:41:55]</span>
                  <span>ℹ Node-03 syncing with Ritual Chain block 129402</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="opacity-50">[10:40:01]</span>
                  <span>ℹ Container health check passed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
