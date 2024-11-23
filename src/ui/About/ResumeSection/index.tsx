import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ResumeSection.scss';

export default function ResumeSection({
  children,
  title,
}: {
  children?: ReactNode,
  title: string,
}) {
  const classNames = ['resume__section', title.toLowerCase()].join(' ');

  return (
    <Card
      role="contentinfo"
      className={ classNames }>
      <CardContent className="resume__section-content">
        <Typography className="resume__section-title">{ title }</Typography>
        <Box className="resume__section-children">{ children }</Box>
      </CardContent>
    </Card>
  );
}
