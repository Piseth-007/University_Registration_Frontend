<script setup lang="ts">
import { reactive, ref } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import ExaminationAdmissionCardPreview from '../components/examination/ExaminationAdmissionCardPreview.vue'
import ExaminationHeaderAndStatusCard from '../components/examination/ExaminationHeaderAndStatusCard.vue'
import ExaminationScheduleAndInstructions from '../components/examination/ExaminationScheduleAndInstructions.vue'
import { createInitialExaminationPageData } from '../data/examinationPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  ExaminationPageData,
  ExaminationPageState,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('examination')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const activeState = ref<ExaminationPageState>('Scheduled')
const inlineEditEnabled = ref(false)

const pageData = reactive<ExaminationPageData>(createInitialExaminationPageData('Scheduled'))

function handleSelectState(state: ExaminationPageState) {
  activeState.value = state
  const fresh = createInitialExaminationPageData(state)
  pageData.statusCard.eligibility = fresh.statusCard.eligibility
  pageData.statusCard.status = fresh.statusCard.status
  pageData.statusCard.examinationDate = fresh.statusCard.examinationDate
  pageData.statusCard.examinationSession = fresh.statusCard.examinationSession
  pageData.statusCard.examinationCenter = fresh.statusCard.examinationCenter
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
    <!-- 1. Left Sidebar Navigation (Examination highlighted as active) -->
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
        active-section-label="Examination"
        page-title="Entrance Examination"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Examination' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2 & 3. Page Header + Examination Status Card + State Switcher -->
        <ExaminationHeaderAndStatusCard
          :page-data="pageData"
          :active-state="activeState"
          :inline-edit-enabled="inlineEditEnabled"
          @select-state="handleSelectState"
          @toggle-inline-edit="inlineEditEnabled = !inlineEditEnabled"
        />

        <!-- 4, 5 & 6. Two-Column Desktop Layout: Schedule & Instructions (8 cols) + Admission Card Preview (4 cols) -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <!-- Left / Main Column (8 columns): Examination Schedule (or Empty State) + Instructions -->
          <div class="xl:col-span-8">
            <ExaminationScheduleAndInstructions
              :page-data="pageData"
              :active-state="activeState"
              :inline-edit-enabled="inlineEditEnabled"
              @select-state="handleSelectState"
            />
          </div>

          <!-- Right Column (4 columns): Examination Admission Card Preview -->
          <div class="xl:col-span-4 xl:sticky xl:top-24">
            <ExaminationAdmissionCardPreview
              :page-data="pageData"
              :active-state="activeState"
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
