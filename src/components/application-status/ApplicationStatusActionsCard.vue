<script setup lang="ts">
import { navigateTo } from '../../router'
import type {
  ApplicationStatusTrackingPageData,
  ApplicationTrackingScenario,
} from '../../types/admissions'

defineProps<{
  pageData: ApplicationStatusTrackingPageData
  activeScenario: ApplicationTrackingScenario
  resubmitModalOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'download-summary'): void
  (e: 'upload-corrected-documents'): void
  (e: 'open-resubmit-modal'): void
  (e: 'close-resubmit-modal'): void
  (e: 'confirm-resubmit'): void
}>()
</script>

<template>
  <section
    aria-labelledby="application-actions-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
  >
    <div class="pb-4 border-b border-[#EBECEF]">
      <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
        DOSSIER CONTROLS
      </span>
      <h2 id="application-actions-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
        Application Actions
      </h2>
      <p class="text-[12.5px] text-[#555555] mt-1">
        Context-sensitive actions available for your current application status.
      </p>
    </div>

    <!-- Lock Notice for Approved or Rejected Applications -->
    <div
      v-if="activeScenario === 'Approved' || activeScenario === 'Rejected'"
      class="p-3.5 rounded-[4px] border text-[12.5px] flex items-start gap-2.5"
      :class="
        activeScenario === 'Approved'
          ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
          : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
      "
    >
      <!-- Lucide Lock Icon -->
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <div>
        <strong class="block font-bold">
          Editing Locked — {{ activeScenario }} Status
        </strong>
        <span class="block mt-0.5 leading-relaxed">
          Applications cannot be edited or resubmitted after a final approval or rejection decision.
        </span>
      </div>
    </div>

    <!-- Action Buttons Stack -->
    <div class="space-y-2.5">
      <!-- 1. View Submitted Application (or Continue Application when Draft) -->
      <button
        type="button"
        class="w-full py-2.75 px-4 bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer shadow-xs"
        @click="navigateTo('/my-application')"
      >
        <span class="flex items-center gap-2.5">
          <!-- Lucide FileText Icon -->
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
          <span>
            {{
              activeScenario === 'Draft'
                ? 'Continue Application Draft'
                : 'View Submitted Application'
            }}
          </span>
        </span>
        <svg
          width="15"
          height="15"
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

      <!-- 2. Download Application Summary -->
      <button
        type="button"
        class="w-full py-2.75 px-4 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
        @click="emit('download-summary')"
      >
        <span class="flex items-center gap-2.5">
          <!-- Lucide Download Icon -->
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          <span>Download Application Summary</span>
        </span>
        <span class="text-[11px] font-bold text-[#6B7280] uppercase">PDF</span>
      </button>

      <!-- 3 & 4. Correction Actions (ONLY shown when Need Correction is active) -->
      <template v-if="activeScenario === 'Need Correction'">
        <button
          type="button"
          class="w-full py-2.75 px-4 bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B] text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
          @click="emit('upload-corrected-documents')"
        >
          <span class="flex items-center gap-2.5">
            <!-- Lucide Upload Icon -->
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span>Upload Corrected Documents</span>
          </span>
          <span class="text-[10.5px] font-bold uppercase">Required</span>
        </button>

        <button
          type="button"
          class="w-full py-2.75 px-4 bg-[#166534] hover:bg-[#14532D] text-white text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer shadow-xs"
          @click="emit('open-resubmit-modal')"
        >
          <span class="flex items-center gap-2.5">
            <!-- Lucide Send / CheckCircle2 Icon -->
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
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>Resubmit Application</span>
          </span>
          <svg
            width="15"
            height="15"
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
      </template>

      <!-- 5. Contact Admission Office -->
      <button
        type="button"
        class="w-full py-2.75 px-4 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
        @click="navigateTo('/help-support')"
      >
        <span class="flex items-center gap-2.5">
          <!-- Lucide Headphones / Mail Icon -->
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>Contact Admission Office</span>
        </span>
        <svg
          width="15"
          height="15"
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
    </div>

    <!-- Confirmation Dialog Before Resubmission -->
    <div
      v-if="resubmitModalOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resubmit-confirm-modal-title"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="emit('close-resubmit-modal')"
    >
      <div
        class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[480px] w-full overflow-hidden"
      >
        <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
          <h3 id="resubmit-confirm-modal-title" class="text-[16px] font-bold">
            Confirm Application Resubmission
          </h3>
          <button
            type="button"
            class="p-1 text-white/85 hover:text-white cursor-pointer"
            aria-label="Close modal"
            @click="emit('close-resubmit-modal')"
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

        <div class="p-6 space-y-3 text-[13.5px] text-[#252525]">
          <p class="text-[#555555]">
            Are you ready to resubmit your corrected application ({{ pageData.summary.applicationReference }}) to the Office of Admissions for verification?
          </p>
          <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] space-y-1 text-[12.5px]">
            <p><strong>Applicant:</strong> {{ pageData.summary.applicantName }}</p>
            <p><strong>Program:</strong> {{ pageData.summary.selectedMajor }} ({{ pageData.summary.selectedFaculty }})</p>
            <p>
              <strong>Updated Document:</strong>
              {{
                pageData.officerFeedback.uploadedReplacementFileName ||
                'High_School_Certificate_BacII_Clear_Scan.pdf (1.4 MB)'
              }}
            </p>
          </div>
        </div>

        <div class="px-6 py-3.5 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end gap-2.5">
          <button
            type="button"
            class="px-4 py-2 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[12.5px] font-semibold cursor-pointer"
            @click="emit('close-resubmit-modal')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold cursor-pointer"
            @click="emit('confirm-resubmit')"
          >
            Confirm &amp; Resubmit
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
