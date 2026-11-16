<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import ApplicationStepBanner from '../components/personal-info/ApplicationStepBanner.vue'
import ApplicationOverviewCard from '../components/review-submit/ApplicationOverviewCard.vue'
import DeclarationAndSubmitActions from '../components/review-submit/DeclarationAndSubmitActions.vue'
import ReviewDocumentSummaryTable from '../components/review-submit/ReviewDocumentSummaryTable.vue'
import ReviewSectionSummaries from '../components/review-submit/ReviewSectionSummaries.vue'
import SubmissionConfirmationModal from '../components/review-submit/SubmissionConfirmationModal.vue'
import SubmissionSuccessScreen from '../components/review-submit/SubmissionSuccessScreen.vue'
import {
  createInitialReviewDocumentRows,
  createInitialReviewSummaryData,
  reviewSubmitStepIndicator,
} from '../data/reviewSubmitPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  ReviewApplicationSummaryData,
  ReviewDocumentStatus,
  ReviewDocumentTableRow,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('my-application')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const summaryData = reactive<ReviewApplicationSummaryData>(createInitialReviewSummaryData())
const documentRows = ref<ReviewDocumentTableRow[]>(createInitialReviewDocumentRows())

const inlineEditEnabled = ref(false)
const activeDemoState = ref<'ready' | 'missing-docs' | 'confirm-modal' | 'success'>('ready')
const previewValidation = ref(false)

const confirmAccurate = ref(false)
const agreeTerms = ref(false)
const draftSavedAt = ref<string | null>(null)
const confirmModalOpen = ref(false)
const isSubmittedSuccess = ref(false)
const previewDocumentRow = ref<ReviewDocumentTableRow | null>(null)

watch(previewValidation, (enabled) => {
  if (enabled) {
    handleSelectDemoState('missing-docs')
  } else {
    handleSelectDemoState('ready')
  }
})

const requiredDocRows = computed(() => documentRows.value.filter((d) => d.required))

const missingOrRejectedDocNames = computed(() =>
  requiredDocRows.value
    .filter((d) => d.status !== 'Uploaded')
    .map((d) => `${d.documentName} (${d.status})`),
)

const allRequiredDocsUploaded = computed(() => missingOrRejectedDocNames.value.length === 0)

const canSubmit = computed(
  () => allRequiredDocsUploaded.value && confirmAccurate.value && agreeTerms.value,
)

function handleChangeRowStatus(rowId: string, status: ReviewDocumentStatus) {
  const row = documentRows.value.find((r) => r.id === rowId)
  if (!row) return
  row.status = status
}

function handleSelectDemoState(
  state: 'ready' | 'missing-docs' | 'confirm-modal' | 'success',
) {
  activeDemoState.value = state

  if (state === 'ready') {
    isSubmittedSuccess.value = false
    confirmModalOpen.value = false
    documentRows.value = createInitialReviewDocumentRows()
    summaryData.overview.applicationStatus = 'Draft'
    summaryData.overview.submissionDate = 'Not Submitted'
    return
  }

  if (state === 'missing-docs') {
    isSubmittedSuccess.value = false
    confirmModalOpen.value = false
    const rows = createInitialReviewDocumentRows()
    if (rows[2]) rows[2].status = 'Rejected'
    if (rows[3]) rows[3].status = 'Missing'
    documentRows.value = rows
    confirmAccurate.value = false
    agreeTerms.value = false
    return
  }

  if (state === 'confirm-modal') {
    isSubmittedSuccess.value = false
    documentRows.value = createInitialReviewDocumentRows()
    confirmAccurate.value = true
    agreeTerms.value = true
    confirmModalOpen.value = true
    return
  }

  if (state === 'success') {
    confirmModalOpen.value = false
    documentRows.value = createInitialReviewDocumentRows()
    confirmAccurate.value = true
    agreeTerms.value = true
    summaryData.overview.applicationStatus = 'Submitted'
    summaryData.overview.submissionDate = '15 Nov 2026 [Illustrative]'
    isSubmittedSuccess.value = true
  }
}

function handleSaveDraft() {
  const now = new Date()
  draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function handlePrevious() {
  navigateTo('/documents')
}

function handleRequestSubmit() {
  if (!canSubmit.value) return
  confirmModalOpen.value = true
}

function handleConfirmSubmit() {
  confirmModalOpen.value = false
  const now = new Date()
  summaryData.overview.applicationStatus = 'Submitted'
  summaryData.overview.submissionDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  isSubmittedSuccess.value = true
  activeDemoState.value = 'success'
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <!-- 1. Left Sidebar Navigation (My Application highlighted as active) -->
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
        active-section-label="My Application"
        page-title="My Application — Manage & Review"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'My Application' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2. Application Progress (Step 5 of 5 — Review & Submit Active) -->
        <ApplicationStepBanner
          :steps="reviewSubmitStepIndicator"
          :current-step-number="5"
          step-title="Application Progress — Review & Submit"
          :preview-validation="previewValidation"
          @select-step="handleSidebarSelect"
          @toggle-validation-preview="previewValidation = !previewValidation"
        />

        <!-- 12. Separate Success Screen State -->
        <SubmissionSuccessScreen
          v-if="isSubmittedSuccess"
          :reference-number="summaryData.overview.referenceNumber"
          :applicant-name="summaryData.overview.applicantName"
          :academic-year="summaryData.overview.academicYear"
          :submission-date="summaryData.overview.submissionDate"
          :selected-faculty="summaryData.facultyMajor.selectedFaculty"
          :selected-major="summaryData.facultyMajor.selectedMajor"
          @view-application-status="navigateTo('/dashboard')"
          @return-dashboard="navigateTo('/dashboard')"
          @back-to-review="handleSelectDemoState('ready')"
        />

        <!-- Standard Review & Submit Content Flow -->
        <template v-else>
          <!-- 3 & 4. Page Heading + Application Overview Card -->
          <ApplicationOverviewCard
            :overview="summaryData.overview"
            :inline-edit-enabled="inlineEditEnabled"
            :active-demo-state="activeDemoState"
            @toggle-inline-edit="inlineEditEnabled = !inlineEditEnabled"
            @select-demo-state="handleSelectDemoState"
            @update-applicant-name="summaryData.overview.applicantName = $event"
          />

          <!-- 5, 6 & 7. Personal Info, Academic Background & Faculty/Major Summaries -->
          <ReviewSectionSummaries
            :summary-data="summaryData"
            :inline-edit-enabled="inlineEditEnabled"
          />

          <!-- 8. Document Summary Table -->
          <ReviewDocumentSummaryTable
            :documents="documentRows"
            @view-document="previewDocumentRow = $event"
            @change-row-status="handleChangeRowStatus"
          />

          <!-- 9 & 10. Declaration Section & Submission Actions -->
          <DeclarationAndSubmitActions
            v-model:confirm-accurate="confirmAccurate"
            v-model:agree-terms="agreeTerms"
            :all-required-docs-uploaded="allRequiredDocsUploaded"
            :missing-or-rejected-doc-names="missingOrRejectedDocNames"
            :can-submit="canSubmit"
            :draft-saved-at="draftSavedAt"
            @previous="handlePrevious"
            @save-draft="handleSaveDraft"
            @request-submit="handleRequestSubmit"
          />
        </template>
      </main>

      <!-- 11. Submission Confirmation Modal -->
      <SubmissionConfirmationModal
        :open="confirmModalOpen"
        :reference-number="summaryData.overview.referenceNumber"
        :applicant-name="summaryData.overview.applicantName"
        :selected-major="summaryData.facultyMajor.selectedMajor"
        @cancel="confirmModalOpen = false"
        @confirm-submit="handleConfirmSubmit"
      />

      <!-- Document Row View Modal -->
      <div
        v-if="previewDocumentRow"
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="previewDocumentRow = null"
      >
        <div class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[480px] w-full overflow-hidden">
          <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
            <h3 class="text-[16px] font-bold">{{ previewDocumentRow.documentName }}</h3>
            <button
              type="button"
              class="p-1 text-white/85 hover:text-white cursor-pointer"
              @click="previewDocumentRow = null"
            >
              ✕
            </button>
          </div>
          <div class="p-6 text-center space-y-2">
            <p class="text-[14px] font-bold text-[#252525]">
              {{ previewDocumentRow.uploadedFile }}
            </p>
            <p class="text-[12.5px] text-[#6B7280]">
              Type: {{ previewDocumentRow.fileType }} • Size: {{ previewDocumentRow.fileSize }} • Status: {{ previewDocumentRow.status }}
            </p>
          </div>
          <div class="px-6 py-3 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end">
            <button
              type="button"
              class="px-4 py-1.75 rounded-[4px] bg-[#781D2B] text-white text-[12.5px] font-semibold cursor-pointer"
              @click="previewDocumentRow = null"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <!-- Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
