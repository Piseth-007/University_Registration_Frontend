<script setup lang="ts">
import { reactive, ref } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import PersonalAndContactSection from '../components/my-profile/PersonalAndContactSection.vue'
import ProfileHeaderAndSummaryCard from '../components/my-profile/ProfileHeaderAndSummaryCard.vue'
import SecurityAndPreferencesSection from '../components/my-profile/SecurityAndPreferencesSection.vue'
import {
  createInitialStudentProfileData,
  validateContactInfo,
  validatePasswordForm,
} from '../data/myProfilePageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  ChangePasswordFormState,
  DashboardNavId,
  ProfileInteractionState,
  StudentProfilePageData,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('my-profile')
const mobileSidebarOpen = ref(false)
const searchQuery = ref('')

const activeState = ref<ProfileInteractionState>('default')
const isEditingContact = ref(false)
const passwordModalOpen = ref(false)
const savedSuccessMessage = ref<string | null>(null)

const profileData = reactive<StudentProfilePageData>(createInitialStudentProfileData())
const backupContactInfo = ref({ ...profileData.contactInfo })

const contactErrors = ref<Record<string, string>>({})
const passwordErrors = ref<Record<string, string>>({})

const passwordForm = reactive<ChangePasswordFormState>({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

function handleSelectState(state: ProfileInteractionState) {
  activeState.value = state
  contactErrors.value = {}
  passwordErrors.value = {}
  passwordModalOpen.value = false
  savedSuccessMessage.value = null

  if (state === 'default') {
    isEditingContact.value = false
    profileData.personalInfo.isVerifiedIdentityLocked = true
    return
  }

  if (state === 'edit-mode') {
    backupContactInfo.value = { ...profileData.contactInfo }
    isEditingContact.value = true
    return
  }

  if (state === 'restricted') {
    isEditingContact.value = false
    profileData.personalInfo.isVerifiedIdentityLocked = true
    return
  }

  if (state === 'validation-errors') {
    isEditingContact.value = true
    contactErrors.value = {
      emailAddress: 'Please enter a valid institutional or personal email address.',
      phoneNumber: 'Phone number is required for urgent admission notices.',
    }
    passwordErrors.value = {
      currentPassword: 'Your current account password is required.',
      newPassword: 'New password must be at least 8 characters long.',
    }
    return
  }

  if (state === 'password-modal') {
    passwordModalOpen.value = true
    return
  }

  if (state === 'saved-success') {
    isEditingContact.value = false
    savedSuccessMessage.value =
      'Your profile contact details and notification preferences have been saved successfully.'
  }
}

function handleStartEditContact() {
  backupContactInfo.value = { ...profileData.contactInfo }
  isEditingContact.value = true
  activeState.value = 'edit-mode'
  contactErrors.value = {}
}

function handleCancelContact() {
  Object.assign(profileData.contactInfo, backupContactInfo.value)
  isEditingContact.value = false
  contactErrors.value = {}
  activeState.value = 'default'
}

function handleSaveContact() {
  const errors = validateContactInfo(profileData.contactInfo)
  contactErrors.value = errors

  if (Object.keys(errors).length > 0) {
    activeState.value = 'validation-errors'
    return
  }

  profileData.summary.emailAddress = profileData.contactInfo.emailAddress
  profileData.summary.phoneNumber = profileData.contactInfo.phoneNumber
  isEditingContact.value = false
  activeState.value = 'saved-success'
  savedSuccessMessage.value =
    'Your contact information has been updated and saved to your student account.'
}

function handleSubmitPasswordChange() {
  const errors = validatePasswordForm(passwordForm)
  passwordErrors.value = errors

  if (Object.keys(errors).length > 0) {
    return
  }

  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmNewPassword = ''
  passwordModalOpen.value = false
  activeState.value = 'saved-success'
  savedSuccessMessage.value =
    'Your Student Portal password has been updated successfully.'
}

function handleSavePreferences() {
  activeState.value = 'saved-success'
  savedSuccessMessage.value = `Preferences saved (${profileData.preferences.language} language & notification settings updated).`
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
    <!-- 2. Left Sidebar Navigation (My Profile highlighted as active) -->
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
      <!-- Top Navigation Bar with Breadcrumb: Student Portal / My Profile -->
      <DashboardTopNav
        :student-name="dashboardStudentProfile.studentName"
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="3"
        active-section-label="My Profile"
        page-title="My Profile & Settings"
        :breadcrumb-trail="[
          { label: 'Student Portal', route: '/dashboard' },
          { label: 'My Profile' },
        ]"
        v-model:search-query="searchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 3 & 4. Page Header + Profile Summary Card -->
        <ProfileHeaderAndSummaryCard
          :profile-data="profileData"
          :active-state="activeState"
          :is-editing-contact="isEditingContact"
          :saved-success-message="savedSuccessMessage"
          @select-state="handleSelectState"
          @start-edit-profile="handleStartEditContact"
          @dismiss-success="savedSuccessMessage = null"
        />

        <!-- 5, 6, 7 & 8. Two-Column Desktop Layout: Personal & Contact Info (8 cols) + Security & Preferences (4 cols) -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <!-- Left / Main Column (8 columns): Personal Information + Contact Information -->
          <div class="xl:col-span-8">
            <PersonalAndContactSection
              :profile-data="profileData"
              :is-editing-contact="isEditingContact"
              :contact-errors="contactErrors"
              @toggle-identity-lock="
                profileData.personalInfo.isVerifiedIdentityLocked =
                  !profileData.personalInfo.isVerifiedIdentityLocked
              "
              @start-edit-contact="handleStartEditContact"
              @save-contact="handleSaveContact"
              @cancel-contact="handleCancelContact"
            />
          </div>

          <!-- Right Column (4 columns): Security Settings + Preferences + Change Password Modal -->
          <div class="xl:col-span-4">
            <SecurityAndPreferencesSection
              :profile-data="profileData"
              :password-form="passwordForm"
              :password-errors="passwordErrors"
              :password-modal-open="passwordModalOpen"
              @open-password-modal="passwordModalOpen = true"
              @close-password-modal="passwordModalOpen = false"
              @submit-password-change="handleSubmitPasswordChange"
              @save-preferences="handleSavePreferences"
            />
          </div>
        </div>
      </main>

      <!-- Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
