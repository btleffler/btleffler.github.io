import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ContactData } from '@/ui/About/types';
import ResumeSection from '@/ui/About/ResumeSection';

export default function Contact ({
  contact,
}: {
  contact: ContactData,
}) {
  return (
    <ResumeSection title="Contact">
      <Box>
        <Typography
          variant="h1"
          role="heading">
          {contact.name}
        </Typography>
        <Box>
          <Button
            role="link"
            href={`mailto:${contact.email}`}>
            {contact.email}
          </Button>
          <Button
            role="link"
            href={`tel:${contact.phone}`}>
            {contact.phone}
          </Button>
        </Box>
      </Box>
    </ResumeSection>
  );
}
