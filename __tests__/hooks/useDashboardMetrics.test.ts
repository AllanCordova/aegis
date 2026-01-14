import { renderHook, act, waitFor } from "@testing-library/react";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { STATIC_METRICS } from "@/data/metrics-data";

// Mock the metrics data
jest.mock("@/data/metrics-data", () => ({
  STATIC_METRICS: [
    {
      id: "nodes",
      name: "Active Nodes",
      value: "3",
      status: "Operational",
      statusColor: "text-emerald-400",
      icon: jest.fn(),
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      id: "jobs",
      name: "Total Compute Jobs",
      value: "1,284",
      status: "+12% this week",
      statusColor: "text-emerald-400",
      icon: jest.fn(),
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ],
}));

describe("useDashboardMetrics", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should return static metrics plus earnings metric", () => {
    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current).toHaveLength(STATIC_METRICS.length + 1);
    expect(result.current[result.current.length - 1].id).toBe("earnings");
    expect(result.current[result.current.length - 1].name).toBe("Est. Earnings");
  });

  it("should initialize earnings with default value", () => {
    const { result } = renderHook(() => useDashboardMetrics());

    const earningsMetric = result.current.find((m) => m.id === "earnings");
    expect(earningsMetric).toBeDefined();
    expect(earningsMetric?.value).toContain("450.0000");
    expect(earningsMetric?.value).toContain("RIT");
  });

  it("should increment earnings over time", async () => {
    const { result } = renderHook(() => useDashboardMetrics());

    const initialEarnings = result.current.find((m) => m.id === "earnings");
    const initialValue = parseFloat(
      initialEarnings?.value.replace(" RIT", "") || "0"
    );

    // Fast-forward 2 seconds (one interval)
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      const updatedEarnings = result.current.find((m) => m.id === "earnings");
      const updatedValue = parseFloat(
        updatedEarnings?.value.replace(" RIT", "") || "0"
      );
      expect(updatedValue).toBeGreaterThan(initialValue);
    });
  });

  it("should increment earnings by 0.0042 every 2 seconds", async () => {
    const { result } = renderHook(() => useDashboardMetrics());

    const initialEarnings = result.current.find((m) => m.id === "earnings");
    const initialValue = parseFloat(
      initialEarnings?.value.replace(" RIT", "") || "0"
    );

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      const updatedEarnings = result.current.find((m) => m.id === "earnings");
      const updatedValue = parseFloat(
        updatedEarnings?.value.replace(" RIT", "") || "0"
      );
      // Should be approximately 0.0042 more (allowing for floating point precision)
      expect(updatedValue).toBeCloseTo(initialValue + 0.0042, 4);
    });
  });

  it("should increment earnings multiple times over multiple intervals", async () => {
    const { result } = renderHook(() => useDashboardMetrics());

    const initialEarnings = result.current.find((m) => m.id === "earnings");
    const initialValue = parseFloat(
      initialEarnings?.value.replace(" RIT", "") || "0"
    );

    // Fast-forward 6 seconds (3 intervals)
    act(() => {
      jest.advanceTimersByTime(6000);
    });

    await waitFor(() => {
      const updatedEarnings = result.current.find((m) => m.id === "earnings");
      const updatedValue = parseFloat(
        updatedEarnings?.value.replace(" RIT", "") || "0"
      );
      // Should be approximately 3 * 0.0042 more
      expect(updatedValue).toBeCloseTo(initialValue + 0.0042 * 3, 4);
    });
  });

  it("should format earnings value with 4 decimal places", () => {
    const { result } = renderHook(() => useDashboardMetrics());

    const earningsMetric = result.current.find((m) => m.id === "earnings");
    expect(earningsMetric?.value).toMatch(/^\d+\.\d{4} RIT$/);
  });

  it("should have correct earnings metric properties", () => {
    const { result } = renderHook(() => useDashboardMetrics());

    const earningsMetric = result.current.find((m) => m.id === "earnings");
    expect(earningsMetric).toMatchObject({
      id: "earnings",
      name: "Est. Earnings",
      status: "Pending payout",
      statusColor: "text-amber-400",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    });
  });

  it("should clean up interval on unmount", () => {
    const { unmount } = renderHook(() => useDashboardMetrics());

    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});

