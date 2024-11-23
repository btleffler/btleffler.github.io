import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import type { ResumeData } from '@/ui/About/types';
import Contact from '@/ui/About/Contact';
import Education from '@/ui/About/Education';
import Experience from '@/ui/About/Experience';
import Skills from '@/ui/About/Skills';
import './Resume.scss';

export default function Resume({
  resume,
}: {
  resume: ResumeData,
}) {
  const {
    contact,
    education,
    jobs,
    skills,
  } = resume;

  return (
    <Grid
      className="resume"
      role="document"
      component="section">
      <Box component="div">
        <Contact contact={ contact } />
        <Experience jobs={ jobs } />
        <Education education={ education } />
      </Box>
      <Box component="div">
        <Skills skills={ skills } />
      </Box>
    </Grid>
  );
}
