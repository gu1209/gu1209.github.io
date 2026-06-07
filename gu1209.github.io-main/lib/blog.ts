import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogFrontmatter {
  title: string;
  titleEn?: string;
  date: string;
  tags: string[];
  excerpt: string;
  excerptEn?: string;
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  html: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** Get all blog posts sorted by date (newest first). Filters drafts in production builds. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const html = marked.parse(content) as string;
    const slug = file.replace(/\.md$/, '');
    return { slug, frontmatter: data as BlogFrontmatter, content, html };
  });

  // In production builds, filter out drafts
  const isDev = process.env.NODE_ENV === 'development';
  const filtered = isDev ? posts : posts.filter(p => !p.frontmatter.draft);

  // Sort by date descending
  filtered.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  return filtered;
}

/** Get a single post by slug */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;
  return { slug, frontmatter: data as BlogFrontmatter, content, html };
}

/** Get all slugs for static generation */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
