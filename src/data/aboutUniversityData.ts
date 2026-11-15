import type {
  AboutFacultyCardItem,
  CampusFacilityItem,
  ContactDetailItem,
  CoreValueItem,
  HistoryMilestoneItem,
  InstitutionalStatItem,
} from '../types/admissions'

export const overviewHighlights: string[] = [
  'Accredited degree programs recognized nationally and internationally',
  'Experienced faculty combining academic scholarship with industry practice',
  'Supportive campus environment with modern learning and research spaces',
]

export const historyMilestones: HistoryMilestoneItem[] = [
  {
    year: '[Year]',
    title: 'Foundation',
    description:
      'Established with a mandate to expand higher education access in Cambodia.',
  },
  {
    year: '[Year]',
    title: 'Academic growth',
    description:
      'Expanded into new faculties covering science, business, and humanities.',
  },
  {
    year: '[Year]',
    title: 'Research & partnerships',
    description:
      'Built international academic partnerships and modern research centers.',
  },
  {
    year: '[Year]',
    title: 'Modern campus',
    description:
      'Launched digital admissions, upgraded laboratories, and student facilities.',
  },
]

export const missionPoints: string[] = [
  'Deliver high-quality education that equips students with critical thinking and practical skills.',
  'Advance research and innovation addressing national and regional development priorities.',
  'Foster ethical citizenship, cultural preservation, and lifelong learning across society.',
]

export const coreValues: CoreValueItem[] = [
  {
    num: '01',
    title: 'Academic excellence',
    description:
      'Upholding rigorous standards in teaching, scholarship, and intellectual inquiry.',
  },
  {
    num: '02',
    title: 'Integrity & ethics',
    description:
      'Acting with honesty, fairness, accountability, and respect in all endeavors.',
  },
  {
    num: '03',
    title: 'Innovation & inquiry',
    description:
      'Encouraging curiosity, creative problem-solving, and forward-looking research.',
  },
  {
    num: '04',
    title: 'Social responsibility',
    description:
      'Serving communities and contributing to sustainable national development.',
  },
]

export const aboutFaculties: AboutFacultyCardItem[] = [
  {
    id: 'science-tech',
    image: '/images/about/fac-science.png',
    eyebrow: 'FACULTY OF',
    title: 'Science & Technology',
    description:
      'Computer Science, Mathematics, Physics, Chemistry, Biology, and Environmental Science.',
  },
  {
    id: 'business-econ',
    image: '/images/about/fac-business.png',
    eyebrow: 'FACULTY OF',
    title: 'Business & Economics',
    description:
      'Business Administration, Finance, Accounting, Economics, and Management.',
  },
  {
    id: 'arts-humanities',
    image: '/images/about/fac-arts.png',
    eyebrow: 'FACULTY OF',
    title: 'Arts & Humanities',
    description:
      'Literature, History, Philosophy, Fine Arts, Media, and Cultural Studies.',
  },
  {
    id: 'engineering',
    image: '/images/about/fac-engineering.png',
    eyebrow: 'FACULTY OF',
    title: 'Engineering',
    description:
      'Information Technology, Telecommunication, Bio-Engineering, and Automation.',
  },
  {
    id: 'social-sciences-law',
    image: '/images/about/fac-law.png',
    eyebrow: 'FACULTY OF',
    title: 'Social Sciences & Law',
    description:
      'International Relations, Public Policy, Sociology, Psychology, and Law.',
  },
  {
    id: 'education',
    image: '/images/about/fac-education.png',
    eyebrow: 'FACULTY OF',
    title: 'Education',
    description:
      'Educational Studies, Higher Education Management, and Curriculum Development.',
  },
]

export const campusFacilitiesTop: CampusFacilityItem[] = [
  {
    id: 'library',
    image: '/images/about/fac-arts.png',
    title: 'Library',
    description:
      'Extensive print and digital collections, quiet reading rooms, and collaborative study spaces.',
  },
  {
    id: 'computer-labs',
    image: '/images/about/fac-science.png',
    title: 'Computer Laboratories',
    description:
      'Modern workstations equipped with specialized software and high-speed campus connectivity.',
  },
]

export const campusFacilitiesBottom: CampusFacilityItem[] = [
  {
    id: 'lecture-halls',
    image: '/images/about/fac-education.png',
    title: 'Classrooms & Lecture Halls',
    description:
      'Spacious multimedia-enabled lecture halls designed for interactive learning.',
  },
  {
    id: 'research-facilities',
    image: '/images/about/fac-engineering.png',
    title: 'Research Facilities',
    description:
      'Dedicated science and engineering laboratories supporting student and faculty research.',
  },
  {
    id: 'student-facilities',
    image: '/images/about/facility-student.png',
    title: 'Student Facilities',
    description:
      'Campus dining, recreation areas, student union spaces, and green courtyards.',
  },
]

export const institutionalStats: InstitutionalStatItem[] = [
  {
    metric: '—',
    title: 'Established',
    subtitle: 'Year of foundation',
  },
  {
    metric: '—',
    title: 'Academic Programs',
    subtitle: 'Undergraduate & graduate',
  },
  {
    metric: '—',
    title: 'Faculties',
    subtitle: 'Core academic divisions',
  },
  {
    metric: '—',
    title: 'Student Body',
    subtitle: 'Active enrolled students',
  },
]

export const universityContacts: ContactDetailItem[] = [
  {
    label: 'CAMPUS ADDRESS',
    value: 'Russian Federation Boulevard, Toul Kork, Phnom Penh, Cambodia',
  },
  {
    label: 'TELEPHONE',
    value: '+855 (0) 23 883 640',
  },
  {
    label: 'EMAIL',
    value: 'admissions@university.edu.kh',
  },
  {
    label: 'OFFICE HOURS',
    value: 'Monday – Friday: 7:30 AM – 5:00 PM',
  },
]
