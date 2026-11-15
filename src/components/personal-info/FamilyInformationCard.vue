<script setup lang="ts">
import type { PersonalInformationFormPayload } from '../../types/admissions'
import FormFieldInput from './FormFieldInput.vue'

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
    aria-labelledby="family-information-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Card Header -->
    <div class="flex items-start gap-3.5 pb-5 mb-6 border-b border-[#EBECEF]">
      <div
        class="w-10 h-10 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <!-- Lucide Users Icon -->
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
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          SECTION 3 OF 3 • PARENTS &amp; EMERGENCY CONTACT
        </span>
        <h2 id="family-information-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          Family Information
        </h2>
        <p class="text-[13px] text-[#555555] mt-0.5">
          Provide parent/guardian details and a reliable emergency contact person in Cambodia.
        </p>
      </div>
    </div>

    <!-- Two-Column Form Grid on Desktop, One-Column on Mobile -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- 1. Father's Full Name -->
      <FormFieldInput
        id="family-father-name"
        label="Father's Full Name"
        :model-value="form.fatherFullName"
        placeholder="e.g. Chan Dara (ចាន់ តារា)"
        required
        :error-message="errors.fatherFullName"
        helper-text="Enter father's full legal name in Khmer or English."
        @update:model-value="emit('update-field', 'fatherFullName', $event)"
      />

      <!-- 2. Father's Occupation -->
      <FormFieldInput
        id="family-father-occupation"
        label="Father's Occupation"
        :model-value="form.fatherOccupation"
        placeholder="e.g. Civil Servant / Secondary School Teacher"
        :error-message="errors.fatherOccupation"
        helper-text="Current profession, business, or retirement status."
        @update:model-value="emit('update-field', 'fatherOccupation', $event)"
      />

      <!-- 3. Mother's Full Name -->
      <FormFieldInput
        id="family-mother-name"
        label="Mother's Full Name"
        :model-value="form.motherFullName"
        placeholder="e.g. Sok Bopha (សុខ បុប្ផា)"
        required
        :error-message="errors.motherFullName"
        helper-text="Enter mother's full legal name in Khmer or English."
        @update:model-value="emit('update-field', 'motherFullName', $event)"
      />

      <!-- 4. Mother's Occupation -->
      <FormFieldInput
        id="family-mother-occupation"
        label="Mother's Occupation"
        :model-value="form.motherOccupation"
        placeholder="e.g. Small Business Owner / Merchant"
        :error-message="errors.motherOccupation"
        helper-text="Current profession, business, or homemaker status."
        @update:model-value="emit('update-field', 'motherOccupation', $event)"
      />

      <!-- 5. Emergency Contact Name -->
      <FormFieldInput
        id="family-emergency-name"
        label="Emergency Contact Name"
        :model-value="form.emergencyContactName"
        placeholder="e.g. Chan Dara (Father / Guardian)"
        required
        :error-message="errors.emergencyContactName"
        helper-text="Name and relationship of the person to contact in an emergency."
        @update:model-value="emit('update-field', 'emergencyContactName', $event)"
      />

      <!-- 6. Emergency Contact Phone -->
      <FormFieldInput
        id="family-emergency-phone"
        label="Emergency Contact Phone"
        type="tel"
        phone-prefix="+855"
        :model-value="form.emergencyContactPhone"
        placeholder="e.g. 17 890 123"
        required
        :error-message="errors.emergencyContactPhone"
        helper-text="Active Cambodia phone number for urgent university correspondence."
        @update:model-value="emit('update-field', 'emergencyContactPhone', $event)"
      />
    </div>
  </section>
</template>
