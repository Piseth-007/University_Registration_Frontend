import type {
  ContactFaqItem,
  ContactInfoBlockItem,
  UniversityOfficeItem,
} from '../types/admissions'

export const contactInfoBlocks: ContactInfoBlockItem[] = [
  {
    id: 'address',
    icon: 'address',
    title: 'University Address',
    primaryValuePlaceholder: '[ Main Campus Boulevard / Street · Placeholder ]',
    secondaryValuePlaceholder: '[ District, Province / City · Editable Location ]',
  },
  {
    id: 'telephone',
    icon: 'phone',
    title: 'Telephone Number',
    primaryValuePlaceholder: '[ +855 (0) XX XXX XXX · Placeholder ]',
    secondaryValuePlaceholder: '[ Admissions & General Switchboard · Editable ]',
  },
  {
    id: 'email',
    icon: 'email',
    title: 'Official Email',
    primaryValuePlaceholder: '[ admissions@university.edu.kh · Placeholder ]',
    secondaryValuePlaceholder: '[ info@university.edu.kh · Editable ]',
  },
  {
    id: 'hours',
    icon: 'hours',
    title: 'Office Hours',
    primaryValuePlaceholder: '[ Monday – Friday: 7:30 AM – 5:00 PM ]',
    secondaryValuePlaceholder: '[ Closed on Weekends & Public Holidays · Placeholder ]',
  },
]

export const inquirySubjectOptions: string[] = [
  'Undergraduate / Graduate Admissions Inquiry',
  'Application & Document Verification Support',
  'Entrance Examination & Results Inquiry',
  'Academic Programs & Faculty Information',
  'Scholarships & Financial Aid',
  'General Administrative Inquiry',
]

export const universityOffices: UniversityOfficeItem[] = [
  {
    id: 'office-admissions',
    name: 'Admission Office',
    roleSummary:
      'Assists prospective applicants with online registration, eligibility requirements, document verification, and entrance examination slips.',
    locationPlaceholder: '[ Building A, Ground Floor, Room 101 · Placeholder ]',
    phonePlaceholder: '[ +855 (0) XX XXX XXX (Ext. 101) · Placeholder ]',
    emailPlaceholder: '[ admissions@university.edu.kh · Placeholder ]',
    hoursPlaceholder: '[ Mon–Fri · 7:30 AM – 5:00 PM ]',
  },
  {
    id: 'office-academic',
    name: 'Academic Affairs Office',
    roleSummary:
      'Oversees degree curricula, academic calendars, faculty coordination, credit transfers, and official academic transcripts.',
    locationPlaceholder: '[ Administration Building, 2nd Floor, Room 204 · Placeholder ]',
    phonePlaceholder: '[ +855 (0) XX XXX XXX (Ext. 204) · Placeholder ]',
    emailPlaceholder: '[ academicaffairs@university.edu.kh · Placeholder ]',
    hoursPlaceholder: '[ Mon–Fri · 8:00 AM – 5:00 PM ]',
  },
  {
    id: 'office-student',
    name: 'Student Affairs Office',
    roleSummary:
      'Supports enrolled students with orientation, scholarships, campus clubs, counseling services, and student welfare.',
    locationPlaceholder: '[ Student Center, 1st Floor, Room 108 · Placeholder ]',
    phonePlaceholder: '[ +855 (0) XX XXX XXX (Ext. 302) · Placeholder ]',
    emailPlaceholder: '[ studentaffairs@university.edu.kh · Placeholder ]',
    hoursPlaceholder: '[ Mon–Fri · 8:00 AM – 5:00 PM ]',
  },
  {
    id: 'office-admin',
    name: 'General Administration Office',
    roleSummary:
      'Handles institutional correspondence, public relations, campus facilities management, and official university verifications.',
    locationPlaceholder: '[ Main Administration Building, 1st Floor · Placeholder ]',
    phonePlaceholder: '[ +855 (0) XX XXX XXX (Ext. 100) · Placeholder ]',
    emailPlaceholder: '[ administration@university.edu.kh · Placeholder ]',
    hoursPlaceholder: '[ Mon–Fri · 7:30 AM – 5:00 PM ]',
  },
]

export const contactFaqs: ContactFaqItem[] = [
  {
    id: 'faq-apply',
    question: 'How can I apply for admission?',
    answerPlaceholder:
      '[Placeholder Answer] Prospective students can apply online through the university Admissions Portal by creating an applicant account, selecting a preferred faculty and degree program, uploading required academic documents (such as the High School Diploma / BacII certificate and National ID), and completing the registration steps before the published deadline.',
    actionLabel: 'Go to Online Application',
    actionRoute: '/apply',
  },
  {
    id: 'faq-status',
    question: 'How can I check my registration status?',
    answerPlaceholder:
      '[Placeholder Answer] After submitting your online application, you can sign in to the Applicant Portal using your registered email address or Application ID to view your document verification status and download your official Examination Slip.',
    actionLabel: 'Sign In to Applicant Portal',
    actionRoute: '/login',
  },
  {
    id: 'faq-exam-schedule',
    question: 'Where can I find examination schedules?',
    answerPlaceholder:
      '[Placeholder Answer] Official entrance examination dates, session times, and examination hall assignments are published on the Examination & Admission Results page as well as in the Official Announcements bulletin section.',
    actionLabel: 'View Examination Schedule',
    actionRoute: '/results',
  },
  {
    id: 'faq-contact-admissions',
    question: 'How can I contact the admission office?',
    answerPlaceholder:
      '[Placeholder Answer] You can reach the Admission Office by submitting the online inquiry form on this page, calling the Admissions Switchboard during weekday office hours, or visiting the Admission Office desk in person on campus.',
    actionLabel: 'View Admission Office Details',
    actionRoute: '#university-offices',
  },
]
