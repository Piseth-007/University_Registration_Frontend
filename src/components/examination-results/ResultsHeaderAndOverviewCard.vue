<script setup lang="ts">
import { navigateTo } from '../../router'
import { examinationResultsViewModeOptions } from '../../data/examinationResultsPageData'
import type {
  ExaminationResultsPageData,
  ExaminationResultsViewMode,
} from '../../types/admissions'

defineProps<{
  pageData: ExaminationResultsPageData
  viewMode: ExaminationResultsViewMode
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select-mode', mode: ExaminationResultsViewMode): void
  (e: 'toggle-inline-edit'): void
}>()

function statusBadgeClasses(mode: ExaminationResultsViewMode): string {
  if (mode === 'Accepted') {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  if (mode === 'Pending') {
    return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
  return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
}

function statusDotClasses(mode: ExaminationResultsViewMode): string {
  if (mode === 'Accepted') return 'bg-[#166534]'
  if (mode === 'Pending') return 'bg-[#D97706]'
  return 'bg-[#991B1B]'
}
</script>

<template>
  <section
    aria-labelledby="examination-results-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-6"
  >
    <!-- 2. Page Header + State Switcher -->
    <div
      class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-6 border-b border-[#EBECEF]"
    >
      <div class="min-w-0 flex-1">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
          ENTRANCE EXAMINATION BOARD • ILLUSTRATIVE SAMPLE RECORD
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
          id="examination-results-heading"
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

      <!-- Interactive State & Inline Editing Controls -->
      <div class="flex flex-col sm:items-end gap-2 shrink-0">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Result State Preview
          </span>
          <button
            type="button"
            class="text-[11.5px] font-semibold text-[#781D2B] underline cursor-pointer"
            @click="emit('toggle-inline-edit')"
          >
            {{ inlineEditEnabled ? 'Lock Inline Editing' : 'Edit Sample Text & Scores' }}
          </button>
        </div>

        <div
          class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
          role="group"
          aria-label="Switch Examination Result State"
        >
          <button
            v-for="opt in examinationResultsViewModeOptions"
            :key="opt.mode"
            type="button"
            class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              viewMode === opt.mode
                ? 'bg-[#781D2B] text-white shadow-2xs'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-mode', opt.mode)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 7. Empty State ("Results Not Available Yet") -->
    <div
      v-if="viewMode === 'Empty'"
      class="bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px] py-12 px-6 sm:px-10 text-center"
    >
      <div
        class="w-16 h-16 mx-auto rounded-full bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center"
        aria-hidden="true"
      >
        <!-- Lucide Award / Clock Illustration Icon -->
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </div>

      <span
        class="inline-block mt-4 px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold uppercase tracking-[0.08em] bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
      >
        Unpublished Result State
      </span>

      <div class="mt-2.5 max-w-[520px] mx-auto">
        <input
          v-if="inlineEditEnabled"
          v-model="pageData.emptyState.heading"
          type="text"
          class="w-full text-center px-3 py-1 text-[20px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
        />
        <h2 v-else class="text-[22px] font-bold text-[#252525]">
          {{ pageData.emptyState.heading }}
        </h2>

        <textarea
          v-if="inlineEditEnabled"
          v-model="pageData.emptyState.message"
          rows="2"
          class="w-full mt-2 text-center px-3 py-1.5 text-[13.5px] text-[#555555] bg-white border border-[#781D2B] rounded-[3px]"
        ></textarea>
        <p v-else class="text-[14.5px] font-medium text-[#252525] mt-2">
          {{ pageData.emptyState.message }}
        </p>

        <p class="text-[12.5px] text-[#6B7280] mt-2 leading-relaxed">
          {{ pageData.emptyState.expectedWindowHint }}
        </p>
      </div>

      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="px-4 py-2.25 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
          @click="emit('select-mode', 'Accepted')"
        >
          <span>Preview Published Results (Sample)</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        <button
          type="button"
          class="px-4 py-2.25 rounded-[4px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[13px] font-semibold transition-colors cursor-pointer"
          @click="navigateTo('/examination')"
        >
          View Examination Schedule
        </button>
      </div>
    </div>

    <!-- 3. Result Overview Card (Displayed when viewMode !== 'Empty') -->
    <div
      v-else
      class="bg-[#FAFAFB] border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-5"
    >
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div class="flex items-center gap-2">
          <!-- Lucide Award Icon -->
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
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
          <h2 class="text-[15.5px] font-bold text-[#252525]">
            Result Overview
          </h2>
        </div>

        <span class="text-[11.5px] text-[#6B7280]">
          Illustrative sample data only — Not an official university transcript
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- 1. Application Reference Number -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Application Reference Number
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.overview.applicationReferenceNumber"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#781D2B] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[14px] font-bold text-[#781D2B] mt-1">
            {{ pageData.overview.applicationReferenceNumber }}
          </p>
        </div>

        <!-- 2. Examination Name -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Examination Name
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.overview.examinationName"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1 leading-snug">
            {{ pageData.overview.examinationName }}
          </p>
        </div>

        <!-- 3. Academic Year -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Academic Year
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.overview.academicYear"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[14px] font-bold text-[#252525] mt-1">
            {{ pageData.overview.academicYear }}
          </p>
        </div>

        <!-- 4. Result Publication Date -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Result Publication Date
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.overview.resultPublicationDate"
            type="text"
            class="w-full mt-1 px-2 py-1 text-[13px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[13.5px] font-bold text-[#252525] mt-1 leading-snug">
            {{ pageData.overview.resultPublicationDate }}
          </p>
        </div>

        <!-- 5. Overall Result Status -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Overall Result Status
          </span>
          <div class="mt-1">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.overview.overallResultStatus"
              type="text"
              class="w-full px-2 py-1 text-[12.5px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <span
              v-else
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[12px] font-bold border"
              :class="statusBadgeClasses(viewMode)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="statusDotClasses(viewMode)"
              ></span>
              <span>{{ pageData.overview.overallResultStatus }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
