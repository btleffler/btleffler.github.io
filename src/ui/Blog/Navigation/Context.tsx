'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type NavigationState = {
  drawerOpen: boolean,
  setDrawerOpen: Dispatch<SetStateAction<boolean>> | (() => void),
};

const NavigationContext = createContext<NavigationState>({
  drawerOpen: false,
  setDrawerOpen: () => {},
});

export function useNavigationContext() {
  return useContext(NavigationContext);
}

export default function NavigationContextProvider ({
  children,
}: {
  children: ReactNode,
}) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('lg'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(match);

  useEffect(() => {
    setDrawerOpen(match);
  }, [setDrawerOpen, match]);

  console.log('useMediaQuery', {
    match,
    xl: useMediaQuery(theme.breakpoints.up('xl')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    xs: useMediaQuery(theme.breakpoints.up('xs')),
  });
  console.log('Context', { drawerOpen });

  const context = {
    drawerOpen,
    setDrawerOpen,
  };

  return (
    <NavigationContext.Provider value={ context }>
      { children }
    </NavigationContext.Provider>
  );
}
