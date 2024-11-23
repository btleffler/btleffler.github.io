import type { JobData } from '@/ui/About/types';
import ResumeSection from '@/ui/About/ResumeSection';
import Job from '@/ui/About/Job';

export default function Experience({
  jobs,
}: {
  jobs: JobData[],
}) {
  const renderedJobs = jobs.map((job, idx) => (
    <Job
      key={idx}
      job={job} />
  ));

  return (
    <ResumeSection title="Experience">{ renderedJobs }</ResumeSection>
  );
}
