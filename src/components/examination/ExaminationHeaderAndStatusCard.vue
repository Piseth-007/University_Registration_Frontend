<script setup lang="ts">
import { navigateTo } from '../../router'
import type { ExaminationPageData, ExaminationPageState } from '../../types/admissions'
import { examinationStateOptions } from '../../data/examinationPageData'

defineProps<{
  pageData: ExaminationPageData
  activeState: ExaminationPageState
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select-state', state: ExaminationPageState): void
  (e: 'toggle-inline-edit'): void
}>()

function statusBadgeClasses(state: ExaminationPageState): string {
  if (state === 'Scheduled') {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  if (state === 'Completed') {
    return 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
  }
  if (state === 'Cancelled') {
    return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
  }
  return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
}

function statusDotClasses(state: ExaminationPageState): string {
  if (state === 'Scheduled') return 'bg-[#166534]'
  if (state === 'Completed') return 'bg-[#1E40AF]'
  if (state === 'Cancelled') return 'bg-[#991B1B]'
  return 'bg-[#D97706]'
}
</script>

<template>
  <section
    aria-labelledby="entrance-examination-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-6"
  >
    <!-- 2. Page Header + 7. Page States Switcher -->
    <div
      class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-6 border-b border-[#EBECEF]"
    >
      <div class="min-w-0 flex-1">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
          OFFICE OF ADMISSIONS &amp; NATIONAL ENTRANCE EXAMINATION
        </span>

        <input
          v-if="inlineEditEnabled"
          v-model="pageData.pageTitle"
          type="text"
          aria-label="Page Title"
          class="w-full max-w-[460px] mt-1 px-2.5 py-1 text-[23px] sm:text-[26px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
        />
        <h1
          v-else
          id="entrance-examination-heading"
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

      <!-- 7. Page States Switcher & Editable Mode Toggle -->
      <div class="flex flex-col sm:items-end gap-2 shrink-0">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Examination State Preview
          </span>
          <button
            type="button"
            class="text-[11.5px] font-semibold text-[#781D2B] underline cursor-pointer"
            @click="emit('toggle-inline-edit')"
          >
            {{ inlineEditEnabled ? 'Lock Inline Editing' : 'Edit Sample Fields Inline' }}
          </button>
        </div>

        <div
          class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
          role="group"
          aria-label="Switch Examination Page State"
        >
          <button
            v-for="opt in examinationStateOptions"
            :key="opt.state"
            type="button"
            class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activeState === opt.state
                ? 'bg-[#781D2B] text-white shadow-2xs'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-state', opt.state)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Examination Status Card -->
    <div
      class="bg-[#FAFAFB] border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-5"
    >
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div class="flex items-center gap-2">
          <!-- Lucide CalendarCheck Icon -->
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
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
            <path d="m9 16 2 2 4-4" />
          </svg>
          <h2 class="text-[15.5px] font-bold text-[#252525]">
            Examination Status Summary
          </h2>
        </div>

        <span class="text-[11.5px] text-[#6B7280]">
          Illustrative examination assignment — Sample data only
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- 1. Examination Eligibility -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Examination Eligibility
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.statusCard.eligibility"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1 leading-snug">
            {{ pageData.statusCard.eligibility }}
          </p>
        </div>

        <!-- 2. Examination Status -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Examination Status
          </span>
          <div class="mt-1">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[12px] font-bold border"
              :class="statusBadgeClasses(pageData.statusCard.status)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="statusDotClasses(pageData.statusCard.status)"
              ></span>
              <span>{{ pageData.statusCard.status }}</span>
            </span>
          </div>
        </div>

        <!-- 3. Examination Date -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Examination Date
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.statusCard.examinationDate"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#781D2B] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[13.5px] font-bold text-[#781D2B] mt-1 leading-snug">
            {{ pageData.statusCard.examinationDate }}
          </p>
        </div>

        <!-- 4. Examination Session -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Examination Session
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.statusCard.examinationSession"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1 leading-snug">
            {{ pageData.statusCard.examinationSession }}
          </p>
        </div>

        <!-- 5. Examination Center -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Examination Center
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.statusCard.examinationCenter"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1 leading-snug">
            {{ pageData.statusCard.examinationCenter }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contextual State Banner: Completed -->
    <div
      v-if="activeState === 'Completed'"
      class="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[4px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="flex items-start gap-3">
        <div
          class="w-9 h-9 rounded-[4px] bg-[#1E40AF] text-white flex items-center justify-center shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <!-- Lucide CheckCircle2 Icon -->
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <h3 class="text-[14px] font-bold text-[#1E3A8A]">
            Entrance Examination Completed — Attendance Recorded
          </h3>
          <p class="text-[12.5px] text-[#1E40AF] mt-0.5 leading-relaxed">
            Your examination attendance has been verified by the examination proctor. Official scores and admission results will be published on the Results page.
          </p>
        </div>
      </div>

      <button
        type="button"
        class="self-start sm:self-center shrink-0 px-4 py-2 rounded-[4px] bg-[#1E40AF] hover:bg-[#1E3A8A] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
        @click="navigateTo('/examination-results')"
      >
        Check Admission Results →
      </button>
    </div>

    <!-- Contextual State Banner: Cancelled -->
    <div
      v-else-if="activeState === 'Cancelled'"
      class="bg-[#FEF2F2] border border-[#FECACA] rounded-[4px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="flex items-start gap-3">
        <div
          class="w-9 h-9 rounded-[4px] bg-[#991B1B] text-white flex items-center justify-center shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <!-- Lucide AlertTriangle Icon -->
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <div>
          <h3 class="text-[14px] font-bold text-[#991B1B]">
            Examination Session Cancelled — Rescheduling in Progress
          </h3>
          <p class="text-[12.5px] text-[#7F1D1D] mt-0.5 leading-relaxed">
            This scheduled examination session has been cancelled by the Academic Senate. A revised examination date and updated Admission Card will be issued automatically to all eligible candidates.
          </p>
        </div>
      </div>

      <button
        type="button"
        class="self-start sm:self-center shrink-0 px-4 py-2 rounded-[4px] border border-[#991B1B] bg-white hover:bg-[#FEF2F2] text-[#991B1B] text-[12.5px] font-semibold transition-colors cursor-pointer"
        @click="emit('select-state', 'Scheduled')"
      >
        Restore Scheduled Preview
      </button>
    </div>
  </section>
</template>
