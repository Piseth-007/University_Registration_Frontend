import type {
  DashboardAdmissionDateItem,
  DashboardAnnouncementItem,
  DashboardChecklistItem,
  DashboardExamScheduleRow,
  DashboardNotificationItem,
  DashboardProgressStep,
  DashboardSidebarItem,
  DashboardSummaryCardItem,
} from '../types/admissions'

export const dashboardStudentProfile = {
  studentName: 'Sokha Chan',
  studentNamePlaceholder: '[Student Name]',
  applicantId: 'APP-2027-0001',
  email: 'sokha.chan@student.edu.kh',
  phone: '+855 12 345 678',
  academicYear: '2027–2028',
  admissionPeriod: 'First Intake',
  avatarInitials: 'SC',
  profileStatus: 'Active Applicant',
}

/**
 * Updated Student Portal Sidebar Navigation:
 * 1. Dashboard
 * 2. My Application
 * 3. Examination
 * 4. Results
 * 5. Notifications
 * 6. My Profile
 * 7. Help & Support
 * (8. Logout rendered in Sidebar Footer)
 */
export const dashboardSidebarItems: DashboardSidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'my-application', label: 'My Application' },
  { id: 'examination', label: 'Examination' },
  { id: 'results', label: 'Results' },
  { id: 'notifications', label: 'Notifications', badge: '2' },
  { id: 'my-profile', label: 'My Profile' },
  { id: 'help-support', label: 'Help & Support' },
]

export const dashboardProgressSteps: DashboardProgressStep[] = [
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

export const dashboardSummaryCards: DashboardSummaryCardItem[] = [
  {
    id: 'status',
    label: 'Application Status',
    value: 'In Progress',
    helperText: 'Reference: APP-2027-0001',
    icon: 'status',
    accentTone: 'burgundy',
  },
  {
    id: 'completion',
    label: 'Application Completion',
    value: '60% Complete',
    helperText: '3 of 5 sections completed',
    icon: 'documents',
    accentTone: 'amber',
  },
  {
    id: 'exam-status',
    label: 'Upcoming Examination',
    value: 'Scheduled',
    helperText: 'Awaiting final dossier submission',
    icon: 'faculty',
    accentTone: 'neutral',
  },
  {
    id: 'deadline',
    label: 'Submission Deadline',
    value: '[Date Placeholder]',
    helperText: '2027–2028 First Intake cutoff',
    icon: 'deadline',
    accentTone: 'burgundy',
  },
]

export const dashboardExamScheduleRows: DashboardExamScheduleRow[] = [
  {
    id: 'exam-paper-1',
    subjectOrPaper: 'Paper I: Mathematics & Quantitative Reasoning',
    examDatePlaceholder: '[Exam Date Placeholder]',
    timeSlot: '08:00 AM – 10:00 AM',
    venuePlaceholder: 'Main Campus — Building A [Room Placeholder]',
    seatStatus: 'Scheduled',
  },
  {
    id: 'exam-paper-2',
    subjectOrPaper: 'Paper II: English Language Proficiency',
    examDatePlaceholder: '[Exam Date Placeholder]',
    timeSlot: '10:30 AM – 12:00 PM',
    venuePlaceholder: 'Main Campus — Building A [Room Placeholder]',
    seatStatus: 'Scheduled',
  },
  {
    id: 'exam-paper-3',
    subjectOrPaper: 'Paper III: General Knowledge & Major Aptitude',
    examDatePlaceholder: '[Exam Date Placeholder]',
    timeSlot: '02:00 PM – 03:30 PM',
    venuePlaceholder: 'Main Campus — Building A [Room Placeholder]',
    seatStatus: 'Pending Slip',
  },
]

export const dashboardAnnouncements: DashboardAnnouncementItem[] = [
  {
    id: 'ann-intake-1',
    referenceCode: 'NOTICE-2027-01',
    datePlaceholder: '[Date Placeholder]',
    title: '2027–2028 First Intake Admission Guidelines & Document Standards',
    summary:
      'All undergraduate applicants must submit clear scans of their National ID and MoEYS BacII certificates through My Application prior to the intake closing date.',
    tag: 'Intake Notice',
  },
  {
    id: 'ann-exam-slip',
    referenceCode: 'NOTICE-2027-02',
    datePlaceholder: '[Date Placeholder]',
    title: 'Entrance Examination Seat Assignment & Slip Download Notice',
    summary:
      'Official examination slips containing building, hall, and seat numbers will be issued 5 working days after your application dossier is verified.',
    tag: 'Examination',
  },
  {
    id: 'ann-scholarship',
    referenceCode: 'NOTICE-2027-03',
    datePlaceholder: '[Date Placeholder]',
    title: 'Merit-Based Scholarship Consideration for Grade A & B BacII Holders',
    summary:
      'Candidates holding overall Grade A or Grade B in the National BacII Examination are automatically evaluated for tuition scholarship awards.',
    tag: 'Scholarship',
  },
]

export const initialDashboardChecklist: DashboardChecklistItem[] = [
  {
    id: 'chk-personal',
    title: 'Complete Personal & Contact Information',
    description: 'Full legal name in Khmer and English, National ID number, and permanent address.',
    categoryLabel: 'Step 1 • Personal Information',
    completed: true,
    targetNavId: 'personal-info',
    actionText: 'Edit Info',
  },
  {
    id: 'chk-academic',
    title: 'Enter High School & BacII Examination Details',
    description: 'High school name, province, graduation year, and examination seat/grade record.',
    categoryLabel: 'Step 2 • Academic Background',
    completed: true,
    targetNavId: 'academic-background',
    actionText: 'Review',
  },
  {
    id: 'chk-docs-partial',
    title: 'Upload National ID, Portrait Photo & High School Transcript',
    description: '3 of 5 mandatory supporting files have been uploaded and verified for format.',
    categoryLabel: 'Step 4 • Documents (3/5)',
    completed: true,
    targetNavId: 'documents',
    actionText: 'View Files',
  },
  {
    id: 'chk-faculty',
    title: 'Select Preferred Faculty & Academic Major',
    description: 'Choose your first-choice and second-choice undergraduate degree program.',
    categoryLabel: 'Step 3 • Faculty & Major',
    completed: false,
    targetNavId: 'faculty-major',
    actionText: 'Select Faculty',
  },
  {
    id: 'chk-docs-remaining',
    title: 'Upload Certified BacII Diploma & Application Fee Receipt',
    description: 'Upload the remaining 2 required documents (PDF or JPG, max 5MB per file).',
    categoryLabel: 'Step 4 • Documents (2 Remaining)',
    completed: false,
    targetNavId: 'documents',
    actionText: 'Upload Now',
  },
  {
    id: 'chk-submit',
    title: 'Review Complete Application Dossier & Submit',
    description: 'Verify all entries and sign the applicant declaration before the First Intake deadline.',
    categoryLabel: 'Step 5 • Review & Submit',
    completed: false,
    targetNavId: 'my-application',
    actionText: 'Proceed',
  },
]

export const dashboardNotifications: DashboardNotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Action Required: Complete Document Upload in My Application',
    message:
      'Your Personal Information and Academic Background sections are saved. Please upload your required supporting files in My Application to unlock final submission.',
    timestamp: 'Today, 09:15 AM',
    category: 'Document Verification',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Provisional Entrance Examination Schedule Posted',
    message:
      'Your provisional examination session for the 2027–2028 First Intake has been assigned. Final seat numbers will be confirmed upon dossier approval.',
    timestamp: 'Yesterday, 04:30 PM',
    category: 'Admission Notice',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Applicant Account & Reference ID Generated (APP-2027-0001)',
    message:
      'Welcome to the University Registration System Student Portal. Use Reference ID APP-2027-0001 for all official correspondence.',
    timestamp: '3 days ago',
    category: 'System Alert',
    unread: false,
  },
]

export const dashboardAdmissionDates: DashboardAdmissionDateItem[] = [
  {
    id: 'date-1',
    eventTitle: 'Online Application Portal Opens (First Intake)',
    datePlaceholder: '[Date Placeholder]',
    statusLabel: 'Open',
  },
  {
    id: 'date-2',
    eventTitle: 'Supporting Document Verification Cutoff',
    datePlaceholder: '[Date Placeholder]',
    statusLabel: 'Upcoming',
  },
  {
    id: 'date-3',
    eventTitle: 'First Intake Application Submission Deadline',
    datePlaceholder: '[Date Placeholder]',
    statusLabel: 'Deadline',
  },
  {
    id: 'date-4',
    eventTitle: 'Entrance Examination & Evaluation Period',
    datePlaceholder: '[Date Placeholder]',
    statusLabel: 'Upcoming',
  },
  {
    id: 'date-5',
    eventTitle: 'Official Admission Results Announcement',
    datePlaceholder: '[Date Placeholder]',
    statusLabel: 'Upcoming',
  },
]
