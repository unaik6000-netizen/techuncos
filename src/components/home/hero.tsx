"use client";

import Link from "next/link";
import { ArrowRight, Send, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/badge";
import { ArticleCover } from "@/components/article/article-cover";
import { staggerContainer, fadeInUp, transitions } from "@/lib/motion";
import { formatCompact } from "@/lib/utils";
import { TELEGRAM } from "@/constants/site";
import type { Article } from "@/types";

export function Hero({ featured }: { featured: Article }) {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background: brand glow + fine grid, both decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 animate-glow-drift rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.14),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="container-shell relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-sky opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-sky" />
              </span>
              Updated daily · Malayalam, English & Hindi
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-foreground"
          >
            Intelligence,
            <br />
            <span className="text-gradient">rendered clearly.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            AI, technology and digital know-how — decoded for real people, in
            your language. No jargon, no fluff. Just the good stuff, daily.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <Link href="#latest">
                Start reading
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={TELEGRAM.channel} target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4" aria-hidden="true" />
                Join the community
              </Link>
            </Button>
          </motion.div>

          <motion.dl
            variants={fadeInUp}
            className="mt-10 flex gap-8 border-t border-border pt-6"
          >
            {[
              { value: "115+", label: "Articles" },
              { value: "3", label: "Languages" },
              { value: "Daily", label: "Updates" },
            ].map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold text-foreground">
                  {s.value}
                </dd>
                <p className="text-xs text-faint">{s.label}</p>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Featured preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.slow, delay: 0.15 }}
        >
          <Link
            href={`/article/${featured.slug}`}
            className="group relative block overflow-hidden rounded-panel border border-border bg-card transition-colors duration-300 hover:border-border-strong"
          >
            <div className="absolute -inset-px -z-10 rounded-panel bg-brand-gradient opacity-20 blur-lg" />
            <ArticleCover
              category={featured.category}
              title={featured.title}
              src={featured.cover}
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
            <div className="p-6">
              <div className="flex items-center gap-2">
                <CategoryBadge slug={featured.category} />
                <span className="inline-flex items-center gap-1 text-xs font-medium text-warning">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  Featured
                </span>
              </div>
              <h2
                {...(featured.lang ? { lang: featured.lang } : {})}
                className="mt-3 font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-sky"
              >
                {featured.title}
              </h2>
              <p
                {...(featured.lang ? { lang: featured.lang } : {})}
                className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground"
              >
                {featured.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-faint">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {featured.readTime} min read
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {formatCompact(featured.views)} views
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
