'use client';

import { useState, ReactNode } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LinksMappedByDate } from '@/data/Blog/types';

import './styles.scss';

function NavItem ({
  href,
  selected,
  title,
}: {
  href: string,
  selected: boolean,
  title: string,
}) {
  return (
    <ListItemButton href={ href } selected={ selected }>
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
        <List component="div" className="blog-navigation__group">
          { children }
        </List>
      </Collapse>
    </>
  );
}

export default function Navigation ({
  expandAll,
  monthIndex,
  posts,
  slug,
  yearIndex,
}: {
  expandAll: boolean,
  monthIndex: number,
  posts: LinksMappedByDate[],
  slug: string,
  yearIndex: number,
}) {
  // Map out all the links/nav groups
  const links = posts.map((
    posts: LinksMappedByDate,
    linksYearIndex: number,
  ) => {
    const collapsed = !expandAll && linksYearIndex !== yearIndex;
    const monthGroups = posts.months.map(({
      month,
      posts,
    }: {
      month: string,
      posts: {
        slug: string,
        title: string,
      }[]
    }, linksMonthIndex: number) => {
      const collapsed = !expandAll && linksMonthIndex !== monthIndex;
      const postLinks = posts.map((
        post: {
          slug: string,
          title: string,
        },
        idx: number,
      ) => (
        <NavItem
          key={ idx }
          href={ `/blog/${post.slug}` }
          title={ post.title }
          selected={ slug === post.slug } />
      ));

      return (
        <NavGroup
          key={ linksMonthIndex }
          collapsed={ collapsed }
          header={ month }>
          { postLinks }
        </NavGroup>
      );
    });

    return (
      <NavGroup
        key={ linksYearIndex }
        collapsed={ collapsed }
        header={ posts.year }>
        { monthGroups }
      </NavGroup>
    );
  });

  return (
    <List
      component="nav"
      className="blog-navigation"
      subheader={
        <ListSubheader>Posts</ListSubheader>
      }>
      { links }
    </List>
  );
}
