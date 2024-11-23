import type { ResumeData } from "@/ui/About/types";

const resume: ResumeData = {
  contact: {
    name: 'Benjamin Leffler',
    phone: '(716) 589 - 0236',
    email: 'btleffler@gmail.com',
  },
  jobs: [
    {
      name: 'Kitces.com',
      location: 'Remote',
      title: 'Senior Software Engineer',
      start: new Date('March 26, 2024'),
      duties: [
        'Leverage PHP, Node.js, React, PostgreSQL, MySQL, and AWS to develop and maintain kitces.com public facing site.',
        'Perform code review to aid deployment new features for front end and back end services.',
        'Participate in Agile ceremonies to ensure a streamlined development cycle.',
        'Provide input on design of Kitces Advicer Database to provide business reporting as well as a single source of truth for data across multiple services.',
      ],
      contributions: [
        'Implemented Continuing Education Quiz ‘resetting’ to alleviate workload for the Members Services team as well as the Platform team.',
        'Designed and implemented internal administration tool to aid and simplify workflows across the entire organizaiton.',
      ],
    },
    {
      name: 'Swarm Solutions',
      location: 'Remote',
      title: 'Senior Software Engineer',
      start: new Date('May 1, 2019'),
      end: new Date('March 1, 2024'),
      duties: [
        'Leverage Node.js, Vue/Vuex, Python, PostgreSQL, Redis, and ElasticSearch to develop new features for existing and new CMS for multiple clients',
        'Perform code review to aid deployment of new features across organizations',
        'Participate and foster Agile ceremonies to ensure a streamlined software development cycle for clients',
        'Mentor and assist with onboarding of new contractors and full time developers',
        'Perform peer coding exercise interviews for potential new Swarm developers',
      ],
      contributions: [
        'Is a ‘go-to’ senior engineer for a multinational news organization’s flagship initiative to rebuild their technology backend from the ground up for all of their digital offerings, including their website, mobile apps, and OTT app.',
        'Implemented multiple core features of of the CMS, including real time collaboration between multiple editors on a page, and selective republishing of content on leaf content and landing pages',
        'Refactored, and implemented the editing experience for image galleries which contributes to hundreds of millions of page views per month',
        'Aided in the creation of the news organization’s video streaming service, creating the web front-end, editing interface, and the back-end service driving OTT streaming applications',
      ],
    },
    {
      name: 'Wylei',
      location: 'Lancaster, PA - Remote',
      title: 'Senior Software Engineer - DevOps',
      start: new Date('January 1, 2014'),
      end: new Date('April 1, 2019'),
      duties: [
        'Managed the company AWS account including VPC, networking configuration using subnets and ACL, EC2, Elastic Beanstalk, SQS, and S3',
        'Worked closely with security vendors to perform audits and pentests',
        'Acted as DBA, managing shared replica-set MongoDB deployment',
      ],
      contributions: [
        'Designed, developed, and automated the deployment processes for all company microservices, which would pull latest changes for each service from Git and install dependencies and credentials. Ended up being adopted by multiple companies in the start up incubator',
        'Designed and developed ETL systems to securely process large batch files containing client data, as well as event log data for use in ML processes',
        'Designed and developed a scalable, high volume data processing and logging system that enabled real time processing of event data, a critical component of the ML stack',
      ],
    },
    {
      name: 'That\'s Us Techonogies',
      location: 'Tampa, FL - Remote',
      title: 'Web Developer',
      start: new Date('December 1, 2011'),
      end: new Date('January 1, 2014'),
      duties: [
        'Extended and developed multiple web applications to improve client experience and provide extra functionality using PHP and MySQL',
      ],
      contributions: [
        'Integrated with multiple third parties including Amazon, eBay, and Craigslist so sellers could list their products on multiple storefronts',
        'Implemented many features of the eBay listing process including sales tax tables, multiple international ship-to locations, and multi-variation listings',
        'Extended client credit application to send leads to USA Coverage, generating extra revenue stream for the company',
      ],
    },
    {
      name: 'Applied Media Technologies Corp.',
      location: 'Clearwater, FL',
      title: 'Web Developer',
      start: new Date('March 1, 2011'),
      end: new Date('December 1, 2011'),
      duties: [
        'Maintain legacy web application allowing customers to customize their telephone on hold playlist and messaging.',
      ],
      contributions: [
        'Participated in planning of complete overhaul of existing software including database design, business logic, and user experience using C# ASP.net MVC and MSSQL',
        'Extended the base SOAP class and consumed Fedex’s web service to integrate it into legacy shipping application to provide customers with more shipping options',
      ],
    },
  ],
  skills: [
    'Amazon Web Services (AWS), S3, SQS',
    'Node.js',
    'JavaScript',
    'VueJS, Vuex',
    'React, Next.js',
    'Python',
    'PHP',
    'C# .Net',
    'PostgreSQL',
    'MSSQL',
    'MongoDB',
    'Redis',
    'ElasticSearch',
    'Git',
  ],
  education: {
    name: 'Buffalo State College',
    degree: 'B.S. Computer Information Systems',
    location: 'Buffalo, NY',
  },
};

export default resume;
