import type {
  CambodiaProvinceOption,
  DashboardProgressStep,
  PersonalInformationFormPayload,
} from '../types/admissions'

export const personalInfoStepIndicator: DashboardProgressStep[] = [
  {
    stepNumber: 1,
    id: 'personal-info',
    title: 'Personal Information',
    shortDescription: 'Identity, contact & family details',
    status: 'current',
  },
  {
    stepNumber: 2,
    id: 'academic-background',
    title: 'Academic Background',
    shortDescription: 'High school & BacII examination record',
    status: 'upcoming',
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

export const genderOptions: Array<{ value: 'Male' | 'Female' | 'Other'; label: string }> = [
  { value: 'Male', label: 'Male (ប្រុស)' },
  { value: 'Female', label: 'Female (ស្រី)' },
  { value: 'Other', label: 'Other' },
]

export const nationalityOptions: Array<{ value: string; label: string }> = [
  { value: 'Cambodian', label: 'Cambodian (ខ្មែរ)' },
  { value: 'Laotian', label: 'Laotian' },
  { value: 'Vietnamese', label: 'Vietnamese' },
  { value: 'Thai', label: 'Thai' },
  { value: 'Other International', label: 'Other International Applicant' },
]

export const cambodiaLocations: CambodiaProvinceOption[] = [
  {
    id: 'phnom-penh',
    name: 'Phnom Penh Capital (រាជធានីភ្នំពេញ)',
    districts: [
      {
        id: 'tuol-kouk',
        name: 'Khan Tuol Kouk (ខណ្ឌទួលគោក)',
        communes: [
          'Sangkat Tuek L\'ak Ti Muoy',
          'Sangkat Tuek L\'ak Ti Pir',
          'Sangkat Tuek L\'ak Ti Bei',
          'Sangkat Boeng Kak Ti Muoy',
          'Sangkat Boeng Kak Ti Pir',
          'Sangkat Phsar Depou Ti Muoy',
        ],
      },
      {
        id: 'chamkar-mon',
        name: 'Khan Chamkar Mon (ខណ្ឌចំការមន)',
        communes: [
          'Sangkat Tonle Bassac',
          'Sangkat Boeng Trabek',
          'Sangkat Tuol Tumpung Ti Muoy',
          'Sangkat Tuol Tumpung Ti Pir',
          'Sangkat Phsar Daeum Thkov',
        ],
      },
      {
        id: 'sensok',
        name: 'Khan Sen Sok (ខណ្ឌសែនសុខ)',
        communes: [
          'Sangkat Phnom Penh Thmei',
          'Sangkat Tuek Thla',
          'Sangkat Khmuonh',
          'Sangkat Krang Thnong',
        ],
      },
      {
        id: 'daun-penh',
        name: 'Khan Daun Penh (ខណ្ឌដូនពេញ)',
        communes: [
          'Sangkat Wat Phnom',
          'Sangkat Phsar Thmei Ti Muoy',
          'Sangkat Chakto Mukh',
          'Sangkat Chey Chumneas',
        ],
      },
    ],
  },
  {
    id: 'kandal',
    name: 'Kandal Province (ខេត្តកណ្តាល)',
    districts: [
      {
        id: 'ta-khmau',
        name: 'Krong Ta Khmau (ក្រុងតាខ្មៅ)',
        communes: ['Sangkat Ta Khmau', 'Sangkat Daeum Mien', 'Sangkat Preaek Ruessei', 'Sangkat Kampong Samnanh'],
      },
      {
        id: 'kien-svay',
        name: 'Srok Kien Svay (ស្រុកកៀនស្វាយ)',
        communes: ['Khum Kokir', 'Khum Chheu Teal', 'Khum Phum Thum', 'Khum Preaek Aeng'],
      },
    ],
  },
  {
    id: 'siem-reap',
    name: 'Siem Reap Province (ខេត្តសៀមរាប)',
    districts: [
      {
        id: 'siem-reap-city',
        name: 'Krong Siem Reap (ក្រុងសៀមរាប)',
        communes: ['Sangkat Svay Dangkum', 'Sangkat Sala Kamraeuk', 'Sangkat Sla Kram', 'Sangkat Kouk Chak'],
      },
      {
        id: 'puok',
        name: 'Srok Puok (ស្រុកពួក)',
        communes: ['Khum Puok', 'Khum Sasâr Sdam', 'Khum Lvea'],
      },
    ],
  },
  {
    id: 'battambang',
    name: 'Battambang Province (ខេត្តបាត់ដំបង)',
    districts: [
      {
        id: 'battambang-city',
        name: 'Krong Battambang (ក្រុងបាត់ដំបង)',
        communes: ['Sangkat Svay Por', 'Sangkat Rattanak', 'Sangkat Preaek Preah Sdach', 'Sangkat Tuol Ta Ek'],
      },
    ],
  },
  {
    id: 'kampong-cham',
    name: 'Kampong Cham Province (ខេត្តកំពង់ចាម)',
    districts: [
      {
        id: 'kampong-cham-city',
        name: 'Krong Kampong Cham (ក្រុងកំពង់ចាម)',
        communes: ['Sangkat Kampong Cham', 'Sangkat Veal Vong', 'Sangkat Boeng Kok', 'Sangkat Sambuor Meas'],
      },
    ],
  },
  {
    id: 'preah-sihanouk',
    name: 'Preah Sihanouk Province (ខេត្តព្រះសីហនុ)',
    districts: [
      {
        id: 'sihanoukville',
        name: 'Krong Preah Sihanouk (ក្រុងព្រះសីហនុ)',
        communes: ['Sangkat Muoy', 'Sangkat Pir', 'Sangkat Bei', 'Sangkat Buon'],
      },
    ],
  },
]

export function createEmptyPersonalInfoPayload(): PersonalInformationFormPayload {
  return {
    fullNameKhmer: '',
    fullNameEnglish: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    placeOfBirth: '',
    nationalIdOrPassport: '',
    email: '',
    phone: '',
    currentAddress: '',
    provinceCity: '',
    districtKhan: '',
    communeSangkat: '',
    village: '',
    fatherFullName: '',
    fatherOccupation: '',
    motherFullName: '',
    motherOccupation: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  }
}
