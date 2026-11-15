<script setup lang="ts">
import type { PortalMajorProgramItem } from '../../types/admissions'

defineProps<{
  selectedProgram: PortalMajorProgramItem | null
  hasValidationError: boolean
}>()

const emit = defineEmits<{
  (e: 'clear-selection'): void
}>()
</script>

<template>
  <section
    aria-labelledby="selected-program-summary-heading"
    class="rounded-[4px] border-2 p-6 sm:p-7 transition-colors"
    :class="
      selectedProgram
        ? 'bg-[#FDF7F8] border-[#781D2B] shadow-[0_2px_10px_rgba(120,29,43,0.06)]'
        : hasValidationError
          ? 'bg-[#FEF2F2] border-[#B91C1C]'
          : 'bg-white border-[#E2E4E9]'
    "
  >
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b"
      :class="selectedProgram ? 'border-[#EBCFD4]' : 'border-[#EBECEF]'"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0"
          :class="
            selectedProgram
              ? 'bg-[#781D2B] text-white'
              : 'bg-[#F5F6F8] border border-[#E2E4E9] text-[#781D2B]'
          "
          aria-hidden="true"
        >
          <!-- Lucide CheckCircle2 or Bookmark Icon -->
          <svg
            v-if="selectedProgram"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
          <svg
            v-else
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </div>

        <div>
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            APPLICANT SELECTION SUMMARY
          </span>
          <h2
            id="selected-program-summary-heading"
            class="text-[18px] font-bold text-[#252525]"
          >
            Selected Program Summary
          </h2>
        </div>
      </div>

      <button
        v-if="selectedProgram"
        type="button"
        class="self-start sm:self-center px-3 py-1.5 rounded-[4px] text-[12px] font-semibold bg-white border border-[#781D2B] text-[#781D2B] hover:bg-[#781D2B] hover:text-white transition-colors cursor-pointer"
        @click="emit('clear-selection')"
      >
        Change / Clear Selection
      </button>
    </div>

    <!-- Populated State: When Applicant Has Selected a Program -->
    <div
      v-if="selectedProgram"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5"
    >
      <div class="bg-white border border-[#EBCFD4] rounded-[4px] p-3.5">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Selected Faculty
        </span>
        <p class="text-[14px] font-bold text-[#252525] mt-1">
          {{ selectedProgram.facultyName }}
        </p>
      </div>

      <div class="bg-white border border-[#EBCFD4] rounded-[4px] p-3.5">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Selected Major
        </span>
        <p class="text-[14px] font-bold text-[#781D2B] mt-1">
          {{ selectedProgram.name }}
        </p>
      </div>

      <div class="bg-white border border-[#EBCFD4] rounded-[4px] p-3.5">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Degree Level
        </span>
        <p class="text-[14px] font-bold text-[#252525] mt-1">
          {{ selectedProgram.degreeLevel }}
        </p>
      </div>

      <div class="bg-white border border-[#EBCFD4] rounded-[4px] p-3.5">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Study Duration
        </span>
        <p class="text-[14px] font-bold text-[#252525] mt-1">
          {{ selectedProgram.studyDuration }}
        </p>
      </div>

      <div class="bg-white border border-[#EBCFD4] rounded-[4px] p-3.5">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Study Mode
        </span>
        <p class="text-[14px] font-bold text-[#252525] mt-1">
          {{ selectedProgram.studyMode }}
        </p>
      </div>
    </div>

    <!-- Empty State: Before Applicant Selects a Program -->
    <div
      v-else
      class="mt-5 p-6 rounded-[4px] border border-dashed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      :class="
        hasValidationError
          ? 'bg-white border-[#B91C1C]'
          : 'bg-[#F5F6F8] border-[#C4C7CE]'
      "
    >
      <div class="flex items-start gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          :stroke="hasValidationError ? '#B91C1C' : '#781D2B'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <p
            class="text-[14px] font-bold"
            :class="hasValidationError ? 'text-[#B91C1C]' : 'text-[#252525]'"
          >
            No Faculty or Major Selected Yet
          </p>
          <p class="text-[13px] text-[#555555] mt-0.5">
            Please browse the academic programs above and click
            <strong class="text-[#252525]">Select Program</strong> on your preferred major to populate your application summary.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11.5px] text-[#6B7280] shrink-0">
        <span class="px-2.5 py-1 bg-white rounded-[3px] border border-[#E2E4E9]">
          Faculty: <strong class="text-[#252525]">—</strong>
        </span>
        <span class="px-2.5 py-1 bg-white rounded-[3px] border border-[#E2E4E9]">
          Major: <strong class="text-[#252525]">—</strong>
        </span>
        <span class="px-2.5 py-1 bg-white rounded-[3px] border border-[#E2E4E9]">
          Degree: <strong class="text-[#252525]">—</strong>
        </span>
      </div>
    </div>
  </section>
</template>
