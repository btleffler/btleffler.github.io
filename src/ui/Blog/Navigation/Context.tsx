'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useTheme } from '@mui/material/styles';

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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const isLargeScreen = window.innerWidth >= theme.breakpoints.values.lg;
    setDrawerOpen(isLargeScreen);
  }, [theme.breakpoints.values.lg]);

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
