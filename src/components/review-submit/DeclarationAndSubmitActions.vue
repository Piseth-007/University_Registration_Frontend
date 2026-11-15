<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  confirmAccurate: boolean
  agreeTerms: boolean
  allRequiredDocsUploaded: boolean
  missingOrRejectedDocNames: string[]
  canSubmit: boolean
  draftSavedAt: string | null
}>()

const emit = defineEmits<{
  (e: 'update:confirmAccurate', value: boolean): void
  (e: 'update:agreeTerms', value: boolean): void
  (e: 'previous'): void
  (e: 'save-draft'): void
  (e: 'request-submit'): void
}>()

const showTermsModal = ref(false)
</script>

<template>
  <div class="space-y-6">
    <!-- 9. Declaration Section Card -->
    <section
      aria-labelledby="declaration-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
    >
      <div class="flex items-start gap-3 pb-4 mb-5 border-b border-[#EBECEF]">
        <div
          class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide ShieldCheck Icon -->
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
            <path
              d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
            />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            APPLICANT DECLARATION &amp; CONSENT
          </span>
          <h2 id="declaration-heading" class="text-[17px] font-bold text-[#252525]">
            Official Declaration
          </h2>
          <p class="text-[13px] text-[#555555] mt-0.5">
            Both declarations below are required before your admission dossier can be submitted.
          </p>
        </div>
      </div>

      <div class="space-y-3.5">
        <!-- Required Checkbox 1 -->
        <label
          class="flex items-start gap-3 p-3.5 rounded-[4px] border transition-colors cursor-pointer select-none"
          :class="
            confirmAccurate
              ? 'bg-[#FDF7F8] border-[#781D2B]'
              : 'bg-[#FAFAFB] border-[#E2E4E9] hover:border-[#781D2B]'
          "
        >
          <input
            :checked="confirmAccurate"
            type="checkbox"
            class="mt-0.5 w-4.5 h-4.5 accent-[#781D2B] rounded-[2px] cursor-pointer shrink-0"
            @change="emit('update:confirmAccurate', ($event.target as HTMLInputElement).checked)"
          />
          <span class="text-[13.5px] text-[#252525] leading-relaxed">
            I confirm that all information provided in this application is accurate and complete.
            <span class="text-[#781D2B] font-bold">*</span>
          </span>
        </label>

        <!-- Required Checkbox 2 -->
        <label
          class="flex items-start gap-3 p-3.5 rounded-[4px] border transition-colors cursor-pointer select-none"
          :class="
            agreeTerms
              ? 'bg-[#FDF7F8] border-[#781D2B]'
              : 'bg-[#FAFAFB] border-[#E2E4E9] hover:border-[#781D2B]'
          "
        >
          <input
            :checked="agreeTerms"
            type="checkbox"
            class="mt-0.5 w-4.5 h-4.5 accent-[#781D2B] rounded-[2px] cursor-pointer shrink-0"
            @change="emit('update:agreeTerms', ($event.target as HTMLInputElement).checked)"
          />
          <span class="text-[13.5px] text-[#252525] leading-relaxed">
            I agree to the university's application terms and conditions.
            <span class="text-[#781D2B] font-bold">*</span>
            <button
              type="button"
              class="ml-1.5 text-[#781D2B] font-semibold underline hover:text-[#5E1520] cursor-pointer"
              @click.prevent="showTermsModal = true"
            >
              View Terms and Conditions
            </button>
          </span>
        </label>
      </div>
    </section>

    <!-- Draft Saved Confirmation Banner -->
    <div
      v-if="draftSavedAt"
      role="status"
      class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[4px] px-4 py-3.5 text-[#166534] text-[13px] flex items-center gap-2.5"
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
        <span class="font-bold">Application draft saved successfully.</span>
        <span class="ml-1.5 text-[12px] text-[#15803D]">
          Last saved at {{ draftSavedAt }}.
        </span>
      </div>
    </div>

    <!-- Validation Requirements Notice When Submission Is Disabled -->
    <div
      v-if="!canSubmit"
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
      <div class="space-y-1">
        <p class="font-bold">Complete the following items to enable application submission:</p>
        <ul class="list-disc list-inside text-[12.5px] space-y-0.5">
          <li v-if="!allRequiredDocsUploaded">
            All required documents must have an <strong>Uploaded</strong> status (currently pending:
            <strong>{{ missingOrRejectedDocNames.join(', ') }}</strong>).
          </li>
          <li v-if="!confirmAccurate">
            Check the box confirming that all information in your application is accurate and complete.
          </li>
          <li v-if="!agreeTerms">
            Check the box agreeing to the university's application terms and conditions.
          </li>
        </ul>
      </div>
    </div>

    <!-- 10. Submission Actions Card -->
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

      <!-- Save Draft + Submit Application -->
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
          :disabled="!canSubmit"
          class="px-6 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2"
          :class="
            canSubmit
              ? 'bg-[#781D2B] hover:bg-[#5E1520] text-white cursor-pointer shadow-xs'
              : 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
          "
          @click="emit('request-submit')"
        >
          <!-- Lucide Send Icon -->
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
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
          <span>Submit Application</span>
        </button>
      </div>
    </div>

    <!-- Application Terms and Conditions Modal -->
    <div
      v-if="showTermsModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-heading"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="showTermsModal = false"
    >
      <div class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[600px] w-full overflow-hidden">
        <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
          <h3 id="terms-modal-heading" class="text-[16px] font-bold">
            University Application Terms &amp; Conditions
          </h3>
          <button
            type="button"
            class="p-1 text-white/85 hover:text-white cursor-pointer"
            aria-label="Close terms modal"
            @click="showTermsModal = false"
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
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6 text-[13.5px] text-[#252525] space-y-3 leading-relaxed max-h-[65vh] overflow-y-auto">
          <p class="font-semibold text-[#781D2B]">
            1. Authenticity of Submitted Records
          </p>
          <p class="text-[#555555]">
            Applicants certify that all personal identity details, high school academic records, and uploaded supporting files are authentic and unaltered. Any falsification may result in immediate disqualification.
          </p>
          <p class="font-semibold text-[#781D2B]">
            2. Document Verification &amp; Original Presentation
          </p>
          <p class="text-[#555555]">
            Admitted candidates must present original National ID and MoEYS BacII certificates in person at the Office of Admissions &amp; Academic Records during formal enrollment.
          </p>
          <p class="font-semibold text-[#781D2B]">
            3. Privacy &amp; Academic Record Usage
          </p>
          <p class="text-[#555555]">
            Application data is processed strictly for university admission evaluation, scholarship eligibility, and student registry administration.
          </p>
        </div>
        <div class="px-6 py-3.5 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold cursor-pointer"
            @click="
              emit('update:agreeTerms', true);
              showTermsModal = false
            "
          >
            Accept &amp; Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
