import { render, screen } from "@testing-library/react";
import { MetricsGrid } from "@/components/dashboards/MetricsGrid";
import "@testing-library/jest-dom";

// Mock the hook
jest.mock("@/hooks/useDashboardMetrics", () => ({
  useDashboardMetrics: jest.fn(() => [
    {
      id: "nodes",
      name: "Active Nodes",
      value: "3",
      status: "Operational",
      statusColor: "text-emerald-400",
      icon: jest.fn(() => <div data-testid="icon-nodes" />),
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      id: "jobs",
      name: "Total Compute Jobs",
      value: "1,284",
      status: "+12% this week",
      statusColor: "text-emerald-400",
      icon: jest.fn(() => <div data-testid="icon-jobs" />),
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      id: "earnings",
      name: "Est. Earnings",
      value: "450.0000 RIT",
      status: "Pending payout",
      statusColor: "text-amber-400",
      icon: jest.fn(() => <div data-testid="icon-earnings" />),
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ]),
}));

describe("MetricsGrid Component", () => {
  it("renders the core metrics correctly", () => {
    render(<MetricsGrid />);

    expect(screen.getByText("Active Nodes")).toBeInTheDocument();
    expect(screen.getByText("Total Compute Jobs")).toBeInTheDocument();
    expect(screen.getByText("Est. Earnings")).toBeInTheDocument();
  });

  it("displays metric values correctly", () => {
    render(<MetricsGrid />);

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("1,284")).toBeInTheDocument();
    expect(screen.getByText("450.0000 RIT")).toBeInTheDocument();
  });

  it("displays the currency correctly", () => {
    render(<MetricsGrid />);
    expect(screen.getByText(/RIT/i)).toBeInTheDocument();
  });

  it("displays status text for each metric", () => {
    render(<MetricsGrid />);

    expect(screen.getByText("Operational")).toBeInTheDocument();
    expect(screen.getByText("+12% this week")).toBeInTheDocument();
    expect(screen.getByText("Pending payout")).toBeInTheDocument();
  });

  it("renders all metrics from the hook", () => {
    render(<MetricsGrid />);

    // Should render 3 metric cards
    const metricCards = screen.getAllByText(/Active Nodes|Total Compute Jobs|Est. Earnings/);
    expect(metricCards).toHaveLength(3);
  });

  it("renders icons for each metric", () => {
    render(<MetricsGrid />);

    // Icons should be rendered (mocked as divs with testid)
    expect(screen.getByTestId("icon-nodes")).toBeInTheDocument();
    expect(screen.getByTestId("icon-jobs")).toBeInTheDocument();
    expect(screen.getByTestId("icon-earnings")).toBeInTheDocument();
  });

  it("applies correct CSS classes to metric cards", () => {
    const { container } = render(<MetricsGrid />);

    // Check for grid layout classes
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid", "grid-cols-1", "gap-6");
  });
});
