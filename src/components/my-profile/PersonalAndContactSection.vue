<script setup lang="ts">
import { computed } from 'vue'
import {
  profileCommuneOptions,
  profileDistrictByProvince,
  profileProvinceOptions,
} from '../../data/myProfilePageData'
import { navigateTo } from '../../router'
import type { StudentProfilePageData } from '../../types/admissions'

const props = defineProps<{
  profileData: StudentProfilePageData
  isEditingContact: boolean
  contactErrors: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'toggle-identity-lock'): void
  (e: 'start-edit-contact'): void
  (e: 'save-contact'): void
  (e: 'cancel-contact'): void
}>()

const availableDistricts = computed(
  () =>
    profileDistrictByProvince[props.profileData.contactInfo.provinceCity] ?? [
      'Toul Kork',
      'Chamkar Mon',
      'Daun Penh',
    ],
)

const availableCommunes = computed(
  () =>
    profileCommuneOptions[props.profileData.contactInfo.district] ?? [
      'Teuk Laak 1',
      'Boeung Kak 1',
      'Tonle Bassac',
    ],
)

function handleProvinceChange(newProvince: string) {
  props.profileData.contactInfo.provinceCity = newProvince
  const districts = profileDistrictByProvince[newProvince] ?? []
  props.profileData.contactInfo.district = districts[0] ?? ''
  const communes = profileCommuneOptions[props.profileData.contactInfo.district] ?? []
  props.profileData.contactInfo.commune = communes[0] ?? 'Central Sangkat'
}

function handleDistrictChange(newDistrict: string) {
  props.profileData.contactInfo.district = newDistrict
  const communes = profileCommuneOptions[newDistrict] ?? []
  props.profileData.contactInfo.commune = communes[0] ?? 'Central Sangkat'
}
</script>

<template>
  <div class="space-y-6">
    <!-- 5. Personal Information Section -->
    <section
      aria-labelledby="personal-profile-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EBECEF]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <!-- Lucide UserCheck / Shield Icon -->
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              IDENTITY RECORD
            </span>
            <h2 id="personal-profile-heading" class="text-[17px] font-bold text-[#252525]">
              Personal Information
            </h2>
          </div>
        </div>

        <!-- Lock Status Badge & Toggle for Testing Restricted vs Permitted State -->
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11px] font-bold uppercase tracking-[0.06em]"
            :class="
              profileData.personalInfo.isVerifiedIdentityLocked
                ? 'bg-[#F3F4F6] text-[#4B5563] border border-[#D1D5DB]'
                : 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
            "
          >
            <!-- Lucide Lock / Unlock Icon -->
            <svg
              v-if="profileData.personalInfo.isVerifiedIdentityLocked"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>
              {{
                profileData.personalInfo.isVerifiedIdentityLocked
                  ? 'Read-Only (Verified Identity)'
                  : 'Editing Permitted (Unverified)'
              }}
            </span>
          </span>

          <button
            type="button"
            class="text-[11.5px] font-semibold text-[#781D2B] underline cursor-pointer"
            @click="emit('toggle-identity-lock')"
          >
            {{
              profileData.personalInfo.isVerifiedIdentityLocked
                ? 'Simulate Unverified (Unlock)'
                : 'Lock Verified Identity'
            }}
          </button>
        </div>
      </div>

      <!-- Restricted Personal Information Guidance Notice -->
      <div
        v-if="profileData.personalInfo.isVerifiedIdentityLocked"
        class="bg-[#FAFAFB] border border-[#E5E7EB] border-l-4 border-l-[#781D2B] rounded-[4px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div class="text-[12.5px] text-[#555555] leading-relaxed">
          <strong class="text-[#252525]">Restricted Identity Fields:</strong>
          Because your admission application has been submitted or verified against your National ID Card, core identity fields are read-only. To request an official correction, please contact the Admission Office.
        </div>

        <button
          type="button"
          class="self-start sm:self-center shrink-0 px-3.5 py-1.75 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[12px] font-semibold transition-colors cursor-pointer"
          @click="navigateTo('/contact')"
        >
          Contact Admission Office →
        </button>
      </div>

      <!-- Two-Column Form Layout on Desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- 1. Full Name (English) -->
        <div>
          <label
            for="profile-fullname-en"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Full Name (English)
          </label>
          <input
            id="profile-fullname-en"
            v-model="profileData.personalInfo.fullNameEnglish"
            type="text"
            :readonly="profileData.personalInfo.isVerifiedIdentityLocked"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              profileData.personalInfo.isVerifiedIdentityLocked
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#555555] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
        </div>

        <!-- 2. Full Name (Khmer) -->
        <div>
          <label
            for="profile-fullname-km"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Full Name (Khmer)
          </label>
          <input
            id="profile-fullname-km"
            v-model="profileData.personalInfo.fullNameKhmer"
            type="text"
            lang="km"
            :readonly="profileData.personalInfo.isVerifiedIdentityLocked"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              profileData.personalInfo.isVerifiedIdentityLocked
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#555555] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
        </div>

        <!-- 3. Gender -->
        <div>
          <label
            for="profile-gender"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Gender
          </label>
          <input
            id="profile-gender"
            v-model="profileData.personalInfo.gender"
            type="text"
            :readonly="profileData.personalInfo.isVerifiedIdentityLocked"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              profileData.personalInfo.isVerifiedIdentityLocked
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#555555] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
        </div>

        <!-- 4. Date of Birth -->
        <div>
          <label
            for="profile-dob"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Date of Birth
          </label>
          <input
            id="profile-dob"
            v-model="profileData.personalInfo.dateOfBirth"
            type="text"
            :readonly="profileData.personalInfo.isVerifiedIdentityLocked"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              profileData.personalInfo.isVerifiedIdentityLocked
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#555555] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
        </div>

        <!-- 5. Nationality -->
        <div class="sm:col-span-2">
          <label
            for="profile-nationality"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Nationality
          </label>
          <input
            id="profile-nationality"
            v-model="profileData.personalInfo.nationality"
            type="text"
            :readonly="profileData.personalInfo.isVerifiedIdentityLocked"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              profileData.personalInfo.isVerifiedIdentityLocked
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#555555] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
        </div>
      </div>
    </section>

    <!-- 6. Contact Information Section -->
    <section
      aria-labelledby="contact-profile-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EBECEF]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <!-- Lucide MapPin / Mail Icon -->
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              COMMUNICATION &amp; RESIDENCE
            </span>
            <h2 id="contact-profile-heading" class="text-[17px] font-bold text-[#252525]">
              Contact Information
            </h2>
          </div>
        </div>

        <!-- Edit Contact Information Button -->
        <button
          v-if="!isEditingContact"
          type="button"
          class="self-start sm:self-center px-3.5 py-1.75 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          @click="emit('start-edit-contact')"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
          <span>Edit Contact Information</span>
        </button>
      </div>

      <!-- Contact Form Fields (Two-Column Layout) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- 1. Email Address -->
        <div>
          <label
            for="profile-email"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Email Address <span class="text-[#781D2B]">*</span>
          </label>
          <input
            id="profile-email"
            v-model="profileData.contactInfo.emailAddress"
            type="email"
            :readonly="!isEditingContact"
            placeholder="sample.student@student.rupp.edu.kh"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              contactErrors.emailAddress
                ? 'bg-[#FEF2F2] border-[#991B1B] text-[#252525]'
                : !isEditingContact
                  ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525]'
                  : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
          <p v-if="contactErrors.emailAddress" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
            {{ contactErrors.emailAddress }}
          </p>
        </div>

        <!-- 2. Phone Number -->
        <div>
          <label
            for="profile-phone"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Phone Number <span class="text-[#781D2B]">*</span>
          </label>
          <input
            id="profile-phone"
            v-model="profileData.contactInfo.phoneNumber"
            type="tel"
            :readonly="!isEditingContact"
            placeholder="+855 12 345 678"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              contactErrors.phoneNumber
                ? 'bg-[#FEF2F2] border-[#991B1B] text-[#252525]'
                : !isEditingContact
                  ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525]'
                  : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
          <p v-if="contactErrors.phoneNumber" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
            {{ contactErrors.phoneNumber }}
          </p>
        </div>

        <!-- 3. Current Address (Full width) -->
        <div class="sm:col-span-2">
          <label
            for="profile-current-address"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Current Address <span class="text-[#781D2B]">*</span>
          </label>
          <input
            id="profile-current-address"
            v-model="profileData.contactInfo.currentAddress"
            type="text"
            :readonly="!isEditingContact"
            placeholder="House #24B, Street 271, Village 4"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              contactErrors.currentAddress
                ? 'bg-[#FEF2F2] border-[#991B1B] text-[#252525]'
                : !isEditingContact
                  ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525]'
                  : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          />
          <p v-if="contactErrors.currentAddress" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
            {{ contactErrors.currentAddress }}
          </p>
        </div>

        <!-- 4. Province / City -->
        <div>
          <label
            for="profile-province"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Province / City <span class="text-[#781D2B]">*</span>
          </label>
          <select
            id="profile-province"
            :value="profileData.contactInfo.provinceCity"
            :disabled="!isEditingContact"
            class="w-full h-10 px-3 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              !isEditingContact
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
            @change="handleProvinceChange(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="prov in profileProvinceOptions" :key="prov" :value="prov">
              {{ prov }}
            </option>
          </select>
        </div>

        <!-- 5. District -->
        <div>
          <label
            for="profile-district"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            District / Khan <span class="text-[#781D2B]">*</span>
          </label>
          <select
            id="profile-district"
            :value="profileData.contactInfo.district"
            :disabled="!isEditingContact"
            class="w-full h-10 px-3 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              !isEditingContact
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
            @change="handleDistrictChange(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="dist in availableDistricts" :key="dist" :value="dist">
              {{ dist }}
            </option>
          </select>
        </div>

        <!-- 6. Commune -->
        <div class="sm:col-span-2">
          <label
            for="profile-commune"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Commune / Sangkat <span class="text-[#781D2B]">*</span>
          </label>
          <select
            id="profile-commune"
            v-model="profileData.contactInfo.commune"
            :disabled="!isEditingContact"
            class="w-full h-10 px-3 rounded-[4px] text-[13.5px] border transition-colors"
            :class="
              !isEditingContact
                ? 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525] cursor-not-allowed'
                : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
            "
          >
            <option v-for="comm in availableCommunes" :key="comm" :value="comm">
              {{ comm }}
            </option>
          </select>
          <p v-if="contactErrors.commune" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
            {{ contactErrors.commune }}
          </p>
        </div>
      </div>

      <!-- Save Changes & Cancel Buttons when Editing Contact Info -->
      <div
        v-if="isEditingContact"
        class="pt-4 border-t border-[#EBECEF] flex flex-wrap items-center justify-end gap-3"
      >
        <button
          type="button"
          class="px-4 py-2.25 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[13px] font-semibold transition-colors cursor-pointer"
          @click="emit('cancel-contact')"
        >
          Cancel
        </button>

        <button
          type="button"
          class="px-5 py-2.25 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
          @click="emit('save-contact')"
        >
          Save Changes
        </button>
      </div>
    </section>
  </div>
</template>
