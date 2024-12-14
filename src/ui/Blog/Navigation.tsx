import Link from 'next/link';
import Posts, { DEFAULT_POST } from '@/data/Blog/Posts';
import BlogPost from '@/blog/BlogPost';

export default async function Navigation () {
  const posts = await Posts();
  const links = (posts.length ? posts : [DEFAULT_POST]).map((
    post: BlogPost,
    idx: number,
  ) => (
    <li key={ idx }>
      <Link href={ `/blog/${post.slug}` }>{ post.title }</Link>
    </li>
  ));

  return (
    <ol>{ links }</ol>
  );
}
