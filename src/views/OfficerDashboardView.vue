<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import OfficerHeaderStatsAndCharts from '../components/officer-dashboard/OfficerHeaderStatsAndCharts.vue'
import OfficerRecentApplicationsAndTasks from '../components/officer-dashboard/OfficerRecentApplicationsAndTasks.vue'
import OfficerSidebar from '../components/officer-dashboard/OfficerSidebar.vue'
import OfficerTopNav from '../components/officer-dashboard/OfficerTopNav.vue'
import {
  createInitialOfficerApplications,
  officerDropdownNotifications,
  officerProfileSummary,
  officerSidebarItems,
} from '../data/officerDashboardData'
import { navigateTo } from '../router'
import type {
  OfficerApplicationRecord,
  OfficerApplicationStatus,
  OfficerDashboardInteractionState,
  OfficerNavId,
  OfficerNotificationDropdownItem,
} from '../types/admissions'

const activeSidebarId = ref<OfficerNavId>('dashboard')
const mobileSidebarOpen = ref(false)
const globalSearchQuery = ref('')

const academicYear = ref('2026–2027')
const dateFilter = ref('All Intake Dates')
const activeState = ref<OfficerDashboardInteractionState>('default')

const notificationDropdownOpen = ref(false)
const profileDropdownOpen = ref(false)

const applications = ref<OfficerApplicationRecord[]>(createInitialOfficerApplications())
const notifications = ref<OfficerNotificationDropdownItem[]>(
  officerDropdownNotifications.map((n) => ({ ...n })),
)

const tableSearchQuery = ref('')
const statusFilter = ref('All')
const facultyFilter = ref('All Faculties')
const sortDirection = ref<'newest' | 'oldest'>('newest')
const currentPage = ref(1)
const pageSize = 5

const isEmptyApplicationsDemo = ref(false)
const isNoPendingTasksDemo = ref(false)
const statusActionToast = ref<string | null>(null)

const activeSectionLabel = computed(() => {
  const found = officerSidebarItems.find((item) => item.id === activeSidebarId.value)
  return found ? found.label.replace(/^\d+\.\s*/, '') : 'Admission Dashboard'
})

const filteredApplications = computed(() => {
  const combinedQuery = (
    tableSearchQuery.value.trim() || globalSearchQuery.value.trim()
  ).toLowerCase()

  const list = applications.value.filter((app) => {
    const matchesStatus =
      statusFilter.value === 'All' || app.status === statusFilter.value
    const matchesFaculty =
      facultyFilter.value === 'All Faculties' || app.faculty === facultyFilter.value
    const matchesSearch =
      !combinedQuery ||
      app.applicationId.toLowerCase().includes(combinedQuery) ||
      app.studentName.toLowerCase().includes(combinedQuery) ||
      app.faculty.toLowerCase().includes(combinedQuery) ||
      app.major.toLowerCase().includes(combinedQuery)

    return matchesStatus && matchesFaculty && matchesSearch
  })

  return [...list].sort((a, b) =>
    sortDirection.value === 'newest'
      ? b.submissionSortKey.localeCompare(a.submissionSortKey)
      : a.submissionSortKey.localeCompare(b.submissionSortKey),
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredApplications.value.length / pageSize)),
)

const paginatedApplications = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredApplications.value.slice(start, start + pageSize)
})

function handleSelectState(state: OfficerDashboardInteractionState) {
  activeState.value = state
  isEmptyApplicationsDemo.value = false
  isNoPendingTasksDemo.value = false
  notificationDropdownOpen.value = false
  profileDropdownOpen.value = false

  if (state === 'default') {
    handleResetTableFilters()
    return
  }

  if (state === 'empty-applications') {
    isEmptyApplicationsDemo.value = true
    return
  }

  if (state === 'no-pending-tasks') {
    isNoPendingTasksDemo.value = true
    return
  }

  if (state === 'filtered-table') {
    statusFilter.value = 'Need Correction'
    facultyFilter.value = 'All Faculties'
    currentPage.value = 1
    return
  }

  if (state === 'notification-dropdown') {
    notificationDropdownOpen.value = true
    return
  }

  if (state === 'profile-dropdown') {
    profileDropdownOpen.value = true
  }
}

function handleResetTableFilters() {
  isEmptyApplicationsDemo.value = false
  tableSearchQuery.value = ''
  globalSearchQuery.value = ''
  statusFilter.value = 'All'
  facultyFilter.value = 'All Faculties'
  sortDirection.value = 'newest'
  currentPage.value = 1
}

function handleUpdateRecordStatus(recordId: string, newStatus: OfficerApplicationStatus) {
  const target = applications.value.find((a) => a.id === recordId)
  if (!target) return
  target.status = newStatus
  statusActionToast.value = `Updated ${target.applicationId} (${target.studentName}) to "${newStatus}".`
}

function handleMarkAllNotificationsRead() {
  notifications.value.forEach((n) => {
    n.unread = false
  })
}

function handleSelectModule(moduleId: OfficerNavId) {
  if (moduleId === 'dashboard') {
    navigateTo('/officer-dashboard')
    return
  }
  if (moduleId === 'applications') {
    navigateTo('/officer-applications')
    return
  }
  activeSidebarId.value = moduleId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F6F8] text-[#252525] flex flex-col lg:flex-row">
    <!-- 2. Left Sidebar (1. Dashboard highlighted as active) -->
    <OfficerSidebar
      :items="officerSidebarItems"
      :active-id="activeSidebarId"
      :mobile-open="mobileSidebarOpen"
      :officer-id="officerProfileSummary.officerId"
      @select="handleSelectModule"
      @close-mobile="mobileSidebarOpen = false"
      @logout="navigateTo('/login')"
    />

    <!-- Right Content Area: Top Nav + Main Dashboard + Footer -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- 2. Top Navigation Bar -->
      <OfficerTopNav
        :officer-name="officerProfileSummary.officerName"
        :role-title="officerProfileSummary.roleTitle"
        :officer-id="officerProfileSummary.officerId"
        :avatar-initials="officerProfileSummary.avatarInitials"
        :active-section-label="activeSectionLabel"
        v-model:global-search-query="globalSearchQuery"
        :notifications="notifications"
        :notification-dropdown-open="notificationDropdownOpen"
        :profile-dropdown-open="profileDropdownOpen"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @toggle-notification-dropdown="
          notificationDropdownOpen = !notificationDropdownOpen;
          profileDropdownOpen = false
        "
        @toggle-profile-dropdown="
          profileDropdownOpen = !profileDropdownOpen;
          notificationDropdownOpen = false
        "
        @close-dropdowns="
          notificationDropdownOpen = false;
          profileDropdownOpen = false
        "
        @mark-all-notifications-read="handleMarkAllNotificationsRead"
        @select-nav="handleSelectModule"
        @logout="navigateTo('/login')"
      />

      <!-- Main Staff Administration Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- Contextual Module Notice when switching sidebar tabs (Applications, Document Verification, etc.) -->
        <div
          v-if="activeSidebarId !== 'dashboard'"
          class="bg-[#FDF7F8] border border-[#EBCFD4] rounded-[4px] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-[13px]"
        >
          <div class="flex items-center gap-2 text-[#252525]">
            <span class="w-2 h-2 rounded-full bg-[#781D2B]"></span>
            <span>
              Staff Module Active:
              <strong class="text-[#781D2B]">{{ activeSectionLabel }}</strong>
            </span>
          </div>
          <button
            type="button"
            class="text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
            @click="activeSidebarId = 'dashboard'"
          >
            Return to Admission Dashboard →
          </button>
        </div>

        <!-- Status Action Toast -->
        <div
          v-if="statusActionToast"
          role="status"
          class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[4px] px-4 py-3 flex items-center justify-between gap-3 text-[13px] text-[#166534] font-semibold"
        >
          <span>{{ statusActionToast }}</span>
          <button
            type="button"
            class="text-[12px] underline cursor-pointer"
            @click="statusActionToast = null"
          >
            Dismiss
          </button>
        </div>

        <!-- 3, 4 & 5. Dashboard Header + Application Statistics + Application Analytics Charts -->
        <OfficerHeaderStatsAndCharts
          v-model:academic-year="academicYear"
          v-model:date-filter="dateFilter"
          :active-state="activeState"
          @select-state="handleSelectState"
        />

        <!-- 6, 7, 8 & 9. Recent Applications Table + Pending Tasks + Recent Activities + Quick Actions -->
        <OfficerRecentApplicationsAndTasks
          :paginated-applications="paginatedApplications"
          :total-filtered-count="filteredApplications.length"
          :current-page="currentPage"
          :total-pages="totalPages"
          v-model:table-search-query="tableSearchQuery"
          v-model:status-filter="statusFilter"
          v-model:faculty-filter="facultyFilter"
          v-model:sort-direction="sortDirection"
          :active-state="activeState"
          :is-empty-applications-demo="isEmptyApplicationsDemo"
          :is-no-pending-tasks-demo="isNoPendingTasksDemo"
          @change-page="currentPage = $event"
          @reset-filters="handleResetTableFilters"
          @select-module="handleSelectModule"
          @update-record-status="handleUpdateRecordStatus"
        />
      </main>

      <!-- Staff Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
