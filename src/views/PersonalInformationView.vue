<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import ApplicationStepBanner from '../components/personal-info/ApplicationStepBanner.vue'
import ContactInformationCard from '../components/personal-info/ContactInformationCard.vue'
import FamilyInformationCard from '../components/personal-info/FamilyInformationCard.vue'
import PersonalDetailsCard from '../components/personal-info/PersonalDetailsCard.vue'
import PersonalInfoFormActions from '../components/personal-info/PersonalInfoFormActions.vue'
import {
  createEmptyPersonalInfoPayload,
  personalInfoStepIndicator,
} from '../data/personalInfoPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  PersonalInformationFormPayload,
} from '../types/admissions'
import { validatePersonalInfoForm } from '../utils/helpers'

const activeSidebarId = ref<DashboardNavId>('personal-info')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const form = reactive<PersonalInformationFormPayload>(createEmptyPersonalInfoPayload())
const fieldErrors = ref<Partial<Record<keyof PersonalInformationFormPayload, string>>>({})
const previewValidation = ref(false)
const draftSavedAt = ref<string | null>(null)
const stepCompleted = ref(false)

watch(previewValidation, (enabled) => {
  if (enabled) {
    fieldErrors.value = validatePersonalInfoForm(form)
    stepCompleted.value = false
  } else {
    fieldErrors.value = {}
  }
})

const errorCount = computed(() => Object.keys(fieldErrors.value).length)

function handleUpdateField(field: keyof PersonalInformationFormPayload, value: string) {
  ;(form[field] as string) = value
  stepCompleted.value = false
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
  navigateTo('/dashboard')
}

function handleContinue() {
  const errors = validatePersonalInfoForm(form)
  fieldErrors.value = errors

  if (Object.keys(errors).length === 0) {
    stepCompleted.value = true
    const now = new Date()
    draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    navigateTo('/academic-background')
  } else {
    stepCompleted.value = false
  }
}

function handleSidebarSelect(id: DashboardNavId) {
  if (id === 'dashboard') {
    navigateTo('/dashboard')
    return
  }
  if (id === 'academic-background') {
    navigateTo('/academic-background')
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
    <!-- 1. Persistent Left Sidebar (Personal Information highlighted as active) -->
    <DashboardSidebar
      :items="dashboardSidebarItems"
      :active-id="activeSidebarId"
      :mobile-open="mobileSidebarOpen"
      @select="handleSidebarSelect"
      @close-mobile="mobileSidebarOpen = false"
      @logout="logoutStudentSession()"
    />

    <!-- Main Right Column -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Header with Page Title, Breadcrumb (Dashboard / My Application / Personal Information), Notification Icon & Student Profile -->
      <DashboardTopNav
        :student-name="dashboardStudentProfile.studentName"
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="2"
        active-section-label="Personal Information"
        page-title="Personal Information"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'My Application', route: '/my-application' },
          { label: 'Personal Information' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2. Application Progress (Step 1 of 5 — Personal Information Active) -->
        <ApplicationStepBanner
          :steps="personalInfoStepIndicator"
          :current-step-number="1"
          :preview-validation="previewValidation"
          @select-step="handleSidebarSelect"
          @toggle-validation-preview="previewValidation = !previewValidation"
        />

        <!-- Application Form Sections -->
        <form class="space-y-6" novalidate @submit.prevent="handleContinue">
          <!-- 3. Personal Details Card -->
          <PersonalDetailsCard
            :form="form"
            :errors="fieldErrors"
            @update-field="handleUpdateField"
          />

          <!-- 4. Contact Information Card -->
          <ContactInformationCard
            :form="form"
            :errors="fieldErrors"
            @update-field="handleUpdateField"
          />

          <!-- 5. Family Information Card -->
          <FamilyInformationCard
            :form="form"
            :errors="fieldErrors"
            @update-field="handleUpdateField"
          />

          <!-- 6. Form Actions (Save Draft, Previous, Continue to Academic Background) -->
          <PersonalInfoFormActions
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
