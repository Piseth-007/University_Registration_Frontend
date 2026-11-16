<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import DashboardFooter from '../components/dashboard/DashboardFooter.vue'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardTopNav from '../components/dashboard/DashboardTopNav.vue'
import ContactUniversityAndSupportForm from '../components/help-support/ContactUniversityAndSupportForm.vue'
import HelpSearchAndFaqSection from '../components/help-support/HelpSearchAndFaqSection.vue'
import MySupportRequestsAndDetailPanel from '../components/help-support/MySupportRequestsAndDetailPanel.vue'
import {
  createInitialFaqItems,
  createInitialSupportRequestForm,
  createInitialSupportTickets,
  validateSupportRequestForm,
} from '../data/helpSupportPageData'
import {
  dashboardSidebarItems,
  dashboardStudentProfile,
} from '../data/studentDashboardData'
import { logoutStudentSession, navigateTo } from '../router'
import type {
  DashboardNavId,
  HelpFaqFilterTab,
  HelpFaqItem,
  HelpSupportInteractionState,
  SupportRequestFormState,
  SupportTicketCategory,
  SupportTicketItem,
} from '../types/admissions'

const activeSidebarId = ref<DashboardNavId>('help-support')
const mobileSidebarOpen = ref(false)
const topNavSearchQuery = ref('')

const pageTitle = ref('Help & Support')
const pageSubtitle = ref(
  'Find answers, contact the university, and get assistance with your application.',
)

const activeState = ref<HelpSupportInteractionState>('default')
const inlineEditEnabled = ref(false)

const faqItems = ref<HelpFaqItem[]>(createInitialFaqItems())
const faqSearchQuery = ref('')
const activeFaqCategory = ref<HelpFaqFilterTab>('All')
const expandedFaqIds = ref<string[]>(['faq-01', 'faq-02'])

const supportForm = reactive<SupportRequestFormState>(createInitialSupportRequestForm())
const formErrors = ref<Record<string, string>>({})
const submittedTicketId = ref<string | null>(null)

const tickets = ref<SupportTicketItem[]>(createInitialSupportTickets())
const selectedTicketId = ref<string | null>('tkt-1')
const isEmptyTicketsDemo = ref(false)

const filteredFaqs = computed(() => {
  const q = faqSearchQuery.value.trim().toLowerCase()
  return faqItems.value.filter((item) => {
    const matchesCategory =
      activeFaqCategory.value === 'All' || item.category === activeFaqCategory.value
    const matchesQuery =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(q))

    return matchesCategory && matchesQuery
  })
})

const selectedTicket = computed<SupportTicketItem | null>(() => {
  if (isEmptyTicketsDemo.value || tickets.value.length === 0) return null
  return (
    tickets.value.find((t) => t.id === selectedTicketId.value) ??
    tickets.value[0] ??
    null
  )
})

function handleToggleFaq(faqId: string) {
  if (expandedFaqIds.value.includes(faqId)) {
    expandedFaqIds.value = expandedFaqIds.value.filter((id) => id !== faqId)
  } else {
    expandedFaqIds.value = [...expandedFaqIds.value, faqId]
  }
}

function handleSelectState(state: HelpSupportInteractionState) {
  activeState.value = state
  formErrors.value = {}
  submittedTicketId.value = null
  isEmptyTicketsDemo.value = false

  if (state === 'default') {
    faqSearchQuery.value = ''
    activeFaqCategory.value = 'All'
    expandedFaqIds.value = ['faq-01', 'faq-02']
    return
  }

  if (state === 'faq-expanded') {
    faqSearchQuery.value = ''
    activeFaqCategory.value = 'All'
    expandedFaqIds.value = faqItems.value.map((f) => f.id)
    return
  }

  if (state === 'no-faq-results') {
    faqSearchQuery.value = 'Unlisted international exchange query'
    return
  }

  if (state === 'form-errors') {
    supportForm.subject = ''
    supportForm.description = 'Too short'
    formErrors.value = validateSupportRequestForm(supportForm)
    return
  }

  if (state === 'request-submitted') {
    submittedTicketId.value = 'TKT-2027-0105'
    return
  }

  if (state === 'ticket-details') {
    selectedTicketId.value = tickets.value[0]?.id ?? null
    return
  }

  if (state === 'no-tickets') {
    isEmptyTicketsDemo.value = true
  }
}

function handleSelectOfficeContact(category: SupportTicketCategory, officeName: string) {
  supportForm.category = category
  if (!supportForm.subject) {
    supportForm.subject = `Inquiry for ${officeName} — ${category}`
  }
  const el = document.getElementById('submit-support-request-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleAttachSampleFile() {
  supportForm.attachmentFileName = 'Sample_Portal_Screenshot_APP-2027-0001.png (412 KB)'
}

function handleSubmitSupportRequest() {
  const errors = validateSupportRequestForm(supportForm)
  formErrors.value = errors

  if (Object.keys(errors).length > 0) {
    activeState.value = 'form-errors'
    return
  }

  const nextNum = 105 + tickets.value.length
  const newTicketCode = `TKT-2027-0${nextNum}`
  const newTicket: SupportTicketItem = {
    id: `tkt-${Date.now()}`,
    ticketId: newTicketCode,
    subject: supportForm.subject.trim(),
    category: (supportForm.category || 'Application') as SupportTicketCategory,
    submittedDate: 'Just now [Sample]',
    status: 'Open',
    studentReference: supportForm.studentIdOrReference,
    originalMessage: supportForm.description.trim(),
    supportResponse:
      'Thank you for contacting the University Support Desk. Your request has been queued and an officer will reply shortly.',
    conversationHistory: [
      {
        id: `msg-${Date.now()}`,
        senderRole: 'Student',
        senderName: supportForm.fullName,
        timestamp: 'Just now',
        message: supportForm.description.trim(),
      },
    ],
  }

  tickets.value.unshift(newTicket)
  selectedTicketId.value = newTicket.id
  isEmptyTicketsDemo.value = false
  submittedTicketId.value = newTicketCode
  activeState.value = 'request-submitted'

  supportForm.subject = ''
  supportForm.description = ''
  supportForm.attachmentFileName = ''
}

function handleSendReply(ticketId: string, replyMessage: string) {
  const target = tickets.value.find((t) => t.id === ticketId)
  if (!target) return

  const now = new Date()
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  target.conversationHistory.push({
    id: `msg-${Date.now()}`,
    senderRole: 'Student',
    senderName: dashboardStudentProfile.studentName,
    timestamp: `Today, ${timeStr}`,
    message: replyMessage,
  })
}

function handleRestoreSampleTickets() {
  isEmptyTicketsDemo.value = false
  activeState.value = 'default'
  tickets.value = createInitialSupportTickets()
  selectedTicketId.value = tickets.value[0]?.id ?? null
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
    <!-- 2. Left Sidebar Navigation (Help & Support highlighted as active) -->
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
      <!-- Top Navigation Bar with Breadcrumb: Student Portal / Help & Support -->
      <DashboardTopNav
        :student-name="dashboardStudentProfile.studentName"
        :avatar-initials="dashboardStudentProfile.avatarInitials"
        :applicant-id="dashboardStudentProfile.applicantId"
        :unread-count="3"
        active-section-label="Help & Support"
        page-title="Help & Support"
        :breadcrumb-trail="[
          { label: 'Student Portal', route: '/dashboard' },
          { label: 'Help & Support' },
        ]"
        v-model:search-query="topNavSearchQuery"
        @open-mobile-sidebar="mobileSidebarOpen = true"
        @select-nav="handleSidebarSelect"
      />

      <!-- Main Workspace (Desktop 1440px Frame) -->
      <main class="flex-1 px-4 sm:px-7 py-6 sm:py-8 max-w-[1440px] w-full mx-auto space-y-6">
        <!-- 3, 4 & 5. Page Header + Search Help Center + FAQ Section -->
        <HelpSearchAndFaqSection
          v-model:page-title="pageTitle"
          v-model:page-subtitle="pageSubtitle"
          v-model:search-query="faqSearchQuery"
          v-model:active-category="activeFaqCategory"
          :filtered-faqus="filteredFaqs"
          :filtered-faqs="filteredFaqs"
          :expanded-faq-ids="expandedFaqIds"
          :active-state="activeState"
          :inline-edit-enabled="inlineEditEnabled"
          @toggle-faq="handleToggleFaq"
          @select-state="handleSelectState"
          @toggle-inline-edit="inlineEditEnabled = !inlineEditEnabled"
        />

        <!-- 6 & 7. Contact the University + Submit a Support Request -->
        <ContactUniversityAndSupportForm
          :support-form="supportForm"
          :form-errors="formErrors"
          :submitted-ticket-id="submittedTicketId"
          @select-office-contact="handleSelectOfficeContact"
          @attach-sample-file="handleAttachSampleFile"
          @remove-attachment="supportForm.attachmentFileName = ''"
          @submit-request="handleSubmitSupportRequest"
          @dismiss-submitted-banner="submittedTicketId = null"
        />

        <!-- 8 & 9. My Support Requests Table + Ticket Details Panel -->
        <MySupportRequestsAndDetailPanel
          :tickets="tickets"
          :selected-ticket="selectedTicket"
          :active-state="activeState"
          :is-empty-tickets-demo="isEmptyTicketsDemo"
          @select-ticket="selectedTicketId = $event.id"
          @send-reply="handleSendReply"
          @restore-sample-tickets="handleRestoreSampleTickets"
        />
      </main>

      <!-- Portal Footer -->
      <DashboardFooter />
    </div>
  </div>
</template>
