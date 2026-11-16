<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import DocumentPreviewModal from '../components/document-upload/DocumentPreviewModal.vue'
import DocumentUploadFormActions from '../components/document-upload/DocumentUploadFormActions.vue'
import DocumentUploadSlotCard from '../components/document-upload/DocumentUploadSlotCard.vue'
import DocumentUploadSummaryCard from '../components/document-upload/DocumentUploadSummaryCard.vue'
import ApplicationStepBanner from '../components/personal-info/ApplicationStepBanner.vue'
import {
  createInitialDocumentSlots,
  documentUploadStepIndicator,
} from '../data/documentUploadPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  DocumentUploadStatus,
  PortalDocumentSlotItem,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('documents')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const documentSlots = ref<PortalDocumentSlotItem[]>(createInitialDocumentSlots())
const activePreset = ref<'empty' | 'mixed' | 'complete'>('empty')
const previewValidation = ref(false)
const draftSavedAt = ref<string | null>(null)
const stepCompleted = ref(false)
const previewModalItem = ref<PortalDocumentSlotItem | null>(null)

// Required documents summary calculations
const requiredSlots = computed(() =>
  documentSlots.value.filter((item) => item.required),
)

const requiredTotal = computed(() => requiredSlots.value.length)

const uploadedRequiredCount = computed(
  () => requiredSlots.value.filter((item) => item.status === 'Uploaded').length,
)

const remainingRequiredCount = computed(
  () => requiredTotal.value - uploadedRequiredCount.value,
)

const overallProgressPercentage = computed(() => {
  if (requiredTotal.value === 0) return 0
  return Math.round((uploadedRequiredCount.value / requiredTotal.value) * 100)
})

const allRequiredUploaded = computed(() => remainingRequiredCount.value === 0)

const missingRequiredTitles = computed(() =>
  requiredSlots.value
    .filter((item) => item.status !== 'Uploaded')
    .map((item) => item.title),
)

watch(previewValidation, (enabled) => {
  if (enabled) {
    handleApplyPreset('mixed')
  } else {
    handleApplyPreset('empty')
  }
})

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function handleUploadFile(slotId: string, file?: File) {
  const target = documentSlots.value.find((item) => item.id === slotId)
  if (!target) return

  stepCompleted.value = false

  // Simulate progressive upload state -> Uploaded
  target.status = 'Uploading'
  target.uploadProgress = 65
  target.uploadedFileName = file ? file.name : target.sampleFileName
  target.uploadedFileSize = file ? formatFileSize(file.size) : target.sampleFileSize

  setTimeout(() => {
    target.status = 'Uploaded'
    target.uploadProgress = 100
  }, 350)
}

function handleRemoveFile(slotId: string) {
  const target = documentSlots.value.find((item) => item.id === slotId)
  if (!target) return

  stepCompleted.value = false
  target.status = 'Missing'
  target.uploadProgress = 0
  target.uploadedFileName = ''
  target.uploadedFileSize = ''
}

function handleSetStatus(slotId: string, status: DocumentUploadStatus) {
  const target = documentSlots.value.find((item) => item.id === slotId)
  if (!target) return

  stepCompleted.value = false
  target.status = status

  if (status === 'Missing') {
    target.uploadProgress = 0
    target.uploadedFileName = ''
    target.uploadedFileSize = ''
  } else if (status === 'Uploading') {
    target.uploadProgress = 58
    target.uploadedFileName = target.uploadedFileName || target.sampleFileName
    target.uploadedFileSize = target.uploadedFileSize || target.sampleFileSize
  } else if (status === 'Uploaded') {
    target.uploadProgress = 100
    target.uploadedFileName = target.uploadedFileName || target.sampleFileName
    target.uploadedFileSize = target.uploadedFileSize || target.sampleFileSize
  } else if (status === 'Rejected') {
    target.uploadProgress = 100
    target.uploadedFileName = target.uploadedFileName || target.sampleFileName
    target.uploadedFileSize = target.uploadedFileSize || target.sampleFileSize
  }
}

function handleApplyPreset(preset: 'empty' | 'mixed' | 'complete') {
  activePreset.value = preset
  stepCompleted.value = false

  if (preset === 'empty') {
    documentSlots.value = createInitialDocumentSlots()
    return
  }

  if (preset === 'mixed') {
    const fresh = createInitialDocumentSlots()
    // 1. Portrait Photo -> Uploaded (Green)
    if (fresh[0]) {
      fresh[0].status = 'Uploaded'
      fresh[0].uploadProgress = 100
      fresh[0].uploadedFileName = fresh[0].sampleFileName
      fresh[0].uploadedFileSize = fresh[0].sampleFileSize
    }
    // 2. National ID Card -> Uploading (Orange)
    if (fresh[1]) {
      fresh[1].status = 'Uploading'
      fresh[1].uploadProgress = 64
      fresh[1].uploadedFileName = fresh[1].sampleFileName
      fresh[1].uploadedFileSize = fresh[1].sampleFileSize
    }
    // 3. High School Certificate -> Rejected (Red)
    if (fresh[2]) {
      fresh[2].status = 'Rejected'
      fresh[2].uploadProgress = 100
      fresh[2].uploadedFileName = fresh[2].sampleFileName
      fresh[2].uploadedFileSize = fresh[2].sampleFileSize
    }
    // 4. High School Examination Result -> Missing (Neutral)
    if (fresh[3]) {
      fresh[3].status = 'Missing'
      fresh[3].uploadProgress = 0
    }
    // 5. Birth Certificate (Optional) -> Uploaded
    if (fresh[4]) {
      fresh[4].status = 'Uploaded'
      fresh[4].uploadProgress = 100
      fresh[4].uploadedFileName = fresh[4].sampleFileName
      fresh[4].uploadedFileSize = fresh[4].sampleFileSize
    }
    documentSlots.value = fresh
    return
  }

  if (preset === 'complete') {
    const fresh = createInitialDocumentSlots()
    fresh.forEach((slot) => {
      if (slot.required) {
        slot.status = 'Uploaded'
        slot.uploadProgress = 100
        slot.uploadedFileName = slot.sampleFileName
        slot.uploadedFileSize = slot.sampleFileSize
      }
    })
    documentSlots.value = fresh
  }
}

function handleSaveDraft() {
  const now = new Date()
  draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  stepCompleted.value = false
}

function handlePrevious() {
  navigateTo('/faculty-major')
}

function handleContinue() {
  if (!allRequiredUploaded.value) return
  stepCompleted.value = true
  const now = new Date()
  draftSavedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  navigateTo('/review-submit')
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
    <!-- 1. Left Sidebar Navigation (Documents highlighted as active) -->
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
        active-section-label="Documents"
        page-title="Document Upload"
        :breadcrumb-trail="[
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'My Application', route: '/my-application' },
          { label: 'Document Upload' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 2. Application Progress (Step 4 of 5 — Document Upload Active) -->
        <ApplicationStepBanner
          :steps="documentUploadStepIndicator"
          :current-step-number="4"
          step-title="Application Progress — Document Upload"
          :preview-validation="previewValidation"
          @select-step="handleSidebarSelect"
          @toggle-validation-preview="previewValidation = !previewValidation"
        />

        <!-- 3 & 6. Page Heading + Upload Summary Card -->
        <DocumentUploadSummaryCard
          :required-total="requiredTotal"
          :uploaded-required-count="uploadedRequiredCount"
          :remaining-required-count="remainingRequiredCount"
          :overall-progress-percentage="overallProgressPercentage"
          :active-preset="activePreset"
          @apply-preset="handleApplyPreset"
        />

        <!-- 4 & 5. Individual Document Upload Cards Grid -->
        <section aria-label="Document Upload Cards" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DocumentUploadSlotCard
            v-for="slot in documentSlots"
            :key="slot.id"
            :slot-item="slot"
            @upload-file="handleUploadFile"
            @remove-file="handleRemoveFile"
            @preview-file="previewModalItem = $event"
            @set-status="handleSetStatus"
          />
        </section>

        <!-- 7. Form Actions -->
        <DocumentUploadFormActions
          :all-required-uploaded="allRequiredUploaded"
          :missing-required-titles="missingRequiredTitles"
          :draft-saved-at="draftSavedAt"
          :step-completed="stepCompleted"
          @previous="handlePrevious"
          @save-draft="handleSaveDraft"
          @continue="handleContinue"
        />
      </main>

      <!-- Document Preview Modal -->
      <DocumentPreviewModal
        :item="previewModalItem"
        @close="previewModalItem = null"
      />

      <!-- 8. Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
