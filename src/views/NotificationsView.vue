<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import NotificationDetailPanelAndDeleteModal from '../components/notifications/NotificationDetailPanelAndDeleteModal.vue'
import NotificationFiltersAndList from '../components/notifications/NotificationFiltersAndList.vue'
import NotificationHeaderAndSummaryCards from '../components/notifications/NotificationHeaderAndSummaryCards.vue'
import { createInitialPortalNotifications } from '../data/notificationsPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  PortalNotificationFilterTab,
  PortalNotificationItem,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('notifications')
const mobileSidebarOpen = ref(false)

const pageTitle = ref('Notifications')
const pageSubtitle = ref(
  'Stay updated with important university announcements and application activities.',
)
const emptyHeading = ref('No Notifications Yet')
const emptyMessage = ref('University updates will appear here.')

const notifications = ref<PortalNotificationItem[]>(createInitialPortalNotifications())
const activeCategory = ref<PortalNotificationFilterTab>('All')
const searchQuery = ref('')
const selectedNotificationId = ref<string | null>('notif-01')
const pendingDeleteItem = ref<PortalNotificationItem | null>(null)
const isEmptyDemo = ref(false)
const inlineEditEnabled = ref(false)

const totalCount = computed(() => notifications.value.length)
const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length)
const readCount = computed(() => notifications.value.filter((n) => !n.unread).length)

const filteredNotifications = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return notifications.value.filter((item) => {
    const matchesCategory =
      activeCategory.value === 'All' || item.category === activeCategory.value
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.shortDescription.toLowerCase().includes(q) ||
      item.fullMessage.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.relatedApplicationReference ?? '').toLowerCase().includes(q)

    return matchesCategory && matchesSearch
  })
})

const selectedItem = computed<PortalNotificationItem | null>(() => {
  if (isEmptyDemo.value || notifications.value.length === 0) return null
  return (
    notifications.value.find((n) => n.id === selectedNotificationId.value) ??
    notifications.value[0] ??
    null
  )
})

function handleViewDetails(item: PortalNotificationItem) {
  selectedNotificationId.value = item.id
  item.unread = false
}

function handleToggleRead(id: string) {
  const target = notifications.value.find((n) => n.id === id)
  if (!target) return
  target.unread = !target.unread
}

function handleMarkAllRead() {
  notifications.value.forEach((n) => {
    n.unread = false
  })
}

function handleRequestDelete(item: PortalNotificationItem) {
  pendingDeleteItem.value = item
}

function handleConfirmDelete() {
  if (!pendingDeleteItem.value) return
  const deletedId = pendingDeleteItem.value.id
  notifications.value = notifications.value.filter((n) => n.id !== deletedId)
  pendingDeleteItem.value = null

  if (selectedNotificationId.value === deletedId) {
    selectedNotificationId.value = notifications.value[0]?.id ?? null
  }
}

function handleRestoreSamples() {
  isEmptyDemo.value = false
  activeCategory.value = 'All'
  searchQuery.value = ''
  notifications.value = createInitialPortalNotifications()
  selectedNotificationId.value = 'notif-01'
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
    <!-- 1. Left Sidebar Navigation (Notifications highlighted as active) -->
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
        :unread-count="isEmptyDemo ? 0 : unreadCount"
        active-section-label="Notifications"
        page-title="Notifications"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Notifications' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2 & 3. Page Header + Notification Summary Cards (Total, Unread, Read) -->
        <NotificationHeaderAndSummaryCards
          v-model:page-title="pageTitle"
          v-model:page-subtitle="pageSubtitle"
          :total-count="totalCount"
          :unread-count="unreadCount"
          :read-count="readCount"
          :is-empty-demo="isEmptyDemo"
          :inline-edit-enabled="inlineEditEnabled"
          @mark-all-read="handleMarkAllRead"
          @toggle-empty-demo="isEmptyDemo = $event"
          @restore-samples="handleRestoreSamples"
          @toggle-inline-edit="inlineEditEnabled = !inlineEditEnabled"
        />

        <!-- 4, 5, 6, 7 & 8. Two-Column Desktop Layout: Filters & Notification List (8 cols) + Detail Panel (4 cols) -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <!-- Left / Main Column (8 columns): Category Filters + Search + Notification List / Empty State -->
          <div class="xl:col-span-8">
            <NotificationFiltersAndList
              :notifications="notifications"
              :filtered-notifications="filteredNotifications"
              v-model:active-category="activeCategory"
              v-model:search-query="searchQuery"
              v-model:empty-heading="emptyHeading"
              v-model:empty-message="emptyMessage"
              :selected-notification-id="selectedItem?.id ?? null"
              :is-empty-demo="isEmptyDemo"
              :inline-edit-enabled="inlineEditEnabled"
              @view-details="handleViewDetails"
              @toggle-read="handleToggleRead"
              @request-delete="handleRequestDelete"
              @restore-samples="handleRestoreSamples"
            />
          </div>

          <!-- Right Column (4 columns): Notification Detail Panel & Delete Confirmation Modal -->
          <div class="xl:col-span-4 xl:sticky xl:top-24">
            <NotificationDetailPanelAndDeleteModal
              :selected-item="selectedItem"
              :pending-delete-item="pendingDeleteItem"
              :inline-edit-enabled="inlineEditEnabled"
              @toggle-read="handleToggleRead"
              @request-delete="handleRequestDelete"
              @cancel-delete="pendingDeleteItem = null"
              @confirm-delete="handleConfirmDelete"
            />
          </div>
        </div>
      </main>

      <!-- Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
