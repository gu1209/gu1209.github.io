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

/** Extract plain-text excerpt from first paragraph of markdown content */
function extractExcerpt(content: string, maxLen = 160): string {
  const plain = content
    .replace(/^#.*$/gm, '')           // remove headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links → text
    .replace(/[*_~`>|]/g, '')          // remove formatting chars
    .replace(/\n\s*\n/g, '\n')         // collapse blank lines
    .trim();
  const firstPara = plain.split('\n')[0] || '';
  if (firstPara.length <= maxLen) return firstPara;
  return firstPara.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

/** Normalize frontmatter data from various formats (Obsidian, standard) */
function normalizeFrontmatter(data: Record<string, any>, filename: string): BlogFrontmatter {
  // Title: support 'title', 'aliases' (Obsidian), or derive from filename
  const title = data.title || (Array.isArray(data.aliases) ? data.aliases[0] : data.aliases) ||
    filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ').replace(/\.md$/, '');

  // Date: support 'date', 'created', 'publishDate', or file creation time
  let date = data.date || data.created || data.publishDate || '';
  if (!date || date === '') {
    // Try to extract date from filename (YYYY-MM-DD-xxx.md)
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
  }
  // Ensure YYYY-MM-DD format
  if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}/)) {
    date = date.slice(0, 10);
  }

  // Tags: support arrays, comma-separated, space-separated, or Obsidian's [[links]]
  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags.map((t: any) => String(t).replace(/^#/, '').trim());
  } else if (typeof data.tags === 'string') {
    tags = data.tags.split(/[,，]\s*/).map(t => t.replace(/^#/, '').trim()).filter(Boolean);
  }

  // Draft: support 'draft', 'published' (inverted), 'publish' (inverted)
  let draft = false;
  if (data.draft !== undefined) draft = Boolean(data.draft);
  else if (data.published === false) draft = true;
  else if (data.publish === 'draft') draft = true;

  // Excerpt: use provided or auto-extract
  const excerpt = data.excerpt || extractExcerpt(data.content || '');
  const excerptEn = data.excerptEn || undefined;

  return { title, titleEn: data.titleEn, date, tags, excerpt, excerptEn, draft };
}

/** Parse a single markdown file into a BlogPost */
function parsePost(filePath: string): BlogPost | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const filename = path.basename(filePath);
  const slug = filename.replace(/\.md$/, '');

  // Merge raw content into data for excerpt extraction
  const frontmatter = normalizeFrontmatter({ ...data, content }, filename);
  const html = marked.parse(content) as string;

  return { slug, frontmatter, content, html };
}

/** Get all blog posts sorted by date (newest first). Filters drafts in production builds. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  const posts = files
    .map(file => parsePost(path.join(BLOG_DIR, file)))
    .filter((p): p is BlogPost => p !== null);

  // In production builds, filter out drafts
  const isDev = process.env.NODE_ENV === 'development';
  const filtered = isDev ? posts : posts.filter(p => !p.frontmatter.draft);

  // Sort by date descending
  filtered.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  return filtered;
}

/** Get a single post by slug */
export function getPostBySlug(slug: string): BlogPost | null {
  return parsePost(path.join(BLOG_DIR, `${slug}.md`));
}

/** Get all slugs for static generation */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
