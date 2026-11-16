import type {
  AdmissionDecisionState,
  ExaminationResultsPageData,
  ExaminationResultsViewMode,
} from '../types/admissions'

export const examinationResultsViewModeOptions: Array<{
  mode: ExaminationResultsViewMode
  label: string
}> = [
  { mode: 'Accepted', label: '1. Accepted' },
  { mode: 'Pending', label: '2. Pending' },
  { mode: 'Not Accepted', label: '3. Not Accepted' },
  { mode: 'Empty', label: '4. Results Not Available Yet' },
]

export function createInitialExaminationResultsPageData(
  decisionState: AdmissionDecisionState = 'Accepted',
): ExaminationResultsPageData {
  const isAccepted = decisionState === 'Accepted'
  const isPending = decisionState === 'Pending'

  const scores =
    decisionState === 'Not Accepted'
      ? [
          {
            id: 'subj-math',
            subjectName: 'Mathematics',
            subjectNameKhmer: 'គណិតវិទ្យា',
            obtainedScore: 48,
            maximumScore: 100,
            grade: 'D',
          },
          {
            id: 'subj-english',
            subjectName: 'English',
            subjectNameKhmer: 'ភាសាអង់គ្លេស',
            obtainedScore: 54,
            maximumScore: 100,
            grade: 'C-',
          },
          {
            id: 'subj-gk',
            subjectName: 'General Knowledge',
            subjectNameKhmer: 'វប្បធម៌ទូទៅ',
            obtainedScore: 52,
            maximumScore: 100,
            grade: 'D+',
          },
        ]
      : [
          {
            id: 'subj-math',
            subjectName: 'Mathematics',
            subjectNameKhmer: 'គណិតវិទ្យា',
            obtainedScore: 88,
            maximumScore: 100,
            grade: 'A',
          },
          {
            id: 'subj-english',
            subjectName: 'English',
            subjectNameKhmer: 'ភាសាអង់គ្លេស',
            obtainedScore: 82,
            maximumScore: 100,
            grade: 'B+',
          },
          {
            id: 'subj-gk',
            subjectName: 'General Knowledge',
            subjectNameKhmer: 'វប្បធម៌ទូទៅ',
            obtainedScore: 85,
            maximumScore: 100,
            grade: 'A-',
          },
        ]

  return {
    pageTitle: 'Examination Results',
    pageSubtitle: 'View your entrance examination scores and admission decision.',

    overview: {
      applicationReferenceNumber: 'APP-2027-0001',
      examinationName: 'National University Entrance Examination — First Intake',
      academicYear: '2027–2028',
      resultPublicationDate: isPending
        ? 'Pending Official Publication'
        : '05 September 2027 [Illustrative Sample]',
      overallResultStatus: isAccepted
        ? 'Accepted (Sample)'
        : isPending
          ? 'Pending Official Review'
          : 'Not Accepted (Sample)',
    },

    scores,
    overallGradeLabel:
      decisionState === 'Not Accepted'
        ? 'Grade D+ (51.3% — Below Program Cutoff)'
        : isPending
          ? 'Provisional Grade A- (Awaiting Final Verification)'
          : 'Grade A (85.0% — Distinction)',

    decision: {
      state: decisionState,
      selectedFaculty: 'Faculty of Engineering',
      selectedMajor: "Bachelor's Degree in Information Technology",
      acceptedHeading: 'Congratulations! You Have Been Accepted for Admission',
      acceptedMessage:
        'Based on your entrance examination performance and verified academic dossier, the Academic Admissions Committee is pleased to offer you provisional admission to the Bachelor of Engineering in Information Technology for the 2027–2028 Academic Year (Illustrative Sample Decision).',
      acceptedNextSteps: [
        'Download and print your official Examination Result Slip and Provisional Offer Notice.',
        'Present your original High School Diploma (BacII) and National ID Card at the Office of the Registrar (Building A, Room 102) for physical verification.',
        'Complete first-semester course enrollment and tuition registration before the intake deadline.',
      ],
      pendingHeading: 'Admission Decision Pending Official Publication',
      pendingMessage:
        'Your entrance examination papers are currently undergoing final moderation and senate verification. Official subject scores and admission decisions will be published on this page once approved by the Examination Board.',
      notAcceptedHeading: 'Admission Decision — Not Selected for First-Choice Program',
      notAcceptedMessage:
        'Thank you for sitting the entrance examination at our university. Due to highly competitive seat quotas for the Bachelor of Engineering in Information Technology, we are unable to offer admission for the current intake based on the program cutoff score (Illustrative Sample Decision).',
      contactOfficeName: 'Office of Admissions & Academic Records',
      contactEmail: 'admissions@rupp.edu.kh',
      contactPhone: '+855 23 883 640',
      contactLocation: 'Main Campus, Building A, Ground Floor (Mon–Fri, 08:00 AM – 05:00 PM)',
    },

    resultSlip: {
      studentName: 'Sokha Chan',
      studentNameKhmer: 'សុខា ចាន់',
      applicationReferenceNumber: 'APP-2027-0001',
      examinationDetails:
        'National University Entrance Examination • Academic Year 2027–2028',
      officialResultLabel: isAccepted
        ? 'ACCEPTED — PROVISIONAL ADMISSION (SAMPLE)'
        : isPending
          ? 'PENDING OFFICIAL SENATE PUBLICATION'
          : 'NOT ACCEPTED — BELOW QUOTA CUTOFF (SAMPLE)',
      publicationDate: isPending
        ? 'Pending Publication'
        : '05 September 2027 [Illustrative]',
      authorizedSignatoryTitle: 'Chair of the University Entrance Examination Board',
      authorizedSignaturePlaceholder: '[Authorized Signature & Official Seal Placeholder]',
    },

    emptyState: {
      heading: 'Results Not Available Yet',
      message: 'Your examination results will appear here after official publication.',
      expectedWindowHint:
        'Entrance examination scores and admission decisions are typically published 10–14 working days after the examination date.',
    },
  }
}
