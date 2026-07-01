import { describe, it, expect } from "vitest";
import { cn, formatCompact } from "./utils";

describe("cn", () => {
  it("merges and de-duplicates Tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", false && "hidden", "font-medium")).toBe(
      "text-sm font-medium",
    );
  });
});

describe("formatCompact", () => {
  it("shortens large numbers", () => {
    expect(formatCompact(1200)).toBe("1.2K");
    expect(formatCompact(15200)).toBe("15.2K");
    expect(formatCompact(1_000_000)).toBe("1M");
  });
});
