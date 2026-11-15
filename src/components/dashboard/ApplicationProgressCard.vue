<script setup lang="ts">
import type { DashboardNavId, DashboardProgressStep } from '../../types/admissions'

defineProps<{
  steps: DashboardProgressStep[]
  completionPercentage: number
}>()

const emit = defineEmits<{
  (e: 'continue-application'): void
  (e: 'select-step', navId: DashboardNavId): void
}>()
</script>

<template>
  <section
    aria-labelledby="application-progress-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Header Row: Overview Title, Completion Percentage & Manage Application Button -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#EBECEF]"
    >
      <div>
        <div class="flex flex-wrap items-center gap-2.5">
          <h2 id="application-progress-heading" class="text-[18px] font-bold text-[#252525]">
            Application Completion Progress
          </h2>
          <span
            class="px-2.5 py-0.5 rounded-[3px] text-[12px] font-bold bg-[#FDF2F4] text-[#781D2B] border border-[#F2D0D6]"
          >
            {{ completionPercentage }}% Complete
          </span>
        </div>
        <p class="text-[13px] text-[#555555] mt-1">
          High-level overview of your admission dossier readiness. Go to <strong>My Application</strong> to edit forms, upload documents, and submit.
        </p>
      </div>

      <button
        type="button"
        class="px-5 py-2.5 bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold rounded-[4px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
        @click="emit('continue-application')"
      >
        <span>Manage My Application</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Horizontal Completion Bar -->
    <div class="mt-5">
      <div class="flex items-center justify-between text-[12px] text-[#555555] mb-2">
        <span class="font-medium">Overall Admission Dossier Readiness</span>
        <span class="font-bold text-[#252525]">{{ completionPercentage }}% Completed</span>
      </div>
      <div
        class="w-full h-3 bg-[#F0F1F5] rounded-full overflow-hidden"
        role="progressbar"
        :aria-valuenow="completionPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="h-full bg-[#781D2B] transition-all duration-300 rounded-full"
          :style="{ width: `${completionPercentage}%` }"
        ></div>
      </div>

      <!-- Compact Section Readiness Pills (Overview only, not the detailed stepper) -->
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#F0F1F5]">
        <div class="flex flex-wrap items-center gap-2">
          <span
            v-for="step in steps"
            :key="step.stepNumber"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11.5px] font-semibold border"
            :class="
              step.status === 'completed'
                ? 'bg-[#DCFCE7] border-[#BBF7D0] text-[#166534]'
                : step.status === 'current'
                  ? 'bg-[#FDF7F8] border-[#EBCFD4] text-[#781D2B]'
                  : 'bg-[#F5F6F8] border-[#E5E7EB] text-[#6B7280]'
            "
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="
                step.status === 'completed'
                  ? 'bg-[#166534]'
                  : step.status === 'current'
                    ? 'bg-[#781D2B]'
                    : 'bg-[#9CA3AF]'
              "
            ></span>
            <span>{{ step.title }}</span>
          </span>
        </div>

        <span class="text-[11.5px] text-[#6B7280]">
          Next active stage: <strong class="text-[#781D2B]">Faculty &amp; Major Selection</strong>
        </span>
      </div>
    </div>
  </section>
</template>
