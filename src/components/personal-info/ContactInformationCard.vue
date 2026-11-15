<script setup lang="ts">
import { computed } from 'vue'
import { cambodiaLocations } from '../../data/personalInfoPageData'
import type { PersonalInformationFormPayload } from '../../types/admissions'
import FormFieldInput from './FormFieldInput.vue'
import FormFieldSelect from './FormFieldSelect.vue'

const props = defineProps<{
  form: PersonalInformationFormPayload
  errors: Partial<Record<keyof PersonalInformationFormPayload, string>>
}>()

const emit = defineEmits<{
  (e: 'update-field', field: keyof PersonalInformationFormPayload, value: string): void
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
    // Provide realistic fallback districts if province not yet chosen
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

const selectedDistrictObj = computed(() => {
  for (const prov of cambodiaLocations) {
    const found = prov.districts.find((d) => d.id === props.form.districtKhan)
    if (found) return found
  }
  return undefined
})

const communeOptions = computed(() => {
  if (!selectedDistrictObj.value) {
    return [
      { value: "Sangkat Tuek L'ak Ti Muoy", label: "Sangkat Tuek L'ak Ti Muoy" },
      { value: "Sangkat Tuek L'ak Ti Pir", label: "Sangkat Tuek L'ak Ti Pir" },
      { value: 'Sangkat Boeng Kak Ti Muoy', label: 'Sangkat Boeng Kak Ti Muoy' },
      { value: 'Sangkat Tonle Bassac', label: 'Sangkat Tonle Bassac' },
      { value: 'Sangkat Phnom Penh Thmei', label: 'Sangkat Phnom Penh Thmei' },
      { value: 'Sangkat Svay Dangkum', label: 'Sangkat Svay Dangkum' },
    ]
  }
  return selectedDistrictObj.value.communes.map((c) => ({
    value: c,
    label: c,
  }))
})

function handleProvinceChange(val: string) {
  emit('update-field', 'provinceCity', val)
  emit('update-field', 'districtKhan', '')
  emit('update-field', 'communeSangkat', '')
}

function handleDistrictChange(val: string) {
  emit('update-field', 'districtKhan', val)
  emit('update-field', 'communeSangkat', '')
}
</script>

<template>
  <section
    aria-labelledby="contact-information-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- Card Header -->
    <div class="flex items-start gap-3.5 pb-5 mb-6 border-b border-[#EBECEF]">
      <div
        class="w-10 h-10 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <!-- Lucide MapPin Icon -->
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
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          SECTION 2 OF 3 • COMMUNICATION &amp; RESIDENCE
        </span>
        <h2 id="contact-information-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          Contact Information
        </h2>
        <p class="text-[13px] text-[#555555] mt-0.5">
          Provide an active email, Cambodia mobile number, and current residential address.
        </p>
      </div>
    </div>

    <!-- Two-Column Form Grid on Desktop, One-Column on Mobile -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- 1. Email Address -->
      <FormFieldInput
        id="contact-email"
        label="Email Address"
        type="email"
        :model-value="form.email"
        placeholder="e.g. sokha.chan@email.com"
        required
        :error-message="errors.email"
        helper-text="Admission notifications and examination slips will be sent here."
        @update:model-value="emit('update-field', 'email', $event)"
      />

      <!-- 2. Phone Number with +855 Country Code -->
      <FormFieldInput
        id="contact-phone"
        label="Phone Number"
        type="tel"
        phone-prefix="+855"
        :model-value="form.phone"
        placeholder="e.g. 12 345 678"
        required
        :error-message="errors.phone"
        helper-text="Enter your Cambodia mobile number without the leading zero."
        @update:model-value="emit('update-field', 'phone', $event)"
      />

      <!-- 3. Current Address (Full Width on Desktop) -->
      <div class="md:col-span-2">
        <FormFieldInput
          id="contact-current-address"
          label="Current Address"
          :model-value="form.currentAddress"
          placeholder="e.g. House No. 42B, Street 271, Russian Federation Blvd"
          required
          :error-message="errors.currentAddress"
          helper-text="Include house number, street number/name, and group (Krom) if applicable."
          @update:model-value="emit('update-field', 'currentAddress', $event)"
        />
      </div>

      <!-- 4. Province / City Dropdown -->
      <FormFieldSelect
        id="contact-province"
        label="Province / City"
        :model-value="form.provinceCity"
        placeholder="Select Province / Capital City (e.g. Phnom Penh)"
        :options="provinceOptions"
        required
        :error-message="errors.provinceCity"
        helper-text="Select your current province or Phnom Penh Capital."
        @update:model-value="handleProvinceChange"
      />

      <!-- 5. District / Khan Dropdown -->
      <FormFieldSelect
        id="contact-district"
        label="District / Khan"
        :model-value="form.districtKhan"
        placeholder="Select District / Khan (e.g. Khan Tuol Kouk)"
        :options="districtOptions"
        required
        :error-message="errors.districtKhan"
        helper-text="Select the administrative District (Srok), Municipality (Krong), or Khan."
        @update:model-value="handleDistrictChange"
      />

      <!-- 6. Commune / Sangkat Dropdown -->
      <FormFieldSelect
        id="contact-commune"
        label="Commune / Sangkat"
        :model-value="form.communeSangkat"
        placeholder="Select Commune / Sangkat (e.g. Sangkat Tuek L'ak Ti Muoy)"
        :options="communeOptions"
        required
        :error-message="errors.communeSangkat"
        helper-text="Select your Commune (Khum) or Sangkat."
        @update:model-value="emit('update-field', 'communeSangkat', $event)"
      />

      <!-- 7. Village -->
      <FormFieldInput
        id="contact-village"
        label="Village"
        :model-value="form.village"
        placeholder="e.g. Phum 4 (ភូមិ៤)"
        required
        :error-message="errors.village"
        helper-text="Enter your Village (Phum) name or number."
        @update:model-value="emit('update-field', 'village', $event)"
      />
    </div>
  </section>
</template>
