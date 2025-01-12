import type { Post } from '@/blog/types';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import MuiMarkdown from 'mui-markdown';

export default function RenderedPost({
  content,
  created,
  title,
  updated,
}: Post) {
  return (
    <Grid
      container
      direction="column"
      spacing={ 2 }>
      <Typography variant='h2'>{ title }</Typography>
      <Typography>
        { created.toLocaleDateString() }
        { updated ? ` | ${updated.toLocaleDateString()}` : null }
      </Typography>
      <MuiMarkdown>{ content }</MuiMarkdown>
    </Grid>
  );
}
