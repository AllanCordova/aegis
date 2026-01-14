import { renderHook, act, waitFor } from "@testing-library/react";
import { useRealTimeMetrics } from "@/hooks/useRealTimeMetrics";
import {
  generateInitialHistory,
  generateNextPoint,
  MetricPoint,
} from "@/lib/mock-generator";

// Mock the mock-generator
jest.mock("@/lib/mock-generator", () => ({
  generateInitialHistory: jest.fn((count: number = 7) => {
    const data: MetricPoint[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        time: `10:${String(i * 5).padStart(2, "0")}`,
        cpu: 40 + i,
        memory: 30 + i,
      });
    }
    return data;
  }),
  generateNextPoint: jest.fn((lastPoint: MetricPoint): MetricPoint => {
    const [hours, minutes] = lastPoint.time.split(":").map(Number);
    const newMinutes = (minutes + 5) % 60;
    const newHours = minutes + 5 >= 60 ? (hours + 1) % 24 : hours;
    
    return {
      time: `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`,
      cpu: Math.min(lastPoint.cpu + 1, 95),
      memory: Math.min(lastPoint.memory + 1, 90),
    };
  }),
  MetricPoint: {},
}));

describe("useRealTimeMetrics", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should initialize with 10 data points by default", () => {
    const { result } = renderHook(() => useRealTimeMetrics());

    expect(result.current).toHaveLength(10);
    expect(generateInitialHistory).toHaveBeenCalledWith(10);
  });

  it("should initialize data with correct structure", () => {
    const { result } = renderHook(() => useRealTimeMetrics());

    result.current.forEach((point) => {
      expect(point).toHaveProperty("time");
      expect(point).toHaveProperty("cpu");
      expect(point).toHaveProperty("memory");
      expect(typeof point.time).toBe("string");
      expect(typeof point.cpu).toBe("number");
      expect(typeof point.memory).toBe("number");
    });
  });

  it("should update data at the specified interval", async () => {
    const intervalMs = 2000;
    const { result } = renderHook(() => useRealTimeMetrics(intervalMs));

    const initialData = [...result.current];
    const initialLastPoint = initialData[initialData.length - 1];

    // Fast-forward by the interval
    act(() => {
      jest.advanceTimersByTime(intervalMs);
    });

    await waitFor(() => {
      const updatedData = result.current;
      const updatedLastPoint = updatedData[updatedData.length - 1];
      
      // The last point should be different (new point added)
      expect(updatedLastPoint.time).not.toBe(initialLastPoint.time);
    });
  });

  it("should use default interval of 3000ms when not specified", () => {
    const { result } = renderHook(() => useRealTimeMetrics());

    const initialData = [...result.current];

    // Fast-forward by default interval (3000ms)
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Should have updated
    expect(result.current).not.toEqual(initialData);
  });

  it("should maintain the same array length when updating", async () => {
    const { result } = renderHook(() => useRealTimeMetrics(2000));

    const initialLength = result.current.length;

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(result.current).toHaveLength(initialLength);
    });
  });

  it("should remove the first point and add a new point at the end", async () => {
    const { result } = renderHook(() => useRealTimeMetrics(2000));

    const initialData = [...result.current];
    const initialFirstPoint = initialData[0];
    const initialLastPoint = initialData[initialData.length - 1];

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      const updatedData = result.current;
      const updatedFirstPoint = updatedData[0];
      const updatedLastPoint = updatedData[updatedData.length - 1];

      // First point should be the old second point (first was removed)
      expect(updatedFirstPoint).toEqual(initialData[1]);
      // Last point should be new
      expect(updatedLastPoint).not.toEqual(initialLastPoint);
    });
  });

  it("should call generateNextPoint with the last point", async () => {
    const { generateNextPoint } = require("@/lib/mock-generator");
    const { result } = renderHook(() => useRealTimeMetrics(2000));

    const initialLastPoint = result.current[result.current.length - 1];

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(generateNextPoint).toHaveBeenCalledWith(initialLastPoint);
    });
  });

  it("should update multiple times over multiple intervals", async () => {
    const { result } = renderHook(() => useRealTimeMetrics(2000));

    const initialData = [...result.current];

    // Fast-forward 3 intervals
    act(() => {
      jest.advanceTimersByTime(6000);
    });

    await waitFor(() => {
      const updatedData = result.current;
      // Should have updated (first 3 points removed, 3 new points added)
      expect(updatedData[0]).toEqual(initialData[3]);
      expect(updatedData[updatedData.length - 1]).not.toEqual(
        initialData[initialData.length - 1]
      );
    });
  });

  it("should respect custom interval values", async () => {
    const customInterval = 5000;
    const { result } = renderHook(() => useRealTimeMetrics(customInterval));

    const initialData = [...result.current];

    // Fast-forward by less than interval - should not update
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Should not have updated yet
    expect(result.current).toEqual(initialData);

    // Fast-forward to complete interval
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(result.current).not.toEqual(initialData);
    });
  });

  it("should clean up interval on unmount", () => {
    const { unmount } = renderHook(() => useRealTimeMetrics(2000));

    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it("should update interval when intervalMs changes", async () => {
    const { result, rerender } = renderHook(
      ({ interval }) => useRealTimeMetrics(interval),
      {
        initialProps: { interval: 2000 },
      }
    );

    const initialData = [...result.current];

    // Update interval
    rerender({ interval: 1000 });

    // Fast-forward by new interval
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current).not.toEqual(initialData);
    });
  });
});

