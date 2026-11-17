<script setup lang="ts">
import { applicationStatusScenarios } from '../../data/applicationStatusPageData'
import type {
  ApplicationStatusTrackingPageData,
  ApplicationTimelineVisualState,
  ApplicationTrackingScenario,
} from '../../types/admissions'

defineProps<{
  pageData: ApplicationStatusTrackingPageData
  activeScenario: ApplicationTrackingScenario
  inlineEditEnabled: boolean
  actionSuccessBanner: string | null
}>()

const emit = defineEmits<{
  (e: 'select-scenario', scenario: ApplicationTrackingScenario): void
  (e: 'toggle-inline-edit'): void
  (e: 'dismiss-success'): void
}>()

function statusBadgeClasses(status: ApplicationTrackingScenario): string {
  if (status === 'Approved') {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  if (status === 'Rejected') {
    return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
  }
  if (status === 'Need Correction') {
    return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
  if (status === 'Under Review' || status === 'Resubmitted' || status === 'Submitted') {
    return 'bg-[#FDF2F4] text-[#781D2B] border-[#F2D0D6]'
  }
  return 'bg-[#F3F4F6] text-[#4B5563] border-[#D1D5DB]'
}

function timelineCardClasses(visualState: ApplicationTimelineVisualState): string {
  if (visualState === 'Completed' || visualState === 'Approved') {
    return 'bg-[#FAFAFB] border-[#BBF7D0] border-l-4 border-l-[#166534]'
  }
  if (visualState === 'In Progress') {
    return 'bg-[#FDF7F8] border-[#EBCFD4] border-l-4 border-l-[#781D2B] shadow-2xs'
  }
  if (visualState === 'Need Correction') {
    return 'bg-[#FFFBEB] border-[#FDE68A] border-l-4 border-l-[#D97706] shadow-2xs'
  }
  if (visualState === 'Rejected') {
    return 'bg-[#FEF2F2] border-[#FECACA] border-l-4 border-l-[#991B1B]'
  }
  return 'bg-white border-[#E5E7EB] border-l-4 border-l-[#D1D5DB]'
}

function timelineCircleClasses(visualState: ApplicationTimelineVisualState): string {
  if (visualState === 'Completed' || visualState === 'Approved') {
    return 'bg-[#166534] text-white'
  }
  if (visualState === 'In Progress') {
    return 'bg-[#781D2B] text-white'
  }
  if (visualState === 'Need Correction') {
    return 'bg-[#D97706] text-white'
  }
  if (visualState === 'Rejected') {
    return 'bg-[#991B1B] text-white'
  }
  return 'bg-[#F3F4F6] text-[#6B7280]'
}

function timelinePillClasses(visualState: ApplicationTimelineVisualState): string {
  if (visualState === 'Completed' || visualState === 'Approved') {
    return 'bg-[#DCFCE7] text-[#166534]'
  }
  if (visualState === 'In Progress') {
    return 'bg-[#781D2B] text-white'
  }
  if (visualState === 'Need Correction') {
    return 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
  }
  if (visualState === 'Rejected') {
    return 'bg-[#FEE2E2] text-[#991B1B]'
  }
  return 'bg-[#F3F4F6] text-[#6B7280]'
}
</script>

<template>
  <div class="space-y-6">
    <!-- 3. Page Header + 9. Status Scenario Switcher + 4. Application Summary Card -->
    <section
      aria-labelledby="application-status-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-6"
    >
      <div
        class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-6 border-b border-[#EBECEF]"
      >
        <div class="min-w-0 flex-1">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
            MY APPLICATION • ADMISSION DOSSIER TRACKER
          </span>

          <input
            v-if="inlineEditEnabled"
            v-model="pageData.pageTitle"
            type="text"
            aria-label="Page Title"
            class="w-full max-w-[420px] mt-1 px-2.5 py-1 text-[23px] sm:text-[26px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <h1
            v-else
            id="application-status-heading"
            class="text-[24px] sm:text-[28px] font-bold text-[#252525] mt-1 leading-tight"
          >
            {{ pageData.pageTitle }}
          </h1>

          <input
            v-if="inlineEditEnabled"
            v-model="pageData.pageSubtitle"
            type="text"
            aria-label="Page Subtitle"
            class="w-full max-w-[640px] mt-1.5 px-2.5 py-1 text-[13.5px] text-[#555555] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[14px] text-[#555555] mt-1.5">
            {{ pageData.pageSubtitle }}
          </p>
        </div>

        <!-- 9. Important Status Scenarios Toolbar -->
        <div class="flex flex-col sm:items-end gap-2 shrink-0">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
              Status Scenario Preview
            </span>
            <button
              type="button"
              class="text-[11.5px] font-semibold text-[#781D2B] underline cursor-pointer"
              @click="emit('toggle-inline-edit')"
            >
              {{ inlineEditEnabled ? 'Lock Inline Editing' : 'Edit Sample Text Inline' }}
            </button>
          </div>

          <div
            class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1 max-w-[680px] justify-end"
            role="group"
            aria-label="Switch Application Status Scenario"
          >
            <button
              v-for="scen in applicationStatusScenarios"
              :key="scen.id"
              type="button"
              class="px-2.5 py-1.5 text-[11px] font-semibold rounded-[3px] transition-colors cursor-pointer"
              :class="
                activeScenario === scen.id
                  ? 'bg-[#781D2B] text-white shadow-2xs'
                  : 'text-[#252525] hover:text-[#781D2B]'
              "
              @click="emit('select-scenario', scen.id)"
            >
              {{ scen.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Action Success Feedback Banner -->
      <div
        v-if="actionSuccessBanner"
        role="status"
        class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[4px] px-4 py-3.5 flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-3 text-[13.5px] text-[#166534]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span class="font-semibold">{{ actionSuccessBanner }}</span>
        </div>
        <button
          type="button"
          class="text-[12px] font-semibold text-[#166534] hover:underline cursor-pointer"
          @click="emit('dismiss-success')"
        >
          Dismiss
        </button>
      </div>

      <!-- 4. Application Summary Card -->
      <div
        class="bg-[#FAFAFB] border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-5"
      >
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="flex items-center gap-2">
            <!-- Lucide FileCheck2 Icon -->
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#781D2B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="m3 15 2 2 4-4" />
            </svg>
            <h2 class="text-[15.5px] font-bold text-[#252525]">
              Application Summary
            </h2>
          </div>

          <span class="text-[11.5px] text-[#6B7280]">
            Illustrative sample application record
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
          <!-- 1. Application Reference -->
          <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Application Reference
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.summary.applicationReference"
              type="text"
              class="w-full mt-1 px-2 py-0.5 text-[13px] font-bold text-[#781D2B] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13.5px] font-bold text-[#781D2B] mt-1">
              {{ pageData.summary.applicationReference }}
            </p>
          </div>

          <!-- 2. Applicant Name -->
          <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Applicant Name
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.summary.applicantName"
              type="text"
              class="w-full mt-1 px-2 py-0.5 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1">
              {{ pageData.summary.applicantName }}
            </p>
          </div>

          <!-- 3. Academic Year -->
          <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Academic Year
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.summary.academicYear"
              type="text"
              class="w-full mt-1 px-2 py-0.5 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1">
              {{ pageData.summary.academicYear }}
            </p>
          </div>

          <!-- 4. Selected Faculty -->
          <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Selected Faculty
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.summary.selectedFaculty"
              type="text"
              class="w-full mt-1 px-2 py-0.5 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13px] font-bold text-[#252525] mt-1 leading-snug">
              {{ pageData.summary.selectedFaculty }}
            </p>
          </div>

          <!-- 5. Selected Major -->
          <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Selected Major
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.summary.selectedMajor"
              type="text"
              class="w-full mt-1 px-2 py-0.5 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1">
              {{ pageData.summary.selectedMajor }}
            </p>
          </div>

          <!-- 6. Submission Date -->
          <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Submission Date
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.summary.submissionDate"
              type="text"
              class="w-full mt-1 px-2 py-0.5 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13px] font-bold text-[#252525] mt-1 leading-snug">
              {{ pageData.summary.submissionDate }}
            </p>
          </div>

          <!-- 7. Current Status -->
          <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Current Status
            </span>
            <div class="mt-1">
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[11.5px] font-bold border"
                :class="statusBadgeClasses(pageData.summary.currentStatus)"
              >
                <span>{{ pageData.summary.currentStatus }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Application Progress Timeline -->
    <section
      aria-labelledby="application-timeline-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EBECEF]">
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            5-STAGE ADMISSION WORKFLOW
          </span>
          <h2 id="application-timeline-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            Application Progress Timeline
          </h2>
        </div>

        <!-- Visual State Legend -->
        <div class="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534]">
            Completed / Approved
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FDF7F8] text-[#781D2B] border border-[#EBCFD4]">
            In Progress
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E]">
            Need Correction
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B]">
            Rejected
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280]">
            Pending
          </span>
        </div>
      </div>

      <!-- Horizontal 5-Column Timeline on Desktop, Vertical Stack on Mobile -->
      <ol class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <li
          v-for="step in pageData.timelineSteps"
          :key="step.stepNumber"
          class="rounded-[4px] border p-4 flex flex-col justify-between gap-3 transition-all"
          :class="timelineCardClasses(step.visualState)"
        >
          <div class="space-y-2.5">
            <!-- Top Row: Icon Circle + Status Pill -->
            <div class="flex items-center justify-between gap-2">
              <span
                class="w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center shrink-0"
                :class="timelineCircleClasses(step.visualState)"
              >
                <!-- Green Check Icon for Completed / Approved -->
                <svg
                  v-if="step.visualState === 'Completed' || step.visualState === 'Approved'"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>

                <!-- Orange Warning Icon for Need Correction -->
                <svg
                  v-else-if="step.visualState === 'Need Correction'"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>

                <!-- Red X Icon for Rejected -->
                <svg
                  v-else-if="step.visualState === 'Rejected'"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>

                <span v-else>{{ step.stepNumber }}</span>
              </span>

              <span
                class="px-2 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-[0.06em]"
                :class="timelinePillClasses(step.visualState)"
              >
                {{ step.statusLabel }}
              </span>
            </div>

            <!-- Step Title & Description -->
            <div>
              <h3 class="text-[14px] font-bold text-[#252525] leading-snug">
                {{ step.title }}
              </h3>
              <p class="text-[12px] text-[#555555] mt-1 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>

          <!-- Date / Metadata Note -->
          <div
            v-if="step.dateNote"
            class="pt-2.5 border-t border-[#E5E7EB] text-[11px] font-semibold text-[#6B7280]"
          >
            {{ step.dateNote }}
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>
