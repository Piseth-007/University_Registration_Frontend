import type {
  DashboardProgressStep,
  ReviewApplicationSummaryData,
  ReviewDocumentTableRow,
} from '../types/admissions'

export const reviewSubmitStepIndicator: DashboardProgressStep[] = [
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
    status: 'completed',
  },
  {
    stepNumber: 4,
    id: 'documents',
    title: 'Document Upload',
    shortDescription: 'National ID, diploma & transcripts',
    status: 'completed',
  },
  {
    stepNumber: 5,
    id: 'my-application',
    title: 'Review & Submit',
    shortDescription: 'Final declaration & submission',
    status: 'current',
  },
]

export function createInitialReviewSummaryData(): ReviewApplicationSummaryData {
  return {
    overview: {
      referenceNumber: 'APP-2027-0001 (sample)',
      applicantName: 'Sample Student',
      academicYear: '2027–2028',
      applicationStatus: 'Draft',
      submissionDate: 'Not Submitted',
    },
    personalInfo: {
      fullNameKhmer: 'ចាន់ សុខា (គំរូ / Sample)',
      fullNameEnglish: 'CHAN SOKHA (Sample Student)',
      gender: 'Female (ស្រី)',
      dateOfBirth: '15 August 2008 [Illustrative]',
      nationality: 'Cambodian (ខ្មែរ)',
      phoneNumber: '+855 12 345 678 [Illustrative]',
      emailAddress: 'sample.student@email.com',
      currentAddress:
        "House No. 42B, Street 271, Sangkat Tuek L'ak Ti Muoy, Khan Tuol Kouk, Phnom Penh [Illustrative]",
    },
    academicBackground: {
      highSchoolName: 'Preah Sisowath High School (វិទ្យាល័យព្រះស៊ីសុវត្ថិ) [Illustrative]',
      schoolProvince: 'Phnom Penh Capital (រាជធានីភ្នំពេញ)',
      graduationYear: '2026',
      examinationYear: '2026',
      examinationResult: 'Passed — Grade A (Score: 428.50, Candidate #120489) [Illustrative]',
    },
    facultyMajor: {
      selectedFaculty: 'Faculty of Science (មហាវិទ្យាល័យវិទ្យាសាស្ត្រ)',
      selectedMajor: 'Computer Science (វិទ្យាសាស្ត្រកុំព្យូទ័រ)',
      degreeLevel: "Bachelor's Degree (បរិញ្ញាបត្រ)",
      studyDuration: '4 Years [Illustrative]',
      studyMode: 'Full-time (ពេញម៉ោង)',
    },
  }
}

export function createInitialReviewDocumentRows(): ReviewDocumentTableRow[] {
  return [
    {
      id: 'rev-doc-portrait',
      documentName: 'Student Portrait Photo',
      documentNameKhmer: 'រូបថតបេក្ខជន (៤×៦)',
      required: true,
      uploadedFile: 'Sample_Student_Portrait_4x6.jpg',
      fileType: 'JPG',
      fileSize: '420 KB',
      status: 'Uploaded',
    },
    {
      id: 'rev-doc-nid',
      documentName: 'National ID Card',
      documentNameKhmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ',
      required: true,
      uploadedFile: 'Cambodia_National_ID_Sample.pdf',
      fileType: 'PDF',
      fileSize: '1.2 MB',
      status: 'Uploaded',
    },
    {
      id: 'rev-doc-cert',
      documentName: 'High School Certificate',
      documentNameKhmer: 'សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ',
      required: true,
      uploadedFile: 'BacII_Diploma_Certificate_Sample.pdf',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      status: 'Uploaded',
    },
    {
      id: 'rev-doc-exam',
      documentName: 'High School Examination Result',
      documentNameKhmer: 'ព្រឹត្តិបត្រពិន្ទុបាក់ឌុប',
      required: true,
      uploadedFile: 'MoEYS_Exam_Score_Slip_Sample.pdf',
      fileType: 'PDF',
      fileSize: '940 KB',
      status: 'Uploaded',
    },
    {
      id: 'rev-doc-birth',
      documentName: 'Birth Certificate',
      documentNameKhmer: 'សំបុត្រកំណើត (Optional)',
      required: false,
      uploadedFile: 'Birth_Certificate_Copy_Sample.pdf',
      fileType: 'PDF',
      fileSize: '1.1 MB',
      status: 'Uploaded',
    },
  ]
}
