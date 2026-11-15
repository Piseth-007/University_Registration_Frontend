<script setup lang="ts">
defineProps<{
  allRequiredUploaded: boolean
  missingRequiredTitles: string[]
  draftSavedAt: string | null
  stepCompleted: boolean
}>()

const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'save-draft'): void
  (e: 'continue'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Draft Saved Confirmation Banner -->
    <div
      v-if="draftSavedAt"
      role="status"
      class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[4px] px-4 py-3.5 text-[#166534] text-[13px] flex items-center justify-between gap-3"
    >
      <div class="flex items-center gap-2.5">
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
          <span class="font-bold">Document upload progress saved successfully.</span>
          <span class="ml-1.5 text-[12px] text-[#15803D]">
            Last saved at {{ draftSavedAt }}.
          </span>
        </div>
      </div>
    </div>

    <!-- Step 4 Completed Banner -->
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
        <span class="font-bold">All 4 required documents verified!</span>
        <span class="ml-1.5 text-[#252525]">
          Your supporting files are ready for Step 5: Review &amp; Submit.
        </span>
      </div>
    </div>

    <!-- Helpful Validation Message When Required Documents Are Missing -->
    <div
      v-if="!allRequiredUploaded"
      role="status"
      class="bg-[#FFFBEB] border border-[#FDE68A] rounded-[4px] px-4 py-3.5 text-[#92400E] text-[13px] flex items-start gap-2.5"
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
        class="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div>
        <p class="font-bold">
          Required documents pending upload ({{ missingRequiredTitles.length }} remaining)
        </p>
        <p class="text-[12.5px] mt-0.5 leading-relaxed">
          To enable <strong class="text-[#252525]">Continue to Review &amp; Submit</strong>, please upload all required documents:
          <span class="font-semibold">{{ missingRequiredTitles.join(', ') }}</span>.
        </p>
      </div>
    </div>

    <!-- 7. Form Actions Bar -->
    <div
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 sm:px-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
    >
      <!-- Previous Button -->
      <button
        type="button"
        class="px-4 py-2.5 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
        @click="emit('previous')"
      >
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

      <!-- Save Draft + Continue to Review & Submit (Disabled until all required documents are uploaded) -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="button"
          class="px-5 py-2.5 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          @click="emit('save-draft')"
        >
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
          type="button"
          :disabled="!allRequiredUploaded"
          class="px-6 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2"
          :class="
            allRequiredUploaded
              ? 'bg-[#781D2B] hover:bg-[#5E1520] text-white cursor-pointer shadow-xs'
              : 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
          "
          @click="emit('continue')"
        >
          <span>Continue to Review &amp; Submit</span>
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
