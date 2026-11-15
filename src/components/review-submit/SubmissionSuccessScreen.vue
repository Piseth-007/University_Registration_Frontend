<script setup lang="ts">
defineProps<{
  referenceNumber: string
  applicantName: string
  academicYear: string
  submissionDate: string
  selectedFaculty: string
  selectedMajor: string
}>()

const emit = defineEmits<{
  (e: 'view-application-status'): void
  (e: 'return-dashboard'): void
  (e: 'back-to-review'): void
}>()
</script>

<template>
  <section
    aria-labelledby="submission-success-heading"
    class="bg-white border border-[#E2E4E9] border-t-4 border-t-[#166534] rounded-[4px] p-8 sm:p-12 shadow-[0_6px_24px_rgba(37,37,37,0.05)] max-w-[760px] mx-auto text-center"
  >
    <!-- 12. Success Icon -->
    <div
      class="w-18 h-18 rounded-full bg-[#DCFCE7] border-2 border-[#BBF7D0] text-[#166534] flex items-center justify-center mx-auto mb-5 shadow-xs"
      aria-hidden="true"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    </div>

    <span
      class="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-[#166534] bg-[#F0FDF4] border border-[#BBF7D0] px-3 py-1 rounded-[3px]"
    >
      OFFICIAL SUBMISSION RECEIPT
    </span>

    <!-- Heading -->
    <h1
      id="submission-success-heading"
      class="text-[26px] sm:text-[30px] font-bold text-[#252525] mt-3 leading-tight"
    >
      Application Submitted Successfully
    </h1>

    <!-- Message Explaining Admission Office Review -->
    <p class="text-[14.5px] text-[#555555] mt-2.5 max-w-[580px] mx-auto leading-relaxed">
      Thank you for submitting your admission application. The
      <strong class="text-[#252525]">Office of Admissions &amp; Academic Records</strong> will review your application dossier and uploaded documents. You will receive an official notification once your verification status is updated.
    </p>

    <!-- Application Reference Number & Receipt Details Card -->
    <div
      class="mt-7 p-5 rounded-[4px] bg-[#FAFAFB] border border-[#E2E4E9] text-left grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div class="p-3.5 bg-white rounded-[4px] border border-[#E5E7EB]">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Application Reference Number
        </span>
        <p class="text-[16px] font-bold text-[#781D2B] mt-1">
          {{ referenceNumber }}
        </p>
      </div>

      <div class="p-3.5 bg-white rounded-[4px] border border-[#E5E7EB]">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Submission Date &amp; Status
        </span>
        <p class="text-[14px] font-bold text-[#166534] mt-1">
          Submitted • {{ submissionDate }}
        </p>
      </div>

      <div class="p-3.5 bg-white rounded-[4px] border border-[#E5E7EB]">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Applicant Name &amp; Intake
        </span>
        <p class="text-[13.5px] font-semibold text-[#252525] mt-1">
          {{ applicantName }} ({{ academicYear }})
        </p>
      </div>

      <div class="p-3.5 bg-white rounded-[4px] border border-[#E5E7EB]">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Selected Program
        </span>
        <p class="text-[13.5px] font-semibold text-[#252525] mt-1">
          {{ selectedMajor }}
        </p>
      </div>
    </div>

    <!-- Action Buttons: View Application Status & Return to Dashboard -->
    <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
      <button
        type="button"
        class="w-full sm:w-auto px-6 py-2.75 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        @click="emit('view-application-status')"
      >
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
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </svg>
        <span>View Application Status</span>
      </button>

      <button
        type="button"
        class="w-full sm:w-auto px-6 py-2.75 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[13.5px] font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
        @click="emit('return-dashboard')"
      >
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
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
        <span>Return to Dashboard</span>
      </button>
    </div>

    <div class="mt-5">
      <button
        type="button"
        class="text-[12px] font-semibold text-[#6B7280] hover:text-[#781D2B] underline cursor-pointer"
        @click="emit('back-to-review')"
      >
        ← Return to Review &amp; Submit Form View
      </button>
    </div>
  </section>
</template>
