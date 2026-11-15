<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import AcademicBackgroundFormActions from '../components/academic-background/AcademicBackgroundFormActions.vue'
import HighSchoolExaminationCard from '../components/academic-background/HighSchoolExaminationCard.vue'
import HighSchoolInformationCard from '../components/academic-background/HighSchoolInformationCard.vue'
import PreviousEducationCard from '../components/academic-background/PreviousEducationCard.vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import ApplicationStepBanner from '../components/personal-info/ApplicationStepBanner.vue'
import {
  academicBackgroundStepIndicator,
  createEmptyAcademicBackgroundPayload,
} from '../data/academicBackgroundPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  AcademicBackgroundFormPayload,
  DashboardNavId,
} from '../types/admissions'
import { validateAcademicBackgroundForm } from '../utils/helpers'

const activeSidebarId = ref<DashboardNavId>('academic-background')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const form = reactive<AcademicBackgroundFormPayload>(createEmptyAcademicBackgroundPayload())
const fieldErrors = ref<Partial<Record<keyof AcademicBackgroundFormPayload, string>>>({})
const previewValidation = ref(false)
const draftSavedAt = ref<string | null>(null)
const stepCompleted = ref(false)

watch(previewValidation, (enabled) => {
  if (enabled) {
    fieldErrors.value = validateAcademicBackgroundForm(form)
    stepCompleted.value = false
  } else {
    fieldErrors.value = {}
  }
})

const errorCount = computed(() => Object.keys(fieldErrors.value).length)

function handleUpdateField(field: keyof AcademicBackgroundFormPayload, value: string) {
  ;(form[field] as string) = value
  stepCompleted.value = false

  // When switching Examination Status away from 'Passed', clear conditional errors
  if (field === 'examinationStatus' && value !== 'Passed') {
    const next = { ...fieldErrors.value }
    delete next.candidateNumber
    delete next.totalExaminationScore
    delete next.gradeResult
    fieldErrors.value = next
  }

  if (fieldErrors.value[field]) {
    const next = { ...fieldErrors.value }
    delete next[field]
    fieldErrors.value = next
  }
}

function handleSaveDraft() {
  const now = new Date()
  draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  stepCompleted.value = false
}

function handlePrevious() {
  navigateTo('/personal-information')
}

function handleContinue() {
  const errors = validateAcademicBackgroundForm(form)
  fieldErrors.value = errors

  if (Object.keys(errors).length === 0) {
    stepCompleted.value = true
    const now = new Date()
    draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    navigateTo('/faculty-major')
  } else {
    stepCompleted.value = false
  }
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
  if (id === 'faculty-major') {
    navigateTo('/faculty-major')
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
  if (id === 'results') {
    navigateTo('/results')
    return
  }
  activeSidebarId.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F6F8] text-[#252525] flex flex-col lg:flex-row">
    <!-- 1. Left Sidebar Navigation (Academic Background highlighted) -->
    <DashboardSidebar
      :items="dashboardSidebarItems"
      :active-id="activeSidebarId"
      :mobile-open="mobileSidebarOpen"
      @select="handleSidebarSelect"
      @close-mobile="mobileSidebarOpen = false"
      @logout="logoutStudentSession()"
    />

    <!-- Main Right Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Navigation with Breadcrumbs, Notifications & Student Profile -->
      <DashboardTopNav
        :student-name="dashboardStudentProfile.studentName"
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="2"
        active-section-label="Academic Background"
        page-title="Academic Background"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'My Application', route: '/my-application' },
          { label: 'Academic Background' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2. Application Progress (Step 2 of 5 — Academic Background Active) -->
        <ApplicationStepBanner
          :steps="academicBackgroundStepIndicator"
          :current-step-number="2"
          step-title="Application Progress — Academic Background"
          :preview-validation="previewValidation"
          @select-step="handleSidebarSelect"
          @toggle-validation-preview="previewValidation = !previewValidation"
        />

        <!-- Academic Background Form Sections -->
        <form class="space-y-6" novalidate @submit.prevent="handleContinue">
          <!-- 3. High School Information Card -->
          <HighSchoolInformationCard
            :form="form"
            :errors="fieldErrors"
            @update-field="handleUpdateField"
          />

          <!-- 4. High School Examination Card -->
          <HighSchoolExaminationCard
            :form="form"
            :errors="fieldErrors"
            @update-field="handleUpdateField"
          />

          <!-- 5. Previous Education Card -->
          <PreviousEducationCard
            :form="form"
            :errors="fieldErrors"
            @update-field="handleUpdateField"
          />

          <!-- 6. Form Actions (Save Draft, Previous, Continue to Faculty & Major) -->
          <AcademicBackgroundFormActions
            :draft-saved-at="draftSavedAt"
            :step-completed="stepCompleted"
            :error-count="errorCount"
            @save-draft="handleSaveDraft"
            @previous="handlePrevious"
            @continue="handleContinue"
          />
        </form>
      </main>

      <!-- 7. Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
