import type {
  NewsCategory,
  NewsDetailArticle,
  OfficialAnnouncementRecord,
  ScholarshipOpportunityItem,
} from '../types/admissions'

export const newsCategories: NewsCategory[] = [
  'All News',
  'Admissions',
  'Academic',
  'Events',
  'Scholarships',
  'Research',
]

export const allNewsArticles: NewsDetailArticle[] = [
  {
    id: 'featured-admissions-intake',
    title:
      '[Sample Featured Story] Online Admissions & Registration Portal Opens for the New Academic Year',
    category: 'Admissions',
    datePlaceholder: '[ 25 October 2026 · Placeholder Date ]',
    readTimePlaceholder: '4 min read',
    authorPlaceholder: 'Office of Admissions & Registration',
    image: '/images/graduation.jpg',
    imageCaption:
      'Prospective and current students gathering on the main university campus courtyard.',
    excerpt:
      'The Office of Admissions & Registration announces the opening of online applications for undergraduate and postgraduate degree programs across all six academic faculties.',
    isFeatured: true,
    contentParagraphs: [
      '[Placeholder Article Content] The university has officially opened its online registration portal for prospective undergraduate and graduate students seeking admission for the upcoming academic year. Through the unified digital platform, applicants can review faculty requirements, upload certified academic transcripts, and track their application status in real time.',
      'Across six core faculties—Engineering, Information Technology, Science, Education, Social Sciences and Humanities, and Business and Economics—academic departments have prepared updated curricula designed to combine theoretical foundations with laboratory and field experience.',
      'Applicants are encouraged to prepare digital copies of their High School Diploma (BacII) or provisional pass certificate, National ID Card, academic grade reports, and recent passport-sized photographs prior to beginning the six-step online registration workflow.',
    ],
    quote:
      '“Our online admissions portal ensures that students from every province can access transparent, timely information and apply with confidence.”',
    keyPoints: [
      '[Placeholder] Online application submission available for all 6 academic faculties.',
      '[Placeholder] Digital document checklist and automated examination slip generation.',
      '[Placeholder] Dedicated admissions support desk available Monday through Friday.',
    ],
  },
  {
    id: 'news-open-day',
    title: 'Discover Your Future at the Annual University Campus Open Day',
    category: 'Events',
    datePlaceholder: '[ 24 October 2026 · Placeholder ]',
    readTimePlaceholder: '3 min read',
    authorPlaceholder: 'Campus Events Committee',
    image: '/images/news-1.png',
    imageCaption:
      'High school students and families visiting the main campus during Open Day.',
    excerpt:
      'Join guided faculty tours, meet department lecturers, and explore science laboratories and library facilities in person.',
    contentParagraphs: [
      '[Placeholder Article Content] Prospective students, parents, and high school counselors are invited to attend the Annual University Campus Open Day. The event offers a firsthand look at classroom life, laboratory facilities, and student support services.',
      'Faculty deans and admissions officers will host interactive information sessions explaining degree pathways, credit structures, and entrance examination preparation.',
    ],
    quote:
      '“Visiting campus in person helps prospective students envision their academic journey and connect directly with faculty mentors.”',
    keyPoints: [
      '[Placeholder] Guided tours of science, engineering, and computer laboratories.',
      '[Placeholder] Live Q&A sessions with faculty advisors and current students.',
      '[Placeholder] On-site application guidance at the Admissions Help Desk.',
    ],
  },
  {
    id: 'news-application-guidance',
    title: 'Step-by-Step Guidance: Preparing Your Undergraduate Application Package',
    category: 'Admissions',
    datePlaceholder: '[ 18 October 2026 · Placeholder ]',
    readTimePlaceholder: '5 min read',
    authorPlaceholder: 'Admissions Advisory Team',
    image: '/images/news-2.png',
    imageCaption:
      'Students reviewing online application requirements in the university study commons.',
    excerpt:
      'Our admissions specialists share practical advice on verifying documents, selecting your preferred major, and avoiding common submission errors.',
    contentParagraphs: [
      '[Placeholder Article Content] Submitting a complete and accurate application is the first milestone in your university journey. Before completing the online form, candidates should verify that their personal details match their official National ID and High School Diploma (BacII) records.',
      'When uploading supporting documents, ensure all scans are legible and include full page borders. Applicants applying for specialized engineering or science tracks should also review subject prerequisites prior to selecting their first-choice department.',
    ],
    keyPoints: [
      '[Placeholder] Verify name spelling in both Khmer and English script.',
      '[Placeholder] Prepare high-resolution PDF or image scans of transcripts.',
      '[Placeholder] Download and print your examination slip once verified.',
    ],
  },
  {
    id: 'news-undergrad-research',
    title: 'Learning Beyond the Classroom: Undergraduate Research & Laboratory Innovation',
    category: 'Research',
    datePlaceholder: '[ 12 October 2026 · Placeholder ]',
    readTimePlaceholder: '4 min read',
    authorPlaceholder: 'Office of Research & Academic Affairs',
    image: '/images/news-3.png',
    imageCaption:
      'Undergraduate students conducting collaborative experiments in the science laboratory.',
    excerpt:
      'How faculty-mentored research projects, laboratory practicums, and community fieldwork prepare students for real-world impact.',
    contentParagraphs: [
      '[Placeholder Article Content] Research inquiry is an integral component of undergraduate and postgraduate education across our faculties. Beginning in their intermediate semesters, students work alongside faculty supervisors on applied research addressing environmental, technological, and social priorities.',
      'Annual student research symposiums provide a formal platform for graduating cohorts to present their findings to academic peers and industry partners.',
    ],
    keyPoints: [
      '[Placeholder] Interdisciplinary research clusters across science and engineering.',
      '[Placeholder] Annual undergraduate thesis exhibition and academic symposium.',
    ],
  },
  {
    id: 'news-curriculum-update',
    title: 'Academic Senate Approves Updated Digital & Analytical Core Modules',
    category: 'Academic',
    datePlaceholder: '[ 06 October 2026 · Placeholder ]',
    readTimePlaceholder: '3 min read',
    authorPlaceholder: 'Academic Affairs Secretariat',
    image: '/images/about/fac-science.png',
    imageCaption:
      'Students working in the upgraded campus computer laboratory.',
    excerpt:
      'New foundational coursework in digital literacy, data analysis, and academic communication introduced across first-year degree tracks.',
    contentParagraphs: [
      '[Placeholder Article Content] To ensure graduates are prepared for evolving workplace demands, the university has enhanced its first-year foundation curriculum with updated modules in digital literacy, quantitative reasoning, and academic writing.',
      'All incoming undergraduate students will benefit from modernized computer laboratory sessions and structured academic advising throughout their first two semesters.',
    ],
  },
  {
    id: 'news-scholarship-briefing',
    title: 'Information Session on Merit & Need-Based University Scholarships',
    category: 'Scholarships',
    datePlaceholder: '[ 29 September 2026 · Placeholder ]',
    readTimePlaceholder: '4 min read',
    authorPlaceholder: 'Scholarship & Financial Aid Office',
    image: '/images/about/fac-education.png',
    imageCaption:
      'Prospective scholarship applicants attending an academic briefing session.',
    excerpt:
      'Learn about eligibility criteria, required supporting documents, and examination dates for upcoming scholarship awards.',
    contentParagraphs: [
      '[Placeholder Article Content] The Scholarship & Financial Aid Office hosts regular briefing sessions to guide prospective applicants through merit-based and need-based financial support programs.',
      'Candidates interested in applying for tuition scholarships are advised to submit their scholarship application alongside their primary admission form before the published deadline.',
    ],
  },
  {
    id: 'news-library-archive',
    title: 'University Library Expands Digital Journal & Research Repository Access',
    category: 'Academic',
    datePlaceholder: '[ 20 September 2026 · Placeholder ]',
    readTimePlaceholder: '3 min read',
    authorPlaceholder: 'University Central Library',
    image: '/images/about/fac-arts.png',
    imageCaption:
      'Reading tables and reference shelves inside the University Library.',
    excerpt:
      'Students and faculty members now have expanded access to international academic databases, e-books, and digital thesis archives.',
    contentParagraphs: [
      '[Placeholder Article Content] The University Central Library has expanded its digital repository, enabling enrolled students and researchers to access thousands of peer-reviewed journals and reference volumes both on campus and remotely.',
    ],
  },
]

export const officialAnnouncements: OfficialAnnouncementRecord[] = [
  {
    id: 'ann-admission-open',
    dayPlaceholder: '15',
    monthPlaceholder: 'OCT',
    yearPlaceholder: '2026',
    type: 'Admission Announcement',
    statusLabel: 'OPEN',
    title: '[Placeholder] Official Opening of Undergraduate & Graduate Admissions (2026–2027)',
    summary:
      'Online registration is now open for all six faculties. Candidates may submit applications via the official admissions portal.',
    referenceCodePlaceholder: 'Ref: ADM-2026-001 [Placeholder]',
  },
  {
    id: 'ann-reg-deadline',
    dayPlaceholder: '30',
    monthPlaceholder: 'NOV',
    yearPlaceholder: '2026',
    type: 'Registration Deadline',
    statusLabel: 'DEADLINE',
    title: '[Placeholder] Final Deadline for Semester 1 Online Application Submission',
    summary:
      'All required academic transcripts, identity documents, and application fees must be completed prior to the closing date.',
    referenceCodePlaceholder: 'Ref: REG-2026-014 [Placeholder]',
  },
  {
    id: 'ann-exam-schedule',
    dayPlaceholder: '15',
    monthPlaceholder: 'DEC',
    yearPlaceholder: '2026',
    type: 'Examination Schedule',
    statusLabel: 'SCHEDULED',
    title: '[Placeholder] National & Faculty Entrance Examination Dates and Venue Assignments',
    summary:
      'Entrance examinations for Science, Engineering, Social Sciences, and Foreign Languages tracks will be held at the main campus examination halls.',
    referenceCodePlaceholder: 'Ref: EXM-2026-008 [Placeholder]',
  },
  {
    id: 'ann-admission-results',
    dayPlaceholder: '28',
    monthPlaceholder: 'DEC',
    yearPlaceholder: '2026',
    type: 'Admission Result',
    statusLabel: 'PUBLISHED',
    title: '[Placeholder] Publication Schedule for Entrance Examination & Scholarship Results',
    summary:
      'Official placement lists and individual candidate scores will be accessible online via the Results Portal using your Candidate ID.',
    referenceCodePlaceholder: 'Ref: RES-2026-003 [Placeholder]',
  },
  {
    id: 'ann-uni-notice',
    dayPlaceholder: '05',
    monthPlaceholder: 'JAN',
    yearPlaceholder: '2027',
    type: 'University Notice',
    statusLabel: 'NOTICE',
    title: '[Placeholder] New Student Orientation & Document Verification Schedule',
    summary:
      'Admitted candidates must present original High School Diploma (BacII) certificates during the mandatory orientation week.',
    referenceCodePlaceholder: 'Ref: NOT-2027-002 [Placeholder]',
  },
]

export const scholarshipOpportunities: ScholarshipOpportunityItem[] = [
  {
    id: 'sch-merit',
    badge: 'MERIT SCHOLARSHIP',
    title: '[Placeholder] University Academic Excellence Scholarship',
    coveragePlaceholder: '[ Up to 100% Tuition Waiver · Placeholder ]',
    deadlinePlaceholder: '[ Deadline: 15 November 2026 · Placeholder ]',
    eligibilitySummary:
      'Awarded to outstanding high school graduates demonstrating exceptional BacII examination grades and entrance assessment performance.',
    status: 'Applications Open',
  },
  {
    id: 'sch-ministry',
    badge: 'NATIONAL QUOTA',
    title: '[Placeholder] Ministry of Education & Public Merit Scholarship Track',
    coveragePlaceholder: '[ Full / Partial Tuition Support · Placeholder ]',
    deadlinePlaceholder: '[ Deadline: 20 November 2026 · Placeholder ]',
    eligibilitySummary:
      'State-supported scholarship placements across priority science, engineering, education, and social development degree programs.',
    status: 'Applications Open',
  },
  {
    id: 'sch-research-grant',
    badge: 'GRADUATE & RESEARCH',
    title: '[Placeholder] Postgraduate Research & Teaching Assistantship',
    coveragePlaceholder: '[ Tuition + Research Stipend · Placeholder ]',
    deadlinePlaceholder: '[ Deadline: 05 December 2026 · Placeholder ]',
    eligibilitySummary:
      "Available to qualified Master's degree applicants contributing to faculty laboratory instruction and applied research projects.",
    status: 'Closing Soon',
  },
]
