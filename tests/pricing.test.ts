import { describe, it, expect } from "vitest";
import { formatBDT } from "../lib/pricing";

describe("formatBDT", () => {
  it("formats integer amounts with plus", () => {
    expect(formatBDT(7500)).toBe("৳7,500+");
    expect(formatBDT(25000)).toBe("৳25,000+");
  });
  it("rounds decimals and can omit plus", () => {
    expect(formatBDT(60000.4, false)).toBe("৳60,000");
  });
  it("handles zero without plus", () => {
    expect(formatBDT(0, false)).toBe("৳0");
  });
  it("throws on invalid input", () => {
    expect(() => formatBDT(Number.NaN)).toThrow();
  });
});
