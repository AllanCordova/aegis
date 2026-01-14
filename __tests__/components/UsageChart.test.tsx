import { render, screen } from "@testing-library/react";
import { UsageChart } from "@/components/dashboards/UsageChart";
import "@testing-library/jest-dom";

// Mock the hook
const mockData = [
  { time: "10:00", cpu: 40, memory: 30 },
  { time: "10:05", cpu: 45, memory: 35 },
  { time: "10:10", cpu: 50, memory: 40 },
];

jest.mock("@/hooks/useRealTimeMetrics", () => ({
  useRealTimeMetrics: jest.fn(() => mockData),
}));

// Mock recharts components
jest.mock("recharts", () => ({
  LineChart: ({ children, data }: any) => (
    <div data-testid="line-chart" data-chart-data={JSON.stringify(data)}>
      {children}
    </div>
  ),
  Line: ({ dataKey }: any) => (
    <div data-testid={`line-${dataKey}`}>{dataKey}</div>
  ),
  XAxis: ({ dataKey }: any) => (
    <div data-testid="x-axis" data-key={dataKey} />
  ),
  YAxis: ({ unit }: any) => (
    <div data-testid="y-axis" data-unit={unit} />
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

describe("UsageChart Component", () => {
  it("renders the chart title and description", () => {
    render(<UsageChart />);

    expect(
      screen.getByText("Real-time Node Performance")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Live telemetry from Ritual compute nodes")
    ).toBeInTheDocument();
  });

  it("renders the live feed indicator", () => {
    render(<UsageChart />);

    expect(screen.getByText("Live Feed")).toBeInTheDocument();
  });

  it("renders the LineChart component", () => {
    render(<UsageChart />);

    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("passes data to the LineChart", () => {
    render(<UsageChart />);

    const chart = screen.getByTestId("line-chart");
    const chartData = JSON.parse(chart.getAttribute("data-chart-data") || "[]");
    expect(chartData).toEqual(mockData);
  });

  it("renders CPU and Memory lines", () => {
    render(<UsageChart />);

    expect(screen.getByTestId("line-cpu")).toBeInTheDocument();
    expect(screen.getByTestId("line-memory")).toBeInTheDocument();
  });

  it("renders XAxis with time dataKey", () => {
    render(<UsageChart />);

    const xAxis = screen.getByTestId("x-axis");
    expect(xAxis).toHaveAttribute("data-key", "time");
  });

  it("renders YAxis with percentage unit", () => {
    render(<UsageChart />);

    const yAxis = screen.getByTestId("y-axis");
    expect(yAxis).toHaveAttribute("data-unit", "%");
  });

  it("renders CartesianGrid", () => {
    render(<UsageChart />);

    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
  });

  it("renders Tooltip", () => {
    render(<UsageChart />);

    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  it("renders ResponsiveContainer", () => {
    render(<UsageChart />);

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });

  it("calls useRealTimeMetrics with default interval", () => {
    const { useRealTimeMetrics } = require("@/hooks/useRealTimeMetrics");
    render(<UsageChart />);

    expect(useRealTimeMetrics).toHaveBeenCalledWith(2000);
  });

  it("applies correct container classes", () => {
    const { container } = render(<UsageChart />);

    // Check for the main container with height class
    const chartContainer = container.firstChild as HTMLElement;
    expect(chartContainer).toBeInTheDocument();
    expect(chartContainer.className).toContain("h-[400px]");
  });

  it("updates when hook data changes", () => {
    const { useRealTimeMetrics } = require("@/hooks/useRealTimeMetrics");
    const newData = [
      { time: "10:15", cpu: 55, memory: 45 },
      { time: "10:20", cpu: 60, memory: 50 },
    ];

    (useRealTimeMetrics as jest.Mock).mockReturnValue(newData);

    const { rerender } = render(<UsageChart />);

    rerender(<UsageChart />);

    const chart = screen.getByTestId("line-chart");
    const chartData = JSON.parse(chart.getAttribute("data-chart-data") || "[]");
    expect(chartData).toEqual(newData);
  });
});

