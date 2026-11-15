import type {
  AcademicBackgroundFormPayload,
  AcademicProgramItem,
  ContactFormPayload,
  DegreeLevel,
  ExamScheduleItem,
  ExamScheduleStatus,
  FacultyItem,
  NewsCategory,
  NewsDetailArticle,
  PersonalInformationFormPayload,
  PortalDegreeLevel,
  PortalMajorProgramItem,
  PortalStudyMode,
  StudentForgotPasswordPayload,
  StudentLoginPayload,
  StudentRegisterPayload,
  StudyMode,
} from '../types/admissions'

/**
 * Smoothly scrolls to an element matching a hash selector (e.g. `#programs`).
 */
export function scrollToSection(hash: string): void {
  if (!hash || !hash.startsWith('#')) return
  const targetId = hash.slice(1)
  if (targetId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(targetId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Calculates the number of days remaining until a deadline ISO date string.
 */
export function getDaysRemainingUntilDeadline(
  deadlineIso: string,
  referenceDate: Date = new Date(),
): number {
  const deadline = new Date(deadlineIso).getTime()
  const now = referenceDate.getTime()
  const diffMs = deadline - now
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
}

/**
 * Filters faculties by a search query matching title or description.
 */
export function filterFaculties(items: FacultyItem[], query: string): FacultyItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return items
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized),
  )
}

/**
 * Filters academic programs by search query, facultyId, degreeLevel, and studyMode.
 */
export function filterAcademicPrograms(
  items: AcademicProgramItem[],
  options: {
    searchQuery?: string
    facultyId?: string
    degreeLevel?: DegreeLevel | 'ALL'
    studyMode?: StudyMode | 'ALL'
  },
): AcademicProgramItem[] {
  const q = (options.searchQuery ?? '').trim().toLowerCase()
  const fac = options.facultyId ?? 'ALL'
  const deg = options.degreeLevel ?? 'ALL'
  const mode = options.studyMode ?? 'ALL'

  return items.filter((prog) => {
    const matchesFaculty = fac === 'ALL' || !fac || prog.facultyId === fac
    const matchesDegree = deg === 'ALL' || prog.degreeLevel === deg
    const matchesMode = mode === 'ALL' || prog.studyMode === mode
    const matchesQuery =
      !q ||
      prog.name.toLowerCase().includes(q) ||
      prog.facultyName.toLowerCase().includes(q) ||
      prog.summary.toLowerCase().includes(q)

    return matchesFaculty && matchesDegree && matchesMode && matchesQuery
  })
}

/**
 * Filters examination schedule rows by faculty name or status.
 */
export function filterExamSchedule(
  items: ExamScheduleItem[],
  query: string,
  statusFilter?: ExamScheduleStatus | 'ALL',
): ExamScheduleItem[] {
  const normalized = query.trim().toLowerCase()
  return items.filter((item) => {
    const matchesStatus = !statusFilter || statusFilter === 'ALL' || item.status === statusFilter
    const matchesQuery =
      !normalized ||
      item.faculty.toLowerCase().includes(normalized) ||
      item.date.toLowerCase().includes(normalized)
    return matchesStatus && matchesQuery
  })
}

/**
 * Maps an examination schedule status to a semantic CSS class modifier.
 */
export function getExamStatusClass(status: ExamScheduleStatus): string {
  switch (status) {
    case 'Registration Open':
      return 'status-open'
    case 'Scheduled':
      return 'status-scheduled'
    case 'Completed':
      return 'status-completed'
    default:
      return ''
  }
}

/**
 * Formats a candidate ID (e.g. "rupp20260142" -> "RUPP-2026-0142").
 */
export function formatCandidateId(raw: string): string {
  return raw.trim().toUpperCase()
}

/**
 * Filters news articles by category and search query.
 */
export function filterNewsArticles(
  articles: NewsDetailArticle[],
  category: NewsCategory,
  searchQuery: string,
): NewsDetailArticle[] {
  const q = searchQuery.trim().toLowerCase()
  return articles.filter((art) => {
    const matchesCategory = category === 'All News' || art.category === category
    const matchesQuery =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
}

/**
 * Paginates an array of items for a given 1-based page number and pageSize.
 */
export function paginateItems<T>(items: T[], page: number, pageSize: number): T[] {
  const start = Math.max(0, (page - 1) * pageSize)
  return items.slice(start, start + pageSize)
}

/**
 * Validates the Contact Us inquiry form fields and returns a map of field errors.
 */
export function validateContactForm(
  payload: ContactFormPayload,
): Partial<Record<keyof ContactFormPayload, string>> {
  const errors: Partial<Record<keyof ContactFormPayload, string>> = {}

  if (!payload.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  const emailTrimmed = payload.email.trim()
  if (!emailTrimmed) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!payload.phone.trim()) {
    errors.phone = 'Phone number is required.'
  }

  if (!payload.subject.trim()) {
    errors.subject = 'Please select or enter an inquiry subject.'
  }

  if (!payload.message.trim()) {
    errors.message = 'Please enter your message.'
  } else if (payload.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.'
  }

  return errors
}

/**
 * Validates the Student Login form fields.
 */
export function validateLoginForm(
  payload: StudentLoginPayload,
): Partial<Record<keyof StudentLoginPayload, string>> {
  const errors: Partial<Record<keyof StudentLoginPayload, string>> = {}
  const email = payload.email.trim()

  if (!email) {
    errors.email = 'Please enter your registered email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid university or personal email address.'
  }

  if (!payload.password) {
    errors.password = 'Please enter your account password.'
  } else if (payload.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.'
  }

  return errors
}

/**
 * Validates the Create Student Account registration form fields.
 */
export function validateRegisterForm(
  payload: StudentRegisterPayload,
): Partial<Record<keyof StudentRegisterPayload, string>> {
  const errors: Partial<Record<keyof StudentRegisterPayload, string>> = {}

  if (!payload.fullName.trim()) {
    errors.fullName = 'Full name is required (as shown on National ID / BacII).'
  }

  const email = payload.email.trim()
  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  const phoneDigits = payload.phone.replace(/\s+/g, '')
  if (!phoneDigits) {
    errors.phone = 'Cambodia mobile phone number is required.'
  } else if (!/^\d{8,10}$/.test(phoneDigits)) {
    errors.phone = 'Enter a valid 8 to 10 digit phone number after +855.'
  }

  if (!payload.password) {
    errors.password = 'Password is required.'
  } else if (payload.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters.'
  }

  if (!payload.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (payload.confirmPassword !== payload.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!payload.agreeTerms) {
    errors.agreeTerms = 'You must agree to the Terms and Conditions to create an account.'
  }

  return errors
}

/**
 * Validates the Forgot Password email form field.
 */
export function validateForgotPasswordForm(
  payload: StudentForgotPasswordPayload,
): Partial<Record<keyof StudentForgotPasswordPayload, string>> {
  const errors: Partial<Record<keyof StudentForgotPasswordPayload, string>> = {}
  const email = payload.email.trim()

  if (!email) {
    errors.email = 'Please enter your registered email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  return errors
}

/**
 * Validates the Personal Information application form fields.
 */
export function validatePersonalInfoForm(
  payload: PersonalInformationFormPayload,
): Partial<Record<keyof PersonalInformationFormPayload, string>> {
  const errors: Partial<Record<keyof PersonalInformationFormPayload, string>> = {}

  if (!payload.fullNameKhmer.trim()) {
    errors.fullNameKhmer = 'Full name in Khmer script is required.'
  }
  if (!payload.fullNameEnglish.trim()) {
    errors.fullNameEnglish = 'Full name in English (Latin script) is required.'
  }
  if (!payload.gender) {
    errors.gender = 'Please select your gender.'
  }
  if (!payload.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.'
  }
  if (!payload.nationality) {
    errors.nationality = 'Please select your nationality.'
  }
  if (!payload.placeOfBirth.trim()) {
    errors.placeOfBirth = 'Place of birth (Province / Municipality) is required.'
  }
  if (!payload.nationalIdOrPassport.trim()) {
    errors.nationalIdOrPassport = 'National ID or Passport Number is required.'
  } else if (payload.nationalIdOrPassport.trim().length < 6) {
    errors.nationalIdOrPassport = 'Enter a valid National ID (9 digits) or Passport Number.'
  }

  const email = payload.email.trim()
  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  const phoneDigits = payload.phone.replace(/\s+/g, '')
  if (!phoneDigits) {
    errors.phone = 'Cambodia mobile phone number is required.'
  } else if (!/^\d{8,10}$/.test(phoneDigits)) {
    errors.phone = 'Enter a valid 8 to 10 digit phone number after +855.'
  }

  if (!payload.currentAddress.trim()) {
    errors.currentAddress = 'Current residential street/house address is required.'
  }
  if (!payload.provinceCity) {
    errors.provinceCity = 'Please select your Province or Capital City.'
  }
  if (!payload.districtKhan) {
    errors.districtKhan = 'Please select your District or Khan.'
  }
  if (!payload.communeSangkat) {
    errors.communeSangkat = 'Please select your Commune or Sangkat.'
  }
  if (!payload.village.trim()) {
    errors.village = 'Village / Phum is required.'
  }

  if (!payload.fatherFullName.trim()) {
    errors.fatherFullName = "Father's full name is required."
  }
  if (!payload.motherFullName.trim()) {
    errors.motherFullName = "Mother's full name is required."
  }
  if (!payload.emergencyContactName.trim()) {
    errors.emergencyContactName = 'Emergency contact person name is required.'
  }

  const emergencyPhoneDigits = payload.emergencyContactPhone.replace(/\s+/g, '')
  if (!emergencyPhoneDigits) {
    errors.emergencyContactPhone = 'Emergency contact phone number is required.'
  } else if (!/^\d{8,10}$/.test(emergencyPhoneDigits)) {
    errors.emergencyContactPhone = 'Enter a valid 8 to 10 digit phone number.'
  }

  return errors
}

/**
 * Validates the Academic Background application form fields.
 * Candidate Number, Total Examination Score, and Grade / Result are only required when examinationStatus === 'Passed'.
 */
export function validateAcademicBackgroundForm(
  payload: AcademicBackgroundFormPayload,
): Partial<Record<keyof AcademicBackgroundFormPayload, string>> {
  const errors: Partial<Record<keyof AcademicBackgroundFormPayload, string>> = {}

  if (!payload.highSchoolNameKhmer.trim()) {
    errors.highSchoolNameKhmer = 'High school name in Khmer script is required.'
  }
  if (!payload.highSchoolNameEnglish.trim()) {
    errors.highSchoolNameEnglish = 'High school name in English is required.'
  }
  if (!payload.provinceCity) {
    errors.provinceCity = 'Please select the province or city of your high school.'
  }
  if (!payload.districtKhan) {
    errors.districtKhan = 'Please select the district or khan of your high school.'
  }
  if (!payload.schoolType) {
    errors.schoolType = 'Please select your school type (Public or Private).'
  }
  if (!payload.graduationYear) {
    errors.graduationYear = 'Please select your high school graduation year.'
  }

  if (!payload.examinationStatus) {
    errors.examinationStatus = 'Please select your BacII examination status.'
  }
  if (!payload.examinationYear) {
    errors.examinationYear = 'Please select your examination year.'
  }
  if (!payload.examinationCenter.trim()) {
    errors.examinationCenter = 'Examination center name is required.'
  }

  if (payload.examinationStatus === 'Passed') {
    if (!payload.candidateNumber.trim()) {
      errors.candidateNumber = 'BacII candidate / seat number is required.'
    }
    if (!payload.totalExaminationScore.trim()) {
      errors.totalExaminationScore = 'Total examination score is required.'
    }
    if (!payload.gradeResult) {
      errors.gradeResult = 'Please select or enter your examination grade (A–E).'
    }
  }

  if (!payload.highestEducationLevel) {
    errors.highestEducationLevel = 'Please select your highest completed education level.'
  }

  return errors
}

/**
 * Filters Student Portal academic major programs by search query, facultyId, degreeLevel, and studyMode.
 */
export function filterPortalMajorPrograms(
  items: PortalMajorProgramItem[],
  options: {
    searchQuery?: string
    facultyId?: string
    degreeLevel?: PortalDegreeLevel | ''
    studyMode?: PortalStudyMode | ''
  },
): PortalMajorProgramItem[] {
  const q = (options.searchQuery ?? '').trim().toLowerCase()
  const fac = options.facultyId ?? ''
  const deg = options.degreeLevel ?? ''
  const mode = options.studyMode ?? ''

  return items.filter((prog) => {
    const matchesFaculty = !fac || prog.facultyId === fac
    const matchesDegree = !deg || prog.degreeLevel === deg
    const matchesMode = !mode || prog.studyMode === mode
    const matchesQuery =
      !q ||
      prog.name.toLowerCase().includes(q) ||
      prog.facultyName.toLowerCase().includes(q) ||
      prog.shortDescription.toLowerCase().includes(q)

    return matchesFaculty && matchesDegree && matchesMode && matchesQuery
  })
}






