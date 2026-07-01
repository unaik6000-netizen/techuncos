import type { Metadata } from "next";
import { Mail, MessageCircle, Send } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { buildMetadata } from "@/lib/seo";
import { SITE, TELEGRAM, SOCIALS } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${SITE.name} — email, WhatsApp, Telegram and social channels.`,
  path: "/contact",
});

const CONTACTS = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: `+91 ${SITE.whatsapp}`,
    href: SITE.whatsappUrl,
  },
  { icon: Send, label: "Telegram", value: TELEGRAM.handle, href: TELEGRAM.channel },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch"
      intro="We'd love to hear from you — questions, tips, feedback or partnership ideas."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {CONTACTS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-2 rounded-card border border-border bg-card p-5 no-underline transition-colors hover:border-brand-sky/40"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-brand-sky">
              <c.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs uppercase tracking-wider text-faint">
              {c.label}
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-brand-sky">
              {c.value}
            </span>
          </a>
        ))}
      </div>

      <h2>Follow us</h2>
      <p>
        We&apos;re active across social platforms — follow along for daily
        updates:
      </p>
      <div className="flex flex-wrap gap-2 not-prose">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:border-brand-sky/40 hover:text-brand-sky"
          >
            <s.icon className="h-4 w-4" aria-hidden="true" />
            {s.label}
          </a>
        ))}
      </div>
    </PageShell>
  );
}
