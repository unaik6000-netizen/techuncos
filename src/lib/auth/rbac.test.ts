import { describe, it, expect } from "vitest";
import { hasPermission, isRole } from "./rbac";

describe("rbac", () => {
  it("grants super_admin every permission", () => {
    expect(hasPermission("super_admin", "user:manage")).toBe(true);
    expect(hasPermission("super_admin", "settings:manage")).toBe(true);
  });

  it("restricts editors from settings and users", () => {
    expect(hasPermission("editor", "article:publish")).toBe(true);
    expect(hasPermission("editor", "settings:manage")).toBe(false);
    expect(hasPermission("editor", "user:manage")).toBe(false);
  });

  it("restricts authors to their own content actions", () => {
    expect(hasPermission("author", "article:create")).toBe(true);
    expect(hasPermission("author", "article:publish")).toBe(false);
    expect(hasPermission("author", "article:delete")).toBe(false);
  });

  it("validates role strings", () => {
    expect(isRole("editor")).toBe(true);
    expect(isRole("root")).toBe(false);
    expect(isRole(null)).toBe(false);
  });
});
