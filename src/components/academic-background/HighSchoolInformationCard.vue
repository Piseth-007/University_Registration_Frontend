<script setup lang="ts">
import { computed } from 'vue'
import {
  graduationYearOptions,
  schoolTypeOptions,
} from '../../data/academicBackgroundPageData'
import { cambodiaLocations } from '../../data/personalInfoPageData'
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

const provinceOptions = computed(() =>
  cambodiaLocations.map((prov) => ({
    value: prov.id,
    label: prov.name,
  })),
)

const selectedProvinceObj = computed(() =>
  cambodiaLocations.find((p) => p.id === props.form.provinceCity),
)

const districtOptions = computed(() => {
  if (!selectedProvinceObj.value) {
    return cambodiaLocations.flatMap((p) =>
      p.districts.map((d) => ({
        value: d.id,
        label: d.name,
      })),
    )
  }
  return selectedProvinceObj.value.districts.map((d) => ({
    value: d.id,
    label: d.name,
  }))
})

function handleProvinceChange(val: string) {
  emit('update-field', 'provinceCity', val)
  emit('update-field', 'districtKhan', '')
}
</script>

<template>
  <section
    aria-labelledby="high-school-info-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Card Header -->
    <div class="flex items-start gap-3.5 pb-5 mb-6 border-b border-[#EBECEF]">
      <div
        class="w-10 h-10 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <!-- Lucide School / Building2 Icon -->
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
          <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
          <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
          <path d="M18 5v17" />
          <path d="m4 6 8-4 8 4" />
          <path d="M6 5v17" />
          <circle cx="12" cy="9" r="2" />
        </svg>
      </div>
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          SECTION 1 OF 3 • SECONDARY EDUCATION RECORD
        </span>
        <h2 id="high-school-info-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          High School Information
        </h2>
        <p class="text-[13px] text-[#555555] mt-0.5">
          Provide the official name and location of the upper secondary school where you completed Grade 12.
        </p>
      </div>
    </div>

    <!-- Clean Two-Column Form on Desktop, Single-Column on Mobile -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- 1. High School Name (Khmer) -->
      <FormFieldInput
        id="hs-name-kh"
        label="High School Name (Khmer)"
        :model-value="form.highSchoolNameKhmer"
        placeholder="e.g. វិទ្យាល័យព្រះស៊ីសុវត្ថិ"
        required
        :error-message="errors.highSchoolNameKhmer"
        helper-text="Enter the official Khmer name of your high school."
        @update:model-value="emit('update-field', 'highSchoolNameKhmer', $event)"
      />

      <!-- 2. High School Name (English) -->
      <FormFieldInput
        id="hs-name-en"
        label="High School Name (English)"
        :model-value="form.highSchoolNameEnglish"
        placeholder="e.g. Preah Sisowath High School"
        required
        :error-message="errors.highSchoolNameEnglish"
        helper-text="Enter the English name of your high school."
        @update:model-value="emit('update-field', 'highSchoolNameEnglish', $event)"
      />

      <!-- 3. Province / City Dropdown -->
      <FormFieldSelect
        id="hs-province"
        label="Province / City"
        :model-value="form.provinceCity"
        placeholder="Select Province / Capital City (e.g. Phnom Penh)"
        :options="provinceOptions"
        required
        :error-message="errors.provinceCity"
        helper-text="Select the province or municipality where your school is located."
        @update:model-value="handleProvinceChange"
      />

      <!-- 4. District / Khan Dropdown -->
      <FormFieldSelect
        id="hs-district"
        label="District / Khan"
        :model-value="form.districtKhan"
        placeholder="Select District / Khan (e.g. Khan Daun Penh)"
        :options="districtOptions"
        required
        :error-message="errors.districtKhan"
        helper-text="Select the District (Srok), Krong, or Khan of your high school."
        @update:model-value="emit('update-field', 'districtKhan', $event)"
      />

      <!-- 5. School Type Dropdown (Public / Private) -->
      <FormFieldSelect
        id="hs-type"
        label="School Type"
        :model-value="form.schoolType"
        placeholder="Select School Type (Public / Private)"
        :options="schoolTypeOptions"
        required
        :error-message="errors.schoolType"
        helper-text="Specify whether the institution is a Public or Private high school."
        @update:model-value="emit('update-field', 'schoolType', $event)"
      />

      <!-- 6. Graduation Year Dropdown -->
      <FormFieldSelect
        id="hs-graduation-year"
        label="Graduation Year"
        :model-value="form.graduationYear"
        placeholder="Select Graduation Year (e.g. 2026)"
        :options="graduationYearOptions"
        required
        :error-message="errors.graduationYear"
        helper-text="Select the academic year you completed or will complete Grade 12."
        @update:model-value="emit('update-field', 'graduationYear', $event)"
      />
    </div>
  </section>
</template>
