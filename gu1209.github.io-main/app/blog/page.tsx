import { getAllPosts, BlogPost } from '@/lib/blog';
import BlogListClient from './BlogListClient';

export const metadata = {
  title: '博客 - Kris Gu',
  description: '个人博客 — 记录思考、分享技术心得',
};

export default function BlogPage() {
  const posts = getAllPosts();
  // Serialize for client component (remove html from server data, client will re-render)
  const serialized = posts.map(p => ({
    slug: p.slug,
    frontmatter: p.frontmatter,
    content: p.content,
  }));

  return <BlogListClient posts={serialized} />;
}
