import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import type { BlogParams } from '@/blog/types';
import Grid from '@mui/material/Grid2';
import Navigation from '@/ui/Blog/Navigation';
import { MappedByDate } from '@/data/Blog/Posts';

export async function generateMetadata (
  { params }: BlogParams
): Promise<Metadata> {
  const slug = (await params).postSlug;

  if (slug) {
    return {
      title: `Benjamin Leffler - ${slug}`,
      description: slug,
    };
  }

  return {
    title: 'Benjamin leffler - Blog',
    description: 'Random things I think of',
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const posts = await MappedByDate(true);
  return (
    <Grid
      container
      spacing={ 4 }>
      <Navigation posts={ posts }/>
      { children }
    </Grid>
  );
}
