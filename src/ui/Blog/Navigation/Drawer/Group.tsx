import { ReactNode } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

export default function Group ({
  header,
  children,
}: {
  header: string,
  children: ReactNode
}) {
  return (
    <>
      <ListItemText primary={ header } />
      <List component="div">
        { children }
      </List>
    </>
  );
}
