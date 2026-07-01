import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About ${SITE.name} — a Malayalam-first publication for AI, technology and digital know-how.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="About Techuncos"
      intro="A premium, Malayalam-first publication decoding AI, technology and digital life for real people."
    >
      <p>
        Techuncos exists to make technology genuinely understandable — in the
        language you think in. We cover artificial intelligence, gadgets and
        software, digital tips, and step-by-step tutorials, with a focus on
        clarity over jargon.
      </p>
      <h2>What we cover</h2>
      <p>
        AI tools and prompt engineering, technology news and how-tos, digital
        privacy and productivity, and practical guides you can act on today.
        New articles are published daily in Malayalam, with English and Hindi
        support.
      </p>
      <h2>Our promise</h2>
      <p>
        Original, honest, and useful. We don&apos;t publish clickbait, and we
        don&apos;t link to piracy or anything that puts our readers at risk —
        only legitimate, safe resources.
      </p>
      <h2>Get in touch</h2>
      <p>
        Questions, tips or feedback? Visit our{" "}
        <Link href="/contact">contact page</Link> or message us on Telegram.
      </p>
    </PageShell>
  );
}
