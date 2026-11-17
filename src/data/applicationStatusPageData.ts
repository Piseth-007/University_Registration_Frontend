import type {
  ApplicationHistoryLogItem,
  ApplicationStatusTrackingPageData,
  ApplicationTimelineStepItem,
  ApplicationTrackingScenario,
} from '../types/admissions'

export const applicationStatusScenarios: Array<{
  id: ApplicationTrackingScenario
  label: string
}> = [
  { id: 'Draft', label: '1. Draft' },
  { id: 'Submitted', label: '2. Submitted' },
  { id: 'Under Review', label: '3. Under Review' },
  { id: 'Need Correction', label: '4. Need Correction' },
  { id: 'Resubmitted', label: '5. Resubmitted' },
  { id: 'Approved', label: '6. Approved' },
  { id: 'Rejected', label: '7. Rejected' },
]

export function buildTimelineForScenario(
  scenario: ApplicationTrackingScenario,
): ApplicationTimelineStepItem[] {
  // Step 1 — Draft
  const step1: ApplicationTimelineStepItem = {
    stepNumber: 1,
    title: 'Step 1 — Draft',
    description: 'Student creates an account and completes the application form.',
    statusLabel: scenario === 'Draft' ? 'In Progress' : 'Completed',
    visualState: scenario === 'Draft' ? 'In Progress' : 'Completed',
    dateNote: 'Created: 08 November 2026',
  }

  // Step 2 — Submitted
  const step2: ApplicationTimelineStepItem = {
    stepNumber: 2,
    title: 'Step 2 — Submitted',
    description: 'Student submits the application successfully.',
    statusLabel:
      scenario === 'Draft'
        ? 'Pending'
        : scenario === 'Submitted'
          ? 'In Progress'
          : 'Completed',
    visualState:
      scenario === 'Draft'
        ? 'Pending'
        : scenario === 'Submitted'
          ? 'In Progress'
          : 'Completed',
    dateNote:
      scenario === 'Draft'
        ? 'Awaiting final submission'
        : 'Submission Date: 10 November 2026',
  }

  // Step 3 — Under Review
  const step3: ApplicationTimelineStepItem = {
    stepNumber: 3,
    title: 'Step 3 — Under Review',
    description: "Admission Officer checks the applicant's information and documents.",
    statusLabel:
      scenario === 'Draft' || scenario === 'Submitted'
        ? 'Pending'
        : scenario === 'Under Review' || scenario === 'Resubmitted'
          ? 'In Progress'
          : 'Completed',
    visualState:
      scenario === 'Draft' || scenario === 'Submitted'
        ? 'Pending'
        : scenario === 'Under Review' || scenario === 'Resubmitted'
          ? 'In Progress'
          : 'Completed',
    dateNote:
      scenario === 'Draft' || scenario === 'Submitted'
        ? 'Review not yet started'
        : 'Review Start Date: 12 November 2026',
  }

  // Step 4 — Need Correction (Conditional)
  const step4: ApplicationTimelineStepItem = {
    stepNumber: 4,
    title: 'Step 4 — Need Correction',
    description:
      'Admission Officer requests corrections if information or documents are incomplete.',
    statusLabel:
      scenario === 'Need Correction'
        ? 'Need Correction (Action Required)'
        : scenario === 'Resubmitted'
          ? 'Completed (Resubmitted)'
          : 'Conditional',
    visualState:
      scenario === 'Need Correction'
        ? 'Need Correction'
        : scenario === 'Resubmitted'
          ? 'Completed'
          : 'Pending',
    dateNote:
      scenario === 'Need Correction'
        ? 'Correction Requested: 14 November 2026'
        : scenario === 'Resubmitted'
          ? 'Resubmitted: 15 November 2026'
          : 'Conditional — Only required if requested by officer',
  }

  // Step 5 — Approved / Rejected
  const step5: ApplicationTimelineStepItem = {
    stepNumber: 5,
    title: 'Step 5 — Approved / Rejected',
    description: 'Final admission decision confirmed by the Office of Admissions.',
    statusLabel:
      scenario === 'Approved'
        ? 'Approved'
        : scenario === 'Rejected'
          ? 'Rejected'
          : 'Pending',
    visualState:
      scenario === 'Approved'
        ? 'Approved'
        : scenario === 'Rejected'
          ? 'Rejected'
          : 'Pending',
    dateNote:
      scenario === 'Approved'
        ? 'Approved on 16 November 2026'
        : scenario === 'Rejected'
          ? 'Decision Recorded on 16 November 2026'
          : 'Pending final officer determination',
  }
  return [step1, step2, step3, step4, step5]
}

export function buildHistoryLogsForScenario(
  scenario: ApplicationTrackingScenario,
): ApplicationHistoryLogItem[] {
  const baseLogs: ApplicationHistoryLogItem[] = [
    {
      id: 'hist-1',
      dateTime: '08 Nov 2026, 09:15 AM',
      activity: 'Application created',
      updatedBy: 'Sample Student (Applicant)',
      description:
        'Application draft APP-2026-00125 initialized for the 2026–2027 Academic Year.',
    },
  ]

  if (scenario === 'Draft') {
    return baseLogs
  }

  baseLogs.push(
    {
      id: 'hist-2',
      dateTime: '10 Nov 2026, 02:30 PM',
      activity: 'Application submitted',
      updatedBy: 'Sample Student (Applicant)',
      description:
        'Online application form completed and officially submitted for Faculty of Information Technology.',
    },
    {
      id: 'hist-3',
      dateTime: '10 Nov 2026, 02:31 PM',
      activity: 'Documents received',
      updatedBy: 'University Registration System',
      description:
        '4 required supporting documents received and queued for Admissions Officer verification.',
    },
  )

  if (scenario === 'Submitted') {
    return [...baseLogs].reverse()
  }

  baseLogs.push({
    id: 'hist-4',
    dateTime: '12 Nov 2026, 10:05 AM',
    activity: 'Application review started',
    updatedBy: 'Admission Officer (Verification Desk)',
    description:
      'Assigned to Admission Officer for identity, academic background, and certificate verification.',
  })

  if (scenario === 'Under Review') {
    return [...baseLogs].reverse()
  }

  if (scenario === 'Need Correction') {
    baseLogs.push({
      id: 'hist-5',
      dateTime: '14 Nov 2026, 03:20 PM',
      activity: 'Additional document requested',
      updatedBy: 'Admission Officer (Verification Desk)',
      description:
        'Officer requested a clearer copy of the High School Certificate (BacII) prior to 20 November 2026.',
    })
    return [...baseLogs].reverse()
  }

  if (scenario === 'Resubmitted') {
    baseLogs.push(
      {
        id: 'hist-5',
        dateTime: '14 Nov 2026, 03:20 PM',
        activity: 'Additional document requested',
        updatedBy: 'Admission Officer (Verification Desk)',
        description:
          'Officer requested a clearer copy of the High School Certificate (BacII).',
      },
      {
        id: 'hist-6',
        dateTime: '15 Nov 2026, 11:10 AM',
        activity: 'Corrected application resubmitted',
        updatedBy: 'Sample Student (Applicant)',
        description:
          'Uploaded updated High School Certificate scan and resubmitted application for verification.',
      },
    )
    return [...baseLogs].reverse()
  }

  if (scenario === 'Approved') {
    baseLogs.push({
      id: 'hist-7',
      dateTime: '16 Nov 2026, 04:00 PM',
      activity: 'Application approved',
      updatedBy: 'Office of Admissions & Registrar',
      description:
        'All academic records and supporting documents verified. Application approved for entrance examination eligibility.',
    })
    return [...baseLogs].reverse()
  }

  baseLogs.push({
    id: 'hist-8',
    dateTime: '16 Nov 2026, 04:00 PM',
    activity: 'Application decision recorded (Rejected)',
    updatedBy: 'Office of Admissions & Registrar',
    description:
      'Application could not be approved due to unfulfilled minimum academic eligibility criteria for the selected program.',
  })

  return [...baseLogs].reverse()
}

export function createInitialApplicationStatusData(
  scenario: ApplicationTrackingScenario = 'Under Review',
): ApplicationStatusTrackingPageData {
  const noFeedbackByScenario: Record<ApplicationTrackingScenario, string> = {
    Draft:
      'Your application is currently saved as a draft. Please complete all required sections and submit your application to begin official review.',
    Submitted:
      'Your application has been submitted and is waiting in queue for an Admission Officer. No additional action is required at this time.',
    'Under Review':
      'Your application is currently being reviewed. No additional action is required.',
    'Need Correction':
      'Please review the Admission Officer feedback below and upload the requested document before the correction deadline.',
    Resubmitted:
      'Your corrected document and resubmitted application have been received and are currently being reviewed. No additional action is required.',
    Approved:
      'Your application has been officially approved by the Office of Admissions. Your dossier is locked and no further edits are required.',
    Rejected:
      'Your application review has concluded and was not approved for this intake. Please contact the Admission Office if you have questions regarding eligibility.',
  }

  return {
    pageTitle: 'Application Status',
    pageSubtitle:
      'Track your admission application and review the latest updates.',

    summary: {
      applicationReference: 'APP-2026-00125',
      applicantName: 'Sample Student',
      academicYear: '2026–2027',
      selectedFaculty: 'Faculty of Information Technology',
      selectedMajor: 'Information Technology',
      submissionDate:
        scenario === 'Draft' ? 'Not Submitted (Draft)' : '10 November 2026',
      currentStatus: scenario,
    },

    timelineSteps: buildTimelineForScenario(scenario),

    officerFeedback: {
      hasCorrectionRequest: scenario === 'Need Correction',
      feedbackMessage:
        'Please upload a clearer copy of your high school certificate.',
      correctionReason:
        'The bottom-right official Ministry seal and candidate serial number on your uploaded High School Certificate scan are blurred and partially cropped.',
      requiredDocumentOrInfo:
        'High School Certificate (BacII) — Full-page, high-resolution color PDF or JPG scan (Max 5 MB)',
      correctionDeadline: '20 November 2026 [Illustrative Deadline]',
      noFeedbackMessage: noFeedbackByScenario[scenario],
      uploadedReplacementFileName: '',
    },

    historyLogs: buildHistoryLogsForScenario(scenario),
  }
}
