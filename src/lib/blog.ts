// Server-only Markdown blog loader. Reads content/blog/*.md at build time,
// parses YAML frontmatter (gray-matter) and renders the body to HTML (marked).
// Mirrors src/lib/services.ts so pages/sitemap treat posts like services.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface PostFaq {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  keywords: string[];
  date: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD (falls back to date)
  relatedService: string;
  faqs: PostFaq[];
  html: string;
  readingMinutes: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// YAML may parse a bare date as a JS Date; normalise anything to YYYY-MM-DD.
function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function loadPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file): Post => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const html = marked.parse(content, { async: false }) as string;
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const date = isoDate(data.date);
    return {
      slug,
      title: String(data.title),
      seoTitle: String(data.seoTitle),
      description: String(data.description),
      excerpt: String(data.excerpt),
      keywords: (data.keywords ?? []) as string[],
      date,
      updated: data.updated ? isoDate(data.updated) : date,
      relatedService: String(data.relatedService),
      faqs: (data.faqs ?? []) as PostFaq[],
      html,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    };
  });
  // Newest first.
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const POSTS: Post[] = loadPosts();
export const POST_SLUGS: string[] = POSTS.map((p) => p.slug);
export const getPost = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug);
