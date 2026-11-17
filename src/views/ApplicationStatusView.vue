<script setup lang="ts">
import { reactive, ref } from 'vue'
import ApplicationStatusActionsCard from '../components/application-status/ApplicationStatusActionsCard.vue'
import OfficerFeedbackAndApplicationHistory from '../components/application-status/OfficerFeedbackAndApplicationHistory.vue'
import StatusHeaderSummaryAndTimeline from '../components/application-status/StatusHeaderSummaryAndTimeline.vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import {
  buildHistoryLogsForScenario,
  buildTimelineForScenario,
  createInitialApplicationStatusData,
} from '../data/applicationStatusPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  ApplicationStatusTrackingPageData,
  ApplicationTrackingScenario,
  DashboardNavId,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('my-application')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const activeScenario = ref<ApplicationTrackingScenario>('Under Review')
const inlineEditEnabled = ref(false)
const resubmitModalOpen = ref(false)
const actionSuccessBanner = ref<string | null>(null)

const pageData = reactive<ApplicationStatusTrackingPageData>(
  createInitialApplicationStatusData('Under Review'),
)

function handleSelectScenario(scenario: ApplicationTrackingScenario) {
  activeScenario.value = scenario
  resubmitModalOpen.value = false
  actionSuccessBanner.value = null

  const fresh = createInitialApplicationStatusData(scenario)
  pageData.summary.currentStatus = fresh.summary.currentStatus
  pageData.summary.submissionDate = fresh.summary.submissionDate
  pageData.timelineSteps = buildTimelineForScenario(scenario)
  pageData.officerFeedback.hasCorrectionRequest = fresh.officerFeedback.hasCorrectionRequest
  pageData.officerFeedback.noFeedbackMessage = fresh.officerFeedback.noFeedbackMessage
  pageData.officerFeedback.uploadedReplacementFileName = ''
  pageData.historyLogs = buildHistoryLogsForScenario(scenario)
}

function handleUploadUpdatedDocument() {
  pageData.officerFeedback.uploadedReplacementFileName =
    'High_School_Certificate_BacII_Clear_Scan.pdf (1.4 MB)'
  actionSuccessBanner.value =
    'Updated High School Certificate scan attached successfully. Click "Resubmit Application" to send it to the Admission Officer.'
}

function handleDownloadSummary() {
  const now = new Date()
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  actionSuccessBanner.value = `Application Summary PDF (${pageData.summary.applicationReference}) prepared for download at ${timeStr}.`
}

function handleConfirmResubmit() {
  resubmitModalOpen.value = false
  handleSelectScenario('Resubmitted')
  actionSuccessBanner.value =
    'Your corrected document and application have been resubmitted successfully. Status updated to Resubmitted.'
}

function handleSidebarSelect(id: DashboardNavId) {
  if (id === 'dashboard') {
    navigateTo('/dashboard')
    return
  }
  if (id === 'my-application' || id === 'review-submit') {
    navigateTo('/my-application')
    return
  }
  if (id === 'application-status') {
    navigateTo('/application-status')
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
    <!-- 2. Left Sidebar Navigation (My Application highlighted as active) -->
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
      <!-- Top Navigation Bar with Breadcrumb: Student Portal / My Application / Application Status -->
      <DashboardTopNav
        :student-name="dashboardStudentProfile.studentName"
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="3"
        active-section-label="My Application"
        page-title="Application Status"
        :breadcrumb-trail="[
          { label: 'Student Portal', route: '/dashboard' },
          { label: 'My Application', route: '/my-application' },
          { label: 'Application Status' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 3, 4 & 5. Page Header + Application Summary Card + Application Progress Timeline -->
        <StatusHeaderSummaryAndTimeline
          :page-data="pageData"
          :active-scenario="activeScenario"
          :inline-edit-enabled="inlineEditEnabled"
          :action-success-banner="actionSuccessBanner"
          @select-scenario="handleSelectScenario"
          @toggle-inline-edit="inlineEditEnabled = !inlineEditEnabled"
          @dismiss-success="actionSuccessBanner = null"
        />

        <!-- 6, 7 & 8. Two-Column Desktop Layout: Officer Feedback & Application History (8 cols) + Application Actions (4 cols) -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <!-- Left / Main Column (8 columns): Officer Feedback + Application History Table -->
          <div class="xl:col-span-8">
            <OfficerFeedbackAndApplicationHistory
              :page-data="pageData"
              :active-scenario="activeScenario"
              :inline-edit-enabled="inlineEditEnabled"
              @upload-updated-document="handleUploadUpdatedDocument"
              @request-resubmit="resubmitModalOpen = true"
            />
          </div>

          <!-- Right Column (4 columns): Context-Sensitive Application Actions Card -->
          <div class="xl:col-span-4 xl:sticky xl:top-24">
            <ApplicationStatusActionsCard
              :page-data="pageData"
              :active-scenario="activeScenario"
              :resubmit-modal-open="resubmitModalOpen"
              @download-summary="handleDownloadSummary"
              @upload-corrected-documents="handleUploadUpdatedDocument"
              @open-resubmit-modal="resubmitModalOpen = true"
              @close-resubmit-modal="resubmitModalOpen = false"
              @confirm-resubmit="handleConfirmResubmit"
            />
          </div>
        </div>
      </main>

      <!-- Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
