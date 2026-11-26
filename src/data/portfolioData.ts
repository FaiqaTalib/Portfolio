export interface SkillItem {
  name: string;
  category:
    | 'Frontend & UI/UX'
    | 'Backend Development'
    | 'Programming Languages'
    | 'Database'
    | 'Tools & Design';
  detail: string;
}

export type ProjectPreviewType =
  | 'vaccination'
  | 'ecommerce'
  | 'cinema'
  | 'lawfirm'
  | 'wellness'
  | 'github';

export interface ProjectItem {
  id: string;
  title: string;
  stack: string[];
  summary: string;
  highlights: string[];
  previewType: ProjectPreviewType;
  liveUrl: string;
  isLivePlaceholder: boolean;
  githubUrl: string;
  matchedRepoName?: string;
  stars?: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  field: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  context: string;
}

export const PROFILE_DATA = {
  name: 'Faiqa Talib',
  title: 'Software Developer & UI/UX Designer',
  location: 'Karachi, Pakistan',
  email: 'faiqatalib81@gmail.com',
  phone: '+92-301-2415001',
  githubUsername: 'FaiqaTalib',
  githubUrl: 'https://github.com/FaiqaTalib',
  githubReposUrl: 'https://github.com/FaiqaTalib?tab=repositories',
  githubHandle: 'github.com/FaiqaTalib',
  linkedinUrl: 'https://www.linkedin.com/in/faiqa-talib-placeholder',
  linkedinDisplay: 'linkedin.com/in/faiqa-talib (Update Link)',
  heroIntro:
    'Building clean, scalable web applications across PHP, Laravel, MySQL, and React.js, paired with intuitive UI/UX design in Figma—while mentoring junior developers in industry-standard engineering workflows.',
};

export const HERO_TYPER_ROLES = [
  'React Developer',
  'PHP & Laravel Developer',
  'UI/UX Designer (Figma)',
  'Software Developer Trainer',
];

export const HERO_PILLARS = [
  {
    id: 'frontend',
    title: 'React.js & Modern Frontend',
    meta: 'Component Architecture · Hooks · Responsive UI',
  },
  {
    id: 'backend',
    title: 'PHP, Laravel & MySQL',
    meta: 'RBAC Security · Eloquent ORM · Normalized Schemas',
  },
  {
    id: 'uiux',
    title: 'UI/UX Design in Figma',
    meta: 'Wireframing · Design Systems · Interactive Prototypes',
  },
];

export const ABOUT_CHAPTERS = [
  {
    number: '01',
    heading: 'Engineering Foundation & UI/UX Craft',
    body: 'Combining Computer Science fundamentals with user-centered interface design in Figma, I bridge visual clarity and clean implementation across every screen and workflow.',
  },
  {
    number: '02',
    heading: 'Full-Stack Application Delivery',
    body: 'From role-based healthcare portals and Laravel e-commerce platforms to concurrency-safe cinema seat booking systems and React.js interfaces, I deliver secure, maintainable software end-to-end.',
  },
  {
    number: '03',
    heading: 'Mentorship & Engineering Standards',
    body: 'As a Software Developer Trainer at Aptech, I design technical curricula, lead hands-on code reviews enforcing SOLID principles, and mentor cohorts through standardized Git and deployment workflows.',
  },
];

export const SKILL_CATEGORIES = [
  'All',
  'Frontend & UI/UX',
  'Backend Development',
  'Programming Languages',
  'Database',
  'Tools & Design',
] as const;

export const SKILLS: SkillItem[] = [
  {
    name: 'React.js',
    category: 'Frontend & UI/UX',
    detail: 'Functional components, hooks (useState, useEffect) & reusable UI component libraries',
  },
  {
    name: 'UI/UX Design (Figma)',
    category: 'Frontend & UI/UX',
    detail: 'User flows, high-fidelity wireframes, component systems & developer handoff',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend & UI/UX',
    detail: 'Semantic markup, responsive grid/flex systems & smooth CSS transitions',
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Programming Languages',
    detail: 'Modern client-side interactivity, state handling & asynchronous API workflows',
  },
  {
    name: 'PHP',
    category: 'Programming Languages',
    detail: 'Server-side web engineering, session security & custom CMS architecture',
  },
  {
    name: 'Laravel',
    category: 'Backend Development',
    detail: 'Eloquent ORM query optimization, Breeze/Sanctum auth & middleware routing',
  },
  {
    name: 'RBAC & Custom CMS',
    category: 'Backend Development',
    detail: 'Role-based access control, server-side validation & injection prevention',
  },
  {
    name: 'MySQL',
    category: 'Database',
    detail: 'Normalized relational schema design, indexing & efficient query architecture',
  },
  {
    name: 'SQL Server',
    category: 'Database',
    detail: 'Relational database management, structured queries & data integrity',
  },
  {
    name: 'Python (Intermediate)',
    category: 'Programming Languages',
    detail: 'Utility application engineering, clean documentation & agile remote sprints',
  },
  {
    name: 'C# (Intermediate)',
    category: 'Programming Languages',
    detail: 'Object-oriented programming fundamentals & structured application logic',
  },
  {
    name: 'Figma & Canva',
    category: 'Tools & Design',
    detail: 'Interface prototyping, visual layout design & brand-aligned UI assets',
  },
  {
    name: 'Git & GitHub',
    category: 'Tools & Design',
    detail: 'Standardized version control workflows, branching & collaborative reviews',
  },
  {
    name: 'VS Code & Jupyter',
    category: 'Tools & Design',
    detail: 'Primary development environments for full-stack web & Python workflows',
  },
  {
    name: 'WordPress',
    category: 'Tools & Design',
    detail: 'Content-managed websites & customizable web publishing workflows',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'vaccination-management',
    title: 'Vaccination Management System',
    stack: ['PHP', 'MySQL'],
    summary:
      'Multi-role healthcare web application enabling administrators to manage patient records, vaccination schedules, and user accounts with significantly reduced manual record-keeping.',
    highlights: [
      'Engineered secure session-based authentication with role-based access control (RBAC) for data integrity and privacy compliance.',
      'Designed a normalized relational MySQL schema for efficient querying across patient and schedule tables.',
    ],
    previewType: 'vaccination',
    liveUrl: 'https://github.com/FaiqaTalib?tab=repositories',
    isLivePlaceholder: true,
    githubUrl: 'https://github.com/FaiqaTalib?tab=repositories',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    stack: ['PHP', 'Laravel', 'MySQL'],
    summary:
      'Complete online shopping platform supporting product catalogue management, shopping cart workflows, order processing, and an administrative dashboard across the full purchase lifecycle.',
    highlights: [
      'Integrated Laravel authentication (Breeze/Sanctum) with middleware-protected routes for users and administrators.',
      'Optimized Eloquent ORM queries to lower database load and accelerate page response times.',
    ],
    previewType: 'ecommerce',
    liveUrl: 'https://github.com/FaiqaTalib?tab=repositories',
    isLivePlaceholder: true,
    githubUrl: 'https://github.com/FaiqaTalib?tab=repositories',
  },
  {
    id: 'movie-booking',
    title: 'Movie Booking System',
    stack: ['PHP', 'MySQL'],
    summary:
      'End-to-end cinema booking platform covering movie listings, showtime scheduling, and concurrency-safe seat reservation logic across desktop and mobile browsers.',
    highlights: [
      'Built seat-selection and reservation logic focused on preventing conflicting bookings.',
      'Designed a responsive booking interface tailored for seamless use across screen sizes.',
    ],
    previewType: 'cinema',
    liveUrl: 'https://github.com/FaiqaTalib?tab=repositories',
    isLivePlaceholder: true,
    githubUrl: 'https://github.com/FaiqaTalib?tab=repositories',
  },
  {
    id: 'law-firm-cms',
    title: 'Law Firm Website',
    stack: ['PHP', 'Custom CMS'],
    summary:
      'Multi-page website for a legal services firm featuring dedicated practice-area pages, attorney profiles, and an integrated contact management backend.',
    highlights: [
      'Implemented server-side form validation and input sanitization to guard against injection attacks.',
      'Structured custom PHP content management pages for maintainable profile and practice updates.',
    ],
    previewType: 'lawfirm',
    liveUrl: 'https://github.com/FaiqaTalib?tab=repositories',
    isLivePlaceholder: true,
    githubUrl: 'https://github.com/FaiqaTalib?tab=repositories',
  },
  {
    id: 'wellness-platform',
    title: 'Wellness Platform (Frontend)',
    stack: ['React.js'],
    summary:
      'Modern, componentized wellness website built with React functional components and hooks (useState, useEffect) for responsive, predictable state management.',
    highlights: [
      'Developed a reusable component library, reducing estimated future development time for similar UI patterns by approximately 30%.',
      'Crafted clean modular layout sections designed for readability and smooth user interaction.',
    ],
    previewType: 'wellness',
    liveUrl: 'https://github.com/FaiqaTalib?tab=repositories',
    isLivePlaceholder: true,
    githubUrl: 'https://github.com/FaiqaTalib?tab=repositories',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'aptech-trainer',
    role: 'Software Developer Trainer',
    company: 'Aptech',
    location: 'Karachi, Pakistan',
    duration: 'October 2024 – Present',
    responsibilities: [
      'Designed and delivered a structured curriculum covering PHP, Laravel, SQL, and React.js, achieving strong alignment with real-world software house practices.',
      'Led hands-on code reviews for database-driven projects, enforcing clean architecture, SOLID principles, and maintainable code standards.',
      'Mentored a cohort of junior developers and students through debugging sessions, professional development workshops, and end-to-end project walkthroughs.',
      'Improved student project quality by introducing standardized version control (Git/GitHub) workflows and deployment best practices.',
    ],
  },
  {
    id: 'codsoft-intern',
    role: 'Python Developer Intern',
    company: 'CodSoft',
    location: 'Remote',
    duration: 'September 2023 – October 2023',
    responsibilities: [
      'Collaborated within a fully remote agile team to design and ship three Python utility applications—a To-Do List manager, a Calculator, and a Password Generator—within a one-month sprint cycle.',
      'Delivered well-documented Python code reviewed and approved by senior engineers, contributing to the team’s scalable codebase.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'bs-cs',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'UIT – NED University, Karachi',
    duration: '2020 – 2024',
    field: 'Computer Science & Software Engineering',
  },
  {
    id: 'intermediate',
    degree: 'Intermediate (Pre-Engineering)',
    institution: 'Govt. Degree College Malir Cantt, Karachi',
    duration: '2018 – 2020',
    field: 'Pre-Engineering',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'sql-hackerrank',
    title: 'SQL Certification',
    issuer: 'HackerRank',
    context: 'Verified proficiency in relational querying, joins, aggregations, and database problem-solving.',
  },
  {
    id: 'python-codsoft',
    title: 'Python Certification',
    issuer: 'CodSoft',
    context: 'Awarded upon completing agile remote sprint deliverables and senior-reviewed Python applications.',
  },
];
