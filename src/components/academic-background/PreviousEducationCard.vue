<script setup lang="ts">
import { highestEducationLevelOptions } from '../../data/academicBackgroundPageData'
import type { AcademicBackgroundFormPayload } from '../../types/admissions'
import FormFieldInput from '../personal-info/FormFieldInput.vue'
import FormFieldSelect from '../personal-info/FormFieldSelect.vue'

defineProps<{
  form: AcademicBackgroundFormPayload
  errors: Partial<Record<keyof AcademicBackgroundFormPayload, string>>
}>()

const emit = defineEmits<{
  (e: 'update-field', field: keyof AcademicBackgroundFormPayload, value: string): void
}>()
</script>

<template>
  <section
    aria-labelledby="previous-education-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Card Header -->
    <div class="flex items-start gap-3.5 pb-5 mb-6 border-b border-[#EBECEF]">
      <div
        class="w-10 h-10 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <!-- Lucide GraduationCap Icon -->
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
          <path
            d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
          />
          <path d="M22 10v6" />
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
      </div>
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          SECTION 3 OF 3 • PRIOR POST-SECONDARY &amp; CERTIFICATES
        </span>
        <h2 id="previous-education-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          Previous Education
        </h2>
        <p class="text-[13px] text-[#555555] mt-0.5">
          Indicate your highest completed education level and any prior university, institute, or language qualifications.
        </p>
      </div>
    </div>

    <!-- Two-Column Form Grid on Desktop, Single-Column on Mobile -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- 1. Highest Education Level -->
      <FormFieldSelect
        id="prev-highest-level"
        label="Highest Education Level"
        :model-value="form.highestEducationLevel"
        placeholder="Select Highest Education Level (e.g. High School Diploma)"
        :options="highestEducationLevelOptions"
        required
        :error-message="errors.highestEducationLevel"
        helper-text="Select your highest formal academic qualification completed to date."
        @update:model-value="emit('update-field', 'highestEducationLevel', $event)"
      />

      <!-- 2. Previous Institution (Optional) -->
      <FormFieldInput
        id="prev-institution"
        label="Previous Institution"
        :model-value="form.previousInstitution"
        placeholder="e.g. Institute of Foreign Languages (IFL) / ACE Cambodia"
        :error-message="errors.previousInstitution"
        helper-text="If transferring or holding a prior diploma, state the institution name."
        @update:model-value="emit('update-field', 'previousInstitution', $event)"
      />

      <!-- 3. Additional Qualifications (Optional Textarea) -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label
          for="prev-additional-qualifications"
          class="text-[13px] font-semibold text-[#252525] flex items-center gap-1"
        >
          <span>Additional Qualifications</span>
          <span class="text-[11px] font-normal text-[#6B7280] ml-1">(Optional)</span>
        </label>
        <textarea
          id="prev-additional-qualifications"
          :value="form.additionalQualifications"
          rows="4"
          placeholder="e.g. IELTS Overall 6.5, National Outstanding Student Olympiad Award in Mathematics, Microsoft Office / ICDL Certificate..."
          class="w-full px-3.5 py-2.5 text-[13.5px] text-[#252525] bg-white border border-[#D1D5DB] rounded-[4px] transition-colors focus:border-[#781D2B] focus:outline-none placeholder:text-[#9CA3AF] resize-y"
          @input="
            emit(
              'update-field',
              'additionalQualifications',
              ($event.target as HTMLTextAreaElement).value,
            )
          "
        ></textarea>
        <p class="text-[12px] text-[#6B7280]">
          List any foreign language proficiency certificates, academic awards, or technical training relevant to your application.
        </p>
      </div>
    </div>
  </section>
</template>
