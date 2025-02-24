import { ReactNode } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import NavigationContextProvider from './Navigation/Context';
import NavDrawer from '@/ui/Blog/Navigation/Drawer';
import BlogPost from '@/blog/BlogPost';
import { LinksMappedByDate } from '@/blog/types';

export default function BlogLayout ({
  children,
  posts,
  Post,
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
      <NavigationContextProvider>
        <Grid size={ { xs: 12, md: 2 } }>
          <Card>
            <NavDrawer
              posts={ posts }
              slug={ slug }
              yearIndex={ created.getFullYear() }
              monthIndex={ created.getMonth() } />
          </Card>
        </Grid>
        <Grid size={ { xs: 12, md: "grow" } }>
          { children }
        </Grid>
      </NavigationContextProvider>
    </Grid>
  );
}
