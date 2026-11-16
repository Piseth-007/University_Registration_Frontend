<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import FacultyMajorFormActions from '../components/faculty-major/FacultyMajorFormActions.vue'
import PortalFacultyCardGrid from '../components/faculty-major/PortalFacultyCardGrid.vue'
import PortalProgramSelectionList from '../components/faculty-major/PortalProgramSelectionList.vue'
import ProgramFilterBar from '../components/faculty-major/ProgramFilterBar.vue'
import SelectedProgramSummaryCard from '../components/faculty-major/SelectedProgramSummaryCard.vue'
import ApplicationStepBanner from '../components/personal-info/ApplicationStepBanner.vue'
import {
  facultyMajorStepIndicator,
  portalFacultyCards,
  portalMajorPrograms,
} from '../data/facultyMajorPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  PortalDegreeLevel,
  PortalMajorProgramItem,
  PortalStudyMode,
} from '../types/admissions'
import { filterPortalMajorPrograms } from '../utils/helpers'

const activeSidebarId = ref<DashboardNavId>('faculty-major')
const mobileSidebarOpen = ref(false)
const topNavSearchQuery = ref('')

// Filter states
const searchQuery = ref('')
const selectedFacultyId = ref('')
const selectedDegreeLevel = ref<PortalDegreeLevel | ''>('')
const selectedStudyMode = ref<PortalStudyMode | ''>('')

// Selected Academic Program state (starts empty to show clear empty state before selection)
const selectedProgram = ref<PortalMajorProgramItem | null>(null)
const validationError = ref('')
const previewValidation = ref(false)
const draftSavedAt = ref<string | null>(null)
const stepCompleted = ref(false)

watch(previewValidation, (enabled) => {
  if (enabled && !selectedProgram.value) {
    validationError.value =
      'Please select an academic faculty and major program before continuing to Step 4 (Document Upload).'
    stepCompleted.value = false
  } else {
    validationError.value = ''
  }
})

const filteredPrograms = computed(() =>
  filterPortalMajorPrograms(portalMajorPrograms, {
    searchQuery: searchQuery.value,
    facultyId: selectedFacultyId.value,
    degreeLevel: selectedDegreeLevel.value,
    studyMode: selectedStudyMode.value,
  }),
)

function handleSelectFacultyCard(facultyId: string) {
  selectedFacultyId.value = facultyId
  if (facultyId) {
    const el = document.getElementById('portal-program-selection-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

function handleSelectProgram(program: PortalMajorProgramItem) {
  if (program.available === false) return
  selectedProgram.value = program
  validationError.value = ''
  stepCompleted.value = false
}

function handleClearSelection() {
  selectedProgram.value = null
  stepCompleted.value = false
}

function handleResetFilters() {
  searchQuery.value = ''
  selectedFacultyId.value = ''
  selectedDegreeLevel.value = ''
  selectedStudyMode.value = ''
}

function handleSaveDraft() {
  const now = new Date()
  draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  stepCompleted.value = false
}

function handlePrevious() {
  navigateTo('/academic-background')
}

function handleContinue() {
  if (!selectedProgram.value) {
    validationError.value =
      'Please select an academic faculty and major program before continuing to Step 4 (Document Upload).'
    stepCompleted.value = false
    return
  }

  validationError.value = ''
  stepCompleted.value = true
  const now = new Date()
  draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  navigateTo('/documents')
}

function handleSidebarSelect(id: DashboardNavId) {
  if (id === 'dashboard') {
    navigateTo('/dashboard')
    return
  }
  if (id === 'personal-info') {
    navigateTo('/personal-information')
    return
  }
  if (id === 'academic-background') {
    navigateTo('/academic-background')
    return
  }
  if (id === 'documents') {
    navigateTo('/documents')
    return
  }
  if (id === 'my-application' || id === 'review-submit') {
    navigateTo('/my-application')
    return
  }
  if (id === 'examination') {
    navigateTo('/examination')
    return
  }
  if (id === 'results') {
    navigateTo('/examination-results')
    return
  }
  if (id === 'notifications') {
    navigateTo('/notifications')
    return
  }
  if (id === 'my-profile' || id === 'profile-settings') {
    navigateTo('/my-profile')
    return
  }
  if (id === 'help-support') {
    navigateTo('/help-support')
    return
  }
  activeSidebarId.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F6F8] text-[#252525] flex flex-col lg:flex-row">
    <!-- 1. Left Sidebar Navigation (Faculty & Major highlighted as active) -->
    <DashboardSidebar
      :items="dashboardSidebarItems"
      :active-id="activeSidebarId"
      :mobile-open="mobileSidebarOpen"
      @select="handleSidebarSelect"
      @close-mobile="mobileSidebarOpen = false"
      @logout="logoutStudentSession()"
    />

    <!-- Right Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Header with Breadcrumbs, Notifications & Student Profile -->
      <DashboardTopNav
        :student-name="dashboardStudentProfile.studentName"
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="2"
        active-section-label="Faculty & Major"
        page-title="Faculty & Major"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'My Application', route: '/my-application' },
          { label: 'Faculty & Major' },
        ]"
        v-model:search-query="topNavSearchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2. Application Progress (Step 3 of 5 — Faculty & Major Active) -->
        <ApplicationStepBanner
          :steps="facultyMajorStepIndicator"
          :current-step-number="3"
          step-title="Application Progress — Faculty & Major Selection"
          :preview-validation="previewValidation"
          @select-step="handleSidebarSelect"
          @toggle-validation-preview="previewValidation = !previewValidation"
        />

        <!-- 3 & 4. Page Heading + Program Search and Filters -->
        <ProgramFilterBar
          v-model:search-query="searchQuery"
          v-model:selected-faculty-id="selectedFacultyId"
          v-model:selected-degree-level="selectedDegreeLevel"
          v-model:selected-study-mode="selectedStudyMode"
          :total-matching-programs="filteredPrograms.length"
          @reset-filters="handleResetFilters"
        />

        <!-- 5. Faculty Cards -->
        <PortalFacultyCardGrid
          :faculties="portalFacultyCards"
          :active-faculty-id="selectedFacultyId"
          @select-faculty="handleSelectFacultyCard"
        />

        <!-- 6. Academic Program Selection -->
        <PortalProgramSelectionList
          :programs="filteredPrograms"
          :selected-program-id="selectedProgram?.id || ''"
          @select-program="handleSelectProgram"
        />

        <!-- 7. Selected Program Summary -->
        <SelectedProgramSummaryCard
          :selected-program="selectedProgram"
          :has-validation-error="Boolean(validationError)"
          @clear-selection="handleClearSelection"
        />

        <!-- 8. Form Actions -->
        <FacultyMajorFormActions
          :draft-saved-at="draftSavedAt"
          :step-completed="stepCompleted"
          :validation-error="validationError"
          @previous="handlePrevious"
          @save-draft="handleSaveDraft"
          @continue="handleContinue"
        />
      </main>

      <!-- 9. Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
