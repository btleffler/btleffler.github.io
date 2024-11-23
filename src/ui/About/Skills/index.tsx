import ResumeSection from '@/ui/About/ResumeSection';
import './Skills.scss';

export default function Experience({
  skills,
}: {
  skills: string[],
}) {
  const skillList = skills.map((skill, idx) => (
    <li key={ idx }>{ skill }</li>
  ));

  return (
    <ResumeSection title="Skills">
      <ul className="skills__list">{ skillList }</ul>
    </ResumeSection>
  );
}
