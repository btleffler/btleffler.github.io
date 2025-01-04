import type { Metadata } from 'next';
import type { BlogParams } from '@/blog/types';
import Grid from '@mui/material/Grid2';
import Navigation from '@/ui/Blog/Navigation';
import Posts, { MappedByDate } from '@/data/Blog/Posts';
import BlogPost from '@/blog/BlogPost';

export async function generateMetadata (
  { params }: BlogParams
): Promise<Metadata> {
  const routeParams = await params;
  const slug = decodeURI(routeParams.postSlug);

  return {
    title: `Benjamin Leffler - ${slug}`,
    description: slug,
  };
}

export default async function RootLayout({
  children,
  params,
}: BlogParams) {
  const routeParams = await params;
  const postSlug = decodeURI(routeParams.postSlug);

  const allPosts = await Posts();
  const { posts, total } = await MappedByDate();
  const Post = allPosts.find(({ slug }) => slug === postSlug) as BlogPost;

  return (
    <Grid
      container
      spacing={ 4 }>
      <Navigation
        posts={ posts }
        total={ total }
        slug={ postSlug }
        yearIndex={ Post.created.getFullYear() }
        monthIndex={ Post.created.getMonth() } />
      { children }
    </Grid>
  );
}
