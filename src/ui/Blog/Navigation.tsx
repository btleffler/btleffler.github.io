'use client';

import { useState, ReactNode } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  LinksMappedByDate,
  LinksMappedByDateMonth,
  LinksMappedByDatePost,
} from '@/data/Blog/types';

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
  collapsed,
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
        timeout="auto">
        <List component="div" className="blog-navigation__group">
          { children }
        </List>
      </Collapse>
    </>
  );
}

export default function Navigation ({
  monthIndex,
  posts,
  slug,
  total,
  yearIndex,
}: {
  monthIndex: number,
  posts: LinksMappedByDate[],
  slug: string,
  total: number,
  yearIndex: number,
}) {
  const expandAll = total < 10;

  // Map out all the links/nav groups
  const links = posts.map((
    {
      year,
      months,
    }: LinksMappedByDate,
    idx: number,
  ) => {
    const yearCollapsed = !expandAll && year !== yearIndex;
    const monthGroups = months.map((
      {
        month,
        monthIndex: linksMonthIndex,
        posts,
      }: LinksMappedByDateMonth,
      idx: number
    ) => {
      const monthCollapsed = (!expandAll && yearCollapsed) || monthIndex !== linksMonthIndex;
      const postLinks = posts.map((
        post: LinksMappedByDatePost,
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
          key={ idx }
          collapsed={ monthCollapsed }
          header={ month }>
          { postLinks }
        </NavGroup>
      );
    });

    return (
      <NavGroup
        key={ idx }
        collapsed={ yearCollapsed }
        header={ String(year) }>
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
