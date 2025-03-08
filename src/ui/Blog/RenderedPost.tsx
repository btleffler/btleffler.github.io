import type { Post } from '@/blog/types';
import Card from '@mui/material/Card';
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
      className="blog-post"
      container
      direction="column"
      spacing={ 2 }>
      <Card className="blog-post__title">
        <Grid
          container
          direction="row"
          spacing={ 1 }>
          <Grid size="grow">
            <Typography variant="h1">{ title }</Typography>
          </Grid>
          <Grid size="auto" alignContent="end">
            <Typography align="right">
              Posted { created.toLocaleDateString() }
            </Typography>
            { updated ? (
              <Typography align="right">
                Updated { updated.toLocaleDateString() }
              </Typography>
            ) : null }
          </Grid>
        </Grid>
      </Card>
      <Card className="blog-post__content">
        <MuiMarkdown>{ content }</MuiMarkdown>
      </Card>
    </Grid>
  );
}
