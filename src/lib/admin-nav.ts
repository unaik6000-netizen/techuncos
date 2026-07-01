import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tags,
  Image,
  MessageSquare,
  Mail,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Optional badge count (e.g. pending comments). */
  badgeKey?: "commentsPending";
}

export interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

/** Grouped sidebar navigation — single source of truth for the admin shell. */
export const ADMIN_NAV: AdminNavSection[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Content",
    items: [
      { label: "Articles", href: "/admin/articles", icon: FileText },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Tags", href: "/admin/tags", icon: Tags },
      { label: "Media", href: "/admin/media", icon: Image },
    ],
  },
  {
    title: "Community",
    items: [
      {
        label: "Comments",
        href: "/admin/comments",
        icon: MessageSquare,
        badgeKey: "commentsPending",
      },
      { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
    ],
  },
  {
    title: "Configure",
    items: [
      { label: "SEO", href: "/admin/seo", icon: Search },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];
