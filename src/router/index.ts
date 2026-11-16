import { computed, ref, type Component } from 'vue'
import { scrollToSection } from '../utils/helpers'
import HomeView from '../views/HomeView.vue'
import AboutUniversityView from '../views/AboutUniversityView.vue'
import AcademicBackgroundView from '../views/AcademicBackgroundView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import NewsView from '../views/NewsView.vue'
import ContactView from '../views/ContactView.vue'
import ApplyView from '../views/ApplyView.vue'
import DocumentUploadView from '../views/DocumentUploadView.vue'
import ExaminationResultsView from '../views/ExaminationResultsView.vue'
import ExaminationView from '../views/ExaminationView.vue'
import FacultyMajorView from '../views/FacultyMajorView.vue'
import HelpSupportView from '../views/HelpSupportView.vue'
import LoginView from '../views/LoginView.vue'
import MyProfileView from '../views/MyProfileView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import PersonalInformationView from '../views/PersonalInformationView.vue'
import ResultsView from '../views/ResultsView.vue'
import ReviewSubmitView from '../views/ReviewSubmitView.vue'
import StudentDashboardView from '../views/StudentDashboardView.vue'

export interface RouteRecord {
  path: string
  name: string
  title: string
  component: Component
  requiresAuth?: boolean
}

const AUTH_STORAGE_KEY = 'urs_student_authenticated'
const AUTH_EMAIL_STORAGE_KEY = 'urs_student_email'

export const isStudentAuthenticated = ref<boolean>(
  typeof window !== 'undefined'
    ? window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
    : false,
)

export const authenticatedStudentEmail = ref<string>(
  typeof window !== 'undefined'
    ? window.localStorage.getItem(AUTH_EMAIL_STORAGE_KEY) || ''
    : '',
)

export function loginStudentSession(email?: string): void {
  isStudentAuthenticated.value = true
  if (email) {
    authenticatedStudentEmail.value = email
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    if (email) {
      window.localStorage.setItem(AUTH_EMAIL_STORAGE_KEY, email)
    }
  }
  navigateTo('/dashboard')
}

export function logoutStudentSession(): void {
  isStudentAuthenticated.value = false
  authenticatedStudentEmail.value = ''
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    window.localStorage.removeItem(AUTH_EMAIL_STORAGE_KEY)
  }
  navigateTo('/login')
}

/**
 * Navigates to the Student Dashboard if the student is already logged in,
 * or to the Student Login page (/login) if authentication is required first.
 */
export function navigateToStudentPortal(): void {
  if (isStudentAuthenticated.value) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    name: 'home',
    title: 'Royal University of Phnom Penh — Office of Admissions & Registration',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    title: 'About Our University — Royal University of Phnom Penh',
    component: AboutUniversityView,
  },
  {
    path: '/programs',
    name: 'programs',
    title: 'Faculties & Academic Programs — Royal University of Phnom Penh',
    component: ProgramsView,
  },
  {
    path: '/news',
    name: 'news',
    title: 'News & Announcements — Royal University of Phnom Penh',
    component: NewsView,
  },
  {
    path: '/contact',
    name: 'contact',
    title: 'Contact Us — Royal University of Phnom Penh',
    component: ContactView,
  },
  {
    path: '/apply',
    name: 'apply',
    title: 'Apply for Admission — Royal University of Phnom Penh',
    component: ApplyView,
  },
  {
    path: '/login',
    name: 'login',
    title: 'Student Portal Login — University Registration System',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    title: 'Create Student Account — University Registration System',
    component: LoginView,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    title: 'Reset Your Password — University Registration System',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    title: 'Student Dashboard — University Registration System',
    component: StudentDashboardView,
    requiresAuth: true,
  },
  {
    path: '/my-application',
    name: 'my-application',
    title: 'My Application — University Registration System',
    component: ReviewSubmitView,
    requiresAuth: true,
  },
  {
    path: '/personal-information',
    name: 'personal-information',
    title: 'Personal Information — University Registration System',
    component: PersonalInformationView,
    requiresAuth: true,
  },
  {
    path: '/academic-background',
    name: 'academic-background',
    title: 'Academic Background — University Registration System',
    component: AcademicBackgroundView,
    requiresAuth: true,
  },
  {
    path: '/faculty-major',
    name: 'faculty-major',
    title: 'Faculty & Major Selection — University Registration System',
    component: FacultyMajorView,
    requiresAuth: true,
  },
  {
    path: '/documents',
    name: 'documents',
    title: 'Document Upload — University Registration System',
    component: DocumentUploadView,
    requiresAuth: true,
  },
  {
    path: '/review-submit',
    name: 'review-submit',
    title: 'Review & Submit Application — University Registration System',
    component: ReviewSubmitView,
    requiresAuth: true,
  },
  {
    path: '/examination',
    name: 'examination',
    title: 'Entrance Examination — University Registration System',
    component: ExaminationView,
    requiresAuth: true,
  },
  {
    path: '/examination-results',
    name: 'examination-results',
    title: 'Examination Results — University Registration System',
    component: ExaminationResultsView,
    requiresAuth: true,
  },
  {
    path: '/notifications',
    name: 'notifications',
    title: 'Notifications — University Registration System',
    component: NotificationsView,
    requiresAuth: true,
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    title: 'My Profile & Settings — University Registration System',
    component: MyProfileView,
    requiresAuth: true,
  },
  {
    path: '/help-support',
    name: 'help-support',
    title: 'Help & Support — University Registration System',
    component: HelpSupportView,
    requiresAuth: true,
  },
  {
    path: '/results',
    name: 'results',
    title: 'Examination & Admission Results — Royal University of Phnom Penh',
    component: ResultsView,
  },
]

function resolveAuthorizedPath(rawPath: string): string {
  const matched = routes.find((r) => r.path === rawPath)
  if (matched?.requiresAuth && !isStudentAuthenticated.value) {
    return '/login'
  }
  return rawPath
}

const initialRawPath =
  typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
const initialPath = resolveAuthorizedPath(initialRawPath)

if (typeof window !== 'undefined' && initialPath !== initialRawPath) {
  window.history.replaceState({}, '', initialPath)
}

const currentPath = ref<string>(initialPath)
const currentHash = ref<string>(
  typeof window !== 'undefined' ? window.location.hash || '' : '',
)

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    const requestedPath = window.location.pathname || '/'
    const allowedPath = resolveAuthorizedPath(requestedPath)
    if (allowedPath !== requestedPath) {
      window.history.replaceState({}, '', allowedPath)
    }
    currentPath.value = allowedPath
    currentHash.value = window.location.hash || ''
  })
}

export function navigateTo(target: string): void {
  if (typeof window === 'undefined') return

  // Pure hash anchor on Home page
  if (target.startsWith('#')) {
    if (currentPath.value !== '/') {
      window.history.pushState({}, '', `/${target}`)
      currentPath.value = '/'
      currentHash.value = target
      setTimeout(() => scrollToSection(target), 60)
    } else {
      window.history.pushState({}, '', target)
      currentHash.value = target
      scrollToSection(target)
    }
    return
  }

  const [pathPart, hashPart] = target.split('#')
  const requestedPath = pathPart || '/'
  const normalizedPath = resolveAuthorizedPath(requestedPath)
  const normalizedHash = normalizedPath === requestedPath && hashPart ? `#${hashPart}` : ''

  window.history.pushState({}, '', `${normalizedPath}${normalizedHash}`)
  currentPath.value = normalizedPath
  currentHash.value = normalizedHash

  const matched = routes.find((r) => r.path === normalizedPath) ?? routes[0]
  if (matched) {
    document.title = matched.title
  }

  if (normalizedHash) {
    setTimeout(() => scrollToSection(normalizedHash), 60)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function useRouter() {
  return {
    routes,
    push: navigateTo,
    goHome: () => navigateTo('/'),
  }
}

export function useRoute() {
  const matchedRoute = computed<RouteRecord>(() => {
    const found = routes.find((r) => r.path === currentPath.value) ?? routes[0]!
    if (found.requiresAuth && !isStudentAuthenticated.value) {
      return routes.find((r) => r.path === '/login') ?? routes[0]!
    }
    return found
  })

  return {
    path: currentPath,
    hash: currentHash,
    matchedRoute,
  }
}
