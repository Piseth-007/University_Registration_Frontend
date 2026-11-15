<script setup lang="ts">
import type { DashboardNavId, DashboardProgressStep } from '../../types/admissions'

defineProps<{
  steps: DashboardProgressStep[]
  currentStepNumber: number
  previewValidation: boolean
  stepTitle?: string
}>()

const emit = defineEmits<{
  (e: 'select-step', id: DashboardNavId): void
  (e: 'toggle-validation-preview'): void
}>()
</script>

<template>
  <section
    aria-labelledby="step-progress-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Header Row -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[#EBECEF]"
    >
      <div>
        <div class="flex flex-wrap items-center gap-2.5">
          <span
            class="px-2.5 py-0.5 rounded-[3px] text-[11.5px] font-bold uppercase tracking-[0.08em] bg-[#781D2B] text-white"
          >
            Step {{ currentStepNumber }} of {{ steps.length }}
          </span>
          <h2 id="step-progress-heading" class="text-[18px] font-bold text-[#252525]">
            {{ stepTitle || 'Application Progress — Personal Information' }}
          </h2>
        </div>
        <p class="text-[13px] text-[#555555] mt-1">
          Fields marked with an asterisk (<span class="text-[#781D2B] font-bold">*</span>) are mandatory for official university registration.
        </p>
      </div>

      <!-- Validation State Preview Toggle -->
      <button
        type="button"
        class="self-start sm:self-center px-3 py-1.5 rounded-[4px] text-[12px] font-semibold border transition-colors cursor-pointer inline-flex items-center gap-1.5 shrink-0"
        :class="
          previewValidation
            ? 'bg-[#FDF2F4] border-[#781D2B] text-[#781D2B]'
            : 'bg-[#F5F6F8] border-[#D6D9E0] text-[#252525] hover:border-[#781D2B] hover:text-[#781D2B]'
        "
        @click="emit('toggle-validation-preview')"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>
          {{ previewValidation ? 'Validation Preview: ON' : 'Preview Validation Messages' }}
        </span>
      </button>
    </div>

    <!-- Horizontal 5-Step Progress Indicator -->
    <ol class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-5">
      <li v-for="step in steps" :key="step.stepNumber">
        <button
          type="button"
          class="w-full h-full text-left p-3.5 rounded-[4px] border transition-colors cursor-pointer flex flex-col justify-between gap-2"
          :class="
            step.stepNumber === currentStepNumber
              ? 'bg-[#FDF7F8] border-2 border-[#781D2B] shadow-2xs'
              : step.status === 'completed'
                ? 'bg-[#FAFAFB] border-[#D8DCE3] hover:border-[#781D2B]'
                : 'bg-white border-[#E5E7EB] hover:border-[#C4C7CE]'
          "
          @click="emit('select-step', step.id)"
        >
          <div class="flex items-center justify-between gap-2">
            <span
              class="w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center shrink-0"
              :class="
                step.stepNumber === currentStepNumber
                  ? 'bg-[#781D2B] text-white'
                  : step.status === 'completed'
                    ? 'bg-[#166534] text-white'
                    : 'bg-[#F0F1F5] text-[#6B7280]'
              "
            >
              <!-- Checkmark for completed steps -->
              <svg
                v-if="step.status === 'completed'"
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
              <span v-else>{{ step.stepNumber }}</span>
            </span>

            <span
              class="text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-[3px]"
              :class="
                step.stepNumber === currentStepNumber
                  ? 'bg-[#781D2B] text-white'
                  : step.status === 'completed'
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
              "
            >
              {{
                step.stepNumber === currentStepNumber
                  ? 'Active'
                  : step.status === 'completed'
                    ? 'Completed'
                    : 'Upcoming'
              }}
            </span>
          </div>

          <div>
            <p class="text-[13.5px] font-bold text-[#252525] leading-snug">
              {{ step.stepNumber }}. {{ step.title }}
            </p>
            <p class="text-[11.5px] text-[#6B7280] mt-0.5 leading-snug">
              {{ step.shortDescription }}
            </p>
          </div>
        </button>
      </li>
    </ol>
  </section>
</template>
