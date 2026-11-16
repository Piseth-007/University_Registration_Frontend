<script setup lang="ts">
import { computed, ref } from 'vue'
import ApplicationProgressCard from '../components/dashboard/ApplicationProgressCard.vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardMainContent from '../components/dashboard/DashboardMainContent.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardSummaryCards from '../components/dashboard/DashboardSummaryCards.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import DashboardWelcomeBanner from '../components/dashboard/DashboardWelcomeBanner.vue'
import {
  dashboardAdmissionDates,
  dashboardAnnouncements,
  dashboardExamScheduleRows,
  dashboardNotifications,
  dashboardProgressSteps,
  dashboardSidebarItems,
  dashboardStudentProfile,
  dashboardSummaryCards,
  initialDashboardChecklist,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  DashboardNotificationItem,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('dashboard')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

// Editable Student Name
const studentName = ref<string>(dashboardStudentProfile.studentNamePlaceholder)

// Interactive Notifications state
const notifications = ref<DashboardNotificationItem[]>(
  dashboardNotifications.map((item) => ({ ...item })),
)

const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length)

const completionPercentage = computed(() => {
  if (initialDashboardChecklist.length === 0) return 0
  const done = initialDashboardChecklist.filter((item) => item.completed).length
  return Math.round((done / initialDashboardChecklist.length) * 100)
})

const activeSectionLabel = computed(() => {
  const found = dashboardSidebarItems.find((item) => item.id === activeSidebarId.value)
  return found?.label ?? 'Dashboard'
})

function handleMarkAllRead() {
  notifications.value.forEach((n) => {
    n.unread = false
  })
}

function handleSelectNav(id: DashboardNavId) {
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

function handleManageApplication() {
  navigateTo('/my-application')
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F6F8] text-[#252525] flex flex-col lg:flex-row">
    <!-- 1. Left Sidebar Navigation -->
    <DashboardSidebar
      :items="dashboardSidebarItems"
      :active-id="activeSidebarId"
      :mobile-open="mobileSidebarOpen"
      @select="handleSelectNav"
      @close-mobile="mobileSidebarOpen = false"
      @logout="logoutStudentSession()"
    />

    <!-- Right Content Area: Top Navigation + Main Content + Footer -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- 2. Top Navigation Bar -->
      <DashboardTopNav
        :student-name="
          studentName === '[Student Name]' ? dashboardStudentProfile.studentName : studentName
        "
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="unreadCount"
        :active-section-label="activeSectionLabel"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSelectNav"
      />

      <!-- Main Portal Workspace (Overview-Only Dashboard) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- Contextual Active Section Notice when switching non-application sidebar tabs -->
        <div
          v-if="activeSidebarId !== 'dashboard'"
          class="bg-[#FDF7F8] border border-[#EBCFD4] rounded-[4px] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-[13px]"
        >
          <div class="flex items-center gap-2 text-[#252525]">
            <span class="w-2 h-2 rounded-full bg-[#781D2B]"></span>
            <span>
              Viewing module:
              <strong class="text-[#781D2B]">{{ activeSectionLabel }}</strong>
            </span>
          </div>
          <button
            type="button"
            class="text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
            @click="activeSidebarId = 'dashboard'"
          >
            Return to Dashboard Overview →
          </button>
        </div>

        <!-- 3. Welcome Message & Student Profile Snapshot -->
        <DashboardWelcomeBanner
          v-model:student-name="studentName"
          :applicant-id="dashboardStudentProfile.applicantId"
          :avatar-initials="dashboardStudentProfile.avatarInitials"
          :academic-year="dashboardStudentProfile.academicYear"
          :admission-period="dashboardStudentProfile.admissionPeriod"
          @select-nav="handleSelectNav"
        />

        <!-- 4. Application Status Summary (4 Cards) -->
        <DashboardSummaryCards :cards="dashboardSummaryCards" />

        <!-- 5. Application Completion Progress Overview -->
        <ApplicationProgressCard
          :steps="dashboardProgressSteps"
          :completion-percentage="completionPercentage"
          @continue-application="handleManageApplication"
          @select-step="handleSelectNav"
        />

        <!-- 6. Main Overview Grid: Upcoming Examination Schedule, Latest Notifications, Important Admission Announcements & Quick Action Links -->
        <DashboardMainContent
          :exam-schedule="dashboardExamScheduleRows"
          :notifications="notifications"
          :announcements="dashboardAnnouncements"
          :admission-dates="dashboardAdmissionDates"
          :search-query="searchQuery"
          @select-nav="handleSelectNav"
          @mark-all-read="handleMarkAllRead"
        />
      </main>

      <!-- 7. Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
