import BlogPost from '@/blog/BlogPost';

export type PostsMappedByDate = {
  year: string,
  months: {
    month: string,
    posts: BlogPost[],
  }[],
};
