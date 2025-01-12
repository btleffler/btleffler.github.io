import type { Metadata } from 'next';
import type { BlogParams } from '@/blog/types';
import BlogLayout from '@/ui/Blog/BlogLayout';
import Posts, { MappedByDate } from '@/blog/Data/Posts';
import BlogPost from '@/blog/BlogPost';

export async function generateMetadata (
  { params }: BlogParams
): Promise<Metadata> {
  const routeParams = await params;
  const slug = decodeURI(routeParams.postSlug);

  return {
    title: `Benjamin Leffler - ${slug}`,
    description: slug,
  };
}

export default async function RootLayout({
  children,
  params,
}: BlogParams) {
  const routeParams = await params;
  const postSlug = decodeURI(routeParams.postSlug);

  const allPosts = await Posts();
  const { posts, total } = await MappedByDate();
  const Post = allPosts.find(({ slug }) => slug === postSlug) as BlogPost;

  return (
    <BlogLayout
      posts={ posts }
      Post={ Post }
      total={ total }>
      { children }
    </BlogLayout>
  );
}
