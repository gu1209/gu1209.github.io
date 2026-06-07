import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import BlogDetailClient from './BlogDetailClient';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-gray-500 mb-4">文章不存在</p>
          <a href="/blog/" className="text-primary-600 hover:underline">返回博客列表</a>
        </div>
      </div>
    );
  }

  const serialized = {
    slug: post.slug,
    frontmatter: post.frontmatter,
    html: post.html,
  };

  return <BlogDetailClient post={serialized} />;
}
