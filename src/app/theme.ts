'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3fa3b5',
    },
    secondary: {
      main: '#85d1ff',
    },
    error: {
      main: '#f30000',
    },
    warning: {
      main: '#fffc00',
    },
    info: {
      main: '#216ef3',
    },
    success: {
      main: '#24cb00',
    },
    divider: 'rgba(255,255,255,0.13)',
  },
  shape: {
    borderRadius: 3,
  },
});
