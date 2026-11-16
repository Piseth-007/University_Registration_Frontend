<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
  ChangePasswordFormState,
  StudentProfilePageData,
} from '../../types/admissions'

const props = defineProps<{
  profileData: StudentProfilePageData
  passwordForm: ChangePasswordFormState
  passwordErrors: Record<string, string>
  passwordModalOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'open-password-modal'): void
  (e: 'close-password-modal'): void
  (e: 'submit-password-change'): void
  (e: 'save-preferences'): void
}>()

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const reqMinLength = computed(() => props.passwordForm.newPassword.length >= 8)
const reqUpperAndLower = computed(
  () =>
    /[A-Z]/.test(props.passwordForm.newPassword) &&
    /[a-z]/.test(props.passwordForm.newPassword),
)
const reqNumber = computed(() => /[0-9]/.test(props.passwordForm.newPassword))
</script>

<template>
  <div class="space-y-6">
    <!-- 7. Security Settings Card -->
    <section
      aria-labelledby="security-settings-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EBECEF]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <!-- Lucide KeyRound / ShieldLock Icon -->
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
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              ACCOUNT PROTECTION
            </span>
            <h2 id="security-settings-heading" class="text-[17px] font-bold text-[#252525]">
              Security Settings
            </h2>
          </div>
        </div>

        <!-- Open Change Password Modal Button -->
        <button
          type="button"
          class="self-start sm:self-center px-3.5 py-1.75 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12px] font-semibold transition-colors cursor-pointer"
          @click="emit('open-password-modal')"
        >
          Change Password Modal
        </button>
      </div>

      <!-- Inline Password Update Form -->
      <form class="space-y-4" novalidate @submit.prevent="emit('submit-password-change')">
        <!-- Current Password -->
        <div>
          <label
            for="inline-current-password"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Current Password <span class="text-[#781D2B]">*</span>
          </label>
          <div class="relative">
            <input
              id="inline-current-password"
              v-model="passwordForm.currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Enter current password"
              class="w-full h-10 pl-3.5 pr-16 rounded-[4px] text-[13.5px] border transition-colors"
              :class="
                passwordErrors.currentPassword
                  ? 'bg-[#FEF2F2] border-[#991B1B] text-[#252525]'
                  : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
              "
            />
            <button
              type="button"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11.5px] font-semibold text-[#6B7280] hover:text-[#781D2B] cursor-pointer px-1.5 py-0.5"
              @click="showCurrentPassword = !showCurrentPassword"
            >
              {{ showCurrentPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p
            v-if="passwordErrors.currentPassword"
            class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
          >
            {{ passwordErrors.currentPassword }}
          </p>
        </div>

        <!-- New Password -->
        <div>
          <label
            for="inline-new-password"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            New Password <span class="text-[#781D2B]">*</span>
          </label>
          <div class="relative">
            <input
              id="inline-new-password"
              v-model="passwordForm.newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="Enter new password"
              class="w-full h-10 pl-3.5 pr-16 rounded-[4px] text-[13.5px] border transition-colors"
              :class="
                passwordErrors.newPassword
                  ? 'bg-[#FEF2F2] border-[#991B1B] text-[#252525]'
                  : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
              "
            />
            <button
              type="button"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11.5px] font-semibold text-[#6B7280] hover:text-[#781D2B] cursor-pointer px-1.5 py-0.5"
              @click="showNewPassword = !showNewPassword"
            >
              {{ showNewPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p
            v-if="passwordErrors.newPassword"
            class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
          >
            {{ passwordErrors.newPassword }}
          </p>
        </div>

        <!-- Confirm New Password -->
        <div>
          <label
            for="inline-confirm-password"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Confirm New Password <span class="text-[#781D2B]">*</span>
          </label>
          <div class="relative">
            <input
              id="inline-confirm-password"
              v-model="passwordForm.confirmNewPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Re-enter new password"
              class="w-full h-10 pl-3.5 pr-16 rounded-[4px] text-[13.5px] border transition-colors"
              :class="
                passwordErrors.confirmNewPassword
                  ? 'bg-[#FEF2F2] border-[#991B1B] text-[#252525]'
                  : 'bg-white border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none'
              "
            />
            <button
              type="button"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11.5px] font-semibold text-[#6B7280] hover:text-[#781D2B] cursor-pointer px-1.5 py-0.5"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              {{ showConfirmPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p
            v-if="passwordErrors.confirmNewPassword"
            class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
          >
            {{ passwordErrors.confirmNewPassword }}
          </p>
        </div>

        <!-- Password Requirements Guidance -->
        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] space-y-2">
          <span class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#252525]">
            Password Requirements Guidance
          </span>
          <ul class="space-y-1.5 text-[12px]">
            <li
              class="flex items-center gap-2"
              :class="reqMinLength ? 'text-[#166534] font-semibold' : 'text-[#555555]'"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="reqMinLength ? 'bg-[#166534]' : 'bg-[#9CA3AF]'"
              ></span>
              <span>At least 8 characters long</span>
            </li>
            <li
              class="flex items-center gap-2"
              :class="reqUpperAndLower ? 'text-[#166534] font-semibold' : 'text-[#555555]'"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="reqUpperAndLower ? 'bg-[#166534]' : 'bg-[#9CA3AF]'"
              ></span>
              <span>Includes both uppercase (A–Z) and lowercase (a–z) letters</span>
            </li>
            <li
              class="flex items-center gap-2"
              :class="reqNumber ? 'text-[#166534] font-semibold' : 'text-[#555555]'"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="reqNumber ? 'bg-[#166534]' : 'bg-[#9CA3AF]'"
              ></span>
              <span>Includes at least one numerical digit (0–9)</span>
            </li>
          </ul>
        </div>

        <button
          type="submit"
          class="w-full py-2.5 px-4 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
        >
          Update Account Password
        </button>
      </form>
    </section>

    <!-- 8. Preferences Section -->
    <section
      aria-labelledby="preferences-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div class="pb-4 border-b border-[#EBECEF] flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide SlidersHorizontal / Globe Icon -->
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            LANGUAGE &amp; ALERTS
          </span>
          <h2 id="preferences-heading" class="text-[17px] font-bold text-[#252525]">
            Preferences
          </h2>
        </div>
      </div>

      <!-- Language Selection Dropdown -->
      <div>
        <label
          for="profile-language-select"
          class="block text-[12px] font-bold text-[#252525] mb-1.5"
        >
          Portal Display Language
        </label>
        <select
          id="profile-language-select"
          v-model="profileData.preferences.language"
          class="w-full h-10 px-3 rounded-[4px] text-[13.5px] bg-white border border-[#D1D5DB] text-[#252525] focus:border-[#781D2B] focus:outline-none"
        >
          <option value="English">English (International Academic Standard)</option>
          <option value="Khmer">Khmer (ភាសាខ្មែរ — ផ្លូវការ)</option>
        </select>
      </div>

      <!-- Supported Notification Channel Toggle Switches -->
      <div class="space-y-3 pt-1">
        <span class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
          Supported Notification Channels
        </span>

        <!-- 1. Email Notification Preference -->
        <div
          class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] flex items-center justify-between gap-3"
        >
          <div>
            <p class="text-[13.5px] font-bold text-[#252525]">
              Email Notification Preference
            </p>
            <p class="text-[12px] text-[#6B7280] mt-0.5">
              Receive official admission updates and document verification alerts via email.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            :aria-checked="profileData.preferences.emailNotifications"
            class="w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0"
            :class="
              profileData.preferences.emailNotifications ? 'bg-[#781D2B]' : 'bg-[#D1D5DB]'
            "
            @click="
              profileData.preferences.emailNotifications =
                !profileData.preferences.emailNotifications
            "
          >
            <span
              class="block w-5 h-5 rounded-full bg-white shadow-xs transition-transform"
              :class="
                profileData.preferences.emailNotifications
                  ? 'translate-x-5'
                  : 'translate-x-0'
              "
            ></span>
          </button>
        </div>

        <!-- 2. In-App Notification Preference -->
        <div
          class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] flex items-center justify-between gap-3"
        >
          <div>
            <p class="text-[13.5px] font-bold text-[#252525]">
              In-App Notification Preference
            </p>
            <p class="text-[12px] text-[#6B7280] mt-0.5">
              Display real-time alerts in your Student Portal Notifications inbox.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            :aria-checked="profileData.preferences.inAppNotifications"
            class="w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0"
            :class="
              profileData.preferences.inAppNotifications ? 'bg-[#781D2B]' : 'bg-[#D1D5DB]'
            "
            @click="
              profileData.preferences.inAppNotifications =
                !profileData.preferences.inAppNotifications
            "
          >
            <span
              class="block w-5 h-5 rounded-full bg-white shadow-xs transition-transform"
              :class="
                profileData.preferences.inAppNotifications
                  ? 'translate-x-5'
                  : 'translate-x-0'
              "
            ></span>
          </button>
        </div>
      </div>

      <button
        type="button"
        class="w-full py-2.5 px-4 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[13px] font-semibold transition-colors cursor-pointer"
        @click="emit('save-preferences')"
      >
        Save Preferences
      </button>
    </section>

    <!-- 9. Change Password Modal Dialog -->
    <div
      v-if="passwordModalOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-modal-title"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="emit('close-password-modal')"
    >
      <div
        class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[480px] w-full overflow-hidden"
      >
        <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
          <h3 id="change-password-modal-title" class="text-[16px] font-bold">
            Change Account Password
          </h3>
          <button
            type="button"
            class="p-1 text-white/85 hover:text-white cursor-pointer"
            aria-label="Close modal"
            @click="emit('close-password-modal')"
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

        <form
          class="p-6 space-y-4"
          novalidate
          @submit.prevent="emit('submit-password-change')"
        >
          <div>
            <label
              for="modal-current-password"
              class="block text-[12px] font-bold text-[#252525] mb-1"
            >
              Current Password <span class="text-[#781D2B]">*</span>
            </label>
            <input
              id="modal-current-password"
              v-model="passwordForm.currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Enter current password"
              class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border"
              :class="
                passwordErrors.currentPassword
                  ? 'bg-[#FEF2F2] border-[#991B1B]'
                  : 'bg-white border-[#D1D5DB]'
              "
            />
            <p
              v-if="passwordErrors.currentPassword"
              class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
            >
              {{ passwordErrors.currentPassword }}
            </p>
          </div>

          <div>
            <label
              for="modal-new-password"
              class="block text-[12px] font-bold text-[#252525] mb-1"
            >
              New Password <span class="text-[#781D2B]">*</span>
            </label>
            <input
              id="modal-new-password"
              v-model="passwordForm.newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="At least 8 characters, 1 uppercase & 1 number"
              class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border"
              :class="
                passwordErrors.newPassword
                  ? 'bg-[#FEF2F2] border-[#991B1B]'
                  : 'bg-white border-[#D1D5DB]'
              "
            />
            <p
              v-if="passwordErrors.newPassword"
              class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
            >
              {{ passwordErrors.newPassword }}
            </p>
          </div>

          <div>
            <label
              for="modal-confirm-password"
              class="block text-[12px] font-bold text-[#252525] mb-1"
            >
              Confirm New Password <span class="text-[#781D2B]">*</span>
            </label>
            <input
              id="modal-confirm-password"
              v-model="passwordForm.confirmNewPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm new password"
              class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border"
              :class="
                passwordErrors.confirmNewPassword
                  ? 'bg-[#FEF2F2] border-[#991B1B]'
                  : 'bg-white border-[#D1D5DB]'
              "
            />
            <p
              v-if="passwordErrors.confirmNewPassword"
              class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
            >
              {{ passwordErrors.confirmNewPassword }}
            </p>
          </div>

          <div class="pt-3 border-t border-[#E2E4E9] flex justify-end gap-2.5">
            <button
              type="button"
              class="px-4 py-2 rounded-[4px] border border-[#D1D5DB] bg-white text-[#252525] text-[12.5px] font-semibold cursor-pointer"
              @click="emit('close-password-modal')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold cursor-pointer"
            >
              Save New Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
