import type {
  HelpContactOfficeCard,
  HelpFaqFilterTab,
  HelpFaqItem,
  HelpSupportInteractionState,
  SupportRequestFormState,
  SupportTicketCategory,
  SupportTicketItem,
} from '../types/admissions'

export const helpInteractionStatePresets: Array<{
  id: HelpSupportInteractionState
  label: string
}> = [
  { id: 'default', label: '1. Default View' },
  { id: 'faq-expanded', label: '2. Expanded FAQ' },
  { id: 'no-faq-results', label: '3. No FAQ Match' },
  { id: 'form-errors', label: '4. Validation Errors' },
  { id: 'request-submitted', label: '5. Submitted Success' },
  { id: 'ticket-details', label: '6. Ticket Details Panel' },
  { id: 'no-tickets', label: '7. No Requests Yet' },
  { id: 'loading', label: '8. Loading State' },
]

export const helpSuggestedKeywords: string[] = [
  'Application process',
  'Document requirements',
  'Examination schedule',
  'Checking results',
  'Account problems',
]

export const helpFaqCategoryTabs: HelpFaqFilterTab[] = [
  'All',
  'Account & Login',
  'Student Registration',
  'Application Documents',
  'Examination',
  'Results & Admission',
]

export const supportCategoryOptions: SupportTicketCategory[] = [
  'Account & Login',
  'Application',
  'Documents',
  'Examination',
  'Results',
  'Technical Issue',
  'Other',
]

export function createInitialFaqItems(): HelpFaqItem[] {
  return [
    {
      id: 'faq-01',
      category: 'Account & Login',
      question: '1. How do I create a student account?',
      answer:
        'Click "Student Portal" in the top utility bar and select the "Create Account" tab. Enter your full name, valid email address, Cambodian phone number, and a secure password to register your applicant account.',
      keywords: ['account problems', 'register', 'login', 'create account'],
    },
    {
      id: 'faq-02',
      category: 'Student Registration',
      question: '2. How can I submit my application?',
      answer:
        'Open "My Application" from the sidebar and complete all five steps in order: (1) Personal Information, (2) Academic Background, (3) Faculty & Major Selection, (4) Document Upload, and (5) Review & Submit. Once all required documents are uploaded and declarations are checked, click "Submit Application".',
      keywords: ['application process', 'submit', 'registration', 'steps'],
    },
    {
      id: 'faq-03',
      category: 'Application Documents',
      question: '3. What documents are required for registration?',
      answer:
        'You must upload four mandatory documents in PDF, JPG, or PNG format (maximum 5 MB each): (1) Student Portrait Photo (4×6 cm), (2) Khmer National ID Card or Passport, (3) High School Certificate (BacII), and (4) High School Examination Result Slip. A Birth Certificate is optional.',
      keywords: ['document requirements', 'upload', 'certificate', 'photo', 'id'],
    },
    {
      id: 'faq-04',
      category: 'Student Registration',
      question: '4. Can I edit my application after submission?',
      answer:
        'While your application is in "Draft" status, you can freely edit all sections under "My Application". Once officially submitted, core identity and academic fields are locked for verification. If an admissions officer requests a document correction, you will receive a notification allowing you to re-upload that file.',
      keywords: ['application process', 'edit', 'update', 'locked'],
    },
    {
      id: 'faq-05',
      category: 'Examination',
      question: '5. How can I check my examination schedule?',
      answer:
        'Select "Examination" in the left sidebar to view your eligibility status, examination date, session time, assigned building, room number, and seat number. You can also download and print your official Examination Admission Card from that page.',
      keywords: ['examination schedule', 'room', 'seat', 'admission card'],
    },
    {
      id: 'faq-06',
      category: 'Results & Admission',
      question: '6. When will examination results be published?',
      answer:
        'Entrance examination scores and official admission decisions are typically published 10 to 14 working days after the examination date. You will receive an alert in "Notifications" and can view your subject scores and downloadable Result Slip on the "Results" page.',
      keywords: ['checking results', 'scores', 'accepted', 'result slip'],
    },
    {
      id: 'faq-07',
      category: 'Account & Login',
      question: '7. What should I do if I forget my password?',
      answer:
        'On the Student Portal Login screen, click "Forgot Password?" to request a password reset link sent to your registered email address. If you are already signed in, you can update your password anytime under "My Profile" → "Security Settings".',
      keywords: ['account problems', 'password', 'reset', 'login'],
    },
  ]
}

export const helpContactOfficeCards: HelpContactOfficeCard[] = [
  {
    id: 'office-admission',
    officeName: 'Admission Office',
    shortDescription:
      'Assistance with program eligibility, academic requirements, document verification, and entrance examination schedules.',
    emailPlaceholder: '[Sample Email Placeholder: admissions-office@university.edu.kh]',
    phonePlaceholder: '[Sample Phone Placeholder: +855 (0)23 XXX 101]',
    defaultSupportCategory: 'Application',
  },
  {
    id: 'office-student-support',
    officeName: 'Student Support Office',
    shortDescription:
      'Guidance for new applicants, scholarship inquiries, campus orientation, and general student services.',
    emailPlaceholder: '[Sample Email Placeholder: student-support@university.edu.kh]',
    phonePlaceholder: '[Sample Phone Placeholder: +855 (0)23 XXX 202]',
    defaultSupportCategory: 'Other',
  },
  {
    id: 'office-tech-support',
    officeName: 'Technical Support',
    shortDescription:
      'Help with portal login issues, password recovery, document upload errors, and browser compatibility.',
    emailPlaceholder: '[Sample Email Placeholder: portal-helpdesk@university.edu.kh]',
    phonePlaceholder: '[Sample Phone Placeholder: +855 (0)23 XXX 303]',
    defaultSupportCategory: 'Technical Issue',
  },
]

export function createInitialSupportRequestForm(): SupportRequestFormState {
  return {
    fullName: 'Sample Student (Sokha Chan)',
    studentIdOrReference: 'STU-2026-00125 / APP-2027-0001',
    emailAddress: 'sample.student@student.rupp.edu.kh',
    category: 'Documents',
    subject: '',
    description: '',
    attachmentFileName: '',
  }
}

export function createInitialSupportTickets(): SupportTicketItem[] {
  return [
    {
      id: 'tkt-1',
      ticketId: 'TKT-2027-0104',
      subject: 'Request to re-upload cropped High School Certificate scan',
      category: 'Documents',
      submittedDate: '15 Nov 2026 [Sample]',
      status: 'Open',
      studentReference: 'STU-2026-00125 / APP-2027-0001',
      originalMessage:
        'Hello Admission Office, I received a notification that the bottom seal on my High School Certificate scan was slightly cropped. I have prepared a new full-page PDF scan and would like to confirm if the upload slot is unlocked.',
      supportResponse:
        'Dear Sample Student, we have unlocked the High School Certificate upload slot on your Document Upload page. Please upload your revised full-page PDF scan and reply here if you encounter any issue.',
      conversationHistory: [
        {
          id: 'msg-1',
          senderRole: 'Student',
          senderName: 'Sample Student',
          timestamp: '15 Nov 2026, 02:10 PM',
          message:
            'Hello Admission Office, I received a notification that the bottom seal on my High School Certificate scan was slightly cropped. I have prepared a new full-page PDF scan and would like to confirm if the upload slot is unlocked.',
        },
        {
          id: 'msg-2',
          senderRole: 'Support Team',
          senderName: 'Document Verification Desk (Sample)',
          timestamp: '15 Nov 2026, 03:45 PM',
          message:
            'Dear Sample Student, we have unlocked the High School Certificate upload slot on your Document Upload page. Please upload your revised full-page PDF scan and reply here if you encounter any issue.',
        },
      ],
    },
    {
      id: 'tkt-2',
      ticketId: 'TKT-2027-0098',
      subject: 'Inquiry regarding Morning Session reporting time at Building A',
      category: 'Examination',
      submittedDate: '12 Nov 2026 [Sample]',
      status: 'In Progress',
      studentReference: 'STU-2026-00125 / APP-2027-0001',
      originalMessage:
        'Could you please confirm which campus gate candidates assigned to Building A, Room A-204 should enter through on examination morning?',
      supportResponse:
        'Your inquiry has been forwarded to the Examination Venue Coordinator. Candidates assigned to Building A should use Main Gate 1 on Russian Federation Blvd at least 30 minutes before 07:30 AM.',
      conversationHistory: [
        {
          id: 'msg-3',
          senderRole: 'Student',
          senderName: 'Sample Student',
          timestamp: '12 Nov 2026, 10:20 AM',
          message:
            'Could you please confirm which campus gate candidates assigned to Building A, Room A-204 should enter through on examination morning?',
        },
        {
          id: 'msg-4',
          senderRole: 'Support Team',
          senderName: 'Examination Support Unit (Sample)',
          timestamp: '12 Nov 2026, 01:15 PM',
          message:
            'Your inquiry has been forwarded to the Examination Venue Coordinator. Candidates assigned to Building A should use Main Gate 1 on Russian Federation Blvd at least 30 minutes before 07:30 AM.',
        },
      ],
    },
    {
      id: 'tkt-3',
      ticketId: 'TKT-2027-0082',
      subject: 'Confirmation of Khmer script spelling on Personal Information form',
      category: 'Application',
      submittedDate: '08 Nov 2026 [Sample]',
      status: 'Resolved',
      studentReference: 'STU-2026-00125 / APP-2027-0001',
      originalMessage:
        'I would like to verify that my Khmer script name matches the exact spelling on my National ID card before submitting my application.',
      supportResponse:
        'We have reviewed your draft Personal Information record and confirmed that your Khmer script name matches your uploaded National ID Card. This ticket is now marked as Resolved.',
      conversationHistory: [
        {
          id: 'msg-5',
          senderRole: 'Student',
          senderName: 'Sample Student',
          timestamp: '08 Nov 2026, 09:05 AM',
          message:
            'I would like to verify that my Khmer script name matches the exact spelling on my National ID card before submitting my application.',
        },
        {
          id: 'msg-6',
          senderRole: 'Support Team',
          senderName: 'Admissions Records Officer (Sample)',
          timestamp: '08 Nov 2026, 11:30 AM',
          message:
            'We have reviewed your draft Personal Information record and confirmed that your Khmer script name matches your uploaded National ID Card. This ticket is now marked as Resolved.',
        },
      ],
    },
    {
      id: 'tkt-4',
      ticketId: 'TKT-2027-0065',
      subject: 'Email verification link inquiry during initial registration',
      category: 'Account & Login',
      submittedDate: '02 Nov 2026 [Sample]',
      status: 'Closed',
      studentReference: 'STU-2026-00125 / APP-2027-0001',
      originalMessage:
        'I did not receive the initial welcome email immediately after creating my student portal account.',
      supportResponse:
        'Your student account STU-2026-00125 is verified and active. This support ticket has been closed.',
      conversationHistory: [
        {
          id: 'msg-7',
          senderRole: 'Student',
          senderName: 'Sample Student',
          timestamp: '02 Nov 2026, 04:00 PM',
          message:
            'I did not receive the initial welcome email immediately after creating my student portal account.',
        },
        {
          id: 'msg-8',
          senderRole: 'Support Team',
          senderName: 'Portal Technical Helpdesk (Sample)',
          timestamp: '02 Nov 2026, 04:25 PM',
          message:
            'Your student account STU-2026-00125 is verified and active. This support ticket has been closed.',
        },
      ],
    },
  ]
}

export function validateSupportRequestForm(
  form: SupportRequestFormState,
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!form.fullName.trim()) {
    errors.fullName = 'Full Name is required.'
  }

  if (!form.studentIdOrReference.trim()) {
    errors.studentIdOrReference = 'Student ID or Application Reference is required.'
  }

  if (!form.emailAddress.trim()) {
    errors.emailAddress = 'Email Address is required so our support team can reply.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailAddress.trim())) {
    errors.emailAddress = 'Please enter a valid email address.'
  }

  if (!form.category) {
    errors.category = 'Please select a Support Category.'
  }

  if (!form.subject.trim()) {
    errors.subject = 'Please enter a clear subject line for your support request.'
  }

  if (!form.description.trim() || form.description.trim().length < 15) {
    errors.description =
      'Please provide a detailed description (at least 15 characters) so we can assist you.'
  }

  return errors
}
