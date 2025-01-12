import type { BlogParams } from '@/blog/types';
import Posts from '@/blog/Data/Posts';
import BlogPost from '@/blog/BlogPost';
import RenderedPost from '@/ui/Blog/RenderedPost';

export async function generateStaticParams() {
  const posts = await Posts();

  return posts.map(({ slug: postSlug }) => ({ postSlug: encodeURI(postSlug) }));
}

export default async function BlogPostPage ({
  params,
}: BlogParams) {
  const routeParams = await params;
  const slug = decodeURI(routeParams.postSlug);
  const posts = await Posts();
  const Post = posts.find(({ slug: postSlug }) => slug === postSlug) as BlogPost;

  await Post.loadContent();

  return (
    <RenderedPost { ...Post } />
  );
}
