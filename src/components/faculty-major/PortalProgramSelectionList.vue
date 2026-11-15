<script setup lang="ts">
import type { PortalMajorProgramItem } from '../../types/admissions'

defineProps<{
  programs: PortalMajorProgramItem[]
  selectedProgramId: string
}>()

const emit = defineEmits<{
  (e: 'select-program', program: PortalMajorProgramItem): void
}>()
</script>

<template>
  <section
    id="portal-program-selection-section"
    aria-labelledby="academic-program-selection-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <div class="pb-5 mb-6 border-b border-[#EBECEF]">
      <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
        DEGREE PROGRAMS
      </span>
      <h2
        id="academic-program-selection-heading"
        class="text-[18px] font-bold text-[#252525] mt-0.5"
      >
        Academic Program Selection
      </h2>
      <p class="text-[13px] text-[#555555] mt-0.5">
        Review available majors below and click <strong class="text-[#252525]">Select Program</strong> to assign your primary degree choice.
      </p>
    </div>

    <!-- 6. Academic Program Selection Cards Grid (2 columns on desktop, 1 on mobile) -->
    <div
      v-if="programs.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      <article
        v-for="program in programs"
        :key="program.id"
        class="rounded-[4px] border p-5 flex flex-col justify-between gap-4 transition-all"
        :class="
          selectedProgramId === program.id
            ? 'border-2 border-[#781D2B] bg-[#FDF7F8]/60 shadow-xs'
            : program.available === false
              ? 'border-[#E5E7EB] bg-[#FAFAFB] opacity-75'
              : 'border-[#E2E4E9] bg-white hover:border-[#781D2B]'
        "
      >
        <div>
          <!-- Top Metadata Badges: Faculty + Degree Level -->
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span
              class="text-[11px] font-bold uppercase tracking-[0.07em] px-2.5 py-0.5 rounded-[3px] bg-[#F5F6F8] text-[#781D2B] border border-[#E2E4E9]"
            >
              {{ program.facultyName }}
            </span>

            <span
              v-if="selectedProgramId === program.id"
              class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-[3px] bg-[#781D2B] text-white"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Selected Major</span>
            </span>
          </div>

          <!-- Program Name (Khmer + English) -->
          <span class="khmer-title block text-[11.5px] text-[#781D2B] leading-snug">
            {{ program.nameKhmer }}
          </span>
          <h3 class="text-[16.5px] font-bold text-[#252525] leading-snug mt-0.5">
            {{ program.name }}
          </h3>

          <!-- Short Description -->
          <p class="text-[13px] text-[#555555] mt-2 leading-relaxed">
            {{ program.shortDescription }}
          </p>
        </div>

        <!-- Program Attributes + Select Program Button -->
        <div class="pt-4 border-t border-[#EBECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <!-- Degree Level, Study Duration, Study Mode Pills -->
          <div class="flex flex-wrap items-center gap-2 text-[11.5px] text-[#555555]">
            <span
              class="inline-flex items-center gap-1 px-2 py-1 rounded-[3px] bg-[#F5F6F8] border border-[#E5E7EB] font-medium text-[#252525]"
            >
              <!-- Lucide Award Icon -->
              <svg
                width="12"
                height="12"
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
              <span>{{ program.degreeLevel }}</span>
            </span>

            <span
              class="inline-flex items-center gap-1 px-2 py-1 rounded-[3px] bg-[#F5F6F8] border border-[#E5E7EB]"
            >
              <!-- Lucide Clock Icon -->
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{{ program.studyDuration }}</span>
            </span>

            <span
              class="inline-flex items-center gap-1 px-2 py-1 rounded-[3px] bg-[#F5F6F8] border border-[#E5E7EB]"
            >
              <span>{{ program.studyMode }}</span>
            </span>
          </div>

          <!-- Select Program Button (with Hover, Selected, and Disabled States) -->
          <button
            type="button"
            :disabled="program.available === false"
            class="px-4 py-2 rounded-[4px] text-[12.5px] font-semibold transition-colors inline-flex items-center justify-center gap-1.5 shrink-0"
            :class="
              program.available === false
                ? 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
                : selectedProgramId === program.id
                  ? 'bg-[#781D2B] text-white cursor-pointer shadow-xs'
                  : 'bg-white border border-[#781D2B] text-[#781D2B] hover:bg-[#781D2B] hover:text-white cursor-pointer'
            "
            @click="emit('select-program', program)"
          >
            <svg
              v-if="selectedProgramId === program.id"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              {{
                program.available === false
                  ? 'Intake Closed'
                  : selectedProgramId === program.id
                    ? 'Program Selected'
                    : 'Select Program'
              }}
            </span>
          </button>
        </div>
      </article>
    </div>

    <!-- Empty Filter Results State -->
    <div
      v-else
      class="py-10 px-4 text-center rounded-[4px] bg-[#F5F6F8] border border-[#E2E4E9]"
    >
      <p class="text-[14px] font-semibold text-[#252525]">
        No academic programs match your current search or filter criteria.
      </p>
      <p class="text-[12.5px] text-[#6B7280] mt-1">
        Try clearing your search keyword or selecting "All Faculties".
      </p>
    </div>
  </section>
</template>
