export type LanguageCode = 'KH' | 'EN'

export interface NavItem {
  id: string
  label: string
  href: string
  route?: string
}

export interface QuickLinkItem {
  eyebrow: string
  label: string
  href: string
  route?: string
}

export interface AnnouncementItem {
  id: string
  day: string
  month: string
  title: string
  summary: string
  href?: string
}

export interface KeyDateItem {
  label: string
  date: string
}

export type FacultyIconName =
  | 'science'
  | 'business'
  | 'arts'
  | 'engineering'
  | 'law'
  | 'education'

export interface FacultyItem {
  id: string
  icon: FacultyIconName
  badge: string
  departmentCount: number
  title: string
  description: string
}

export interface RequirementItem {
  id: string
  icon: 'diploma' | 'id' | 'transcript' | 'photo'
  title: string
  subtitle: string
}

export interface ApplicationStepItem {
  num: string
  title: string
  description: string
}

export type ExamScheduleStatus = 'Scheduled' | 'Registration Open' | 'Completed'

export interface ExamScheduleItem {
  id: string
  faculty: string
  date: string
  status: ExamScheduleStatus
}

export interface NewsArticleItem {
  id: string
  image: string
  category: string
  date: string
  title: string
  excerpt: string
  cta: string
}

export interface FooterLinkGroup {
  heading: string
  links: Array<{
    label: string
    href: string
  }>
}

/* About University Page Interfaces */
export interface HistoryMilestoneItem {
  year: string
  title: string
  description: string
}

export interface CoreValueItem {
  num: string
  title: string
  description: string
}

export interface AboutFacultyCardItem {
  id: string
  image: string
  eyebrow: string
  title: string
  description: string
}

export interface CampusFacilityItem {
  id: string
  image: string
  title: string
  description: string
}

export interface InstitutionalStatItem {
  metric: string
  title: string
  subtitle: string
}

export interface ContactDetailItem {
  label: string
  value: string
}

/* Faculties & Academic Programs Page Interfaces */
export interface AcademicStructureItem {
  id: string
  label: string
  title: string
  description: string
  placeholderNote: string
}

export interface FacultyDirectoryItem {
  id: string
  name: string
  shortName: string
  image: string
  programCountPlaceholder: string
  description: string
}

export type DegreeLevel = "Bachelor's Degree" | "Master's Degree" | 'Diploma / Foundation'
export type StudyMode = 'Full-Time' | 'Part-Time / Weekend' | 'Evening'

export interface AcademicProgramItem {
  id: string
  name: string
  facultyId: string
  facultyName: string
  degreeLevel: DegreeLevel
  studyMode: StudyMode
  durationPlaceholder: string
  degreeAwardedPlaceholder: string
  summary: string
  introduction: string
  learningObjectives: string[]
  curriculumOverview: Array<{
    stage: string
    focus: string
  }>
  admissionRequirements: string[]
  careerOpportunities: string[]
}

export interface AcademicStrengthItem {
  id: string
  num: string
  title: string
  description: string
}

/* News & Announcements Page Interfaces */
export type NewsCategory =
  | 'All News'
  | 'Admissions'
  | 'Academic'
  | 'Events'
  | 'Scholarships'
  | 'Research'

export interface NewsDetailArticle {
  id: string
  title: string
  category: Exclude<NewsCategory, 'All News'>
  datePlaceholder: string
  readTimePlaceholder: string
  authorPlaceholder: string
  image: string
  imageCaption: string
  excerpt: string
  isFeatured?: boolean
  contentParagraphs: string[]
  quote?: string
  keyPoints?: string[]
}

export type OfficialAnnouncementType =
  | 'Admission Announcement'
  | 'Registration Deadline'
  | 'Examination Schedule'
  | 'Admission Result'
  | 'University Notice'

export type AnnouncementStatusLabel =
  | 'OPEN'
  | 'DEADLINE'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'NOTICE'

export interface OfficialAnnouncementRecord {
  id: string
  dayPlaceholder: string
  monthPlaceholder: string
  yearPlaceholder: string
  type: OfficialAnnouncementType
  statusLabel: AnnouncementStatusLabel
  title: string
  summary: string
  referenceCodePlaceholder: string
}

export interface ScholarshipOpportunityItem {
  id: string
  badge: string
  title: string
  coveragePlaceholder: string
  deadlinePlaceholder: string
  eligibilitySummary: string
  status: 'Applications Open' | 'Upcoming' | 'Closing Soon'
}

/* Contact Us Page Interfaces */
export type ContactCardIconType = 'address' | 'phone' | 'email' | 'hours'

export interface ContactInfoBlockItem {
  id: string
  icon: ContactCardIconType
  title: string
  primaryValuePlaceholder: string
  secondaryValuePlaceholder: string
}

export interface UniversityOfficeItem {
  id: string
  name: string
  roleSummary: string
  locationPlaceholder: string
  phonePlaceholder: string
  emailPlaceholder: string
  hoursPlaceholder: string
}

export interface ContactFaqItem {
  id: string
  question: string
  answerPlaceholder: string
  actionLabel?: string
  actionRoute?: string
}

export interface ContactFormPayload {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

/* Student Authentication Interfaces */
export type AuthScreenMode = 'login' | 'register' | 'forgot-password'

export interface StudentLoginPayload {
  email: string
  password: string
  rememberMe: boolean
}

export interface StudentRegisterPayload {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export interface StudentForgotPasswordPayload {
  email: string
}

/* Student Dashboard Interfaces */
export type DashboardNavId =
  | 'dashboard'
  | 'my-application'
  | 'examination'
  | 'results'
  | 'notifications'
  | 'my-profile'
  | 'help-support'
  | 'personal-info'
  | 'academic-background'
  | 'faculty-major'
  | 'documents'
  | 'review-submit'
  | 'application-status'
  | 'profile-settings'

export interface DashboardSidebarItem {
  id: DashboardNavId
  label: string
  badge?: string
}

export interface DashboardExamScheduleRow {
  id: string
  subjectOrPaper: string
  examDatePlaceholder: string
  timeSlot: string
  venuePlaceholder: string
  seatStatus: 'Pending Slip' | 'Scheduled' | 'Confirmed'
}

export interface DashboardAnnouncementItem {
  id: string
  referenceCode: string
  datePlaceholder: string
  title: string
  summary: string
  tag: 'Intake Notice' | 'Examination' | 'Scholarship'
}

export type ApplicationStepState = 'completed' | 'current' | 'upcoming'

export interface DashboardProgressStep {
  stepNumber: number
  id: DashboardNavId
  title: string
  shortDescription: string
  status: ApplicationStepState
}

export interface DashboardSummaryCardItem {
  id: string
  label: string
  value: string
  helperText: string
  icon: 'status' | 'documents' | 'faculty' | 'deadline'
  accentTone: 'burgundy' | 'amber' | 'neutral'
}

export interface DashboardChecklistItem {
  id: string
  title: string
  description: string
  categoryLabel: string
  completed: boolean
  targetNavId: DashboardNavId
  actionText: string
}

export interface DashboardNotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  category: 'Admission Notice' | 'Document Verification' | 'System Alert'
  unread: boolean
}

export interface DashboardAdmissionDateItem {
  id: string
  eventTitle: string
  datePlaceholder: string
  statusLabel: 'Open' | 'Upcoming' | 'Deadline'
}

/* Personal Information Form Page Interfaces */
export interface PersonalInformationFormPayload {
  // 3. Personal Details
  fullNameKhmer: string
  fullNameEnglish: string
  gender: '' | 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  nationality: string
  placeOfBirth: string
  nationalIdOrPassport: string

  // 4. Contact Information
  email: string
  phone: string
  currentAddress: string
  provinceCity: string
  districtKhan: string
  communeSangkat: string
  village: string

  // 5. Family Information
  fatherFullName: string
  fatherOccupation: string
  motherFullName: string
  motherOccupation: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export interface CambodiaProvinceOption {
  id: string
  name: string
  districts: Array<{
    id: string
    name: string
    communes: string[]
  }>
}

/* Academic Background Form Page Interfaces */
export type HighSchoolType = '' | 'Public' | 'Private'
export type ExaminationStatusType = '' | 'Passed' | 'Pending' | 'Not Yet Taken'

export interface AcademicBackgroundFormPayload {
  // 3. High School Information
  highSchoolNameKhmer: string
  highSchoolNameEnglish: string
  provinceCity: string
  districtKhan: string
  schoolType: HighSchoolType
  graduationYear: string

  // 4. High School Examination
  examinationStatus: ExaminationStatusType
  examinationYear: string
  examinationCenter: string
  candidateNumber: string
  totalExaminationScore: string
  gradeResult: string

  // 5. Previous Education
  highestEducationLevel: string
  previousInstitution: string
  additionalQualifications: string
}

/* Faculty & Major Selection Page Interfaces */
export type PortalDegreeLevel = "Associate" | "Bachelor's" | "Master's"
export type PortalStudyMode = 'Full-time' | 'Part-time'

export interface PortalFacultyCardItem {
  id: string
  name: string
  nameKhmer: string
  shortDescription: string
  programCount: number
  image: string
  icon: 'science' | 'engineering' | 'social' | 'development' | 'humanities' | 'education'
}

export interface PortalMajorProgramItem {
  id: string
  name: string
  nameKhmer: string
  facultyId: string
  facultyName: string
  degreeLevel: PortalDegreeLevel
  studyDuration: string
  studyMode: PortalStudyMode
  shortDescription: string
  available?: boolean
}

/* Document Upload Page Interfaces */
export type DocumentUploadStatus = 'Missing' | 'Uploading' | 'Uploaded' | 'Rejected'

export interface PortalDocumentSlotItem {
  id: string
  title: string
  titleKhmer: string
  required: boolean
  shortExplanation: string
  acceptedFormats: string
  maxFileSizePlaceholder: string
  status: DocumentUploadStatus
  uploadProgress: number
  uploadedFileName: string
  uploadedFileSize: string
  reviewNote?: string
  rejectionReason?: string
  sampleFileName: string
  sampleFileSize: string
}

/* Review & Submit Application Page Interfaces */
export type ReviewDocumentStatus = 'Uploaded' | 'Missing' | 'Rejected'

export interface ReviewDocumentTableRow {
  id: string
  documentName: string
  documentNameKhmer: string
  required: boolean
  uploadedFile: string
  fileType: 'PDF' | 'JPG' | 'PNG' | '—'
  fileSize: string
  status: ReviewDocumentStatus
}

export interface ReviewApplicationSummaryData {
  overview: {
    referenceNumber: string
    applicantName: string
    academicYear: string
    applicationStatus: 'Draft' | 'Submitted'
    submissionDate: string
  }
  personalInfo: {
    fullNameKhmer: string
    fullNameEnglish: string
    gender: string
    dateOfBirth: string
    nationality: string
    phoneNumber: string
    emailAddress: string
    currentAddress: string
  }
  academicBackground: {
    highSchoolName: string
    schoolProvince: string
    graduationYear: string
    examinationYear: string
    examinationResult: string
  }
  facultyMajor: {
    selectedFaculty: string
    selectedMajor: string
    degreeLevel: string
    studyDuration: string
    studyMode: string
  }
}









