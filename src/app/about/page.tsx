import ResumeData from './resume-data';
import Resume from '@/ui/About/Resume';

export default function AboutHome() {
  return (
    <Resume resume={ResumeData} />
  );
}
