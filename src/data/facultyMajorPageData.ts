import type {
  DashboardProgressStep,
  PortalDegreeLevel,
  PortalFacultyCardItem,
  PortalMajorProgramItem,
  PortalStudyMode,
} from '../types/admissions'

export const facultyMajorStepIndicator: DashboardProgressStep[] = [
  {
    stepNumber: 1,
    id: 'personal-info',
    title: 'Personal Information',
    shortDescription: 'Identity, contact & family details',
    status: 'completed',
  },
  {
    stepNumber: 2,
    id: 'academic-background',
    title: 'Academic Background',
    shortDescription: 'High school & BacII examination record',
    status: 'completed',
  },
  {
    stepNumber: 3,
    id: 'faculty-major',
    title: 'Faculty & Major',
    shortDescription: 'Degree program preferences',
    status: 'current',
  },
  {
    stepNumber: 4,
    id: 'documents',
    title: 'Document Upload',
    shortDescription: 'National ID, diploma & transcripts',
    status: 'upcoming',
  },
  {
    stepNumber: 5,
    id: 'my-application',
    title: 'Review & Submit',
    shortDescription: 'Final declaration & submission',
    status: 'upcoming',
  },
]

export const portalDegreeLevelOptions: Array<{ value: PortalDegreeLevel; label: string }> = [
  { value: 'Associate', label: 'Associate Degree (បរិញ្ញាបត្ររង)' },
  { value: "Bachelor's", label: "Bachelor's Degree (បរិញ្ញាបត្រ)" },
  { value: "Master's", label: "Master's Degree (បរិញ្ញាបត្រជាន់ខ្ពស់)" },
]

export const portalStudyModeOptions: Array<{ value: PortalStudyMode; label: string }> = [
  { value: 'Full-time', label: 'Full-time (ពេញម៉ោង)' },
  { value: 'Part-time', label: 'Part-time (ក្រៅម៉ោង)' },
]

export const portalFacultyCards: PortalFacultyCardItem[] = [
  {
    id: 'faculty-science',
    name: 'Faculty of Science',
    nameKhmer: 'មហាវិទ្យាល័យវិទ្យាសាស្ត្រ',
    shortDescription:
      'Foundational and applied programs in Computer Science, Information Technology, Mathematics, Biology, Chemistry, and Physics.',
    programCount: 4,
    image: '/images/about/fac-science.png',
    icon: 'science',
  },
  {
    id: 'faculty-engineering',
    name: 'Faculty of Engineering',
    nameKhmer: 'មហាវិទ្យាល័យវិស្វកម្ម',
    shortDescription:
      'Practice-oriented engineering education in Telecommunication, Information Engineering, Bio-Engineering, and Automation.',
    programCount: 2,
    image: '/images/about/fac-engineering.png',
    icon: 'engineering',
  },
  {
    id: 'faculty-social-sciences',
    name: 'Faculty of Social Sciences',
    nameKhmer: 'មហាវិទ្យាល័យវិទ្យាសាស្ត្រសង្គម',
    shortDescription:
      'Interdisciplinary research and degree programs in Sociology, Geography, Social Work, Public Policy, and History.',
    programCount: 2,
    image: '/images/about/fac-law.png',
    icon: 'social',
  },
  {
    id: 'faculty-development-studies',
    name: 'Faculty of Development Studies',
    nameKhmer: 'មហាវិទ្យាល័យសិក្សាអភិវឌ្ឍន៍',
    shortDescription:
      'Academic training in Community Development, Economic Development, Natural Resource Management, and Sustainable Planning.',
    programCount: 2,
    image: '/images/about/fac-business.png',
    icon: 'development',
  },
  {
    id: 'faculty-humanities',
    name: 'Faculty of Humanities',
    nameKhmer: 'មហាវិទ្យាល័យមនុស្សសាស្ត្រ',
    shortDescription:
      'Cultural, linguistic, and philosophical studies encompassing Khmer Literature, Foreign Languages, Philosophy, and Media.',
    programCount: 2,
    image: '/images/about/fac-arts.png',
    icon: 'humanities',
  },
  {
    id: 'faculty-education',
    name: 'Faculty of Education',
    nameKhmer: 'មហាវិទ្យាល័យអប់រំ',
    shortDescription:
      'Preparing educational leaders, curriculum specialists, and higher education administrators across Cambodia.',
    programCount: 2,
    image: '/images/about/fac-education.png',
    icon: 'education',
  },
]

export const portalMajorPrograms: PortalMajorProgramItem[] = [
  {
    id: 'prog-it',
    name: 'Information Technology',
    nameKhmer: 'ព័ត៌មានវិទ្យា',
    facultyId: 'faculty-science',
    facultyName: 'Faculty of Science',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Covers enterprise software development, network administration, database systems, cloud infrastructure, and cybersecurity.',
    available: true,
  },
  {
    id: 'prog-cs',
    name: 'Computer Science',
    nameKhmer: 'វិទ្យាសាស្ត្រកុំព្យូទ័រ',
    facultyId: 'faculty-science',
    facultyName: 'Faculty of Science',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Focuses on algorithms, data structures, software engineering, artificial intelligence, and computational systems.',
    available: true,
  },
  {
    id: 'prog-math',
    name: 'Mathematics',
    nameKhmer: 'គណិតវិទ្យា',
    facultyId: 'faculty-science',
    facultyName: 'Faculty of Science',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Develops analytical mastery in pure and applied mathematics, statistical modeling, and quantitative research methods.',
    available: true,
  },
  {
    id: 'prog-biology',
    name: 'Biology',
    nameKhmer: 'ជីវវិទ្យា',
    facultyId: 'faculty-science',
    facultyName: 'Faculty of Science',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Explores molecular biology, biodiversity conservation, microbiology, ecology, and laboratory research techniques.',
    available: true,
  },
  {
    id: 'prog-sociology',
    name: 'Sociology',
    nameKhmer: 'សង្គមវិទ្យា',
    facultyId: 'faculty-social-sciences',
    facultyName: 'Faculty of Social Sciences',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Examines social institutions, demographic change, community research methods, and contemporary Cambodian society.',
    available: true,
  },
  {
    id: 'prog-geography',
    name: 'Geography',
    nameKhmer: 'ភូមិវិទ្យា',
    facultyId: 'faculty-social-sciences',
    facultyName: 'Faculty of Social Sciences',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Integrates human and physical geography, Geographic Information Systems (GIS), spatial analysis, and land-use planning.',
    available: true,
  },
  {
    id: 'prog-telecom-eng',
    name: 'Telecommunication & Electronic Engineering',
    nameKhmer: 'វិស្វកម្មទូរគមនាគមន៍ និងអេឡិចត្រូនិក',
    facultyId: 'faculty-engineering',
    facultyName: 'Faculty of Engineering',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Covers wireless communication systems, embedded hardware design, signal processing, and optical networks.',
    available: true,
  },
  {
    id: 'prog-it-eng-assoc',
    name: 'Applied Network & Systems Engineering',
    nameKhmer: 'វិស្វកម្មបណ្តាញ និងប្រព័ន្ធអនុវត្តន៍',
    facultyId: 'faculty-engineering',
    facultyName: 'Faculty of Engineering',
    degreeLevel: 'Associate',
    studyDuration: '2 Years [Illustrative]',
    studyMode: 'Part-time',
    shortDescription:
      'Practical associate degree program focusing on network infrastructure, server administration, and industrial IT support.',
    available: true,
  },
  {
    id: 'prog-community-dev',
    name: 'Community Development',
    nameKhmer: 'អភិវឌ្ឍន៍សហគមន៍',
    facultyId: 'faculty-development-studies',
    facultyName: 'Faculty of Development Studies',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Prepares development practitioners in participatory project planning, rural livelihoods, and sustainable community programs.',
    available: true,
  },
  {
    id: 'prog-dev-studies-master',
    name: 'Development Studies (Graduate Program)',
    nameKhmer: 'សិក្សាអភិវឌ្ឍន៍ (ថ្នាក់បរិញ្ញាបត្រជាន់ខ្ពស់)',
    facultyId: 'faculty-development-studies',
    facultyName: 'Faculty of Development Studies',
    degreeLevel: "Master's",
    studyDuration: '2 Years [Illustrative]',
    studyMode: 'Part-time',
    shortDescription:
      'Advanced postgraduate study in socioeconomic policy, program evaluation, and regional sustainable development.',
    available: true,
  },
  {
    id: 'prog-khmer-lit',
    name: 'Khmer Literature',
    nameKhmer: 'អក្សរសាស្ត្រខ្មែរ',
    facultyId: 'faculty-humanities',
    facultyName: 'Faculty of Humanities',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'In-depth study of classical and modern Khmer literature, linguistics, epigraphy, and Cambodian cultural heritage.',
    available: true,
  },
  {
    id: 'prog-english-comm',
    name: 'English for Professional Communication',
    nameKhmer: 'ភាសាអង់គ្លេសសម្រាប់ទំនាក់ទំនងវិជ្ជាជីវៈ',
    facultyId: 'faculty-humanities',
    facultyName: 'Faculty of Humanities',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Part-time',
    shortDescription:
      'Develops advanced academic writing, cross-cultural communication, translation, and professional English skills.',
    available: true,
  },
  {
    id: 'prog-education-studies',
    name: 'Educational Studies & Pedagogy',
    nameKhmer: 'វិទ្យាសាស្ត្រអប់រំ និងគរុកោសល្យ',
    facultyId: 'faculty-education',
    facultyName: 'Faculty of Education',
    degreeLevel: "Bachelor's",
    studyDuration: '4 Years [Illustrative]',
    studyMode: 'Full-time',
    shortDescription:
      'Focuses on instructional design, educational psychology, classroom assessment, and school leadership.',
    available: true,
  },
  {
    id: 'prog-med-leadership',
    name: 'Master of Education in Leadership & Management',
    nameKhmer: 'បរិញ្ញាបត្រជាន់ខ្ពស់អប់រំផ្នែកភាពជាអ្នកដឹកនាំ និងគ្រប់គ្រង',
    facultyId: 'faculty-education',
    facultyName: 'Faculty of Education',
    degreeLevel: "Master's",
    studyDuration: '2 Years [Illustrative]',
    studyMode: 'Part-time',
    shortDescription:
      'Designed for educators and administrators leading educational policy, quality assurance, and institutional reform.',
    available: false, // Demonstrates disabled/closed intake state
  },
]
