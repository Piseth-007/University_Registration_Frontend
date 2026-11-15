import type {
  AnnouncementItem,
  ApplicationStepItem,
  ExamScheduleItem,
  FacultyItem,
  FooterLinkGroup,
  KeyDateItem,
  NavItem,
  NewsArticleItem,
  QuickLinkItem,
  RequirementItem,
} from '../types/admissions'

export const ADMISSIONS_DEADLINE_ISO = '2026-11-30T23:59:59+07:00'

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', route: '/' },
  { id: 'about', label: 'About University', href: '/about', route: '/about' },
  { id: 'programs', label: 'Academic Programs', href: '/programs', route: '/programs' },
  { id: 'process', label: 'Admission Process', href: '#process', route: '/' },
  { id: 'requirements', label: 'Requirements', href: '#requirements', route: '/' },
  { id: 'results', label: 'Results', href: '/results', route: '/results' },
  { id: 'news', label: 'News & Events', href: '/news', route: '/news' },
  { id: 'contact', label: 'Contact Us', href: '/contact', route: '/contact' },
]

export const quickLinks: QuickLinkItem[] = [
  {
    eyebrow: 'GET STARTED',
    label: 'Apply online',
    href: '#process',
    route: '/apply',
  },
  {
    eyebrow: 'EXPLORE DEGREES',
    label: 'View academic programs',
    href: '/programs',
    route: '/programs',
  },
  {
    eyebrow: 'KEY MILESTONES',
    label: 'Check important dates',
    href: '#announcements',
  },
  {
    eyebrow: 'ENTRANCE EXAM',
    label: 'View exam results',
    href: '#results',
    route: '/results',
  },
]

export const announcements: AnnouncementItem[] = [
  {
    id: 'undergrad-open-2026',
    day: '12',
    month: 'OCT',
    title: 'Undergraduate admissions now open',
    summary:
      'Applications for Semester 1, Academic Year 2026–2027 are now being accepted across all faculties.',
  },
  {
    id: 'scholarship-schedule-2026',
    day: '05',
    month: 'OCT',
    title: 'Scholarship examination schedule',
    summary:
      'Ministry of Education and RUPP merit scholarship entrance exam dates and venue assignments.',
  },
  {
    id: 'national-exam-dates-2026',
    day: '28',
    month: 'SEP',
    title: 'National entrance examination dates',
    summary:
      'Important guidelines and examination schedules for science and social science tracks.',
  },
]

export const keyDates: KeyDateItem[] = [
  {
    label: 'APPLICATION OPENS',
    date: '15 October 2026',
  },
  {
    label: 'APPLICATION DEADLINE',
    date: '30 November 2026',
  },
  {
    label: 'ENTRANCE EXAMINATION',
    date: '15 December 2026',
  },
]

export const faculties: FacultyItem[] = [
  {
    id: 'science-tech',
    icon: 'science',
    badge: '8 DEPARTMENTS',
    departmentCount: 8,
    title: 'Science & Technology',
    description:
      'Computer Science, Mathematics, Physics, Chemistry, Biology, and Environmental Science.',
  },
  {
    id: 'business-econ',
    icon: 'business',
    badge: '5 DEPARTMENTS',
    departmentCount: 5,
    title: 'Business & Economics',
    description:
      'International Business, Finance, Accounting, Economics, and Management Studies.',
  },
  {
    id: 'arts-humanities',
    icon: 'arts',
    badge: '7 DEPARTMENTS',
    departmentCount: 7,
    title: 'Arts & Humanities',
    description:
      'Khmer Literature, Philosophy, History, Fine Arts, Media and Communication.',
  },
  {
    id: 'engineering',
    icon: 'engineering',
    badge: '6 DEPARTMENTS',
    departmentCount: 6,
    title: 'Engineering',
    description:
      'Information Technology Engineering, Telecommunication, Bio-Engineering, and Automation.',
  },
  {
    id: 'social-sciences-law',
    icon: 'law',
    badge: '6 DEPARTMENTS',
    departmentCount: 6,
    title: 'Social Sciences & Law',
    description:
      'International Relations, Public Policy, Sociology, Psychology, Geography, and Development Studies.',
  },
  {
    id: 'education',
    icon: 'education',
    badge: '4 DEPARTMENTS',
    departmentCount: 4,
    title: 'Education',
    description:
      'Educational Studies, Higher Education Development, Pedagogy, and Lifelong Learning.',
  },
]

export const requirementsList: RequirementItem[] = [
  {
    id: 'bacii-diploma',
    icon: 'diploma',
    title: 'High School Diploma (BacII) or Certificate',
    subtitle: 'Original or certified copy of provisional pass certificate',
  },
  {
    id: 'national-id',
    icon: 'id',
    title: 'National ID Card or Birth Certificate',
    subtitle: 'Valid Cambodian National ID or passport for international applicants',
  },
  {
    id: 'transcripts',
    icon: 'transcript',
    title: 'Official Academic Transcripts & Grade Report',
    subtitle: 'Complete high school academic record for grades 10 to 12',
  },
  {
    id: 'photos',
    icon: 'photo',
    title: 'Recent Passport-Size Photographs',
    subtitle: '4×6 cm color photo with white or blue background taken within 6 months',
  },
]

export const applicationSteps: ApplicationStepItem[] = [
  {
    num: '01',
    title: 'Create Account',
    description: 'Register on the portal with your email and phone number.',
  },
  {
    num: '02',
    title: 'Complete Profile',
    description: 'Select your preferred faculty and academic major.',
  },
  {
    num: '03',
    title: 'Upload Documents',
    description: 'Attach your BacII certificate, ID, and photo.',
  },
  {
    num: '04',
    title: 'Pay Fee',
    description: 'Complete application fee via Bakong KHQR or bank.',
  },
  {
    num: '05',
    title: 'Take Exam',
    description: 'Download your exam slip and attend the test.',
  },
  {
    num: '06',
    title: 'Enroll',
    description: 'Check admission result and complete enrollment.',
  },
]

export const examSchedules: ExamScheduleItem[] = [
  {
    id: 'exam-sci-eng',
    faculty: 'Science & Engineering',
    date: '15 Dec 2026 · 08:00 AM',
    status: 'Scheduled',
  },
  {
    id: 'exam-soc-hum',
    faculty: 'Social Sciences & Humanities',
    date: '16 Dec 2026 · 08:00 AM',
    status: 'Scheduled',
  },
  {
    id: 'exam-ifl',
    faculty: 'Foreign Languages (IFL)',
    date: '18 Dec 2026 · 08:00 AM',
    status: 'Registration Open',
  },
]

export const newsArticles: NewsArticleItem[] = [
  {
    id: 'open-day-2026',
    image: '/images/news-1.png',
    category: 'CAMPUS EVENT',
    date: '24 OCT 2026',
    title: 'Discover your future at RUPP Open Day',
    excerpt:
      'Join faculty tours, meet professors, and explore academic programs in person at our main campus.',
    cta: 'Read more',
  },
  {
    id: 'application-guide-2026',
    image: '/images/news-2.png',
    category: 'ADMISSIONS GUIDE',
    date: '18 OCT 2026',
    title: 'Your application, step-by-step guidance',
    excerpt:
      'Our admissions team shares practical tips on preparing your documents and choosing your major.',
    cta: 'Read more',
  },
  {
    id: 'student-life-2026',
    image: '/images/news-3.png',
    category: 'STUDENT LIFE',
    date: '10 OCT 2026',
    title: 'Learning beyond the classroom',
    excerpt:
      'How undergraduate research, clubs, and community projects shape the RUPP student experience.',
    cta: 'Read more',
  },
]

export const footerGroups: FooterLinkGroup[] = [
  {
    heading: 'Admissions',
    links: [
      { label: 'How to Apply', href: '#process' },
      { label: 'Admission Requirements', href: '#requirements' },
      { label: 'Tuition & Fees', href: '#tuition' },
      { label: 'Scholarships & Aid', href: '#scholarships' },
      { label: 'FAQs & Support', href: '#faq' },
    ],
  },
  {
    heading: 'Faculties',
    links: [
      { label: 'Faculty of Science', href: '#programs' },
      { label: 'Faculty of Engineering', href: '#programs' },
      { label: 'Social Sciences & Humanities', href: '#programs' },
      { label: 'Development Studies', href: '#programs' },
      { label: 'Foreign Languages (IFL)', href: '#programs' },
    ],
  },
  {
    heading: 'Quick Links & Contact',
    links: [
      { label: 'Applicant Portal Login', href: '/login' },
      { label: 'Check Exam Results', href: '/results' },
      { label: 'Academic Calendar', href: '#announcements' },
      { label: 'Campus Map & Directions', href: '/contact' },
      { label: 'Contact Admissions Office', href: '/contact' },
    ],
  },
]
