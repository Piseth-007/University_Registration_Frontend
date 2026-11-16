<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo } from '../../router'
import type {
  AdmissionDecisionState,
  ExaminationResultsPageData,
} from '../../types/admissions'

const props = defineProps<{
  pageData: ExaminationResultsPageData
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select-decision-state', state: AdmissionDecisionState): void
}>()

const totalObtainedScore = computed(() =>
  props.pageData.scores.reduce((sum, row) => sum + (Number(row.obtainedScore) || 0), 0),
)

const totalMaximumScore = computed(() =>
  props.pageData.scores.reduce((sum, row) => sum + (Number(row.maximumScore) || 0), 0),
)

function gradePillClass(grade: string): string {
  const g = grade.trim().toUpperCase()
  if (g.startsWith('A') || g.startsWith('B')) {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  if (g.startsWith('C')) {
    return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
  return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
}
</script>

<template>
  <div class="space-y-6">
    <!-- 4. Examination Score Table Card -->
    <section
      aria-labelledby="examination-score-table-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-[#EBECEF]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <!-- Lucide Table / BarChart3 Icon -->
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
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              SUBJECT PERFORMANCE BREAKDOWN
            </span>
            <h2 id="examination-score-table-heading" class="text-[17px] font-bold text-[#252525]">
              Examination Score Table
            </h2>
          </div>
        </div>

        <span
          class="self-start sm:self-center px-2.5 py-1 rounded-[3px] text-[11px] font-semibold bg-[#F5F6F8] text-[#555555] border border-[#E2E4E9]"
        >
          Sample Examination Scores
        </span>
      </div>

      <!-- Score Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[540px]">
          <thead>
            <tr
              class="bg-[#FAFAFB] border-y border-[#E5E7EB] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]"
            >
              <th class="py-3 px-4">Subject Name</th>
              <th class="py-3 px-4 text-center">Obtained Score</th>
              <th class="py-3 px-4 text-center">Maximum Score</th>
              <th class="py-3 px-4 text-right">Grade</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#EBECEF] text-[13.5px]">
            <tr
              v-for="row in pageData.scores"
              :key="row.id"
              class="hover:bg-[#FAFAFB] transition-colors"
            >
              <!-- Subject Name -->
              <td class="py-3.5 px-4">
                <input
                  v-if="inlineEditEnabled"
                  v-model="row.subjectName"
                  type="text"
                  class="w-full max-w-[240px] px-2 py-1 text-[13.5px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
                />
                <div v-else>
                  <span class="font-bold text-[#252525]">{{ row.subjectName }}</span>
                  <span class="text-[12px] text-[#6B7280] ml-1.5" lang="km">
                    ({{ row.subjectNameKhmer }})
                  </span>
                </div>
              </td>

              <!-- Obtained Score -->
              <td class="py-3.5 px-4 text-center">
                <input
                  v-if="inlineEditEnabled"
                  v-model.number="row.obtainedScore"
                  type="number"
                  min="0"
                  :max="row.maximumScore"
                  class="w-20 mx-auto text-center px-2 py-1 text-[13.5px] font-bold text-[#781D2B] bg-white border border-[#781D2B] rounded-[3px]"
                />
                <span v-else class="font-bold text-[#252525] text-[14.5px]">
                  {{ pageData.decision.state === 'Pending' ? 'Pending' : row.obtainedScore }}
                </span>
              </td>

              <!-- Maximum Score -->
              <td class="py-3.5 px-4 text-center text-[#555555] font-medium">
                <input
                  v-if="inlineEditEnabled"
                  v-model.number="row.maximumScore"
                  type="number"
                  min="1"
                  class="w-20 mx-auto text-center px-2 py-1 text-[13.5px] font-semibold text-[#555555] bg-white border border-[#781D2B] rounded-[3px]"
                />
                <span v-else>{{ row.maximumScore }}</span>
              </td>

              <!-- Grade -->
              <td class="py-3.5 px-4 text-right">
                <input
                  v-if="inlineEditEnabled"
                  v-model="row.grade"
                  type="text"
                  class="w-16 ml-auto text-center px-2 py-1 text-[13px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
                />
                <span
                  v-else
                  class="inline-flex items-center justify-center min-w-[38px] px-2.5 py-0.5 rounded-[3px] text-[12px] font-bold border"
                  :class="
                    pageData.decision.state === 'Pending'
                      ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                      : gradePillClass(row.grade)
                  "
                >
                  {{ pageData.decision.state === 'Pending' ? '—' : row.grade }}
                </span>
              </td>
            </tr>
          </tbody>

          <!-- Total Score & Overall Grade Footer -->
          <tfoot>
            <tr class="bg-[#FDF7F8] border-t-2 border-[#781D2B]">
              <td class="py-4 px-4 font-bold text-[#781D2B] text-[14px]">
                Total Examination Score &amp; Overall Grade
              </td>
              <td class="py-4 px-4 text-center font-bold text-[#781D2B] text-[16px]">
                {{
                  pageData.decision.state === 'Pending'
                    ? 'Pending'
                    : `${totalObtainedScore} / ${totalMaximumScore}`
                }}
              </td>
              <td class="py-4 px-4 text-center text-[12.5px] font-semibold text-[#555555]">
                {{
                  pageData.decision.state === 'Pending'
                    ? 'In Moderation'
                    : `${Math.round((totalObtainedScore / (totalMaximumScore || 1)) * 100)}% Aggregate`
                }}
              </td>
              <td class="py-4 px-4 text-right">
                <input
                  v-if="inlineEditEnabled"
                  v-model="pageData.overallGradeLabel"
                  type="text"
                  class="w-full max-w-[220px] ml-auto px-2 py-1 text-[12.5px] font-bold text-[#781D2B] bg-white border border-[#781D2B] rounded-[3px]"
                />
                <span
                  v-else
                  class="inline-block px-3 py-1 rounded-[3px] bg-[#781D2B] text-white text-[12px] font-bold"
                >
                  {{ pageData.overallGradeLabel }}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <!-- 5. Prominent Admission Decision Card -->
    <section
      aria-labelledby="admission-decision-heading"
      class="bg-white border rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
      :class="
        pageData.decision.state === 'Accepted'
          ? 'border-[#BBF7D0] border-l-4 border-l-[#166534]'
          : pageData.decision.state === 'Pending'
            ? 'border-[#FDE68A] border-l-4 border-l-[#D97706]'
            : 'border-[#E2E4E9] border-l-4 border-l-[#781D2B]'
      "
    >
      <!-- Decision Header + State Switcher Pills -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EBECEF]"
      >
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            OFFICIAL SENATE DETERMINATION (SAMPLE)
          </span>
          <h2 id="admission-decision-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            Admission Decision
          </h2>
        </div>

        <!-- Separate Visual State Switcher for Admission Decision -->
        <div
          class="inline-flex bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] self-start sm:self-center gap-1"
        >
          <button
            v-for="stateOption in (['Accepted', 'Pending', 'Not Accepted'] as AdmissionDecisionState[])"
            :key="stateOption"
            type="button"
            class="px-2.5 py-1 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              pageData.decision.state === stateOption
                ? 'bg-[#781D2B] text-white'
                : 'text-[#555555] hover:text-[#252525]'
            "
            @click="emit('select-decision-state', stateOption)"
          >
            {{ stateOption }}
          </button>
        </div>
      </div>

      <!-- STATE A: ACCEPTED -->
      <div v-if="pageData.decision.state === 'Accepted'" class="space-y-5">
        <div class="p-5 rounded-[4px] bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-4">
          <div
            class="w-11 h-11 rounded-full bg-[#166534] text-white flex items-center justify-center shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <!-- Lucide CheckCircle2 Icon -->
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <div class="min-w-0 flex-1">
            <span
              class="inline-block px-2.5 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.08em] bg-[#166534] text-white"
            >
              Accepted for Admission
            </span>

            <input
              v-if="inlineEditEnabled"
              v-model="pageData.decision.acceptedHeading"
              type="text"
              class="w-full mt-2 px-2.5 py-1 text-[16px] font-bold text-[#14532D] bg-white border border-[#166534] rounded-[3px]"
            />
            <h3 v-else class="text-[17px] font-bold text-[#14532D] mt-2 leading-snug">
              {{ pageData.decision.acceptedHeading }}
            </h3>

            <textarea
              v-if="inlineEditEnabled"
              v-model="pageData.decision.acceptedMessage"
              rows="3"
              class="w-full mt-2 px-2.5 py-1.5 text-[13px] text-[#166534] bg-white border border-[#166534] rounded-[3px]"
            ></textarea>
            <p v-else class="text-[13.5px] text-[#166534] mt-1.5 leading-relaxed">
              {{ pageData.decision.acceptedMessage }}
            </p>
          </div>
        </div>

        <!-- Next-Step Instructions for Accepted Students -->
        <div class="p-5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <h4 class="text-[13.5px] font-bold uppercase tracking-[0.06em] text-[#252525] mb-3">
            Required Next Steps for Enrollment Confirmation
          </h4>
          <ol class="space-y-2.5">
            <li
              v-for="(stepText, idx) in pageData.decision.acceptedNextSteps"
              :key="idx"
              class="flex items-start gap-3 text-[13px] text-[#252525]"
            >
              <span
                class="w-6 h-6 rounded-full bg-[#781D2B] text-white text-[11.5px] font-bold flex items-center justify-center shrink-0 mt-0.5"
              >
                {{ idx + 1 }}
              </span>
              <input
                v-if="inlineEditEnabled"
                v-model="pageData.decision.acceptedNextSteps[idx]"
                type="text"
                class="w-full px-2.5 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
              />
              <span v-else class="leading-relaxed">{{ stepText }}</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- STATE B: PENDING -->
      <div
        v-else-if="pageData.decision.state === 'Pending'"
        class="p-5 rounded-[4px] bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-4"
      >
        <div
          class="w-11 h-11 rounded-full bg-[#D97706] text-white flex items-center justify-center shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <!-- Lucide Clock Icon -->
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        <div class="min-w-0 flex-1">
          <span
            class="inline-block px-2.5 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.08em] bg-[#D97706] text-white"
          >
            Decision Pending
          </span>

          <input
            v-if="inlineEditEnabled"
            v-model="pageData.decision.pendingHeading"
            type="text"
            class="w-full mt-2 px-2.5 py-1 text-[16px] font-bold text-[#92400E] bg-white border border-[#D97706] rounded-[3px]"
          />
          <h3 v-else class="text-[17px] font-bold text-[#92400E] mt-2 leading-snug">
            {{ pageData.decision.pendingHeading }}
          </h3>

          <textarea
            v-if="inlineEditEnabled"
            v-model="pageData.decision.pendingMessage"
            rows="3"
            class="w-full mt-2 px-2.5 py-1.5 text-[13px] text-[#78350F] bg-white border border-[#D97706] rounded-[3px]"
          ></textarea>
          <p v-else class="text-[13.5px] text-[#78350F] mt-1.5 leading-relaxed">
            {{ pageData.decision.pendingMessage }}
          </p>
        </div>
      </div>

      <!-- STATE C: NOT ACCEPTED -->
      <div v-else class="space-y-4">
        <div class="p-5 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-4">
          <div
            class="w-11 h-11 rounded-full bg-[#991B1B] text-white flex items-center justify-center shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <!-- Lucide Info Icon -->
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="16" y2="12" />
              <line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
          </div>

          <div class="min-w-0 flex-1">
            <span
              class="inline-block px-2.5 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.08em] bg-[#991B1B] text-white"
            >
              Not Accepted
            </span>

            <input
              v-if="inlineEditEnabled"
              v-model="pageData.decision.notAcceptedHeading"
              type="text"
              class="w-full mt-2 px-2.5 py-1 text-[16px] font-bold text-[#7F1D1D] bg-white border border-[#991B1B] rounded-[3px]"
            />
            <h3 v-else class="text-[17px] font-bold text-[#7F1D1D] mt-2 leading-snug">
              {{ pageData.decision.notAcceptedHeading }}
            </h3>

            <textarea
              v-if="inlineEditEnabled"
              v-model="pageData.decision.notAcceptedMessage"
              rows="3"
              class="w-full mt-2 px-2.5 py-1.5 text-[13px] text-[#7F1D1D] bg-white border border-[#991B1B] rounded-[3px]"
            ></textarea>
            <p v-else class="text-[13.5px] text-[#7F1D1D] mt-1.5 leading-relaxed">
              {{ pageData.decision.notAcceptedMessage }}
            </p>
          </div>
        </div>

        <!-- Official Contact Information for Not Accepted State -->
        <div class="p-5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="text-[13.5px] font-bold uppercase tracking-[0.06em] text-[#781D2B]">
              Official Admissions Counseling &amp; Inquiry Contact
            </h4>
            <button
              type="button"
              class="text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
              @click="navigateTo('/contact')"
            >
              Open Contact Page →
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
            <div class="p-3 bg-white border border-[#E5E7EB] rounded-[3px]">
              <span class="block text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#6B7280]">
                Admissions Office
              </span>
              <p class="font-semibold text-[#252525] mt-0.5">
                {{ pageData.decision.contactOfficeName }}
              </p>
              <p class="text-[12px] text-[#555555] mt-0.5">
                {{ pageData.decision.contactLocation }}
              </p>
            </div>

            <div class="p-3 bg-white border border-[#E5E7EB] rounded-[3px]">
              <span class="block text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#6B7280]">
                Official Email &amp; Telephone
              </span>
              <p class="font-semibold text-[#781D2B] mt-0.5">
                {{ pageData.decision.contactEmail }}
              </p>
              <p class="text-[12px] text-[#252525] font-medium mt-0.5">
                {{ pageData.decision.contactPhone }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
