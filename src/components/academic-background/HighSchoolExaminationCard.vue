<script setup lang="ts">
import { computed } from 'vue'
import {
  examinationStatusOptions,
  gradeResultOptions,
  graduationYearOptions,
} from '../../data/academicBackgroundPageData'
import type { AcademicBackgroundFormPayload } from '../../types/admissions'
import FormFieldInput from '../personal-info/FormFieldInput.vue'
import FormFieldSelect from '../personal-info/FormFieldSelect.vue'

const props = defineProps<{
  form: AcademicBackgroundFormPayload
  errors: Partial<Record<keyof AcademicBackgroundFormPayload, string>>
}>()

const emit = defineEmits<{
  (e: 'update-field', field: keyof AcademicBackgroundFormPayload, value: string): void
}>()

const isPassed = computed(() => props.form.examinationStatus === 'Passed')
</script>

<template>
  <section
    aria-labelledby="high-school-exam-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Card Header -->
    <div class="flex items-start gap-3.5 pb-5 mb-6 border-b border-[#EBECEF]">
      <div
        class="w-10 h-10 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <!-- Lucide Award / Certificate Icon -->
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </div>
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          SECTION 2 OF 3 • NATIONAL BACII EXAMINATION
        </span>
        <h2 id="high-school-exam-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          High School Examination
        </h2>
        <p class="text-[13px] text-[#555555] mt-0.5">
          Enter your Ministry of Education, Youth and Sport (MoEYS) National High School Diploma (BacII) examination details.
        </p>
      </div>
    </div>

    <!-- Two-Column Form Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- 1. Examination Status Dropdown (Passed / Pending / Not Yet Taken) -->
      <FormFieldSelect
        id="exam-status"
        label="Examination Status"
        :model-value="form.examinationStatus"
        placeholder="Select Status (Passed / Pending / Not Yet Taken)"
        :options="examinationStatusOptions"
        required
        :error-message="errors.examinationStatus"
        helper-text="Score, Grade, and Candidate Number are shown when status is 'Passed'."
        @update:model-value="emit('update-field', 'examinationStatus', $event)"
      />

      <!-- 2. Examination Year -->
      <FormFieldSelect
        id="exam-year"
        label="Examination Year"
        :model-value="form.examinationYear"
        placeholder="Select Examination Year (e.g. 2026)"
        :options="graduationYearOptions"
        required
        :error-message="errors.examinationYear"
        helper-text="Select the year you sat or will sit for the BacII examination."
        @update:model-value="emit('update-field', 'examinationYear', $event)"
      />

      <!-- 3. Examination Center -->
      <div :class="isPassed ? '' : 'md:col-span-2'">
        <FormFieldInput
          id="exam-center"
          label="Examination Center"
          :model-value="form.examinationCenter"
          placeholder="e.g. Preah Sisowath High School Center, Phnom Penh"
          required
          :error-message="errors.examinationCenter"
          helper-text="Official MoEYS examination center name."
          @update:model-value="emit('update-field', 'examinationCenter', $event)"
        />
      </div>

      <!-- Conditional Fields: Only shown when Examination Status is Passed -->
      <template v-if="isPassed">
        <!-- 4. Candidate Number -->
        <FormFieldInput
          id="exam-candidate-number"
          label="Candidate Number"
          :model-value="form.candidateNumber"
          placeholder="e.g. 120489 (Table / Seat Number)"
          required
          :error-message="errors.candidateNumber"
          helper-text="Enter your official BacII examination candidate / seat number."
          @update:model-value="emit('update-field', 'candidateNumber', $event)"
        />

        <!-- 5. Total Examination Score -->
        <FormFieldInput
          id="exam-total-score"
          label="Total Examination Score"
          :model-value="form.totalExaminationScore"
          placeholder="e.g. 428.50"
          required
          :error-message="errors.totalExaminationScore"
          helper-text="Enter your total numeric score recorded on your BacII transcript."
          @update:model-value="emit('update-field', 'totalExaminationScore', $event)"
        />

        <!-- 6. Grade / Result -->
        <FormFieldSelect
          id="exam-grade-result"
          label="Grade / Result"
          :model-value="form.gradeResult"
          placeholder="Select Overall Grade (Grade A – Grade E)"
          :options="gradeResultOptions"
          required
          :error-message="errors.gradeResult"
          helper-text="Select your official overall BacII grade level."
          @update:model-value="emit('update-field', 'gradeResult', $event)"
        />
      </template>
    </div>

    <!-- Info Notice when Status is Pending or Not Yet Taken -->
    <div
      v-if="!isPassed && form.examinationStatus"
      class="mt-3 p-3.5 rounded-[4px] bg-[#F5F6F8] border border-[#E2E4E9] text-[12.5px] text-[#555555] flex items-start gap-2.5"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#781D2B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <span>
        Because your examination status is set to
        <strong class="text-[#252525]">{{ form.examinationStatus }}</strong>, Candidate Number, Total Examination Score, and Grade / Result are hidden and may be submitted once official MoEYS results are released.
      </span>
    </div>
  </section>
</template>
