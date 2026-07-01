import Link from "next/link";
import {
  FileText,
  FileCheck2,
  FilePen,
  FolderTree,
  MessageSquare,
  Mail,
  PlusCircle,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { AnalyticsOverview } from "@/components/admin/analytics-overview";
import { QuickActions } from "@/components/admin/quick-actions";
import { ActivityFeed } from "@/components/admin/activity-feed";
import { FadeIn } from "@/components/motion";
import { getAdminStats } from "@/data/admin";
import { formatCompact } from "@/lib/utils";

export default function AdminDashboardPage() {
  const stats = getAdminStats();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Welcome header */}
      <FadeIn className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-faint">{today}</p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">
            Welcome back, Techuncos
          </h1>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-gradient px-5 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
        >
          <PlusCircle className="h-4 w-4" aria-hidden="true" />
          New article
        </Link>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total articles" value={stats.totalArticles} icon={FileText} />
        <StatCard label="Published" value={stats.published} icon={FileCheck2} />
        <StatCard label="Drafts" value={stats.drafts} icon={FilePen} />
        <StatCard label="Categories" value={stats.categories} icon={FolderTree} />
        <StatCard
          label="Pending"
          value={stats.commentsPending}
          icon={MessageSquare}
          hint="comments"
        />
        <StatCard
          label="Subscribers"
          value={formatCompact(stats.subscribers)}
          icon={Mail}
          deltaPct={8}
        />
      </div>

      {/* Analytics + activity */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <AnalyticsOverview stats={stats} />
        <ActivityFeed />
      </div>

      {/* Quick actions */}
      <section>
        <h2 className="mb-3 font-display text-base font-semibold text-foreground">
          Quick actions
        </h2>
        <QuickActions />
      </section>
    </div>
  );
}
