import type {
  OfficerActivityFeedItem,
  OfficerApplicationRecord,
  OfficerDashboardInteractionState,
  OfficerFacultyApplicantBar,
  OfficerMonthlySubmissionPoint,
  OfficerNotificationDropdownItem,
  OfficerPendingTaskItem,
  OfficerSidebarItem,
  OfficerStatCardItem,
  OfficerStatusDistributionItem,
} from '../types/admissions'

export const officerProfileSummary = {
  officerName: 'Sokha Meas',
  roleTitle: 'Senior Admission Officer',
  department: 'Office of Admissions & Academic Records',
  officerId: 'OFF-2026-018',
  avatarInitials: 'AO',
  permissionTier: 'Tier 1 Verification Officer (Final Approval by Academic Senate)',
}

export const officerSidebarItems: OfficerSidebarItem[] = [
  { id: 'dashboard', label: '1. Dashboard' },
  { id: 'applications', label: '2. Applications', badge: '320' },
  { id: 'document-verification', label: '3. Document Verification', badge: '85' },
  { id: 'admission-decisions', label: '4. Admission Decisions' },
  { id: 'student-directory', label: '5. Student Directory' },
  { id: 'reports', label: '6. Reports' },
  { id: 'notifications', label: '7. Notifications', badge: '4' },
  { id: 'my-profile', label: '8. My Profile' },
]

export const officerInteractionStatePresets: Array<{
  id: OfficerDashboardInteractionState
  label: string
}> = [
  { id: 'default', label: '1. Default Dashboard' },
  { id: 'loading', label: '2. Loading Statistics' },
  { id: 'empty-applications', label: '3. Empty Applications' },
  { id: 'no-pending-tasks', label: '4. No Pending Tasks' },
  { id: 'filtered-table', label: '5. Filtered Table' },
  { id: 'notification-dropdown', label: '6. Notification Dropdown' },
  { id: 'profile-dropdown', label: '7. Profile Dropdown' },
]

export const officerStatCards: OfficerStatCardItem[] = [
  {
    id: 'stat-total',
    label: 'Total Applications',
    value: '1,250',
    trendText: '2026–2027 First Intake (Sample Data)',
    icon: 'total',
    accentTone: 'burgundy',
  },
  {
    id: 'stat-pending',
    label: 'Pending Review',
    value: '320',
    trendText: '160 Submitted • 160 Under Review',
    icon: 'pending',
    accentTone: 'amber',
  },
  {
    id: 'stat-correction',
    label: 'Need Correction',
    value: '85',
    trendText: 'Awaiting applicant document re-upload',
    icon: 'correction',
    accentTone: 'orange',
  },
  {
    id: 'stat-approved',
    label: 'Approved Applications',
    value: '720',
    trendText: '57.6% of total intake applications',
    icon: 'approved',
    accentTone: 'green',
  },
]

export const officerStatusDistribution: OfficerStatusDistributionItem[] = [
  { status: 'Approved', count: 720, percentage: 57.6, colorHex: '#166534' },
  { status: 'Submitted', count: 160, percentage: 12.8, colorHex: '#781D2B' },
  { status: 'Under Review', count: 160, percentage: 12.8, colorHex: '#B43E52' },
  { status: 'Need Correction', count: 85, percentage: 6.8, colorHex: '#D97706' },
  { status: 'Draft', count: 65, percentage: 5.2, colorHex: '#6B7280' },
  { status: 'Rejected', count: 60, percentage: 4.8, colorHex: '#991B1B' },
]

export const officerMonthlySubmissions: OfficerMonthlySubmissionPoint[] = [
  { month: 'Jun', count: 85 },
  { month: 'Jul', count: 145 },
  { month: 'Aug', count: 210 },
  { month: 'Sep', count: 260 },
  { month: 'Oct', count: 295 },
  { month: 'Nov', count: 255 },
]

export const officerFacultyApplicants: OfficerFacultyApplicantBar[] = [
  {
    facultyName: 'Faculty of Information Technology',
    shortName: 'Information Technology',
    applicants: 340,
    maxScale: 400,
  },
  {
    facultyName: 'Faculty of Engineering',
    shortName: 'Engineering',
    applicants: 265,
    maxScale: 400,
  },
  {
    facultyName: 'Faculty of Science',
    shortName: 'Science',
    applicants: 210,
    maxScale: 400,
  },
  {
    facultyName: 'Faculty of Social Sciences',
    shortName: 'Social Sciences',
    applicants: 180,
    maxScale: 400,
  },
  {
    facultyName: 'Faculty of Development Studies',
    shortName: 'Development Studies',
    applicants: 140,
    maxScale: 400,
  },
  {
    facultyName: 'Faculty of Humanities',
    shortName: 'Humanities',
    applicants: 115,
    maxScale: 400,
  },
]

export const officerFacultyFilterOptions: string[] = [
  'All Faculties',
  'Faculty of Information Technology',
  'Faculty of Engineering',
  'Faculty of Science',
  'Faculty of Social Sciences',
  'Faculty of Development Studies',
  'Faculty of Humanities',
]

export function createInitialOfficerApplications(): OfficerApplicationRecord[] {
  return [
    {
      id: 'app-rec-1',
      applicationId: 'APP-2026-00125',
      studentName: 'Sample Student (Sokha Chan)',
      studentNameKhmer: 'សុខា ចាន់',
      faculty: 'Faculty of Information Technology',
      major: 'Information Technology',
      submissionDate: '16 Nov 2026',
      submissionSortKey: '2026-11-16',
      status: 'Under Review',
      maskedNationalId: 'ID-•••••8421 (Protected)',
      bacIIGrade: 'Grade A (96.42)',
      assignedReviewer: 'Sokha Meas (AO)',
    },
    {
      id: 'app-rec-2',
      applicationId: 'APP-2026-00124',
      studentName: 'Dara Vann (Sample)',
      studentNameKhmer: 'តារា វ៉ាន់',
      faculty: 'Faculty of Engineering',
      major: 'Telecommunication & Electronics',
      submissionDate: '15 Nov 2026',
      submissionSortKey: '2026-11-15',
      status: 'Submitted',
      maskedNationalId: 'ID-•••••3109 (Protected)',
      bacIIGrade: 'Grade B (88.10)',
      assignedReviewer: 'Unassigned Queue',
    },
    {
      id: 'app-rec-3',
      applicationId: 'APP-2026-00123',
      studentName: 'Bopha Keo (Sample)',
      studentNameKhmer: 'បុប្ផា កែវ',
      faculty: 'Faculty of Science',
      major: 'Computer Science',
      submissionDate: '14 Nov 2026',
      submissionSortKey: '2026-11-14',
      status: 'Need Correction',
      maskedNationalId: 'ID-•••••5592 (Protected)',
      bacIIGrade: 'Grade B (85.50)',
      assignedReviewer: 'Sokha Meas (AO)',
    },
    {
      id: 'app-rec-4',
      applicationId: 'APP-2026-00122',
      studentName: 'Rithy Chhem (Sample)',
      studentNameKhmer: 'ឫទ្ធី ឆេម',
      faculty: 'Faculty of Information Technology',
      major: 'Information Technology',
      submissionDate: '13 Nov 2026',
      submissionSortKey: '2026-11-13',
      status: 'Approved',
      maskedNationalId: 'ID-•••••7740 (Protected)',
      bacIIGrade: 'Grade A (98.05)',
      assignedReviewer: 'Senate Admissions Committee',
    },
    {
      id: 'app-rec-5',
      applicationId: 'APP-2026-00121',
      studentName: 'Sreyneang Pich (Sample)',
      studentNameKhmer: 'ស្រីនាង ពេជ្រ',
      faculty: 'Faculty of Social Sciences',
      major: 'Sociology',
      submissionDate: '12 Nov 2026',
      submissionSortKey: '2026-11-12',
      status: 'Approved',
      maskedNationalId: 'ID-•••••1924 (Protected)',
      bacIIGrade: 'Grade C (76.20)',
      assignedReviewer: 'Senate Admissions Committee',
    },
    {
      id: 'app-rec-6',
      applicationId: 'APP-2026-00120',
      studentName: 'Visal Nhem (Sample)',
      studentNameKhmer: 'វិសាល ញ៉ែម',
      faculty: 'Faculty of Engineering',
      major: 'Bio-Engineering',
      submissionDate: '11 Nov 2026',
      submissionSortKey: '2026-11-11',
      status: 'Rejected',
      maskedNationalId: 'ID-•••••6038 (Protected)',
      bacIIGrade: 'Pending Verification',
      assignedReviewer: 'Senate Admissions Committee',
    },
    {
      id: 'app-rec-7',
      applicationId: 'APP-2026-00119',
      studentName: 'Channary Lim (Sample)',
      studentNameKhmer: 'ចាន់ណារី លីម',
      faculty: 'Faculty of Development Studies',
      major: 'Community Development',
      submissionDate: '10 Nov 2026',
      submissionSortKey: '2026-11-10',
      status: 'Submitted',
      maskedNationalId: 'ID-•••••4412 (Protected)',
      bacIIGrade: 'Grade B (84.90)',
      assignedReviewer: 'Unassigned Queue',
    },
    {
      id: 'app-rec-8',
      applicationId: 'APP-2026-00118',
      studentName: 'Pheakdei Sor (Sample)',
      studentNameKhmer: 'ភក្តី សរ',
      faculty: 'Faculty of Humanities',
      major: 'English Literature',
      submissionDate: '09 Nov 2026',
      submissionSortKey: '2026-11-09',
      status: 'Under Review',
      maskedNationalId: 'ID-•••••9087 (Protected)',
      bacIIGrade: 'Grade A (94.15)',
      assignedReviewer: 'Sokha Meas (AO)',
    },
  ]
}

export const officerPendingTasks: OfficerPendingTaskItem[] = [
  {
    id: 'task-review',
    title: 'Applications waiting for review',
    pendingCount: 42,
    priority: 'High',
    targetModule: 'applications',
  },
  {
    id: 'task-docs',
    title: 'Documents requiring verification',
    pendingCount: 28,
    priority: 'High',
    targetModule: 'document-verification',
  },
  {
    id: 'task-recheck',
    title: 'Correction submissions requiring rechecking',
    pendingCount: 14,
    priority: 'Urgent',
    targetModule: 'document-verification',
  },
  {
    id: 'task-decisions',
    title: 'Applications awaiting final decisions',
    pendingCount: 19,
    priority: 'Medium',
    targetModule: 'admission-decisions',
  },
]

export const officerRecentActivities: OfficerActivityFeedItem[] = [
  {
    id: 'act-1',
    activityType: 'Application reviewed',
    description:
      'Reviewed personal & academic background for APP-2026-00125 (Sample Student).',
    dateTime: 'Today, 10:45 AM [Sample]',
    officerResponsible: 'Sokha Meas (Senior Admission Officer)',
  },
  {
    id: 'act-2',
    activityType: 'Document verified',
    description:
      'Verified National ID Card and BacII Result Slip for APP-2026-00122 (Rithy Chhem).',
    dateTime: 'Today, 09:30 AM [Sample]',
    officerResponsible: 'Vannarith Heng (Verification Officer)',
  },
  {
    id: 'act-3',
    activityType: 'Correction requested',
    description:
      'Requested clearer High School Certificate scan for APP-2026-00123 (Bopha Keo).',
    dateTime: 'Yesterday, 04:15 PM [Sample]',
    officerResponsible: 'Sokha Meas (Senior Admission Officer)',
  },
  {
    id: 'act-4',
    activityType: 'Application approved',
    description:
      'Final admission eligibility approved for APP-2026-00121 (Sreyneang Pich).',
    dateTime: 'Yesterday, 02:00 PM [Sample]',
    officerResponsible: 'Dr. Chantha Vann (Admissions Director)',
  },
  {
    id: 'act-5',
    activityType: 'Application rejected',
    description:
      'Recorded non-eligibility decision for APP-2026-00120 due to missing mandatory science prerequisites.',
    dateTime: '14 Nov 2026, 11:20 AM [Sample]',
    officerResponsible: 'Dr. Chantha Vann (Admissions Director)',
  },
]

export const officerDropdownNotifications: OfficerNotificationDropdownItem[] = [
  {
    id: 'on-1',
    title: '14 resubmitted document corrections are ready for verification.',
    timestamp: '15 mins ago [Sample]',
    unread: true,
  },
  {
    id: 'on-2',
    title: 'New batch of 28 First Intake applications submitted for IT Faculty.',
    timestamp: '1 hour ago [Sample]',
    unread: true,
  },
  {
    id: 'on-3',
    title: 'Academic Senate approved 45 shortlisted Engineering candidates.',
    timestamp: 'Yesterday [Sample]',
    unread: false,
  },
]
