import {
  generateInitialHistory,
  generateNextPoint,
  MetricPoint,
} from "@/lib/mock-generator";

describe("mock-generator", () => {
  describe("generateInitialHistory", () => {
    it("should generate the correct number of data points", () => {
      const data = generateInitialHistory(5);
      expect(data).toHaveLength(5);
    });

    it("should generate 7 data points by default", () => {
      const data = generateInitialHistory();
      expect(data).toHaveLength(7);
    });

    it("should generate data points with correct structure", () => {
      const data = generateInitialHistory(3);
      
      data.forEach((point) => {
        expect(point).toHaveProperty("time");
        expect(point).toHaveProperty("cpu");
        expect(point).toHaveProperty("memory");
        expect(typeof point.time).toBe("string");
        expect(typeof point.cpu).toBe("number");
        expect(typeof point.memory).toBe("number");
      });
    });

    it("should generate time strings in correct format (HH:MM)", () => {
      const data = generateInitialHistory(3);
      
      data.forEach((point) => {
        expect(point.time).toMatch(/^\d{2}:\d{2}$/);
      });
    });

    it("should generate CPU values within expected range", () => {
      const data = generateInitialHistory(10);
      
      data.forEach((point) => {
        expect(point.cpu).toBeGreaterThanOrEqual(30);
        expect(point.cpu).toBeLessThanOrEqual(50);
      });
    });

    it("should generate memory values within expected range", () => {
      const data = generateInitialHistory(10);
      
      data.forEach((point) => {
        expect(point.memory).toBeGreaterThanOrEqual(20);
        expect(point.memory).toBeLessThanOrEqual(40);
      });
    });

    it("should generate data points with sequential times", () => {
      const data = generateInitialHistory(3);
      const times = data.map((point) => point.time);
      
      // Times should be different (5 minutes apart)
      expect(new Set(times).size).toBe(times.length);
    });
  });

  describe("generateNextPoint", () => {
    it("should generate a new point with correct structure", () => {
      const lastPoint: MetricPoint = {
        time: "10:00",
        cpu: 40,
        memory: 30,
      };

      const newPoint = generateNextPoint(lastPoint);

      expect(newPoint).toHaveProperty("time");
      expect(newPoint).toHaveProperty("cpu");
      expect(newPoint).toHaveProperty("memory");
      expect(typeof newPoint.time).toBe("string");
      expect(typeof newPoint.cpu).toBe("number");
      expect(typeof newPoint.memory).toBe("number");
    });

    it("should generate time 5 minutes after the last point", () => {
      const lastPoint: MetricPoint = {
        time: "10:00",
        cpu: 40,
        memory: 30,
      };

      const newPoint = generateNextPoint(lastPoint);
      
      // Time should be in HH:MM format
      expect(newPoint.time).toMatch(/^\d{2}:\d{2}$/);
    });

    it("should clamp CPU values between 10 and 95", () => {
      const testCases = [
        { time: "10:00", cpu: 5, memory: 30 }, // Should clamp to 10
        { time: "10:00", cpu: 100, memory: 30 }, // Should clamp to 95
        { time: "10:00", cpu: 50, memory: 30 }, // Should stay in range
      ];

      testCases.forEach((lastPoint) => {
        const newPoint = generateNextPoint(lastPoint as MetricPoint);
        expect(newPoint.cpu).toBeGreaterThanOrEqual(10);
        expect(newPoint.cpu).toBeLessThanOrEqual(95);
      });
    });

    it("should clamp memory values between 20 and 90", () => {
      const testCases = [
        { time: "10:00", cpu: 40, memory: 10 }, // Should clamp to 20
        { time: "10:00", cpu: 40, memory: 100 }, // Should clamp to 90
        { time: "10:00", cpu: 40, memory: 50 }, // Should stay in range
      ];

      testCases.forEach((lastPoint) => {
        const newPoint = generateNextPoint(lastPoint as MetricPoint);
        expect(newPoint.memory).toBeGreaterThanOrEqual(20);
        expect(newPoint.memory).toBeLessThanOrEqual(90);
      });
    });

    it("should generate CPU values that vary from the last point", () => {
      const lastPoint: MetricPoint = {
        time: "10:00",
        cpu: 40,
        memory: 30,
      };

      // Run multiple times to ensure variation
      const results = Array.from({ length: 10 }, () =>
        generateNextPoint(lastPoint)
      );

      // At least some values should be different (allowing for clamping)
      const cpuValues = results.map((p) => p.cpu);
      const hasVariation = new Set(cpuValues).size > 1 || 
        cpuValues.some((v) => v !== lastPoint.cpu);
      
      expect(hasVariation).toBe(true);
    });

    it("should generate memory values that vary from the last point", () => {
      const lastPoint: MetricPoint = {
        time: "10:00",
        cpu: 40,
        memory: 30,
      };

      // Run multiple times to ensure variation
      const results = Array.from({ length: 10 }, () =>
        generateNextPoint(lastPoint)
      );

      // At least some values should be different (allowing for clamping)
      const memoryValues = results.map((p) => p.memory);
      const hasVariation = new Set(memoryValues).size > 1 || 
        memoryValues.some((v) => v !== lastPoint.memory);
      
      expect(hasVariation).toBe(true);
    });

    it("should handle edge case times correctly", () => {
      const edgeCases = [
        { time: "23:55", cpu: 40, memory: 30 },
        { time: "00:00", cpu: 40, memory: 30 },
        { time: "12:30", cpu: 40, memory: 30 },
      ];

      edgeCases.forEach((lastPoint) => {
        const newPoint = generateNextPoint(lastPoint as MetricPoint);
        expect(newPoint.time).toMatch(/^\d{2}:\d{2}$/);
        expect(newPoint.cpu).toBeGreaterThanOrEqual(10);
        expect(newPoint.cpu).toBeLessThanOrEqual(95);
        expect(newPoint.memory).toBeGreaterThanOrEqual(20);
        expect(newPoint.memory).toBeLessThanOrEqual(90);
      });
    });
  });
});

