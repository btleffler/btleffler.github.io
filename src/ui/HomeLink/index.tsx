import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Typography from '@mui/material/Typography';
import type { HomeLinkProps } from "./types";

import './HomeLink.scss';

export default function HomeLink ({
  title,
  subtitle,
  href,
}: HomeLinkProps) {
  return (
    <Card
      variant="elevation"
      className="home-link">
      <CardActionArea
        href={ href }
        target="_blank">
        <CardContent>
          <OpenInNew className="hover-feedback"/>
          <Typography
            variant="h2"
            className="title">
            { title }
          </Typography>
          <Typography
            variant="h5"
            color="secondary">
            { subtitle }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
