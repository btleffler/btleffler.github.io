import type { BlogParams } from '@/blog/types';
import MuiMarkdown from 'mui-markdown';
import Posts from '@/data/Blog/Posts';
import BlogPost from '@/blog/BlogPost';

export async function generateStaticParams() {
  const posts = await Posts();

  return posts.map(({ slug: postSlug }) => ({ postSlug }));
}

export default async function BlogPostPage (
  { params }: BlogParams
) {
  const slug = (await params).postSlug;
  const Post = (await Posts()).find(({ slug: postSlug }) => slug === postSlug) as BlogPost;
  const content = await Post.loadContent();

  return (
    <>
      <h1>{ Post.title }</h1>
      <span>Hello from &apos;{ Post.slug }&apos;</span>
      <p>{ Post.created.toLocaleDateString() } | { Post.updated?.toLocaleDateString() }</p>
      <MuiMarkdown>{ content }</MuiMarkdown>
    </>
  );
}
