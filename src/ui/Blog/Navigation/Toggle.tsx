'use client';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigationContext } from './Context';

export default function Toggle () {
  const { drawerOpen, setDrawerOpen } = useNavigationContext();
  const handleClick = () => setDrawerOpen((open) => !open);

  console.log('Toggle', { drawerOpen });

  return (
    <IconButton onClick={ handleClick }>
      { drawerOpen ? <KeyboardArrowLeftIcon /> : <MenuIcon /> }
    </IconButton>
  );
}
