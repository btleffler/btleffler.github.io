import { CurrentPost } from '@/blog/Data/Posts';
import RenderedPost from '@/ui/Blog/RenderedPost';

export default async function BlogHome () {
  const Post = await CurrentPost();

  await Post.loadContent();

  return (
    <RenderedPost { ...Post } />
  );
}
