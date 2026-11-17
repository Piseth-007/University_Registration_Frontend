<script setup lang="ts">
import type {
  ApplicationStatusTrackingPageData,
  ApplicationTrackingScenario,
} from '../../types/admissions'

defineProps<{
  pageData: ApplicationStatusTrackingPageData
  activeScenario: ApplicationTrackingScenario
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'upload-updated-document'): void
  (e: 'request-resubmit'): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 6. Officer Feedback Section -->
    <section
      aria-labelledby="officer-feedback-heading"
      class="bg-white border rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
      :class="
        activeScenario === 'Need Correction'
          ? 'border-[#FDE68A] border-l-4 border-l-[#D97706]'
          : 'border-[#E2E4E9]'
      "
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#EBECEF]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-[4px] flex items-center justify-center shrink-0 border"
            :class="
              activeScenario === 'Need Correction'
                ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]'
                : 'bg-[#FDF7F8] border-[#EBCFD4] text-[#781D2B]'
            "
            aria-hidden="true"
          >
            <!-- Lucide MessageSquareWarning / ShieldCheck Icon -->
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M12 7v4" />
              <path d="M12 15h.01" />
            </svg>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              ADMISSIONS VERIFICATION DESK
            </span>
            <h2 id="officer-feedback-heading" class="text-[17px] font-bold text-[#252525]">
              Officer Feedback
            </h2>
          </div>
        </div>

        <span
          class="self-start sm:self-center px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold uppercase tracking-[0.06em]"
          :class="
            activeScenario === 'Need Correction'
              ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
              : 'bg-[#F5F6F8] text-[#555555] border border-[#E2E4E9]'
          "
        >
          {{
            activeScenario === 'Need Correction'
              ? 'Correction Required'
              : 'No Action Required'
          }}
        </span>
      </div>

      <!-- STATE A: When Application Needs Correction -->
      <div v-if="activeScenario === 'Need Correction'" class="space-y-4">
        <div class="p-4 sm:p-5 rounded-[4px] bg-[#FFFBEB] border border-[#FDE68A] space-y-3">
          <div>
            <span class="block text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#92400E]">
              Feedback from Admission Officer
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.officerFeedback.feedbackMessage"
              type="text"
              class="w-full mt-1 px-2.5 py-1 text-[14.5px] font-bold text-[#78350F] bg-white border border-[#D97706] rounded-[3px]"
            />
            <p v-else class="text-[15.5px] font-bold text-[#78350F] mt-1">
              "{{ pageData.officerFeedback.feedbackMessage }}"
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-[#FDE68A]/70 text-[12.5px]">
            <!-- Correction Reason -->
            <div class="p-3 rounded-[3px] bg-white border border-[#FDE68A]">
              <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#92400E]">
                Correction Reason
              </span>
              <textarea
                v-if="inlineEditEnabled"
                v-model="pageData.officerFeedback.correctionReason"
                rows="2"
                class="w-full mt-1 px-2 py-1 text-[12px] text-[#252525] bg-[#FAFAFB] border border-[#D97706] rounded-[3px]"
              ></textarea>
              <p v-else class="text-[#252525] font-medium mt-1 leading-relaxed">
                {{ pageData.officerFeedback.correctionReason }}
              </p>
            </div>

            <!-- Required Document or Information -->
            <div class="p-3 rounded-[3px] bg-white border border-[#FDE68A]">
              <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#92400E]">
                Required Document or Information
              </span>
              <textarea
                v-if="inlineEditEnabled"
                v-model="pageData.officerFeedback.requiredDocumentOrInfo"
                rows="2"
                class="w-full mt-1 px-2 py-1 text-[12px] text-[#252525] bg-[#FAFAFB] border border-[#D97706] rounded-[3px]"
              ></textarea>
              <p v-else class="text-[#252525] font-semibold mt-1 leading-relaxed">
                {{ pageData.officerFeedback.requiredDocumentOrInfo }}
              </p>
            </div>

            <!-- Correction Deadline -->
            <div class="p-3 rounded-[3px] bg-white border border-[#FDE68A]">
              <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#92400E]">
                Correction Deadline
              </span>
              <input
                v-if="inlineEditEnabled"
                v-model="pageData.officerFeedback.correctionDeadline"
                type="text"
                class="w-full mt-1 px-2 py-1 text-[12.5px] font-bold text-[#781D2B] bg-[#FAFAFB] border border-[#D97706] rounded-[3px]"
              />
              <p v-else class="text-[13.5px] font-bold text-[#781D2B] mt-1">
                {{ pageData.officerFeedback.correctionDeadline }}
              </p>
            </div>
          </div>
        </div>

        <!-- Uploaded Replacement File Indicator (when student attaches updated document) -->
        <div
          v-if="pageData.officerFeedback.uploadedReplacementFileName"
          class="p-3.5 rounded-[4px] bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between gap-3 text-[13px] text-[#166534]"
        >
          <span class="font-semibold">
            Updated file ready for resubmission:
            <strong>{{ pageData.officerFeedback.uploadedReplacementFileName }}</strong>
          </span>
          <span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#DCFCE7]">
            Attached
          </span>
        </div>

        <!-- Correction Action Buttons: Upload Updated Document + Resubmit Application -->
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            class="px-4 py-2.25 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[13px] font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
            @click="emit('upload-updated-document')"
          >
            <!-- Lucide Upload Icon -->
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
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span>Upload Updated Document</span>
          </button>

          <button
            type="button"
            class="px-5 py-2.25 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            @click="emit('request-resubmit')"
          >
            <span>Resubmit Application</span>
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- STATE B: When No Correction Is Required -->
      <div
        v-else
        class="p-4 sm:p-5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] flex items-center gap-3.5"
      >
        <div
          class="w-9 h-9 rounded-full bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <input
            v-if="inlineEditEnabled"
            v-model="pageData.officerFeedback.noFeedbackMessage"
            type="text"
            class="w-full px-2.5 py-1 text-[13.5px] font-semibold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="text-[14px] font-semibold text-[#252525]">
            {{ pageData.officerFeedback.noFeedbackMessage }}
          </p>
        </div>
      </div>
    </section>

    <!-- 7. Application History Table Section -->
    <section
      aria-labelledby="application-history-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#EBECEF]"
      >
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            AUDIT &amp; ACTIVITY LOG
          </span>
          <h2 id="application-history-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            Application History
          </h2>
        </div>

        <span class="text-[12px] text-[#6B7280]">
          Chronological activity trail ({{ pageData.historyLogs.length }} events)
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr
              class="bg-[#FAFAFB] border-y border-[#E5E7EB] text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]"
            >
              <th class="py-3 px-3.5">Date &amp; Time</th>
              <th class="py-3 px-3.5">Activity</th>
              <th class="py-3 px-3.5">Updated By</th>
              <th class="py-3 px-3.5">Description</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#EBECEF] text-[13px]">
            <tr
              v-for="log in pageData.historyLogs"
              :key="log.id"
              class="hover:bg-[#FAFAFB] transition-colors"
            >
              <td class="py-3.5 px-3.5 font-semibold text-[#781D2B] whitespace-nowrap">
                {{ log.dateTime }}
              </td>
              <td class="py-3.5 px-3.5 font-bold text-[#252525] whitespace-nowrap">
                {{ log.activity }}
              </td>
              <td class="py-3.5 px-3.5 text-[#555555] whitespace-nowrap">
                {{ log.updatedBy }}
              </td>
              <td class="py-3.5 px-3.5 text-[#374151] leading-relaxed">
                {{ log.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
