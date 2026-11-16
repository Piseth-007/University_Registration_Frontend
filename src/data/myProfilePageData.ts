import type {
  ChangePasswordFormState,
  ProfileInteractionState,
  StudentProfilePageData,
} from '../types/admissions'

export const profileStatePresets: Array<{
  id: ProfileInteractionState
  label: string
}> = [
  { id: 'default', label: '1. Default View' },
  { id: 'edit-mode', label: '2. Edit Profile Mode' },
  { id: 'restricted', label: '3. Restricted Identity' },
  { id: 'validation-errors', label: '4. Validation Errors' },
  { id: 'password-modal', label: '5. Change Password Modal' },
  { id: 'saved-success', label: '6. Saved Successfully' },
]

export const profileProvinceOptions: string[] = [
  'Phnom Penh',
  'Kandal',
  'Siem Reap',
  'Battambang',
  'Kampong Cham',
  'Preah Sihanouk',
  'Takeo',
]

export const profileDistrictByProvince: Record<string, string[]> = {
  'Phnom Penh': ['Toul Kork', 'Chamkar Mon', 'Daun Penh', 'Sen Sok', 'Chbar Ampov'],
  Kandal: ['Ta Khmau', 'Kien Svay', 'Khsach Kandal'],
  'Siem Reap': ['Siem Reap Municipality', 'Puok', 'Bakong'],
  Battambang: ['Battambang Municipality', 'Sangkae', 'Banan'],
  'Kampong Cham': ['Kampong Cham Municipality', 'Prey Chhor', 'Tbong Khmum'],
  'Preah Sihanouk': ['Preah Sihanouk Municipality', 'Prey Nob'],
  Takeo: ['Doun Kaev Municipality', 'Bati', 'Tram Kak'],
}

export const profileCommuneOptions: Record<string, string[]> = {
  'Toul Kork': ['Teuk Laak 1', 'Teuk Laak 2', 'Boeung Kak 1', 'Boeung Kak 2'],
  'Chamkar Mon': ['Tonle Bassac', 'Boeung Keng Kang 1', 'Toul Tompoung 1'],
  'Daun Penh': ['Wat Phnom', 'Phsar Thmei 1', 'Chaktomuk'],
  'Sen Sok': ['Phnom Penh Thmei', 'Teuk Thla', 'Krang Thnong'],
  'Chbar Ampov': ['Chbar Ampov 1', 'Nirouth', 'Prek Pra'],
}

export function createInitialStudentProfileData(): StudentProfilePageData {
  return {
    pageTitle: 'My Profile & Settings',
    pageSubtitle:
      'Manage your account information, contact details, and security settings.',

    summary: {
      avatarInitials: 'SS',
      fullName: 'Sample Student',
      studentId: 'STU-2026-00125',
      emailAddress: 'sample.student@student.rupp.edu.kh',
      phoneNumber: '+855 12 345 678',
      accountStatus: 'Active',
    },

    personalInfo: {
      fullNameEnglish: 'Sample Student (Sokha Chan)',
      fullNameKhmer: 'សុខា ចាន់',
      gender: 'Female',
      dateOfBirth: '14 May 2008',
      nationality: 'Cambodian (Khmer)',
      isVerifiedIdentityLocked: true,
    },

    contactInfo: {
      emailAddress: 'sample.student@student.rupp.edu.kh',
      phoneNumber: '+855 12 345 678',
      currentAddress: 'House #24B, Street 271, Village 4',
      provinceCity: 'Phnom Penh',
      district: 'Toul Kork',
      commune: 'Teuk Laak 1',
    },

    preferences: {
      language: 'English',
      emailNotifications: true,
      inAppNotifications: true,
    },
  }
}

export function validateContactInfo(
  contact: StudentProfilePageData['contactInfo'],
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!contact.emailAddress.trim()) {
    errors.emailAddress = 'Email address is required for official portal communications.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.emailAddress.trim())) {
    errors.emailAddress = 'Please enter a valid institutional or personal email address.'
  }

  if (!contact.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required for urgent admission notices.'
  } else if (contact.phoneNumber.replace(/\D/g, '').length < 8) {
    errors.phoneNumber = 'Please enter a valid Cambodian telephone number (at least 8 digits).'
  }

  if (!contact.currentAddress.trim()) {
    errors.currentAddress = 'Current residential street/house address is required.'
  }

  if (!contact.provinceCity.trim()) {
    errors.provinceCity = 'Please select your Province or Municipality.'
  }

  if (!contact.district.trim()) {
    errors.district = 'Please select your District / Khan.'
  }

  if (!contact.commune.trim()) {
    errors.commune = 'Please select or enter your Commune / Sangkat.'
  }

  return errors
}

export function validatePasswordForm(
  form: ChangePasswordFormState,
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!form.currentPassword) {
    errors.currentPassword = 'Your current account password is required.'
  }

  if (!form.newPassword) {
    errors.newPassword = 'Please enter a new password.'
  } else if (form.newPassword.length < 8) {
    errors.newPassword = 'New password must be at least 8 characters long.'
  } else if (!/[A-Z]/.test(form.newPassword) || !/[0-9]/.test(form.newPassword)) {
    errors.newPassword =
      'New password must contain at least one uppercase letter and one number.'
  }

  if (!form.confirmNewPassword) {
    errors.confirmNewPassword = 'Please confirm your new password.'
  } else if (form.confirmNewPassword !== form.newPassword) {
    errors.confirmNewPassword = 'Confirmation password does not match your new password.'
  }

  return errors
}
