// A list of blog guides, linked with their excerpt. Extracted from the
// duplicated "Worth reading first" blocks on the service and sub-service pages
// so the home page can carry the same pattern without a third copy.
//
// Why the home page renders this at all: it takes ~73% of the site's search
// impressions and previously linked only to service hubs, leaving every post
// two hops away behind /blog (8 impressions). Blog posts were going four weeks
// between crawls and one had never been crawled at all. Crawl priority follows
// internal links, so the guides need a path from the page Google actually visits.
import Link from "next/link";

export interface GuideLinkPost {
  slug: string;
  title: string;
  excerpt: string;
}

export function GuideLinks({
  heading,
  posts,
}: {
  /** Omit where the surrounding section already carries its own heading —
   *  passing one there would put an h3 directly under the section's h2 for no
   *  informational gain. */
  heading?: string;
  posts: readonly GuideLinkPost[];
}) {
  if (posts.length === 0) return null;

  return (
    <div>
      {heading && <h3 className="mb-5 font-bold text-lg text-[var(--color-heading)]">{heading}</h3>}
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group inline-flex items-baseline gap-2 text-base font-semibold text-[var(--color-accent-deep)] underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
            >
              {post.title}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--color-body)]">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
