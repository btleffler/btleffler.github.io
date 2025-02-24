import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function Item ({
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
      <ListItemText primary={ title } className='blog-navigation__item' />
    </ListItemButton>
  );
}
