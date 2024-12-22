'use client';

import { useState, ReactNode } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BlogPost from '@/blog/BlogPost';
import { PostsMappedByDate } from '@/data/types';

function NavItem ({
  href,
  title,
}: {
  href: string,
  title: string,
}) {
  return (
    <ListItemButton href={ href }>
      <ListItemText primary={ title } />
    </ListItemButton>
  );
}

function NavGroup ({
  header,
  collapsed = true,
  children,
}: {
  header: string,
  collapsed: boolean,
  children: ReactNode
}) {
  const [open, setOpen] = useState<boolean>(!collapsed);
  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItemButton onClick={ handleClick }>
        <ListItemText primary={ header } />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItemButton>
      <Collapse
        in={ open }
        timeout="auto"
        unmountOnExit>
        <List component="div">
          { children }
        </List>
      </Collapse>
    </>
  );
}

export default function Navigation ({
  posts,
}: {
  posts: PostsMappedByDate[]
}) {
  // Get total number of posts
  const total = posts.reduce((total, { months }) => {
    return total + months.reduce((total, { posts }) => {
      return total + posts.length;
    }, 0);
  }, 0);

  console.log({ total });

  // Find the first year
  const firstIndex = posts.findLastIndex((posts) => posts);

  // Map out all the links/nav groups
  const links = posts.map((
    posts: PostsMappedByDate,
    idx: number,
  ) => {
    const collapsed = total < 9 || idx === firstIndex;
    const firstMonthIndex = posts.months.findLastIndex((posts) => posts);
    const monthGroups = posts.months.map(({
      month,
      posts,
    }: {
      month: string,
      posts: BlogPost[]
    }, idx: number) => {
      const collapsed = total < 9 || idx === firstMonthIndex;
      const postLinks = posts.map((
        post: BlogPost,
        idx: number,
      ) => (
        <NavItem
          key={ idx }
          href={ `/blog/${post.slug}` }
          title={ post.title } />
      ));

      return (
        <NavGroup
          key={ idx }
          collapsed={ collapsed }
          header={ month }>
          { postLinks }
        </NavGroup>
      );
    });

    return (
      <NavGroup
        key={ idx }
        collapsed={ collapsed }
        header={ posts.year }>
        { monthGroups }
      </NavGroup>
    );
  });

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader>Archive</ListSubheader>
      }>
      { links }
    </List>
  );
}
