/**
 * Role-based access control. Pure, dependency-free maps so this can be used
 * on the server, in Server Actions, and (for role checks) at the Edge.
 */
export const ROLES = ["super_admin", "editor", "author"] as const;
export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  "article:create",
  "article:edit",
  "article:publish",
  "article:delete",
  "comment:moderate",
  "media:manage",
  "category:manage",
  "settings:manage",
  "user:manage",
] as const;
export type Permission = (typeof PERMISSIONS)[number];

const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  super_admin: PERMISSIONS, // everything
  editor: [
    "article:create",
    "article:edit",
    "article:publish",
    "article:delete",
    "comment:moderate",
    "media:manage",
    "category:manage",
  ],
  author: ["article:create", "article:edit", "media:manage"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  editor: "Editor",
  author: "Author",
};
