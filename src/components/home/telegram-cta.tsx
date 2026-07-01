import Link from "next/link";
import { Send, Users, Bell } from "lucide-react";
import { Reveal } from "@/components/motion";
import { TELEGRAM } from "@/constants/site";

export function TelegramCta() {
  return (
    <section aria-labelledby="telegram-heading" className="container-shell py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-panel border border-brand-sky/25 bg-gradient-to-br from-[#08131f] to-[#0a0e1a] p-8 text-center md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.28),transparent)] blur-xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-primary-foreground">
              <Send className="h-6 w-6" aria-hidden="true" />
            </span>

            <h2
              id="telegram-heading"
              className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[34px]"
            >
              Never miss a drop.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Join our Telegram for instant alerts on every new article, prompt
              pack and tech tip — delivered the moment it goes live.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={TELEGRAM.channel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 text-[15px] font-medium text-primary-foreground transition-[filter] hover:brightness-110"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Join main channel
              </Link>
              <Link
                href={TELEGRAM.info}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border-strong px-6 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                Info channel
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-faint">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              Growing community of Malayali tech readers
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
