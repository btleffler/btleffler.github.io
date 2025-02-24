import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavigationContext } from './Context';

export default function Toggle () {
  const { setDrawerOpen } = useContext(NavigationContext);
  const handleClick = () => setDrawerOpen((open) => !open);

  return (
    <IconButton onClick={ handleClick }>
      <MenuIcon />
    </IconButton>
  );
}
