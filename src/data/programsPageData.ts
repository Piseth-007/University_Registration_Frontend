import type {
  AcademicProgramItem,
  AcademicStrengthItem,
  DegreeLevel,
  FacultyDirectoryItem,
  StudyMode,
} from '../types/admissions'

export interface AcademicStructureBlock {
  id: string
  label: string
  title: string
  description: string
  placeholderTag: string
}

export const academicStructureBlocks: AcademicStructureBlock[] = [
  {
    id: 'undergraduate',
    label: 'UNDERGRADUATE EDUCATION',
    title: "Bachelor's Degree Pathways",
    description:
      'Structured foundational and specialized coursework designed to prepare high school graduates with strong theoretical knowledge and applied skills.',
    placeholderTag: '[ Duration & Credits — Placeholder ]',
  },
  {
    id: 'postgraduate',
    label: 'GRADUATE & RESEARCH',
    title: "Master's & Advanced Studies",
    description:
      'Advanced academic and professional programs focused on specialized research, leadership, and policy or technical innovation.',
    placeholderTag: '[ Duration & Credits — Placeholder ]',
  },
  {
    id: 'continuing',
    label: 'FLEXIBLE & CONTINUING STUDY',
    title: 'Foundation & Part-Time Tracks',
    description:
      'First-year foundation studies, professional diplomas, and flexible study schedules supporting working learners and diverse academic goals.',
    placeholderTag: '[ Schedule Options — Placeholder ]',
  },
]

export const facultyDirectoryList: FacultyDirectoryItem[] = [
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    shortName: 'Engineering',
    image: '/images/about/fac-engineering.png',
    programCountPlaceholder: '[ X Programs · Placeholder ]',
    description:
      'Prepares future engineers through laboratory-based instruction, systems design, and applied engineering projects across core technical disciplines.',
  },
  {
    id: 'it',
    name: 'Faculty of Information Technology',
    shortName: 'Information Technology',
    image: '/images/about/fac-science.png',
    programCountPlaceholder: '[ X Programs · Placeholder ]',
    description:
      'Focuses on software development, data systems, network infrastructure, and emerging digital technologies for modern industry needs.',
  },
  {
    id: 'science',
    name: 'Faculty of Science',
    shortName: 'Science',
    image: '/images/news-3.png',
    programCountPlaceholder: '[ X Programs · Placeholder ]',
    description:
      'Advances scientific inquiry across mathematics, physics, chemistry, biology, and environmental studies through theory and laboratory research.',
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    shortName: 'Education',
    image: '/images/about/fac-education.png',
    programCountPlaceholder: '[ X Programs · Placeholder ]',
    description:
      'Develops educators, curriculum specialists, and academic leaders committed to strengthening teaching quality and lifelong learning.',
  },
  {
    id: 'social-sciences',
    name: 'Faculty of Social Sciences and Humanities',
    shortName: 'Social Sciences & Humanities',
    image: '/images/about/fac-arts.png',
    programCountPlaceholder: '[ X Programs · Placeholder ]',
    description:
      'Explores human society, culture, history, languages, public policy, and community development within national and global contexts.',
  },
  {
    id: 'business',
    name: 'Faculty of Business and Economics',
    shortName: 'Business & Economics',
    image: '/images/about/fac-business.png',
    programCountPlaceholder: '[ X Programs · Placeholder ]',
    description:
      'Equips students with analytical, managerial, financial, and entrepreneurial capabilities for private and public sector leadership.',
  },
]

export const degreeLevelOptions: DegreeLevel[] = [
  "Bachelor's Degree",
  "Master's Degree",
  'Diploma / Foundation',
]

export const studyModeOptions: StudyMode[] = [
  'Full-Time',
  'Part-Time / Weekend',
  'Evening',
]

export const academicProgramsCatalog: AcademicProgramItem[] = [
  {
    id: 'prog-civil-eng',
    name: '[Sample Program] Bachelor of Engineering in Civil & Infrastructure Systems',
    facultyId: 'engineering',
    facultyName: 'Faculty of Engineering',
    degreeLevel: "Bachelor's Degree",
    studyMode: 'Full-Time',
    durationPlaceholder: '[ 4 Years / 8 Semesters · Placeholder ]',
    degreeAwardedPlaceholder: '[ Bachelor of Engineering · Placeholder ]',
    summary:
      'Sample program entry covering structural analysis, construction management, materials testing, and sustainable infrastructure design.',
    introduction:
      'This sample program profile illustrates how official degree descriptions will appear once confirmed by the Faculty of Engineering. Students gain a balanced foundation in engineering mathematics, structural mechanics, and hands-on laboratory testing.',
    learningObjectives: [
      '[Placeholder] Apply fundamental engineering principles to analyze and design safe infrastructure systems.',
      '[Placeholder] Conduct materials and geotechnical laboratory investigations using standard protocols.',
      '[Placeholder] Manage engineering projects with attention to safety, sustainability, and professional ethics.',
    ],
    curriculumOverview: [
      {
        stage: 'Year 1 — Foundation Studies [Placeholder]',
        focus: 'Engineering Mathematics, General Physics, Technical Drawing, and Academic Communication.',
      },
      {
        stage: 'Year 2 — Core Engineering [Placeholder]',
        focus: 'Mechanics of Materials, Fluid Mechanics, Surveying, and Structural Analysis.',
      },
      {
        stage: 'Year 3 — Applied Design & Labs [Placeholder]',
        focus: 'Reinforced Concrete Design, Geotechnical Engineering, Transportation Systems, and Field Practicum.',
      },
      {
        stage: 'Year 4 — Capstone & Internship [Placeholder]',
        focus: 'Senior Engineering Design Project, Construction Management, and Industry Internship.',
      },
    ],
    admissionRequirements: [
      '[Placeholder] Recognized High School Diploma (BacII) or equivalent qualification.',
      '[Placeholder] Satisfactory score in Mathematics and Physics entrance assessments.',
      '[Placeholder] Completed online admission application and required identity documents.',
    ],
    careerOpportunities: [
      '[Placeholder] Civil & Structural Design Engineer',
      '[Placeholder] Construction Project Coordinator',
      '[Placeholder] Infrastructure Planning & Quality Assurance Specialist',
    ],
  },
  {
    id: 'prog-software-it',
    name: '[Sample Program] Bachelor of Information Technology in Software Development',
    facultyId: 'it',
    facultyName: 'Faculty of Information Technology',
    degreeLevel: "Bachelor's Degree",
    studyMode: 'Full-Time',
    durationPlaceholder: '[ 4 Years / 8 Semesters · Placeholder ]',
    degreeAwardedPlaceholder: '[ Bachelor of Information Technology · Placeholder ]',
    summary:
      'Sample program entry focusing on programming fundamentals, web and mobile engineering, database architecture, and cloud systems.',
    introduction:
      'This editable program template demonstrates the curriculum and career layout for Information Technology degrees. It combines algorithmic thinking with practical software engineering studio projects.',
    learningObjectives: [
      '[Placeholder] Design, build, and test scalable web, mobile, and enterprise software applications.',
      '[Placeholder] Architect relational and distributed databases with strong security practices.',
      '[Placeholder] Collaborate effectively in agile software development teams.',
    ],
    curriculumOverview: [
      {
        stage: 'Year 1 — Computing Foundations [Placeholder]',
        focus: 'Programming Fundamentals, Discrete Mathematics, Computer Architecture, and Digital Logic.',
      },
      {
        stage: 'Year 2 — Software & Data Structures [Placeholder]',
        focus: 'Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and Computer Networks.',
      },
      {
        stage: 'Year 3 — Full-Stack & Systems Engineering [Placeholder]',
        focus: 'Web Application Architecture, Mobile Computing, Cybersecurity Principles, and Software Quality Assurance.',
      },
      {
        stage: 'Year 4 — Capstone & Industry Placement [Placeholder]',
        focus: 'Cloud DevOps, Senior Software Capstone Project, and Professional IT Internship.',
      },
    ],
    admissionRequirements: [
      '[Placeholder] High School Diploma (BacII) or equivalent qualification.',
      '[Placeholder] Pass in university entrance assessment for Computing / Science track.',
      '[Placeholder] Submission of official transcripts and national identification.',
    ],
    careerOpportunities: [
      '[Placeholder] Full-Stack Software Developer',
      '[Placeholder] Systems & Database Administrator',
      '[Placeholder] Quality Assurance & DevOps Engineer',
    ],
  },
  {
    id: 'prog-applied-science',
    name: '[Sample Program] Bachelor of Science in Applied Mathematics & Data Science',
    facultyId: 'science',
    facultyName: 'Faculty of Science',
    degreeLevel: "Bachelor's Degree",
    studyMode: 'Full-Time',
    durationPlaceholder: '[ 4 Years · Placeholder ]',
    degreeAwardedPlaceholder: '[ Bachelor of Science · Placeholder ]',
    summary:
      'Sample program entry integrating mathematical modeling, statistical inference, scientific computing, and quantitative research methods.',
    introduction:
      'This placeholder program profile outlines how Faculty of Science degrees present quantitative and laboratory training for students pursuing scientific or analytical careers.',
    learningObjectives: [
      '[Placeholder] Formulate mathematical and statistical models for complex real-world problems.',
      '[Placeholder] Utilize scientific computing tools for data analysis and simulation.',
      '[Placeholder] Communicate quantitative findings clearly in academic and professional settings.',
    ],
    curriculumOverview: [
      {
        stage: 'Year 1 — Core Sciences [Placeholder]',
        focus: 'Calculus, Linear Algebra, General Science Foundations, and Introduction to Programming.',
      },
      {
        stage: 'Year 2 — Probability & Analysis [Placeholder]',
        focus: 'Differential Equations, Probability Theory, Statistical Methods, and Numerical Analysis.',
      },
      {
        stage: 'Year 3 — Modeling & Computation [Placeholder]',
        focus: 'Mathematical Modeling, Optimization, Statistical Learning, and Research Seminar.',
      },
      {
        stage: 'Year 4 — Senior Thesis [Placeholder]',
        focus: 'Advanced Quantitative Electives and Undergraduate Research Dissertation.',
      },
    ],
    admissionRequirements: [
      '[Placeholder] High School Diploma (BacII) with strong background in Mathematics.',
      '[Placeholder] Completion of Faculty of Science entrance examination.',
    ],
    careerOpportunities: [
      '[Placeholder] Quantitative & Data Analyst',
      '[Placeholder] Scientific Research Associate',
      '[Placeholder] Actuarial & Statistical Officer',
    ],
  },
  {
    id: 'prog-edu-leadership',
    name: '[Sample Program] Master of Education in Curriculum & Instructional Leadership',
    facultyId: 'education',
    facultyName: 'Faculty of Education',
    degreeLevel: "Master's Degree",
    studyMode: 'Part-Time / Weekend',
    durationPlaceholder: '[ 2 Years · Placeholder ]',
    degreeAwardedPlaceholder: '[ Master of Education · Placeholder ]',
    summary:
      'Sample graduate program entry designed for teachers and educational administrators seeking advanced pedagogical and leadership training.',
    introduction:
      'This editable graduate program profile demonstrates how Master’s pathways in the Faculty of Education are structured for practicing educators and school leaders.',
    learningObjectives: [
      '[Placeholder] Evaluate and design modern curriculum frameworks aligned with national standards.',
      '[Placeholder] Lead instructional improvement and educational assessment initiatives.',
      '[Placeholder] Conduct applied educational research within schools and higher education institutions.',
    ],
    curriculumOverview: [
      {
        stage: 'Term 1–2 — Core Pedagogy & Research [Placeholder]',
        focus: 'Curriculum Theory, Educational Research Methodology, and Assessment Design.',
      },
      {
        stage: 'Term 3–4 — Leadership & Thesis [Placeholder]',
        focus: 'Educational Administration, Policy Analysis, and Master’s Research Thesis.',
      },
    ],
    admissionRequirements: [
      "[Placeholder] Recognized Bachelor's degree in Education or a related field.",
      '[Placeholder] Minimum teaching or educational administration experience (if applicable).',
      '[Placeholder] Entrance interview and academic writing assessment.',
    ],
    careerOpportunities: [
      '[Placeholder] Curriculum Development Specialist',
      '[Placeholder] School Principal / Academic Director',
      '[Placeholder] Educational Policy Researcher',
    ],
  },
  {
    id: 'prog-social-policy',
    name: '[Sample Program] Bachelor of Arts in Social Sciences & Development Studies',
    facultyId: 'social-sciences',
    facultyName: 'Faculty of Social Sciences and Humanities',
    degreeLevel: "Bachelor's Degree",
    studyMode: 'Full-Time',
    durationPlaceholder: '[ 4 Years · Placeholder ]',
    degreeAwardedPlaceholder: '[ Bachelor of Arts · Placeholder ]',
    summary:
      'Sample program entry examining social research methods, public policy, community development, and regional socio-economic change.',
    introduction:
      'This sample program layout represents undergraduate degrees in the Faculty of Social Sciences and Humanities, combining classroom seminars with community fieldwork.',
    learningObjectives: [
      '[Placeholder] Analyze social, cultural, and economic development challenges in Cambodia and ASEAN.',
      '[Placeholder] Design and conduct qualitative and quantitative social field research.',
      '[Placeholder] Contribute to community development programs and public policy dialogue.',
    ],
    curriculumOverview: [
      {
        stage: 'Year 1 — Foundation Humanities [Placeholder]',
        focus: 'Introduction to Sociology, Cambodian History & Culture, Academic Writing, and Foreign Language.',
      },
      {
        stage: 'Year 2 — Social Theory & Methods [Placeholder]',
        focus: 'Qualitative & Quantitative Research Methods, Development Economics, and Human Geography.',
      },
      {
        stage: 'Year 3 — Policy & Fieldwork [Placeholder]',
        focus: 'Public Policy Analysis, Sustainable Community Development, and Field Practicum.',
      },
      {
        stage: 'Year 4 — Research Report [Placeholder]',
        focus: 'Senior Field Research Project and Specialized Development Seminars.',
      },
    ],
    admissionRequirements: [
      '[Placeholder] High School Diploma (BacII) or equivalent qualification.',
      '[Placeholder] Social Sciences track entrance examination.',
    ],
    careerOpportunities: [
      '[Placeholder] Community Development & NGO Program Officer',
      '[Placeholder] Social Research & Policy Analyst',
      '[Placeholder] Public Administration & Civil Service Specialist',
    ],
  },
  {
    id: 'prog-business-fin',
    name: '[Sample Program] Bachelor of Business Administration in Finance & Management',
    facultyId: 'business',
    facultyName: 'Faculty of Business and Economics',
    degreeLevel: "Bachelor's Degree",
    studyMode: 'Evening',
    durationPlaceholder: '[ 4 Years · Placeholder ]',
    degreeAwardedPlaceholder: '[ Bachelor of Business Administration · Placeholder ]',
    summary:
      'Sample program entry covering corporate finance, accounting principles, organizational strategy, and economic analysis.',
    introduction:
      'This sample program profile illustrates undergraduate offerings in the Faculty of Business and Economics, available in flexible full-time and evening schedules.',
    learningObjectives: [
      '[Placeholder] Interpret financial statements and apply corporate finance principles to business decisions.',
      '[Placeholder] Develop strategic management and marketing plans for growing enterprises.',
      '[Placeholder] Understand macroeconomic and regulatory environments in Cambodia and the region.',
    ],
    curriculumOverview: [
      {
        stage: 'Year 1 — Business Foundations [Placeholder]',
        focus: 'Principles of Management, Microeconomics, Financial Accounting I, and Business Mathematics.',
      },
      {
        stage: 'Year 2 — Core Economics & Finance [Placeholder]',
        focus: 'Macroeconomics, Managerial Accounting, Corporate Finance, and Business Law.',
      },
      {
        stage: 'Year 3 — Strategy & Operations [Placeholder]',
        focus: 'Investment Analysis, Marketing Management, Operations Management, and Research Methods.',
      },
      {
        stage: 'Year 4 — Business Capstone [Placeholder]',
        focus: 'Strategic Management, Entrepreneurship Practicum, and Industry Internship.',
      },
    ],
    admissionRequirements: [
      '[Placeholder] High School Diploma (BacII) or equivalent qualification.',
      '[Placeholder] Completion of university admission registration and document verification.',
    ],
    careerOpportunities: [
      '[Placeholder] Financial & Banking Analyst',
      '[Placeholder] Business Operations & Project Manager',
      '[Placeholder] Accounting & Audit Associate',
    ],
  },
]

export const academicStrengths: AcademicStrengthItem[] = [
  {
    id: 'lecturers',
    num: '01',
    title: 'Experienced Lecturers',
    description:
      'Learn from dedicated professors and visiting scholars who bring academic rigor, mentorship, and real-world insight into every classroom.',
  },
  {
    id: 'practical',
    num: '02',
    title: 'Practical Learning',
    description:
      'Bridge theory and practice through laboratory sessions, field practicums, studio projects, and industry internship placements.',
  },
  {
    id: 'facilities',
    num: '03',
    title: 'Modern Facilities',
    description:
      'Access specialized science and engineering laboratories, computer centers, academic libraries, and collaborative study spaces.',
  },
  {
    id: 'research',
    num: '04',
    title: 'Research Opportunities',
    description:
      'Participate in faculty-mentored undergraduate and graduate research addressing national and regional development priorities.',
  },
]
