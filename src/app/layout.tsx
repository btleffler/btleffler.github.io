import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Ben Leffler',
  description: 'Senior Software Engineer',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html>
      <body className={ roboto.variable }>
        <AppRouterCacheProvider options={ { enableCssLayer: true } }>
          <ThemeProvider theme={ theme }>
            <CssBaseline />
            <main>{ children }</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
