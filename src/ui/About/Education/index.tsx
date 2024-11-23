import type { EducationData } from '@/ui/About/types';
import Typography from '@mui/material/Typography';
import ResumeSection from '@/ui/About/ResumeSection';
import './Education.scss';

export default function Education({
  education,
}: {
  education: EducationData,
}) {
  return (
    <ResumeSection title="Education">
      <Typography variant="h4">
        <span className="education__school">
          { education.name }
        </span> - { education.location }</Typography>
      <Typography variant="h5">{ education.degree }</Typography>
    </ResumeSection>
  );
}
