import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { FOOTER_LINKS } from "@/constants/navigation";
import { SITE, SOCIALS } from "@/constants/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-subtle">
      <div className="container-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline}
            </p>
            <p
              lang="ml"
              className="mt-1 max-w-xs text-sm leading-relaxed text-faint"
            >
              {SITE.taglineMl}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-xs font-medium uppercase tracking-wider text-faint">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-xs font-medium uppercase tracking-wider text-faint">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-faint">
              Connect
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-sky/40 hover:text-brand-sky"
                >
                  <s.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-faint" aria-hidden="true" />
                {SITE.email}
              </a>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-faint" aria-hidden="true" />
                +91 {SITE.whatsapp}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 rule-gradient" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Techuncos. All rights reserved.</p>
          <p>Made in Kerala · Malayalam-first</p>
        </div>
      </div>
    </footer>
  );
}
