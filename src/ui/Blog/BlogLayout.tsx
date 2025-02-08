import { ReactNode } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Navigation from '@/ui/Blog/Navigation';
import BlogPost from '@/blog/BlogPost';
import { LinksMappedByDate } from '@/blog/types';

export default function BlogLayout ({
  children,
  posts,
  Post,
  total,
}: {
  children: ReactNode,
  posts: LinksMappedByDate[],
  Post: BlogPost,
  total: number,
}) {
  const { created, slug } = Post;

  return (
    <Grid
      container
      spacing={ 2 }
      padding={ 2 }>
      <Grid size={ { xs: 12, md: 2 } }>
        <Card>
          <Navigation
            posts={ posts }
            total={ total }
            slug={ slug }
            yearIndex={ created.getFullYear() }
            monthIndex={ created.getMonth() } />
        </Card>
      </Grid>
      <Grid size={ { xs: 12, md: "grow" } }>
        { children }
      </Grid>
    </Grid>
  );
}
