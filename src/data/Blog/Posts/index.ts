import { promises as Fs } from 'fs';
import path from 'path';
import BlogPost from '@/blog/BlogPost';

const POSTS_PATH = path.join(process.cwd(), 'src', 'data', 'Blog', 'Posts');

const postCache: {
  posts: BlogPost[],
} = {
  posts: [],
};

export default async function Posts (): Promise<BlogPost[]> {
  if (!postCache.posts.length) {
    const directory = await Fs.readdir(POSTS_PATH);

    // Get all posts sorted by created date descending
    postCache.posts = (await Promise.all(
      directory
        .filter((file) => file !== 'index.ts')
        .map(async (file) => BlogPost.fromPath(path.join(POSTS_PATH, file)))
    )).sort((
      a: BlogPost,
      b: BlogPost,
    ) => b.created.getTime() - a.created.getTime());
  }

  return postCache.posts;
}

export const DEFAULT_POST = new BlogPost('no_path', {
  created: new Date().toISOString(),
  slug: 'no-content',
  title: 'No Content',
});

DEFAULT_POST.content = 'no blog posts';
