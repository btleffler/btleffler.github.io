import type { Metadata } from 'next';
import type { BlogParams } from '@/blog/types';
import Grid from '@mui/material/Grid2';
import Navigation from '@/ui/Blog/Navigation';
import Posts, { MappedByDate } from '@/data/Blog/Posts';
import BlogPost from '@/blog/BlogPost';

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
  params,
}: BlogParams) {
  const routeParams = await params;

  const { posts, total } = await MappedByDate();
  const allPosts = await Posts();
  const firstPostSlug = posts.find((year) => year)
    ?.months.find((month) => month)
    ?.posts.find(({ slug }) => slug)?.slug as string;
  const postSlug = routeParams.postSlug || firstPostSlug;
  const post = allPosts.find((post) => post.slug === postSlug) as BlogPost;

  return (
    <Grid
      container
      spacing={ 4 }>
      <Navigation
        posts={ posts }
        expandAll={ total < 10 }
        slug={ postSlug }
        yearIndex={ post.created.getFullYear() }
        monthIndex={ post.created.getMonth() } />
      { children }
    </Grid>
  );
}
