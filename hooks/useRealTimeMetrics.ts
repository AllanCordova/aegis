import { useState, useEffect } from "react";
import {
  generateInitialHistory,
  generateNextPoint,
  MetricPoint,
} from "@/lib/mock-generator";

export function useRealTimeMetrics(intervalMs: number = 3000) {
  const [data, setData] = useState<MetricPoint[]>(() =>
    generateInitialHistory(10)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) => {
        const lastPoint = currentData[currentData.length - 1];
        const newPoint = generateNextPoint(lastPoint);

        const newData = [...currentData.slice(1), newPoint];
        return newData;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return data;
}
