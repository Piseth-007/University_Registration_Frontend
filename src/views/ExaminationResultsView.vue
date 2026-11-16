<script setup lang="ts">
import { reactive, ref } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import ExaminationScoreTableAndDecision from '../components/examination-results/ExaminationScoreTableAndDecision.vue'
import ResultSlipPreviewCard from '../components/examination-results/ResultSlipPreviewCard.vue'
import ResultsHeaderAndOverviewCard from '../components/examination-results/ResultsHeaderAndOverviewCard.vue'
import { createInitialExaminationResultsPageData } from '../data/examinationResultsPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  AdmissionDecisionState,
  DashboardNavId,
  ExaminationResultsPageData,
  ExaminationResultsViewMode,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('results')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const viewMode = ref<ExaminationResultsViewMode>('Accepted')
const inlineEditEnabled = ref(false)

const pageData = reactive<ExaminationResultsPageData>(
  createInitialExaminationResultsPageData('Accepted'),
)

function handleSelectMode(mode: ExaminationResultsViewMode) {
  viewMode.value = mode
  if (mode === 'Empty') {
    return
  }
  applyDecisionStatePreset(mode)
}

function applyDecisionStatePreset(state: AdmissionDecisionState) {
  viewMode.value = state
  const fresh = createInitialExaminationResultsPageData(state)
  pageData.overview.resultPublicationDate = fresh.overview.resultPublicationDate
  pageData.overview.overallResultStatus = fresh.overview.overallResultStatus
  pageData.scores = fresh.scores.map((s) => ({ ...s }))
  pageData.overallGradeLabel = fresh.overallGradeLabel
  pageData.decision.state = fresh.decision.state
  pageData.resultSlip.officialResultLabel = fresh.resultSlip.officialResultLabel
  pageData.resultSlip.publicationDate = fresh.resultSlip.publicationDate
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
    <!-- 1. Left Sidebar Navigation (Results highlighted as active) -->
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
      <!-- Top Navigation with Breadcrumbs, Notifications & Student Profile -->
      <DashboardTopNav
        :student-name="dashboardStudentProfile.studentName"
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="2"
        active-section-label="Results"
        page-title="Examination Results"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Results' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2, 3 & 7. Page Header + Result Overview Card + Empty State -->
        <ResultsHeaderAndOverviewCard
          :page-data="pageData"
          :view-mode="viewMode"
          :inline-edit-enabled="inlineEditEnabled"
          @select-mode="handleSelectMode"
          @toggle-inline-edit="inlineEditEnabled = !inlineEditEnabled"
        />

        <!-- 4, 5 & 6. Two-Column Desktop Layout when Results are Published / In Review -->
        <div
          v-if="viewMode !== 'Empty'"
          class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
        >
          <!-- Left / Main Column (8 columns): Examination Score Table + Admission Decision -->
          <div class="xl:col-span-8">
            <ExaminationScoreTableAndDecision
              :page-data="pageData"
              :inline-edit-enabled="inlineEditEnabled"
              @select-decision-state="applyDecisionStatePreset"
            />
          </div>

          <!-- Right Column (4 columns): Downloadable Result Slip Preview -->
          <div class="xl:col-span-4 xl:sticky xl:top-24">
            <ResultSlipPreviewCard
              :page-data="pageData"
              :inline-edit-enabled="inlineEditEnabled"
            />
          </div>
        </div>
      </main>

      <!-- Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
