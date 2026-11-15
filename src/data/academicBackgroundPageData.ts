import type {
  AcademicBackgroundFormPayload,
  DashboardProgressStep,
} from '../types/admissions'

export const academicBackgroundStepIndicator: DashboardProgressStep[] = [
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
    status: 'current',
  },
  {
    stepNumber: 3,
    id: 'faculty-major',
    title: 'Faculty & Major',
    shortDescription: 'Degree program preferences',
    status: 'upcoming',
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

export const schoolTypeOptions: Array<{ value: string; label: string }> = [
  { value: 'Public', label: 'Public High School (សាលារដ្ឋ)' },
  { value: 'Private', label: 'Private High School (សាលាឯកជន)' },
]

export const graduationYearOptions: Array<{ value: string; label: string }> = [
  { value: '2027', label: '2027' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020-earlier', label: '2020 or Earlier' },
]

export const examinationStatusOptions: Array<{ value: string; label: string }> = [
  { value: 'Passed', label: 'Passed (ប្រឡងជាប់)' },
  { value: 'Pending', label: 'Pending Results (រង់ចាំលទ្ធផល)' },
  { value: 'Not Yet Taken', label: 'Not Yet Taken (មិនទាន់ប្រឡង)' },
]

export const gradeResultOptions: Array<{ value: string; label: string }> = [
  { value: 'Grade A', label: 'Grade A — Excellent (និទ្ទេស A)' },
  { value: 'Grade B', label: 'Grade B — Very Good (និទ្ទេស B)' },
  { value: 'Grade C', label: 'Grade C — Good (និទ្ទេស C)' },
  { value: 'Grade D', label: 'Grade D — Satisfactory (និទ្ទេស D)' },
  { value: 'Grade E', label: 'Grade E — Pass (និទ្ទេស E)' },
]

export const highestEducationLevelOptions: Array<{ value: string; label: string }> = [
  { value: 'High School Diploma (BacII)', label: 'High School Diploma — BacII (មធ្យមសិក្សាទុតិយភូមិ)' },
  { value: 'Grade 12 Candidate', label: 'Grade 12 Final Year Candidate (សិស្សថ្នាក់ទី១២)' },
  { value: 'Associate Degree', label: 'Associate Degree (បរិញ្ញាបត្ររង)' },
  { value: "Bachelor's Degree", label: "Bachelor's Degree (បរិញ្ញាបត្រ)" },
  { value: 'Technical & Vocational Diploma', label: 'Technical & Vocational Diploma (សញ្ញាបត្របច្ចេកទេស)' },
]

export function createEmptyAcademicBackgroundPayload(): AcademicBackgroundFormPayload {
  return {
    highSchoolNameKhmer: '',
    highSchoolNameEnglish: '',
    provinceCity: '',
    districtKhan: '',
    schoolType: '',
    graduationYear: '',
    examinationStatus: 'Passed',
    examinationYear: '',
    examinationCenter: '',
    candidateNumber: '',
    totalExaminationScore: '',
    gradeResult: '',
    highestEducationLevel: '',
    previousInstitution: '',
    additionalQualifications: '',
  }
}
