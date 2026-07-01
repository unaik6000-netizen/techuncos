import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How we collect, use and protect your information."
    >
      <p>
        This policy explains what data {SITE.name} collects and how it is used.
        By using this website you agree to the practices described here.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect the minimum necessary: the name and message you provide when
        commenting, the email address you submit to our newsletter, and
        anonymous usage data (pages viewed, device type) via analytics. We do
        not require you to create an account to read articles.
      </p>

      <h2>Cookies &amp; advertising</h2>
      <p>
        We use cookies to remember preferences and to measure traffic. Third
        parties, including Google, may use cookies to serve ads based on your
        prior visits to this and other websites. Google&apos;s use of
        advertising cookies enables it and its partners to serve ads to you.
        You can opt out of personalised advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        .
      </p>

      <h2>Analytics</h2>
      <p>
        We use analytics tools to understand how the site is used, in aggregate.
        This data is not used to personally identify you.
      </p>

      <h2>Data retention &amp; your rights</h2>
      <p>
        You may request removal of your comment or unsubscribe from the
        newsletter at any time by contacting us. We retain data only as long as
        needed for the purpose it was collected.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children under 13, and we do not knowingly
        collect their data.
      </p>

      <h2>Changes &amp; contact</h2>
      <p>
        We may update this policy; material changes will be posted here. Questions?
        Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or visit our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </PageShell>
  );
}
