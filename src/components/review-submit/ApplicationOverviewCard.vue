<script setup lang="ts">
import type { ReviewApplicationSummaryData } from '../../types/admissions'

defineProps<{
  overview: ReviewApplicationSummaryData['overview']
  inlineEditEnabled: boolean
  activeDemoState: 'ready' | 'missing-docs' | 'confirm-modal' | 'success'
}>()

const emit = defineEmits<{
  (e: 'toggle-inline-edit'): void
  (e: 'select-demo-state', state: 'ready' | 'missing-docs' | 'confirm-modal' | 'success'): void
  (e: 'update-applicant-name', value: string): void
}>()
</script>

<template>
  <section
    aria-labelledby="review-application-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-6"
  >
    <!-- Page Heading + Edit & Update Controls -->
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-[#EBECEF]"
    >
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
          MY APPLICATION • ADMISSION DOSSIER MANAGEMENT
        </span>
        <h1
          id="review-application-heading"
          class="text-[24px] sm:text-[27px] font-bold text-[#252525] mt-1 leading-tight"
        >
          Manage &amp; Review Your Application
        </h1>
        <p class="text-[14px] text-[#555555] mt-1.5">
          Manage your personal information, academic background, faculty &amp; major selection, uploaded documents, and final application submission.
        </p>
      </div>

      <!-- Interactive Demo State & Edit Permission Controls -->
      <div class="flex flex-col sm:items-end gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold"
            :class="
              overview.applicationStatus === 'Submitted'
                ? 'bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]'
                : 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
            "
          >
            {{
              overview.applicationStatus === 'Submitted'
                ? 'Editing Locked (Submitted)'
                : 'Edit & Update Permitted'
            }}
          </span>

          <button
            v-if="overview.applicationStatus !== 'Submitted'"
            type="button"
            class="px-3 py-1 rounded-[3px] text-[11.5px] font-semibold border transition-colors cursor-pointer"
            :class="
              inlineEditEnabled
                ? 'bg-[#781D2B] text-white border-[#781D2B]'
                : 'bg-white text-[#781D2B] border-[#781D2B] hover:bg-[#FDF7F8]'
            "
            @click="emit('toggle-inline-edit')"
          >
            {{ inlineEditEnabled ? 'Save & Finish Inline Update' : 'Quick Inline Update' }}
          </button>
        </div>

        <div
          class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
        >
          <button
            type="button"
            class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activeDemoState === 'ready'
                ? 'bg-[#781D2B] text-white'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-demo-state', 'ready')"
          >
            1. Ready to Submit
          </button>
          <button
            type="button"
            class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activeDemoState === 'missing-docs'
                ? 'bg-[#781D2B] text-white'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-demo-state', 'missing-docs')"
          >
            2. Missing / Rejected Docs
          </button>
          <button
            type="button"
            class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activeDemoState === 'confirm-modal'
                ? 'bg-[#781D2B] text-white'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-demo-state', 'confirm-modal')"
          >
            3. Confirmation Modal
          </button>
          <button
            type="button"
            class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activeDemoState === 'success'
                ? 'bg-[#781D2B] text-white'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-demo-state', 'success')"
          >
            4. Submitted State
          </button>
        </div>
      </div>
    </div>

    <!-- Application Reference Number & Submission Status Card -->
    <div
      class="bg-[#FAFAFB] border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-5"
    >
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div class="flex items-center gap-2">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#781D2B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M7 16.5 8 22l-3-1-3 1 1-5.5" />
          </svg>
          <h2 class="text-[15.5px] font-bold text-[#252525]">
            Application Reference &amp; Submission Status
          </h2>
        </div>

        <span class="text-[11.5px] text-[#6B7280]">
          Official University Admission Dossier Record
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Application Reference Number -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Application Reference Number
          </span>
          <p class="text-[14px] font-bold text-[#781D2B] mt-1">
            {{ overview.referenceNumber }}
          </p>
        </div>

        <!-- Applicant Name -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Applicant Name
          </span>
          <input
            v-if="inlineEditEnabled"
            :value="overview.applicantName"
            type="text"
            aria-label="Applicant Name"
            class="w-full mt-1 px-2 py-1 text-[13.5px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            @input="emit('update-applicant-name', ($event.target as HTMLInputElement).value)"
          />
          <p v-else class="text-[14px] font-bold text-[#252525] mt-1">
            {{ overview.applicantName }}
          </p>
        </div>

        <!-- Academic Year -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Academic Year
          </span>
          <p class="text-[14px] font-bold text-[#252525] mt-1">
            {{ overview.academicYear }}
          </p>
        </div>

        <!-- Submission Status -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Submission Status
          </span>
          <div class="mt-1">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[12px] font-bold"
              :class="
                overview.applicationStatus === 'Submitted'
                  ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
                  : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
              "
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="
                  overview.applicationStatus === 'Submitted'
                    ? 'bg-[#166534]'
                    : 'bg-[#D97706]'
                "
              ></span>
              <span>{{ overview.applicationStatus }}</span>
            </span>
          </div>
        </div>

        <!-- Submission Date -->
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-3.5">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Submission Date
          </span>
          <p class="text-[14px] font-bold text-[#252525] mt-1">
            {{ overview.submissionDate }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
