export interface MetricPoint {
  time: string;
  cpu: number;
  memory: number;
}

export function generateInitialHistory(count: number = 7): MetricPoint[] {
  const data: MetricPoint[] = [];
  const now = new Date();

  for (let i = count; i > 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    data.push({
      time: formatTime(time),
      cpu: getRandomInt(30, 50),
      memory: getRandomInt(20, 40),
    });
  }
  return data;
}

export function generateNextPoint(lastPoint: MetricPoint): MetricPoint {
  const [hours, minutes] = lastPoint.time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes + 5);

  const newCpu = clamp(lastPoint.cpu + getRandomInt(-10, 15), 10, 95);
  const newMemory = clamp(lastPoint.memory + getRandomInt(-5, 10), 20, 90);

  return {
    time: formatTime(date),
    cpu: newCpu,
    memory: newMemory,
  };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
