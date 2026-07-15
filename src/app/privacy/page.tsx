// ─── Privacy policy (/privacy) ────────────────────────────────────────────────
// Plain-language policy covering exactly what the site does with personal
// information: contact-form submissions are delivered by email and never stored
// in a database, calls go straight to the shop, and the only third-party
// embeds are the Google reviews widget and the Google Maps service-area map.
// Update the "Last updated" date whenever data handling changes.

import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, mailHref, telHref } from "@/lib/business";
import { PageHeader } from "@/components/sections/PageHeader";
import { BreadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${BUSINESS.name} collects, uses, and protects your personal information when you call us or use this website.`,
  path: "/privacy",
});

const LAST_UPDATED = "July 15, 2026";

const headingCls = "mt-12 font-bold text-2xl text-[var(--color-heading)] first:mt-0";
const bodyCls = "mt-4 text-base leading-relaxed text-[var(--color-body)]";
const listCls = "mt-4 space-y-3";
const itemCls = "flex items-start gap-3 text-base leading-relaxed text-[var(--color-body)]";
const linkCls =
  "font-semibold text-[var(--color-accent-deep)] underline underline-offset-2 hover:text-[var(--color-heading)] rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";

function Bullet() {
  return <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />;
}

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <PageHeader
        showStatus={false}
        title={
          <>
            Privacy policy.
            <br />
            <span className="text-[var(--color-accent)]">Short and honest.</span>
          </>
        }
        intro={`We collect the minimum we need to come help you, and we never sell it. Last updated ${LAST_UPDATED}.`}
      />

      <section className="bg-[var(--color-page)] py-16 lg:py-24" aria-label="Privacy policy details">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className={headingCls}>What we collect</h2>
          <p className={bodyCls}>
            When you send a message through our <Link href="/contact" className={linkCls}>contact form</Link>,
            we ask for your name, a phone number, an optional email address, and your message. When you call
            us, we learn your phone number and whatever you choose to tell us about your vehicle and location
            so we can dispatch help.
          </p>
          <p className={bodyCls}>
            This website does not use advertising trackers or analytics cookies, and it does not run
            marketing pixels.
          </p>

          <h2 className={headingCls}>How we use it</h2>
          <ul className={listCls} aria-label="How we use your information">
            <li className={itemCls}>
              <Bullet />
              To respond to your enquiry, quote a price, and send a technician to you.
            </li>
            <li className={itemCls}>
              <Bullet />
              To follow up on a job we did for you, if something needs a second visit.
            </li>
            <li className={itemCls}>
              <Bullet />
              Nothing else. We do not sell, rent, or share your information for marketing.
            </li>
          </ul>

          <h2 className={headingCls}>Where it goes</h2>
          <p className={bodyCls}>
            Contact-form submissions are delivered straight to our business email inbox through a transactional
            email provider. They are not saved in a database on this website. Our website is hosted by a cloud
            provider, and standard server logs (such as IP addresses) may be kept briefly for security.
          </p>
          <p className={bodyCls}>
            Two parts of this site are provided by third parties: the customer reviews section (which displays
            our public Google reviews) and the service-area map (Google Maps). Loading those sections sends
            standard web requests to those providers, subject to their own privacy policies.
          </p>

          <h2 className={headingCls}>How long we keep it</h2>
          <p className={bodyCls}>
            We keep enquiry emails and job records only as long as we need them for bookkeeping, warranty
            questions, and tax requirements, then delete them.
          </p>

          <h2 className={headingCls}>Your choices</h2>
          <p className={bodyCls}>
            You can ask us at any time to show you the information we hold about you, correct it, or delete it.
            We follow the Personal Information Protection and Electronic Documents Act (PIPEDA), Canada&rsquo;s
            federal privacy law.
          </p>

          <h2 className={headingCls}>Questions?</h2>
          <p className={bodyCls}>
            Email us at{" "}
            <a href={mailHref} className={linkCls}>
              {BUSINESS.email}
            </a>{" "}
            or call{" "}
            <a href={telHref} className={linkCls} aria-label={`Call ${BUSINESS.shortName} at ${BUSINESS.phoneDisplay}`}>
              {BUSINESS.phoneDisplay}
            </a>
            . A real person answers.
          </p>
        </div>
      </section>
    </>
  );
}
