import type { Metadata } from 'next';
import type { BlogParams } from '@/blog/types';
import Grid from '@mui/material/Grid2';
import Navigation from '@/ui/Blog/Navigation';
import { CurrentPost, MappedByDate } from '@/data/Blog/Posts';

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
    <Grid
      container
      spacing={ 4 }>
      <Navigation
        posts={ posts }
        total={ total }
        slug={ Post.slug }
        yearIndex={ Post.created.getFullYear() }
        monthIndex={ Post.created.getMonth() } />
      { children }
    </Grid>
  );
}
