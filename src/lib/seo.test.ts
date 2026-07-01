import { describe, it, expect } from "vitest";
import { escapeXml, absoluteUrl, breadcrumbSchema } from "./seo";

describe("escapeXml", () => {
  it("escapes XML-significant characters", () => {
    expect(escapeXml(`a & b < c > d "e" 'f'`)).toBe(
      "a &amp; b &lt; c &gt; d &quot;e&quot; &apos;f&apos;",
    );
  });
});

describe("absoluteUrl", () => {
  it("prefixes a leading-slash path with the site origin", () => {
    expect(absoluteUrl("/article/x")).toMatch(/\/article\/x$/);
  });
  it("adds a missing leading slash", () => {
    expect(absoluteUrl("article/x")).toMatch(/\/article\/x$/);
  });
});

describe("breadcrumbSchema", () => {
  it("emits ordered ListItem positions", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "AI", path: "/ai" },
    ]) as { itemListElement: { position: number; name: string }[] };
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[1].name).toBe("AI");
  });
});
