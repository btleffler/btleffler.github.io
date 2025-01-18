import type { Metadata } from 'next';
import type { BlogParams } from '@/blog/types';
import BlogLayout from '@/ui/Blog/BlogLayout';
import { CurrentPost, MappedByDate } from '@/blog/Data/Posts';

export const metadata: Metadata = {
  title: 'Benjamin leffler - Blog',
  description: 'Random things I think of',
};

export default async function RootLayout({
  children,
}: BlogParams) {
  const Post = await CurrentPost();
  const { posts, total } = await MappedByDate();

  return (
    <BlogLayout
      posts={ posts }
      Post={ Post }
      total={ total }>
      { children }
    </BlogLayout>
  );
}
