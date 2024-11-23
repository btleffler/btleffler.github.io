import type { JobData } from '../types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Job.scss';

const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
  });

export default function Job({
  job,
}: {
  job: JobData,
}) {
  const formattedDates: string = job.end
    ? `${formatDate(job.start)} - ${formatDate(job.end)}`
    : `${formatDate(job.start)} - Present`;

  const duties = job.duties.map((duty, idx) => (
    <li
      key={ idx }
      className="text-sm">
      { duty }
    </li>
  ));

  const contributions = job.contributions.map((contribution, idx) => (
    <li
      key={ idx }
      className="text-sm">
      { contribution }
    </li>
  ));

  return (
    <Box className="job">
      <Typography variant="h4">{ job.name } - { job.location }</Typography>
      <Box>
        <Typography variant="h6">{ job.title }</Typography>
        <span className="job__dates">{ formattedDates }</span>
        <span className="job__list-header">Duties:</span>
        <ul>{ duties }</ul>
        <span className="job__list-header">Noteworthy Contributions:</span>
        <ul>{ contributions }</ul>
      </Box>
    </Box>
  );
}
