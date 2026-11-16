import type {
  PortalNotificationFilterTab,
  PortalNotificationItem,
} from '../types/admissions'

export const notificationCategoryTabs: PortalNotificationFilterTab[] = [
  'All',
  'Admission',
  'Documents',
  'Examination',
  'Results',
  'University Announcements',
]

export function createInitialPortalNotifications(): PortalNotificationItem[] {
  return [
    {
      id: 'notif-01',
      category: 'Admission',
      title: 'Your application has been successfully submitted.',
      shortDescription:
        'Your university admission dossier has been received and queued for verification by the Office of Admissions.',
      fullMessage:
        'Dear Sokha Chan, your online admission application (Reference: APP-2027-0001) for the Bachelor of Engineering in Information Technology has been officially submitted for the 2027–2028 First Intake. Our admissions officers will review your academic background and uploaded certificates within 3–5 working days.',
      dateTime: 'Today, 09:40 AM',
      publicationDate: '16 November 2026 [Sample Date]',
      unread: true,
      relatedApplicationReference: 'APP-2027-0001',
      senderOffice: 'Office of Admissions & Academic Records',
      actionLabel: 'View Application',
      actionRoute: '/my-application',
    },
    {
      id: 'notif-02',
      category: 'Documents',
      title: 'Your uploaded certificate requires correction.',
      shortDescription:
        'Please re-upload a clearer color scan of your High School Certificate (BacII) so all stamps and signatures are legible.',
      fullMessage:
        'During routine document verification for Application APP-2027-0001, the admissions officer noted that the bottom-right official seal on your uploaded High School Certificate scan is slightly cropped. Please visit the Document Upload page to upload a full-page, high-resolution PDF or JPG scan.',
      dateTime: 'Yesterday, 03:15 PM',
      publicationDate: '15 November 2026 [Sample Date]',
      unread: true,
      relatedApplicationReference: 'APP-2027-0001',
      senderOffice: 'Document Verification Unit — Registrar Office',
      actionLabel: 'Update Uploaded Documents',
      actionRoute: '/documents',
    },
    {
      id: 'notif-03',
      category: 'Examination',
      title: 'Your examination schedule is now available.',
      shortDescription:
        'Your entrance examination date, assigned building (Building A, Room A-204), seat number, and Admission Card are ready.',
      fullMessage:
        'The University Entrance Examination Board has published the official timetable and room assignments for the 2027–2028 First Intake. You have been assigned to Main Campus Examination Center (Campus A), Building A, Room A-204, Seat 18. Please download and print your Examination Admission Card before examination day.',
      dateTime: '2 days ago, 11:20 AM',
      publicationDate: '14 November 2026 [Sample Date]',
      unread: true,
      relatedApplicationReference: 'APP-2027-0001',
      senderOffice: 'University Entrance Examination Board',
      actionLabel: 'View Examination Schedule',
      actionRoute: '/examination',
    },
    {
      id: 'notif-04',
      category: 'Results',
      title: 'Your examination results have been published.',
      shortDescription:
        'Official subject scores and the Academic Senate admission decision for your entrance examination are now available to view.',
      fullMessage:
        'Official entrance examination scores for Mathematics, English, and General Knowledge, along with your provisional admission decision for the 2027–2028 Academic Year, have been published on the Student Portal. You may now view your score breakdown and download your illustrative Examination Result Slip.',
      dateTime: '3 days ago, 04:05 PM',
      publicationDate: '13 November 2026 [Sample Date]',
      unread: false,
      relatedApplicationReference: 'APP-2027-0001',
      senderOffice: 'Academic Senate & Examination Committee',
      actionLabel: 'View Examination Results',
      actionRoute: '/examination-results',
    },
    {
      id: 'notif-05',
      category: 'University Announcements',
      title: 'Important admission deadline announcement.',
      shortDescription:
        'All applicants for the 2027–2028 First Intake must complete document verification and dossier submission prior to the closing date.',
      fullMessage:
        'Notice from the Office of the Registrar (Ref: REG-2027-014): The online application window and supporting document upload period for the 2027–2028 First Intake will close promptly at 05:00 PM on the published deadline date. Incomplete drafts or unverified identity documents submitted after the deadline will be deferred to the Second Intake.',
      dateTime: '5 days ago, 10:00 AM',
      publicationDate: '11 November 2026 [Sample Date]',
      unread: false,
      senderOffice: 'Office of the University Registrar',
      actionLabel: 'Review My Application',
      actionRoute: '/my-application',
    },
    {
      id: 'notif-06',
      category: 'University Announcements',
      title: 'Merit Scholarship & Tuition Waiver Application Guidelines',
      shortDescription:
        'Candidates holding Grade A or B in the National BacII Examination may apply for full or partial merit scholarships.',
      fullMessage:
        'Notice from the Scholarship & Financial Aid Committee (Ref: REG-2027-022): Applicants who achieved Grade A or Grade B in the National High School Examination (BacII) are invited to submit their certified examination slip under the Document Upload section to be automatically considered for the Rector’s Academic Merit Scholarship.',
      dateTime: '1 week ago, 08:30 AM',
      publicationDate: '09 November 2026 [Sample Date]',
      unread: false,
      senderOffice: 'Scholarship & Financial Aid Committee',
      actionLabel: 'Upload BacII Certificate',
      actionRoute: '/documents',
    },
  ]
}
