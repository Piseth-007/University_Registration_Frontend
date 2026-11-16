<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ExaminationResultsPageData } from '../../types/admissions'

const props = defineProps<{
  pageData: ExaminationResultsPageData
  inlineEditEnabled: boolean
}>()

const actionFeedback = ref<string | null>(null)
const showPrintModal = ref(false)

const totalObtainedScore = computed(() =>
  props.pageData.scores.reduce((sum, row) => sum + (Number(row.obtainedScore) || 0), 0),
)

const totalMaximumScore = computed(() =>
  props.pageData.scores.reduce((sum, row) => sum + (Number(row.maximumScore) || 0), 0),
)

function handleDownloadResultSlip() {
  const now = new Date()
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  actionFeedback.value = `Sample Result Slip PDF generated at ${timeStr}.`
}

function handlePrintResult() {
  showPrintModal.value = true
}
</script>

<template>
  <section
    aria-labelledby="result-slip-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
  >
    <!-- Header -->
    <div class="pb-4 border-b border-[#EBECEF] flex items-center justify-between gap-2">
      <div>
        <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          OFFICIAL TRANSCRIPT PREVIEW
        </span>
        <h2 id="result-slip-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
          Examination Result Slip
        </h2>
      </div>

      <span
        class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] bg-[#F5F6F8] text-[#555555] border border-[#E2E4E9]"
      >
        Sample Preview
      </span>
    </div>

    <!-- Official Institutional Result Slip Preview Document -->
    <div class="border-2 border-[#781D2B] rounded-[4px] overflow-hidden bg-white shadow-xs">
      <!-- Top Institutional Header with University Logo Placeholder -->
      <div class="bg-[#781D2B] text-white px-4 py-3.5 flex items-center gap-3">
        <img
          src="/images/rupp-logo.png"
          alt="University Seal"
          class="w-10 h-10 object-contain shrink-0 bg-white rounded-full p-0.5"
        />
        <div class="min-w-0">
          <p class="khmer-title text-[11px] text-white/90 leading-tight truncate">
            ព្រឹត្តិបត្រពិន្ទុប្រឡងជ្រើសរើសនិស្សិត
          </p>
          <p class="text-[13px] font-bold tracking-[0.04em] uppercase leading-snug truncate">
            Entrance Examination Result Slip
          </p>
          <p class="text-[10.5px] text-white/80">
            Illustrative Sample Record — Non-Official
          </p>
        </div>
      </div>

      <!-- Result Slip Body -->
      <div class="p-4 sm:p-5 space-y-4 text-[12.5px]">
        <!-- Student Name & Application Reference Number -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div class="p-2.5 rounded-[3px] bg-[#FAFAFB] border border-[#EBECEF]">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Student Name
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.resultSlip.studentName"
              type="text"
              class="w-full mt-0.5 px-2 py-0.5 text-[12.5px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13.5px] font-bold text-[#252525] mt-0.5">
              {{ pageData.resultSlip.studentName }}
              <span class="text-[11.5px] font-normal text-[#555555] block" lang="km">
                {{ pageData.resultSlip.studentNameKhmer }}
              </span>
            </p>
          </div>

          <div class="p-2.5 rounded-[3px] bg-[#FDF7F8] border border-[#EBCFD4]">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#781D2B]">
              Application Reference
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.resultSlip.applicationReferenceNumber"
              type="text"
              class="w-full mt-0.5 px-2 py-0.5 text-[12.5px] font-bold text-[#781D2B] bg-white border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13.5px] font-bold text-[#781D2B] mt-0.5">
              {{ pageData.resultSlip.applicationReferenceNumber }}
            </p>
          </div>
        </div>

        <!-- Examination Details -->
        <div class="p-2.5 rounded-[3px] bg-[#FAFAFB] border border-[#EBECEF]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Examination Details
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.resultSlip.examinationDetails"
            type="text"
            class="w-full mt-0.5 px-2 py-0.5 text-[12px] font-semibold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="font-semibold text-[#252525] mt-0.5">
            {{ pageData.resultSlip.examinationDetails }}
          </p>
        </div>

        <!-- Subject Scores Mini-Table inside Slip -->
        <div class="border border-[#E5E7EB] rounded-[3px] overflow-hidden">
          <div
            class="bg-[#F5F6F8] px-3 py-1.5 border-b border-[#E5E7EB] flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]"
          >
            <span>Subject</span>
            <span>Score / Grade</span>
          </div>

          <div class="divide-y divide-[#EBECEF]">
            <div
              v-for="subj in pageData.scores"
              :key="subj.id"
              class="px-3 py-2 flex items-center justify-between"
            >
              <span class="font-medium text-[#252525]">{{ subj.subjectName }}</span>
              <span class="font-bold text-[#252525]">
                {{
                  pageData.decision.state === 'Pending'
                    ? 'Pending'
                    : `${subj.obtainedScore}/${subj.maximumScore} (${subj.grade})`
                }}
              </span>
            </div>
          </div>

          <!-- Total Score Row in Slip -->
          <div
            class="bg-[#FDF7F8] px-3 py-2 border-t border-[#EBCFD4] flex items-center justify-between font-bold text-[#781D2B]"
          >
            <span>Total Score</span>
            <span>
              {{
                pageData.decision.state === 'Pending'
                  ? 'Pending Verification'
                  : `${totalObtainedScore} / ${totalMaximumScore} (${pageData.overallGradeLabel.split(' ')[1] || 'A'})`
              }}
            </span>
          </div>
        </div>

        <!-- Official Result & Publication Date -->
        <div class="space-y-2 pt-1">
          <div class="p-2.5 rounded-[3px] bg-[#FAFAFB] border border-[#EBECEF]">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Official Result (Illustrative)
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.resultSlip.officialResultLabel"
              type="text"
              class="w-full mt-0.5 px-2 py-0.5 text-[12px] font-bold text-[#781D2B] bg-white border border-[#781D2B] rounded-[3px]"
            />
            <p
              v-else
              class="text-[12.5px] font-bold mt-0.5"
              :class="
                pageData.decision.state === 'Accepted'
                  ? 'text-[#166534]'
                  : pageData.decision.state === 'Pending'
                    ? 'text-[#B45309]'
                    : 'text-[#991B1B]'
              "
            >
              {{ pageData.resultSlip.officialResultLabel }}
            </p>
          </div>

          <div class="flex items-center justify-between text-[11.5px] text-[#555555] px-1">
            <span>Publication Date:</span>
            <strong class="text-[#252525]">{{ pageData.resultSlip.publicationDate }}</strong>
          </div>
        </div>

        <!-- Authorized Signature Placeholder -->
        <div class="pt-3 border-t border-dashed border-[#D1D5DB] text-center space-y-1.5">
          <div
            class="py-2.5 px-3 rounded-[3px] bg-[#F5F6F8] border border-dashed border-[#C4C7CE] text-[11px] font-semibold text-[#6B7280]"
          >
            {{ pageData.resultSlip.authorizedSignaturePlaceholder }}
          </div>
          <p class="text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#555555]">
            {{ pageData.resultSlip.authorizedSignatoryTitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Action Buttons: Download Result Slip + Print Result -->
    <div class="space-y-2.5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          :disabled="pageData.decision.state === 'Pending'"
          class="py-2.5 px-3.5 rounded-[4px] text-[13px] font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
          :class="
            pageData.decision.state === 'Pending'
              ? 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
              : 'bg-[#781D2B] hover:bg-[#5E1520] text-white cursor-pointer'
          "
          @click="handleDownloadResultSlip"
        >
          <!-- Lucide Download Icon -->
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          <span>Download Result Slip</span>
        </button>

        <button
          type="button"
          :disabled="pageData.decision.state === 'Pending'"
          class="py-2.5 px-3.5 rounded-[4px] border text-[13px] font-semibold transition-colors inline-flex items-center justify-center gap-2"
          :class="
            pageData.decision.state === 'Pending'
              ? 'border-[#E5E7EB] bg-[#F5F6F8] text-[#9CA3AF] cursor-not-allowed'
              : 'border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] cursor-pointer'
          "
          @click="handlePrintResult"
        >
          <!-- Lucide Printer Icon -->
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
            <polyline points="6 9 6 2 18 2 18 9" />
            <path
              d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
            />
            <rect width="12" height="8" x="6" y="14" />
          </svg>
          <span>Print Result</span>
        </button>
      </div>

      <p
        v-if="actionFeedback"
        class="text-[12px] font-semibold text-[#166534] bg-[#DCFCE7] border border-[#BBF7D0] rounded-[3px] px-3 py-2 text-center"
      >
        {{ actionFeedback }}
      </p>
    </div>

    <!-- Print Result Modal -->
    <div
      v-if="showPrintModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-result-modal-title"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="showPrintModal = false"
    >
      <div
        class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[520px] w-full overflow-hidden"
      >
        <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
          <h3 id="print-result-modal-title" class="text-[16px] font-bold">
            Print Examination Result Slip (Sample)
          </h3>
          <button
            type="button"
            class="p-1 text-white/85 hover:text-white cursor-pointer"
            aria-label="Close modal"
            @click="showPrintModal = false"
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

        <div class="p-6 space-y-3 text-[13px] text-[#252525]">
          <p class="font-bold text-[14.5px] text-[#781D2B]">
            {{ pageData.resultSlip.applicationReferenceNumber }} — {{ pageData.resultSlip.studentName }}
          </p>
          <p class="text-[#555555]">
            This illustrative Result Slip is formatted for standard A4 printing. Note: All scores and decisions displayed in this preview are sample data for demonstration purposes only.
          </p>
          <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] space-y-1">
            <p><strong>Total Score:</strong> {{ totalObtainedScore }} / {{ totalMaximumScore }}</p>
            <p><strong>Overall Grade:</strong> {{ pageData.overallGradeLabel }}</p>
            <p><strong>Decision Status:</strong> {{ pageData.resultSlip.officialResultLabel }}</p>
          </div>
        </div>

        <div class="px-6 py-3.5 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end gap-2.5">
          <button
            type="button"
            class="px-4 py-2 rounded-[4px] border border-[#D1D5DB] bg-white text-[#252525] text-[12.5px] font-semibold cursor-pointer"
            @click="showPrintModal = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
