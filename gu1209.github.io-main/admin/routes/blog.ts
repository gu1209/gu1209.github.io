import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { requireAuth } from './auth';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const blogRouter = Router();
blogRouter.use(requireAuth);

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// GET /api/blog — list all posts
blogRouter.get('/', (_req: Request, res: Response) => {
  if (!fs.existsSync(BLOG_DIR)) {
    res.json([]);
    return;
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ''),
      frontmatter: data,
    };
  });

  // Sort by date descending
  posts.sort((a, b) => {
    const da = (a.frontmatter as any).date || '';
    const db = (b.frontmatter as any).date || '';
    return new Date(db).getTime() - new Date(da).getTime();
  });

  res.json(posts);
});

// GET /api/blog/:slug — get a single post
blogRouter.get('/:slug', (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: '文章不存在' });
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  res.json({ slug, frontmatter: data, content });
});

// POST /api/blog — create a new post
blogRouter.post('/', (req: Request, res: Response) => {
  const { slug, frontmatter, content } = req.body;

  if (!slug || !frontmatter || !content) {
    res.status(400).json({ error: '缺少必要字段: slug, frontmatter, content' });
    return;
  }

  // Validate slug format
  if (!/^[a-zA-Z0-9\-_]+$/.test(slug)) {
    res.status(400).json({ error: 'slug 只能包含字母、数字、连字符和下划线' });
    return;
  }

  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    res.status(409).json({ error: '该 slug 已存在' });
    return;
  }

  try {
    const markdown = matter.stringify(content, frontmatter);
    fs.writeFileSync(filePath, markdown, 'utf-8');
    res.json({ success: true, slug, message: '文章创建成功' });
  } catch (err: any) {
    res.status(500).json({ error: `创建失败: ${err.message}` });
  }
});

// PUT /api/blog/:slug — update a post
blogRouter.put('/:slug', (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const { frontmatter, content, newSlug } = req.body;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: '文章不存在' });
    return;
  }

  try {
    const markdown = matter.stringify(content, frontmatter);

    // Handle slug rename
    if (newSlug && newSlug !== slug) {
      const newPath = path.join(BLOG_DIR, `${newSlug}.md`);
      if (fs.existsSync(newPath)) {
        res.status(409).json({ error: '目标 slug 已存在' });
        return;
      }
      fs.unlinkSync(filePath);
      fs.writeFileSync(newPath, markdown, 'utf-8');
      res.json({ success: true, slug: newSlug, message: '文章更新成功' });
    } else {
      fs.writeFileSync(filePath, markdown, 'utf-8');
      res.json({ success: true, slug, message: '文章更新成功' });
    }
  } catch (err: any) {
    res.status(500).json({ error: `更新失败: ${err.message}` });
  }
});

// DELETE /api/blog/:slug — delete a post
blogRouter.delete('/:slug', (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: '文章不存在' });
    return;
  }

  try {
    fs.unlinkSync(filePath);
    res.json({ success: true, message: '文章已删除' });
  } catch (err: any) {
    res.status(500).json({ error: `删除失败: ${err.message}` });
  }
});
