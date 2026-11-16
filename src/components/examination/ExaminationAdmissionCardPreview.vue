<script setup lang="ts">
import { ref } from 'vue'
import type { ExaminationPageData, ExaminationPageState } from '../../types/admissions'

defineProps<{
  pageData: ExaminationPageData
  activeState: ExaminationPageState
  inlineEditEnabled: boolean
}>()

const downloadedAt = ref<string | null>(null)
const showPrintModal = ref(false)

function handleDownloadCard() {
  const now = new Date()
  downloadedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  showPrintModal.value = true
}
</script>

<template>
  <section
    aria-labelledby="admission-card-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
  >
    <!-- Section Header -->
    <div class="pb-4 border-b border-[#EBECEF] flex items-center justify-between gap-2">
      <div>
        <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          OFFICIAL CANDIDATE PASS
        </span>
        <h2 id="admission-card-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
          Examination Admission Card
        </h2>
      </div>

      <span
        class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em]"
        :class="
          activeState === 'Not Yet Scheduled'
            ? 'bg-[#FEF3C7] text-[#92400E]'
            : activeState === 'Cancelled'
              ? 'bg-[#FEE2E2] text-[#991B1B]'
              : 'bg-[#DCFCE7] text-[#166534]'
        "
      >
        {{
          activeState === 'Not Yet Scheduled'
            ? 'Pending Issue'
            : activeState === 'Cancelled'
              ? 'Void / Reissuing'
              : 'Ready to Print'
        }}
      </span>
    </div>

    <!-- Official Institutional Admission Card Preview Frame -->
    <div
      class="border-2 border-[#781D2B] rounded-[4px] overflow-hidden bg-white shadow-xs"
      :class="activeState === 'Not Yet Scheduled' ? 'opacity-70' : ''"
    >
      <!-- Burgundy Institutional Header -->
      <div class="bg-[#781D2B] text-white px-4 py-3.5 flex items-center gap-3">
        <img
          src="/images/rupp-logo.png"
          alt="University Seal"
          class="w-10 h-10 object-contain shrink-0 bg-white rounded-full p-0.5"
        />
        <div class="min-w-0">
          <p class="khmer-title text-[11px] text-white/90 leading-tight truncate">
            ប័ណ្ណចូលបន្ទប់ប្រឡងជ្រើសរើសនិស្សិត
          </p>
          <p class="text-[13px] font-bold tracking-[0.04em] uppercase leading-snug truncate">
            Examination Admission Card
          </p>
          <p class="text-[10.5px] text-white/80">
            Academic Year {{ pageData.admissionCard.academicYear }}
          </p>
        </div>
      </div>

      <!-- Candidate Body: Photo Placeholder + Student & Exam Fields -->
      <div class="p-4 sm:p-5 space-y-4">
        <div class="flex flex-col sm:flex-row items-start gap-4">
          <!-- Student Photograph Placeholder (4x6 Portrait Aspect) -->
          <div
            class="w-[96px] h-[122px] rounded-[3px] bg-[#F5F6F8] border-2 border-dashed border-[#C4C7CE] flex flex-col items-center justify-center text-center p-2 shrink-0 mx-auto sm:mx-0"
          >
            <!-- Lucide User Icon -->
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#781D2B"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span class="text-[9.5px] font-bold uppercase tracking-[0.06em] text-[#555555] mt-1.5 leading-tight">
              Student Photo Placeholder
            </span>
            <span class="text-[9px] text-[#6B7280] mt-0.5">4 × 6 cm</span>
          </div>

          <!-- Candidate Identity & Reference -->
          <div class="min-w-0 flex-1 space-y-2.5 w-full">
            <div class="p-2.5 rounded-[3px] bg-[#FAFAFB] border border-[#EBECEF]">
              <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Student Name
              </span>
              <input
                v-if="inlineEditEnabled"
                v-model="pageData.admissionCard.studentName"
                type="text"
                class="w-full mt-0.5 px-2 py-0.5 text-[13px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
              />
              <p v-else class="text-[14px] font-bold text-[#252525] mt-0.5">
                {{ pageData.admissionCard.studentName }}
                <span class="text-[12.5px] font-medium text-[#555555] ml-1" lang="km">
                  ({{ pageData.admissionCard.studentNameKhmer }})
                </span>
              </p>
            </div>

            <div class="p-2.5 rounded-[3px] bg-[#FDF7F8] border border-[#EBCFD4]">
              <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#781D2B]">
                Application Reference Number
              </span>
              <input
                v-if="inlineEditEnabled"
                v-model="pageData.admissionCard.applicationReferenceNumber"
                type="text"
                class="w-full mt-0.5 px-2 py-0.5 text-[13px] font-bold text-[#781D2B] bg-white border border-[#781D2B] rounded-[3px]"
              />
              <p v-else class="text-[14px] font-bold text-[#781D2B] mt-0.5 tracking-wide">
                {{ pageData.admissionCard.applicationReferenceNumber }}
              </p>
            </div>
          </div>
        </div>

        <!-- Examination Assignment Details on Admission Card -->
        <div class="border-t border-[#EBECEF] pt-3.5 space-y-2.5 text-[12.5px]">
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Examination Center
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.admissionCard.examinationCenter"
              type="text"
              class="w-full mt-0.5 px-2 py-1 text-[12.5px] font-semibold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="font-semibold text-[#252525] mt-0.5">
              {{
                activeState === 'Not Yet Scheduled'
                  ? 'Pending Center Assignment'
                  : pageData.admissionCard.examinationCenter
              }}
            </p>
          </div>

          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Examination Date &amp; Time
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.admissionCard.examinationDateAndTime"
              type="text"
              class="w-full mt-0.5 px-2 py-1 text-[12.5px] font-semibold text-[#781D2B] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="font-bold text-[#781D2B] mt-0.5">
              {{
                activeState === 'Not Yet Scheduled'
                  ? 'Pending Schedule Publication'
                  : pageData.admissionCard.examinationDateAndTime
              }}
            </p>
          </div>

          <div class="p-2.5 rounded-[3px] bg-[#FAFAFB] border border-[#EBECEF]">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Room &amp; Seat Number
            </span>
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.admissionCard.roomAndSeatNumber"
              type="text"
              class="w-full mt-0.5 px-2 py-1 text-[12.5px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
            />
            <p v-else class="text-[13px] font-bold text-[#252525] mt-0.5">
              {{
                activeState === 'Not Yet Scheduled'
                  ? 'Room & Seat To Be Assigned'
                  : pageData.admissionCard.roomAndSeatNumber
              }}
            </p>
          </div>
        </div>

        <!-- Official Registrar Stamp & Signature Footer inside Card -->
        <div class="pt-3 border-t border-dashed border-[#D1D5DB] flex items-center justify-between text-[10.5px] text-[#6B7280]">
          <span>Candidate Signature: _______________</span>
          <span class="font-bold text-[#781D2B] uppercase tracking-wider">Registrar Verified</span>
        </div>
      </div>
    </div>

    <!-- Download Admission Card Button -->
    <div class="space-y-2.5">
      <button
        type="button"
        :disabled="activeState === 'Not Yet Scheduled' || activeState === 'Cancelled'"
        class="w-full py-2.75 px-4 rounded-[4px] text-[13.5px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
        :class="
          activeState === 'Not Yet Scheduled' || activeState === 'Cancelled'
            ? 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
            : 'bg-[#781D2B] hover:bg-[#5E1520] text-white cursor-pointer'
        "
        @click="handleDownloadCard"
      >
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
        <span>Download Admission Card</span>
      </button>

      <!-- Downloaded Confirmation Notice -->
      <p
        v-if="downloadedAt"
        class="text-[12px] font-semibold text-[#166534] bg-[#DCFCE7] border border-[#BBF7D0] rounded-[3px] px-3 py-2 text-center"
      >
        Admission Card PDF prepared at {{ downloadedAt }} (Sample Download).
      </p>
    </div>

    <!-- Print / Download Admission Card Modal -->
    <div
      v-if="showPrintModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-card-modal-title"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="showPrintModal = false"
    >
      <div class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[520px] w-full overflow-hidden">
        <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
          <h3 id="admission-card-modal-title" class="text-[16px] font-bold">
            Examination Admission Card — Print Ready
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
            {{ pageData.admissionCard.applicationReferenceNumber }} — {{ pageData.admissionCard.studentName }}
          </p>
          <p class="text-[#555555]">
            Your illustrative Examination Admission Card is ready to print on standard A4 paper. Please bring a physical copy along with your original National ID card on examination day.
          </p>
          <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] space-y-1">
            <p><strong>Center:</strong> {{ pageData.admissionCard.examinationCenter }}</p>
            <p><strong>Date &amp; Time:</strong> {{ pageData.admissionCard.examinationDateAndTime }}</p>
            <p><strong>Assignment:</strong> {{ pageData.admissionCard.roomAndSeatNumber }}</p>
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
