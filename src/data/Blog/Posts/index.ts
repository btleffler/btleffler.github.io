import { promises as Fs } from 'fs';
import path from 'path';
import BlogPost from '@/blog/BlogPost';
import type { PostsMappedByDate } from '@/data/types';

const DEFAULT_POST: BlogPost = new BlogPost('no_path', {
  created: new Date().toISOString(),
  slug: 'no-content',
  title: 'No Content',
});

DEFAULT_POST.content = 'no blog posts';

const POST_MONTH_LOCALE: Intl.LocalesArgument = undefined;
const POST_MONTH_OPTIONS: Intl.DateTimeFormatOptions = { month: 'long' };
const POSTS_PATH = path.join(process.cwd(), 'src', 'data', 'Blog', 'Posts');

const postCache: {
  posts: BlogPost[],
  mappedByDate: PostsMappedByDate[]
} = {
  posts: [],
  mappedByDate: [],
};

function monthString (date: Date): string {
  return date.toLocaleDateString(POST_MONTH_LOCALE, POST_MONTH_OPTIONS);
}

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

    // If there are still no posts, put the default in cache
    if (!postCache.posts.length) {
      postCache.posts = [DEFAULT_POST];
    }
  }

  return postCache.posts;
}

export async function MappedByDate (
  plainObject: boolean = true,
): Promise<PostsMappedByDate[]> {
  if (postCache.mappedByDate.length) {
    return postCache.mappedByDate;
  }

  await Posts();

  const posts = postCache.posts;

  posts.forEach(async (post, idx) => {
    const { created } = post;
    const month = monthString(created);
    const monthIndex = created.getMonth();
    const year = created.getFullYear();

    // Default the year level
    postCache.mappedByDate[year] = postCache.mappedByDate[year] || {
      year,
      months: [],
    };

    // Default the month level
    postCache.mappedByDate[year].months[monthIndex] = postCache.mappedByDate[year].months[monthIndex] || {
      month,
      posts: [],
    };

    // Map the post to it's [year].months[month].posts
    postCache.mappedByDate[year].months[monthIndex].posts[idx] = plainObject ?
      await post.serialized() :
      post;
  });

  postCache.mappedByDate = postCache.mappedByDate.reverse();

  return postCache.mappedByDate;
}
