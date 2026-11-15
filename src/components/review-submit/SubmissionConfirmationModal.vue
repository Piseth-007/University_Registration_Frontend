<script setup lang="ts">
defineProps<{
  open: boolean
  referenceNumber: string
  applicantName: string
  selectedMajor: string
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm-submit'): void
}>()
</script>

<template>
  <div
    v-if="open"
    role="dialog"
    aria-modal="true"
    aria-labelledby="confirm-submit-modal-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55"
    @click.self="emit('cancel')"
  >
    <div
      class="bg-white border border-[#E2E4E9] border-t-4 border-t-[#781D2B] rounded-[4px] shadow-xl max-w-[480px] w-full p-6 sm:p-7"
    >
      <!-- Icon + Title -->
      <div class="flex items-start gap-3.5">
        <div
          class="w-11 h-11 rounded-full bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide Send / AlertCircle Icon -->
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>

        <div>
          <h3 id="confirm-submit-modal-title" class="text-[19px] font-bold text-[#252525]">
            Confirm Application Submission
          </h3>
          <p class="text-[13.5px] text-[#555555] mt-1.5 leading-relaxed">
            Are you sure you want to submit your university application?
          </p>
        </div>
      </div>

      <!-- Summary Box Inside Modal -->
      <div class="mt-5 p-4 rounded-[4px] bg-[#F5F6F8] border border-[#E2E4E9] text-[12.5px] space-y-1.5">
        <div class="flex justify-between gap-2">
          <span class="text-[#6B7280]">Reference Number:</span>
          <span class="font-bold text-[#781D2B]">{{ referenceNumber }}</span>
        </div>
        <div class="flex justify-between gap-2">
          <span class="text-[#6B7280]">Applicant Name:</span>
          <span class="font-semibold text-[#252525]">{{ applicantName }}</span>
        </div>
        <div class="flex justify-between gap-2">
          <span class="text-[#6B7280]">Selected Major:</span>
          <span class="font-semibold text-[#252525] text-right">{{ selectedMajor }}</span>
        </div>
      </div>

      <p class="text-[12px] text-[#6B7280] mt-3.5 leading-relaxed">
        Once submitted, your application dossier will be locked for formal review by the Office of Admissions.
      </p>

      <!-- Modal Buttons: Cancel & Confirm & Submit -->
      <div class="mt-6 pt-4 border-t border-[#EBECEF] flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          type="button"
          class="px-4 py-2.5 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[13.5px] font-semibold transition-colors cursor-pointer"
          @click="emit('cancel')"
        >
          Cancel
        </button>

        <button
          type="button"
          class="px-5 py-2.5 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          @click="emit('confirm-submit')"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Confirm &amp; Submit</span>
        </button>
      </div>
    </div>
  </div>
</template>
