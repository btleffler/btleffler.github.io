import { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { NavigationContext } from '../Context';
import Group from './Group';
import Item from './Item';
import {
  LinksMappedByDate,
  LinksMappedByDateMonth,
  LinksMappedByDatePost,
} from '@/blog/types';

import '@/ui/Blog/styles.scss';

export default function Navigation ({
  posts,
  slug,
}: {
  monthIndex: number,
  posts: LinksMappedByDate[],
  slug: string,
  yearIndex: number,
}) {
  const { drawerOpen } = useContext(NavigationContext);

  // Map out all the links/nav groups
  const links = posts.map((
    {
      year,
      months,
    }: LinksMappedByDate,
    idx: number,
  ) => {
    const monthGroups = months.map((
      {
        month,
        posts,
      }: LinksMappedByDateMonth,
      idx: number
    ) => {
      const postLinks = posts.map((
        post: LinksMappedByDatePost,
        idx: number,
      ) => (
        <Item
          key={ idx }
          href={ `/blog/${post.slug}` }
          title={ post.title }
          selected={ slug === post.slug } />
      ));

      return (
        <Group
          key={ idx }
          header={ month }>
          { postLinks }
        </Group>
      );
    });

    return (
      <Group
        key={ idx }
        header={ String(year) }>
        { monthGroups }
      </Group>
    );
  });

  return (
    <Drawer open={ drawerOpen } variant="persistent">
      <List
        component="nav"
        className="blog-navigation">
        { links }
      </List>
    </Drawer>
  );
}
