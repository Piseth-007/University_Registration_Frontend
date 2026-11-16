import type { ExaminationPageData, ExaminationPageState } from '../types/admissions'

export const examinationStateOptions: Array<{
  state: ExaminationPageState
  label: string
  shortHint: string
}> = [
  {
    state: 'Scheduled',
    label: 'Scheduled',
    shortHint: 'Room, seat & admission card assigned',
  },
  {
    state: 'Not Yet Scheduled',
    label: 'Not Yet Scheduled',
    shortHint: 'Empty state before schedule publication',
  },
  {
    state: 'Completed',
    label: 'Completed',
    shortHint: 'Examination taken & grading in progress',
  },
  {
    state: 'Cancelled',
    label: 'Cancelled',
    shortHint: 'Session postponed or cancelled notice',
  },
]

export function createInitialExaminationPageData(
  state: ExaminationPageState = 'Scheduled',
): ExaminationPageData {
  const isUnscheduled = state === 'Not Yet Scheduled'

  return {
    pageTitle: 'Entrance Examination',
    pageSubtitle:
      'View your examination schedule, assigned room, and examination instructions.',

    statusCard: {
      eligibility:
        state === 'Cancelled'
          ? 'Eligible — Awaiting Rescheduled Session'
          : 'Eligible — Application Verified',
      status: state,
      examinationDate: isUnscheduled
        ? 'Pending Publication'
        : '24 August 2027 [Sample Date]',
      examinationSession: isUnscheduled
        ? 'To Be Assigned'
        : 'Morning Session (Session A)',
      examinationCenter: isUnscheduled
        ? 'To Be Assigned'
        : 'Main Campus Examination Center (Campus A)',
    },

    schedule: {
      examinationName:
        'National University Entrance Examination — Bachelor of Engineering (Information Technology)',
      date: '24 August 2027 [Illustrative Sample]',
      startTime: '07:30 AM',
      endTime: '11:30 AM',
      examinationBuilding: 'Building A — Faculty of Science & Engineering Lecture Block',
      roomNumber: 'Room A-204 (2nd Floor)',
      seatNumber: 'Seat 18 (Row C)',
      examinationCenterAddress:
        'Russian Federation Boulevard, Sangkat Teuk Laak 1, Khan Toul Kork, Phnom Penh, Cambodia [Illustrative Address]',
    },

    admissionCard: {
      studentName: 'Sokha Chan',
      studentNameKhmer: 'សុខា ចាន់',
      applicationReferenceNumber: 'APP-2027-0001',
      examinationCenter: 'Main Campus Examination Center (Campus A)',
      examinationDateAndTime: '24 Aug 2027 • 07:30 AM – 11:30 AM',
      roomAndSeatNumber: 'Building A • Room A-204 • Seat 18',
      degreeProgram: "Bachelor's Degree in Information Technology",
      academicYear: '2027–2028 (First Intake)',
    },

    instructions: [
      {
        number: 1,
        title: 'Arrive 30 minutes before the examination.',
        description:
          'Candidates must report to their assigned examination building at least 30 minutes prior to the scheduled start time for identity verification and seating check-in.',
      },
      {
        number: 2,
        title: 'Bring the examination admission card.',
        description:
          'Present a printed copy of your official Examination Admission Card at the main gate and place it on the upper-right corner of your examination desk.',
      },
      {
        number: 3,
        title: 'Bring valid identification.',
        description:
          'You must carry your original Khmer National ID Card, valid Passport, or certified High School Student Identification Card matching your application record.',
      },
      {
        number: 4,
        title: 'Follow university examination regulations.',
        description:
          'Mobile phones, smartwatches, programmable calculators, and unauthorized study materials are strictly prohibited inside the examination room.',
      },
    ],
  }
}
