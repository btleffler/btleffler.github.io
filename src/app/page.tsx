import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import HomeLink from '@/ui/HomeLink';
import type { HomeLinkProps } from '@/ui/HomeLink/types';

const links: HomeLinkProps[] = [
  {
    href: 'https://www.github.com/btleffler',
    subtitle: 'Random stuff I made',
    title: 'Github',
  },
  {
    href: '/about',
    subtitle: 'Basic Info',
    title: 'About',
  },
];



export default function Home() {
  const homeLinks = links.map((
    {
      href,
      subtitle,
      title,
    },
    idx,
  ) => (
    <HomeLink
      key={ idx }
      href={ href }
      subtitle={ subtitle }
      title={ title } />
  ));
  return (
    <>
      <Typography
        variant="h1"
        gutterBottom>
        Benjamin Leffler
      </Typography>
      <Grid
        container
        spacing={ 4 }
        sx={ { margin: '1rem' } }>
        { homeLinks }
      </Grid>
    </>
  );
}
