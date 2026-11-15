import type {
  DashboardProgressStep,
  PortalDocumentSlotItem,
} from '../types/admissions'

export const documentUploadStepIndicator: DashboardProgressStep[] = [
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
    status: 'current',
  },
  {
    stepNumber: 5,
    id: 'my-application',
    title: 'Review & Submit',
    shortDescription: 'Final declaration & submission',
    status: 'upcoming',
  },
]

export function createInitialDocumentSlots(): PortalDocumentSlotItem[] {
  return [
    {
      id: 'doc-portrait-photo',
      title: 'Student Portrait Photo',
      titleKhmer: 'រូបថតបេក្ខជន (៤×៦)',
      required: true,
      shortExplanation:
        'Recent 4×6 cm formal passport-style photograph with white or blue background taken within the last 6 months.',
      acceptedFormats: 'JPG, PNG',
      maxFileSizePlaceholder: '[Max File Size Placeholder: 2 MB]',
      status: 'Missing',
      uploadProgress: 0,
      uploadedFileName: '',
      uploadedFileSize: '',
      reviewNote: 'Pending verification by Admission Office',
      rejectionReason:
        'Image resolution is too low or background is not plain. Please upload a clear 4×6 portrait photo.',
      sampleFileName: 'Sokha_Chan_Portrait_4x6.jpg',
      sampleFileSize: '420 KB',
    },
    {
      id: 'doc-national-id',
      title: 'National ID Card',
      titleKhmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ',
      required: true,
      shortExplanation:
        'Clear color scan or photograph of both front and back sides of your valid Cambodian National ID Card or Passport.',
      acceptedFormats: 'PDF, JPG, PNG',
      maxFileSizePlaceholder: '[Max File Size Placeholder: 5 MB]',
      status: 'Missing',
      uploadProgress: 0,
      uploadedFileName: '',
      uploadedFileSize: '',
      reviewNote: 'Verified readable format',
      rejectionReason:
        'Back side of the National ID Card is missing or cropped. Please upload both sides clearly.',
      sampleFileName: 'Cambodia_National_ID_010894521.pdf',
      sampleFileSize: '1.2 MB',
    },
    {
      id: 'doc-hs-certificate',
      title: 'High School Certificate',
      titleKhmer: 'សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប)',
      required: true,
      shortExplanation:
        'Official MoEYS Upper Secondary School Diploma (BacII Certificate) or certified provisional pass certificate.',
      acceptedFormats: 'PDF, JPG, PNG',
      maxFileSizePlaceholder: '[Max File Size Placeholder: 5 MB]',
      status: 'Missing',
      uploadProgress: 0,
      uploadedFileName: '',
      uploadedFileSize: '',
      reviewNote: 'Pending academic verification',
      rejectionReason:
        'Official stamp and serial number at the bottom of the certificate are blurred.',
      sampleFileName: 'BacII_Diploma_Certificate_2026.pdf',
      sampleFileSize: '1.8 MB',
    },
    {
      id: 'doc-hs-exam-result',
      title: 'High School Examination Result',
      titleKhmer: 'វិញ្ញាបនបត្របណ្តោះអាសន្ន / ព្រឹត្តិបត្រពិន្ទុបាក់ឌុប',
      required: true,
      shortExplanation:
        'Official examination score slip or Grade 12 transcript showing candidate number, subject scores, and overall grade.',
      acceptedFormats: 'PDF, JPG, PNG',
      maxFileSizePlaceholder: '[Max File Size Placeholder: 5 MB]',
      status: 'Missing',
      uploadProgress: 0,
      uploadedFileName: '',
      uploadedFileSize: '',
      reviewNote: 'Pending score verification',
      rejectionReason:
        'Uploaded file is password-protected or unreadable. Please re-upload an unlocked PDF or JPG.',
      sampleFileName: 'MoEYS_Exam_Score_Slip_120489.pdf',
      sampleFileSize: '940 KB',
    },
    {
      id: 'doc-birth-certificate',
      title: 'Birth Certificate',
      titleKhmer: 'សំបុត្រកំណើត / សេចក្តីចម្លងសំបុត្រកំណើត',
      required: false,
      shortExplanation:
        'Official copy of your Cambodian Birth Certificate to support civil registry name and place-of-birth verification.',
      acceptedFormats: 'PDF, JPG, PNG',
      maxFileSizePlaceholder: '[Max File Size Placeholder: 5 MB]',
      status: 'Missing',
      uploadProgress: 0,
      uploadedFileName: '',
      uploadedFileSize: '',
      reviewNote: 'Optional supporting document',
      rejectionReason:
        'Document scan is cut off at the top margin. Please re-scan the full page.',
      sampleFileName: 'Birth_Certificate_Copy_Sokha_Chan.pdf',
      sampleFileSize: '1.1 MB',
    },
  ]
}
