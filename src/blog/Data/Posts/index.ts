import { promises as Fs } from 'fs';
import path from 'path';
import BlogPost from '@/blog/BlogPost';
import type { LinksMappedByDate } from '@/blog/types';

const IGNORED = ['index.ts', '.DS_Store'];

const DEFAULT_POST: BlogPost = new BlogPost('no_path', {
  created: new Date().toISOString(),
  slug: 'no-content',
  title: 'No Content',
});

DEFAULT_POST.content = 'no blog posts';

const POST_MONTH_LOCALE: Intl.LocalesArgument = undefined;
const POST_MONTH_OPTIONS: Intl.DateTimeFormatOptions = { month: 'long' };
const POSTS_PATH = path.join(process.cwd(), 'src', 'blog', 'Data', 'Posts');

const postCache: {
  posts: BlogPost[],
  mappedByDate: LinksMappedByDate[],
  total: number,
} = {
  posts: [],
  mappedByDate: [],
  total: 0,
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
        .filter((file) => !IGNORED.includes(file))
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

  postCache.total = postCache.posts.length;

  return postCache.posts;
}

export async function MappedByDate (): Promise<{
  posts: LinksMappedByDate[],
  total: number,
}> {
  if (postCache.mappedByDate.length) {
    return {
      posts: postCache.mappedByDate,
      total: postCache.total,
    };
  }

  const posts = await Posts();

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
      monthIndex,
      posts: [],
    };

    // Map the post to it's [year].months[month].posts
    postCache.mappedByDate[year].months[monthIndex].posts[idx] = {
      title: post.title,
      slug: post.slug,
    };
  });

  postCache.mappedByDate = postCache.mappedByDate.reverse();

  // If no posts, return the default
  if (!postCache.mappedByDate.length) {
    const now = new Date();
    const yearIndex = now.getFullYear();
    const year = yearIndex;
    const monthIndex = now.getMonth();
    const month = monthString(now);

    postCache.mappedByDate[yearIndex] = {
      year,
      months: [],
    };

    postCache.mappedByDate[yearIndex].months[monthIndex] = {
      month,
      monthIndex,
      posts: [{
        slug: DEFAULT_POST.slug,
        title: DEFAULT_POST.title,
      }],
    };
  }

  return {
    posts: postCache.mappedByDate,
    total: postCache.total,
  };
}

export async function CurrentPost (): Promise<BlogPost> {
  const posts = await Posts();

  return posts[0];
}
