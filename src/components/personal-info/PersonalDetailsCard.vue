<script setup lang="ts">
import { genderOptions, nationalityOptions } from '../../data/personalInfoPageData'
import type { PersonalInformationFormPayload } from '../../types/admissions'
import FormFieldInput from './FormFieldInput.vue'
import FormFieldSelect from './FormFieldSelect.vue'

defineProps<{
  form: PersonalInformationFormPayload
  errors: Partial<Record<keyof PersonalInformationFormPayload, string>>
}>()

const emit = defineEmits<{
  (e: 'update-field', field: keyof PersonalInformationFormPayload, value: string): void
}>()
</script>

<template>
  <section
    aria-labelledby="personal-details-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Card Header -->
    <div class="flex items-start gap-3.5 pb-5 mb-6 border-b border-[#EBECEF]">
      <div
        class="w-10 h-10 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <!-- Lucide UserCheck Icon -->
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      </div>
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          SECTION 1 OF 3 • IDENTITY &amp; CIVIL RECORD
        </span>
        <h2 id="personal-details-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          Personal Details
        </h2>
        <p class="text-[13px] text-[#555555] mt-0.5">
          Enter your legal name and identity details exactly as shown on your Cambodian National ID or BacII certificate.
        </p>
      </div>
    </div>

    <!-- Two-Column Form Grid on Desktop, One-Column on Mobile -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- 1. Full Name in Khmer -->
      <FormFieldInput
        id="personal-fullname-kh"
        label="Full Name in Khmer"
        :model-value="form.fullNameKhmer"
        placeholder="e.g. ចាន់ សុខា"
        required
        :error-message="errors.fullNameKhmer"
        helper-text="Use official Khmer Unicode script (Family name followed by Given name)."
        @update:model-value="emit('update-field', 'fullNameKhmer', $event)"
      />

      <!-- 2. Full Name in English -->
      <FormFieldInput
        id="personal-fullname-en"
        label="Full Name in English"
        :model-value="form.fullNameEnglish"
        placeholder="e.g. CHAN SOKHA"
        required
        :error-message="errors.fullNameEnglish"
        helper-text="Use uppercase Latin characters matching your National ID or Passport."
        @update:model-value="emit('update-field', 'fullNameEnglish', $event)"
      />

      <!-- 3. Gender Dropdown -->
      <FormFieldSelect
        id="personal-gender"
        label="Gender"
        :model-value="form.gender"
        placeholder="Select gender (Male, Female, Other)"
        :options="genderOptions"
        required
        :error-message="errors.gender"
        helper-text="Select your gender as recorded on official civil documents."
        @update:model-value="emit('update-field', 'gender', $event)"
      />

      <!-- 4. Date of Birth Date Picker -->
      <FormFieldInput
        id="personal-dob"
        label="Date of Birth"
        type="date"
        :model-value="form.dateOfBirth"
        required
        :error-message="errors.dateOfBirth"
        helper-text="Select your date of birth (DD/MM/YYYY)."
        @update:model-value="emit('update-field', 'dateOfBirth', $event)"
      />

      <!-- 5. Nationality Dropdown -->
      <FormFieldSelect
        id="personal-nationality"
        label="Nationality"
        :model-value="form.nationality"
        placeholder="Select nationality (e.g. Cambodian)"
        :options="nationalityOptions"
        required
        :error-message="errors.nationality"
        helper-text="Specify your citizenship status for tuition classification."
        @update:model-value="emit('update-field', 'nationality', $event)"
      />

      <!-- 6. Place of Birth -->
      <FormFieldInput
        id="personal-pob"
        label="Place of Birth"
        :model-value="form.placeOfBirth"
        placeholder="e.g. Khan Tuol Kouk, Phnom Penh"
        required
        :error-message="errors.placeOfBirth"
        helper-text="District/Khan and Province/Capital of birth as stated on Birth Certificate."
        @update:model-value="emit('update-field', 'placeOfBirth', $event)"
      />

      <!-- 7. National ID / Passport Number -->
      <div class="md:col-span-2">
        <FormFieldInput
          id="personal-national-id"
          label="National ID / Passport Number"
          :model-value="form.nationalIdOrPassport"
          placeholder="e.g. 010894521 (9-digit Khmer National ID) or N01234567"
          required
          :error-message="errors.nationalIdOrPassport"
          helper-text="Enter your 9-digit Cambodian National ID number or valid Passport number."
          @update:model-value="emit('update-field', 'nationalIdOrPassport', $event)"
        />
      </div>
    </div>
  </section>
</template>
