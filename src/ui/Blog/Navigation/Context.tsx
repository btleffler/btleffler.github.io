'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type NavigationState = {
  drawerOpen: boolean,
  setDrawerOpen: Dispatch<SetStateAction<boolean>> | (() => void),
};

export const NavigationContext = createContext<NavigationState>({
  drawerOpen: false,
  setDrawerOpen: () => {},
});

export default function NavigationContextProvider ({
  children,
}: {
  children: ReactNode,
}) {
  const theme = useTheme();
  const largeOrBigger = useMediaQuery(theme.breakpoints.up('lg'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(largeOrBigger);

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
