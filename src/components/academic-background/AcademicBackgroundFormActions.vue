<script setup lang="ts">
defineProps<{
  draftSavedAt: string | null
  stepCompleted: boolean
  errorCount: number
}>()

const emit = defineEmits<{
  (e: 'save-draft'): void
  (e: 'previous'): void
  (e: 'continue'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Saved Successfully Confirmation State -->
    <div
      v-if="draftSavedAt"
      role="status"
      class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[4px] px-4 py-3.5 text-[#166534] text-[13px] flex items-center justify-between gap-3"
    >
      <div class="flex items-center gap-2.5">
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
          class="shrink-0"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        <div>
          <span class="font-bold">Academic Background saved successfully.</span>
          <span class="ml-1.5 text-[12px] text-[#15803D]">
            Last saved at {{ draftSavedAt }}. Your high school and examination records have been stored.
          </span>
        </div>
      </div>
    </div>

    <!-- Step 2 Validated Banner -->
    <div
      v-if="stepCompleted"
      role="status"
      class="bg-[#FDF7F8] border border-[#781D2B] rounded-[4px] px-4 py-3.5 text-[#781D2B] text-[13px] flex items-center gap-2.5"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0"
        aria-hidden="true"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
      <div>
        <span class="font-bold">Step 2 (Academic Background) verified!</span>
        <span class="ml-1.5 text-[#252525]">
          Ready to proceed to Step 3: Faculty &amp; Major selection.
        </span>
      </div>
    </div>

    <!-- Validation Error Alert -->
    <div
      v-if="errorCount > 0"
      role="alert"
      class="bg-[#FEF2F2] border border-[#FECACA] rounded-[4px] px-4 py-3 text-[#B91C1C] text-[13px] flex items-center gap-2.5"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>
        Please complete the <strong>{{ errorCount }}</strong> required
        {{ errorCount === 1 ? 'field' : 'fields' }} highlighted above before continuing to Step 3.
      </span>
    </div>

    <!-- Action Bar Card -->
    <div
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 sm:px-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
    >
      <!-- Previous Button -->
      <button
        type="button"
        class="px-4 py-2.5 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
        @click="emit('previous')"
      >
        <!-- Lucide ArrowLeft Icon -->
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span>Previous</span>
      </button>

      <!-- Save Draft + Continue to Faculty & Major -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="button"
          class="px-5 py-2.5 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          @click="emit('save-draft')"
        >
          <!-- Lucide Save Icon -->
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
            />
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
            <path d="M7 3v4a1 1 0 0 0 1 1h7" />
          </svg>
          <span>Save Draft</span>
        </button>

        <button
          type="submit"
          class="px-6 py-2.5 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          @click="emit('continue')"
        >
          <span>Continue to Faculty &amp; Major</span>
          <!-- Lucide ArrowRight Icon -->
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
    </div>
  </div>
</template>
