<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import ApplicationDetailDrawerAndModals from '../components/officer-applications/ApplicationDetailDrawerAndModals.vue'
import ApplicationManagementHeaderAndFilters from '../components/officer-applications/ApplicationManagementHeaderAndFilters.vue'
import ApplicationsTableAndBulkToolbar from '../components/officer-applications/ApplicationsTableAndBulkToolbar.vue'
import OfficerSidebar from '../components/officer-dashboard/OfficerSidebar.vue'
import OfficerTopNav from '../components/officer-dashboard/OfficerTopNav.vue'
import { createInitialManagedApplications } from '../data/officerApplicationManagementData'
import {
  officerDropdownNotifications,
  officerProfileSummary,
  officerSidebarItems,
} from '../data/officerDashboardData'
import { navigateTo } from '../router'
import type {
  OfficerManagedApplicationRecord,
  OfficerManagementInteractionState,
  OfficerNavId,
  OfficerNotificationDropdownItem,
} from '../types/admissions'

const activeSidebarId = ref<OfficerNavId>('applications')
const mobileSidebarOpen = ref(false)
const globalSearchQuery = ref('')

const notificationDropdownOpen = ref(false)
const profileDropdownOpen = ref(false)
const notifications = ref<OfficerNotificationDropdownItem[]>(
  officerDropdownNotifications.map((n) => ({ ...n })),
)

const activeState = ref<OfficerManagementInteractionState>('default')
const actionBannerMessage = ref<string | null>(null)

const records = ref<OfficerManagedApplicationRecord[]>(createInitialManagedApplications())
const selectedIds = ref<string[]>([])
const drawerRecord = ref<OfficerManagedApplicationRecord | null>(null)

const searchQuery = ref('')
const statusFilter = ref('All Statuses')
const academicYearFilter = ref('All Years')
const facultyFilter = ref('All Faculties')
const majorFilter = ref('All Majors')
const dateRangeFilter = ref('All Submission Dates')

const sortColumn = ref<'applicationId' | 'studentName' | 'submissionDate'>('submissionDate')
const sortDirection = ref<'asc' | 'desc'>('desc')
const rowsPerPage = ref(5)
const currentPage = ref(1)

const confirmDialogOpen = ref(false)
const confirmActionTitle = ref('Confirm Application Review Completion')
const confirmActionDescription = ref('')
const pendingCompleteRecord = ref<OfficerManagedApplicationRecord | null>(null)

const filteredRecords = computed(() => {
  const q = (searchQuery.value.trim() || globalSearchQuery.value.trim()).toLowerCase()

  const list = records.value.filter((r) => {
    const matchesStatus =
      statusFilter.value === 'All Statuses' || r.status === statusFilter.value
    const matchesYear =
      academicYearFilter.value === 'All Years' ||
      r.academicYear === academicYearFilter.value
    const matchesFaculty =
      facultyFilter.value === 'All Faculties' || r.faculty === facultyFilter.value
    const matchesMajor =
      majorFilter.value === 'All Majors' || r.major === majorFilter.value

    const matchesSearch =
      !q ||
      r.applicationId.toLowerCase().includes(q) ||
      r.studentName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phoneNumber.toLowerCase().includes(q) ||
      r.faculty.toLowerCase().includes(q) ||
      r.major.toLowerCase().includes(q)

    return (
      matchesStatus &&
      matchesYear &&
      matchesFaculty &&
      matchesMajor &&
      matchesSearch
    )
  })

  return [...list].sort((a, b) => {
    const dir = sortDirection.value === 'asc' ? 1 : -1
    if (sortColumn.value === 'applicationId') {
      return a.applicationId.localeCompare(b.applicationId) * dir
    }
    if (sortColumn.value === 'studentName') {
      return a.studentName.localeCompare(b.studentName) * dir
    }
    return a.submissionSortKey.localeCompare(b.submissionSortKey) * dir
  })
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRecords.value.length / rowsPerPage.value)),
)

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return filteredRecords.value.slice(start, start + rowsPerPage.value)
})

function handleSelectState(state: OfficerManagementInteractionState) {
  activeState.value = state
  actionBannerMessage.value = null
  confirmDialogOpen.value = false
  drawerRecord.value = null
  selectedIds.value = []

  if (state === 'default') {
    handleResetFilters()
    return
  }

  if (state === 'search-filtered') {
    statusFilter.value = 'Under Review'
    currentPage.value = 1
    return
  }

  if (state === 'bulk-selected') {
    handleResetFilters()
    selectedIds.value = ['m-app-1', 'm-app-2', 'm-app-3']
    return
  }

  if (state === 'detail-drawer') {
    drawerRecord.value = records.value[0] ?? null
    return
  }

  if (state === 'confirm-dialog') {
    const first = records.value[0] ?? null
    pendingCompleteRecord.value = first
    confirmActionTitle.value = 'Mark Application Review Complete?'
    confirmActionDescription.value = `Confirm that document and identity verification for ${first?.applicationId ?? 'APP-2026-00125'} (${first?.studentName ?? 'Sample Student A'}) is complete and ready to forward to the Admission Decisions module?`
    confirmDialogOpen.value = true
    return
  }

  if (state === 'action-success') {
    actionBannerMessage.value =
      'Application status and officer assignment updated successfully.'
  }
}

function handleResetFilters() {
  searchQuery.value = ''
  globalSearchQuery.value = ''
  statusFilter.value = 'All Statuses'
  academicYearFilter.value = 'All Years'
  facultyFilter.value = 'All Faculties'
  majorFilter.value = 'All Majors'
  dateRangeFilter.value = 'All Submission Dates'
  currentPage.value = 1
  if (activeState.value === 'no-results') {
    activeState.value = 'default'
  }
}

function handleToggleSelect(id: string) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
  } else {
    selectedIds.value = [...selectedIds.value, id]
  }
}

function handleToggleSelectAll() {
  const pageIds = paginatedRecords.value.map((r) => r.id)
  const allSelected = pageIds.every((id) => selectedIds.value.includes(id))
  if (allSelected) {
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id))
  } else {
    const merged = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(merged)
  }
}

function handleBulkAssignOfficer(officerName: string) {
  const count = selectedIds.value.length
  records.value.forEach((r) => {
    if (selectedIds.value.includes(r.id)) {
      r.assignedOfficer = officerName
    }
  })
  actionBannerMessage.value = `Assigned ${count} selected application(s) to ${officerName}.`
  selectedIds.value = []
}

function handleBulkExport() {
  actionBannerMessage.value = `Exported ${selectedIds.value.length} selected application record(s) to CSV (Sample Export).`
}

function handleExportAll() {
  actionBannerMessage.value = `Exported ${filteredRecords.value.length} filtered application record(s) to CSV (Sample Export).`
}

function handleSortBy(col: 'applicationId' | 'studentName' | 'submissionDate') {
  if (sortColumn.value === col) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = col
    sortDirection.value = 'asc'
  }
}

function handleStartReview(record: OfficerManagedApplicationRecord) {
  record.status = 'Under Review'
  if (record.assignedOfficer === 'Unassigned') {
    record.assignedOfficer = 'Sokha Meas (Senior Officer)'
  }
  record.applicationHistory.unshift({
    dateTime: 'Just now [Sample]',
    activity: 'Officer started application review',
    actor: officerProfileSummary.officerName,
  })
  actionBannerMessage.value = `Started review for ${record.applicationId} (${record.studentName}).`
}

function handleAssignOfficer(
  record: OfficerManagedApplicationRecord,
  officerName: string,
) {
  record.assignedOfficer = officerName
  record.applicationHistory.unshift({
    dateTime: 'Just now [Sample]',
    activity: `Assigned to ${officerName}`,
    actor: officerProfileSummary.officerName,
  })
  actionBannerMessage.value = `${record.applicationId} assigned to ${officerName}.`
}

function handleSubmitCorrectionRequest(
  record: OfficerManagedApplicationRecord,
  reason: string,
  requiredUpdate: string,
) {
  record.status = 'Need Correction'
  record.applicationHistory.unshift({
    dateTime: 'Just now [Sample]',
    activity: `Correction requested: ${reason} (${requiredUpdate})`,
    actor: officerProfileSummary.officerName,
  })
  actionBannerMessage.value = `Correction request sent to ${record.studentName} (${record.applicationId}).`
}

function handleRequestMarkComplete(record: OfficerManagedApplicationRecord) {
  pendingCompleteRecord.value = record
  confirmActionTitle.value = 'Mark Application Review Complete?'
  confirmActionDescription.value = `Confirm that initial officer verification for ${record.applicationId} (${record.studentName}) is complete and ready to forward to the Admission Decisions committee?`
  confirmDialogOpen.value = true
}

function handleConfirmAction() {
  if (pendingCompleteRecord.value) {
    pendingCompleteRecord.value.status = 'Under Review'
    pendingCompleteRecord.value.applicationHistory.unshift({
      dateTime: 'Just now [Sample]',
      activity: 'Officer verification marked complete — forwarded to Admission Decisions',
      actor: officerProfileSummary.officerName,
    })
    actionBannerMessage.value = `Marked review complete for ${pendingCompleteRecord.value.applicationId} and forwarded to Admission Decisions.`
  }
  confirmDialogOpen.value = false
  pendingCompleteRecord.value = null
}

function handleQuickAction(
  record: OfficerManagedApplicationRecord,
  action: 'start-review' | 'assign' | 'request-correction' | 'mark-complete' | 'history',
) {
  if (action === 'start-review') {
    handleStartReview(record)
    return
  }
  if (action === 'mark-complete') {
    handleRequestMarkComplete(record)
    return
  }
  drawerRecord.value = record
}

function handleSelectSidebarModule(id: OfficerNavId) {
  if (id === 'dashboard') {
    navigateTo('/officer-dashboard')
    return
  }
  if (id === 'applications') {
    navigateTo('/officer-applications')
    return
  }
  activeSidebarId.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F6F8] text-[#252525] flex flex-col lg:flex-row">
    <!-- 2. Staff Sidebar Navigation (2. Applications highlighted as active) -->
    <OfficerSidebar
      :items="officerSidebarItems"
      :active-id="activeSidebarId"
      :mobile-open="mobileSidebarOpen"
      :officer-id="officerProfileSummary.officerId"
      @select="handleSelectSidebarModule"
      @close-mobile="mobileSidebarOpen = false"
      @logout="navigateTo('/login')"
    />

    <!-- Right Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Navigation Bar -->
      <OfficerTopNav
        :officer-name="officerProfileSummary.officerName"
        :role-title="officerProfileSummary.roleTitle"
        :officer-id="officerProfileSummary.officerId"
        :avatar-initials="officerProfileSummary.avatarInitials"
        active-section-label="Applications"
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
        @mark-all-notifications-read="
          notifications.forEach((n) => {
            n.unread = false
          })
        "
        @select-nav="handleSelectSidebarModule"
        @logout="navigateTo('/login')"
      />

      <!-- Main Staff Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 3, 4 & 5. Page Header + 4 Summary Cards + Search and Filter Toolbar -->
        <ApplicationManagementHeaderAndFilters
          v-model:search-query="searchQuery"
          v-model:status-filter="statusFilter"
          v-model:academic-year-filter="academicYearFilter"
          v-model:faculty-filter="facultyFilter"
          v-model:major-filter="majorFilter"
          v-model:date-range-filter="dateRangeFilter"
          :active-state="activeState"
          :action-banner-message="actionBannerMessage"
          @apply-filters="currentPage = 1"
          @reset-filters="handleResetFilters"
          @export-all="handleExportAll"
          @select-state="handleSelectState"
          @dismiss-banner="actionBannerMessage = null"
        />

        <!-- 6 & 7. Bulk Actions Toolbar + All Applications Table -->
        <ApplicationsTableAndBulkToolbar
          :paginated-applications="paginatedRecords"
          :total-filtered-count="filteredRecords.length"
          :selected-ids="selectedIds"
          :current-page="currentPage"
          :total-pages="totalPages"
          v-model:rows-per-page="rowsPerPage"
          :sort-column="sortColumn"
          :sort-direction="sortDirection"
          :active-state="activeState"
          @toggle-select="handleToggleSelect"
          @toggle-select-all="handleToggleSelectAll"
          @clear-selection="selectedIds = []"
          @bulk-assign-officer="handleBulkAssignOfficer"
          @bulk-export="handleBulkExport"
          @sort-by="handleSortBy"
          @change-page="currentPage = $event"
          @open-detail-drawer="drawerRecord = $event"
          @quick-action="handleQuickAction"
          @reset-filters="handleResetFilters"
        />

        <!-- 8, 9 & 10. Application Detail Drawer + Review Actions + Confirmation Dialog -->
        <ApplicationDetailDrawerAndModals
          :drawer-record="drawerRecord"
          :confirm-dialog-open="confirmDialogOpen"
          :confirm-action-title="confirmActionTitle"
          :confirm-action-description="confirmActionDescription"
          @close-drawer="drawerRecord = null"
          @start-review="handleStartReview"
          @assign-officer="handleAssignOfficer"
          @submit-correction-request="handleSubmitCorrectionRequest"
          @request-mark-complete="handleRequestMarkComplete"
          @cancel-confirm="confirmDialogOpen = false"
          @confirm-action="handleConfirmAction"
        />
      </main>

      <!-- Staff Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
