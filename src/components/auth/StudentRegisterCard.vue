<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { loginStudentSession } from '../../router'
import type { AuthScreenMode, StudentRegisterPayload } from '../../types/admissions'
import { validateRegisterForm } from '../../utils/helpers'
import AuthFooterLinks from './AuthFooterLinks.vue'

const props = defineProps<{
  previewValidation?: boolean
}>()

const emit = defineEmits<{
  (e: 'switch-screen', mode: AuthScreenMode): void
}>()

const form = reactive<StudentRegisterPayload>({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const submitted = ref(false)
const registerSuccess = ref(false)
const fieldErrors = ref<Partial<Record<keyof StudentRegisterPayload, string>>>({})

watch(
  () => props.previewValidation,
  (enabled) => {
    if (enabled) {
      fieldErrors.value = {
        fullName: 'Full name is required (as shown on National ID / BacII).',
        email: 'Please enter a valid email address.',
        phone: 'Enter a valid 8 to 10 digit phone number after +855.',
        password: 'Password must contain at least 8 characters.',
        confirmPassword: 'Passwords do not match.',
        agreeTerms: 'You must agree to the Terms and Conditions to create an account.',
      }
      registerSuccess.value = false
    } else if (!submitted.value) {
      fieldErrors.value = {}
    }
  },
  { immediate: true },
)

function handleSubmit() {
  submitted.value = true
  registerSuccess.value = false
  const errors = validateRegisterForm(form)
  fieldErrors.value = errors

  if (Object.keys(errors).length === 0) {
    registerSuccess.value = true
    loginStudentSession(form.email)
  }
}

function clearFieldError(field: keyof StudentRegisterPayload) {
  if (fieldErrors.value[field]) {
    const next = { ...fieldErrors.value }
    delete next[field]
    fieldErrors.value = next
  }
}
</script>

<template>
  <section
    aria-labelledby="register-heading"
    class="w-full max-w-[540px] bg-white border border-[#E0E2E7] border-t-4 border-t-[#781D2B] rounded-[2px] shadow-[0_6px_24px_rgba(37,37,37,0.06)] p-7 sm:p-10"
  >
    <!-- University Logo & System Name -->
    <div class="flex items-center gap-3.5 pb-6 mb-6 border-b border-[#EBECEF]">
      <img
        src="/images/rupp-logo.png"
        alt="University Logo"
        class="w-13 h-13 object-contain shrink-0"
      />
      <div class="min-w-0">
        <span class="khmer-title block text-[12px] text-[#781D2B] leading-snug">
          ប្រព័ន្ធចុះឈ្មោះចូលរៀនសាកលវិទ្យាល័យ
        </span>
        <span class="block text-[14.5px] font-bold tracking-[0.02em] text-[#252525] uppercase">
          University Registration System
        </span>
        <span class="block text-[11.5px] text-[#6B7280]">
          Applicant Account Registration
        </span>
      </div>
    </div>

    <!-- Heading & Subtitle -->
    <div class="mb-6">
      <span
        class="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-[#781D2B] mb-1.5"
      >
        SCREEN 2 — NEW APPLICANT REGISTRATION
      </span>
      <h1
        id="register-heading"
        class="text-[25px] sm:text-[27px] font-bold text-[#252525] leading-tight"
      >
        Create Your Student Account
      </h1>
      <p class="text-[14px] text-[#555555] mt-1.5 leading-relaxed">
        Register an account to begin your university application.
      </p>
    </div>

    <!-- Success Notification Banner -->
    <div
      v-if="registerSuccess"
      role="status"
      class="mb-5 p-3.5 rounded-[2px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-[13px] flex items-start gap-2.5"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0 mt-0.5"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
      <div>
        <p class="font-semibold">Student account created successfully</p>
        <p class="text-[12px] mt-0.5">
          A verification message has been sent to your registered email address.
        </p>
      </div>
    </div>

    <!-- Registration Form -->
    <form class="flex flex-col gap-4" novalidate @submit.prevent="handleSubmit">
      <!-- Full Name -->
      <div class="flex flex-col gap-1.5">
        <label for="register-fullname" class="text-[13px] font-semibold text-[#252525]">
          Full Name <span class="text-[#781D2B]">*</span>
        </label>
        <div class="relative">
          <span
            class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B7280] pointer-events-none"
            aria-hidden="true"
          >
            <!-- Lucide User icon -->
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input
            id="register-fullname"
            v-model="form.fullName"
            type="text"
            autocomplete="name"
            placeholder="e.g. Sokha Chan"
            :aria-invalid="Boolean(fieldErrors.fullName)"
            class="w-full pl-10 pr-3.5 py-2.5 text-[14px] text-[#252525] bg-white border rounded-[2px] transition-colors focus:outline-none"
            :class="
              fieldErrors.fullName
                ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                : 'border-[#D1D5DB] focus:border-[#781D2B]'
            "
            @input="clearFieldError('fullName')"
          />
        </div>
        <p
          class="text-[12px] flex items-center gap-1.5 min-h-[18px]"
          :class="fieldErrors.fullName ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
        >
          <svg
            v-if="fieldErrors.fullName"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            {{ fieldErrors.fullName || 'Enter your full legal name as shown on your National ID.' }}
          </span>
        </p>
      </div>

      <!-- Email Address -->
      <div class="flex flex-col gap-1.5">
        <label for="register-email" class="text-[13px] font-semibold text-[#252525]">
          Email Address <span class="text-[#781D2B]">*</span>
        </label>
        <div class="relative">
          <span
            class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B7280] pointer-events-none"
            aria-hidden="true"
          >
            <!-- Lucide Mail icon -->
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <input
            id="register-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="sokha.chan@email.com"
            :aria-invalid="Boolean(fieldErrors.email)"
            class="w-full pl-10 pr-3.5 py-2.5 text-[14px] text-[#252525] bg-white border rounded-[2px] transition-colors focus:outline-none"
            :class="
              fieldErrors.email
                ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                : 'border-[#D1D5DB] focus:border-[#781D2B]'
            "
            @input="clearFieldError('email')"
          />
        </div>
        <p
          class="text-[12px] flex items-center gap-1.5 min-h-[18px]"
          :class="fieldErrors.email ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
        >
          <svg
            v-if="fieldErrors.email"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            {{ fieldErrors.email || 'Official admission notices will be sent to this address.' }}
          </span>
        </p>
      </div>

      <!-- Phone Number with Cambodia Country Code (+855) -->
      <div class="flex flex-col gap-1.5">
        <label for="register-phone" class="text-[13px] font-semibold text-[#252525]">
          Phone Number <span class="text-[#781D2B]">*</span>
        </label>
        <div class="flex items-stretch">
          <div
            class="inline-flex items-center gap-2 px-3.5 bg-[#F5F6F8] border border-r-0 rounded-l-[2px] text-[13.5px] font-semibold text-[#252525] select-none shrink-0"
            :class="fieldErrors.phone ? 'border-[#B91C1C]' : 'border-[#D1D5DB]'"
            aria-label="Cambodia Country Code +855"
          >
            <!-- Lucide Phone icon -->
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#781D2B"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            <span>KH +855</span>
          </div>
          <input
            id="register-phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel-national"
            placeholder="12 345 678"
            :aria-invalid="Boolean(fieldErrors.phone)"
            class="w-full px-3.5 py-2.5 text-[14px] text-[#252525] bg-white border rounded-r-[2px] transition-colors focus:outline-none"
            :class="
              fieldErrors.phone
                ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                : 'border-[#D1D5DB] focus:border-[#781D2B]'
            "
            @input="clearFieldError('phone')"
          />
        </div>
        <p
          class="text-[12px] flex items-center gap-1.5 min-h-[18px]"
          :class="fieldErrors.phone ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
        >
          <svg
            v-if="fieldErrors.phone"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            {{ fieldErrors.phone || 'Enter your active Cambodia mobile number without leading zero.' }}
          </span>
        </p>
      </div>

      <!-- Password & Confirm Password Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Password -->
        <div class="flex flex-col gap-1.5">
          <label for="register-password" class="text-[13px] font-semibold text-[#252525]">
            Password <span class="text-[#781D2B]">*</span>
          </label>
          <div class="relative">
            <input
              id="register-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Create password"
              :aria-invalid="Boolean(fieldErrors.password)"
              class="w-full pl-3.5 pr-9 py-2.5 text-[14px] text-[#252525] bg-white border rounded-[2px] transition-colors focus:outline-none"
              :class="
                fieldErrors.password
                  ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                  : 'border-[#D1D5DB] focus:border-[#781D2B]'
              "
              @input="clearFieldError('password')"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#6B7280] hover:text-[#252525] cursor-pointer"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="showPassword"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                />
                <path
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <p
            class="text-[11.5px] flex items-center gap-1 min-h-[18px]"
            :class="fieldErrors.password ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
          >
            <span>{{ fieldErrors.password || 'At least 8 characters.' }}</span>
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="flex flex-col gap-1.5">
          <label for="register-confirm-password" class="text-[13px] font-semibold text-[#252525]">
            Confirm Password <span class="text-[#781D2B]">*</span>
          </label>
          <div class="relative">
            <input
              id="register-confirm-password"
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Re-enter password"
              :aria-invalid="Boolean(fieldErrors.confirmPassword)"
              class="w-full pl-3.5 pr-9 py-2.5 text-[14px] text-[#252525] bg-white border rounded-[2px] transition-colors focus:outline-none"
              :class="
                fieldErrors.confirmPassword
                  ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                  : 'border-[#D1D5DB] focus:border-[#781D2B]'
              "
              @input="clearFieldError('confirmPassword')"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#6B7280] hover:text-[#252525] cursor-pointer"
              :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <svg
                v-if="showConfirmPassword"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                />
                <path
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <p
            class="text-[11.5px] flex items-center gap-1 min-h-[18px]"
            :class="fieldErrors.confirmPassword ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
          >
            <span>{{ fieldErrors.confirmPassword || 'Must match password.' }}</span>
          </p>
        </div>
      </div>

      <!-- Agree to Terms and Conditions Checkbox -->
      <div class="pt-1">
        <label class="inline-flex items-start gap-2.5 cursor-pointer select-none">
          <input
            v-model="form.agreeTerms"
            type="checkbox"
            class="w-4 h-4 mt-0.5 accent-[#781D2B] rounded-[2px] border-[#D1D5DB] cursor-pointer"
            @change="clearFieldError('agreeTerms')"
          />
          <span class="text-[13px] text-[#252525] leading-snug">
            I agree to the university
            <span class="font-semibold text-[#781D2B]">Terms and Conditions</span>
            and confirm that my registration details are accurate.
          </span>
        </label>
        <p
          v-if="fieldErrors.agreeTerms"
          class="text-[12px] text-[#B91C1C] font-medium mt-1.5 flex items-center gap-1.5"
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
            class="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{{ fieldErrors.agreeTerms }}</span>
        </p>
      </div>

      <!-- Burgundy Create Account Button -->
      <button
        type="submit"
        class="w-full mt-1 py-3 px-5 bg-[#781D2B] hover:bg-[#5E1520] text-white font-semibold text-[14px] rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <!-- Lucide UserPlus icon -->
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" x2="19" y1="8" y2="14" />
          <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
        <span>Create Account</span>
      </button>
    </form>

    <!-- Already Have an Account Link -->
    <div
      class="mt-6 pt-5 border-t border-[#EBECEF] text-center text-[13.5px] text-[#555555]"
    >
      <span>Already have an account?</span>
      <button
        type="button"
        class="ml-1.5 font-semibold text-[#781D2B] hover:underline cursor-pointer"
        @click="emit('switch-screen', 'login')"
      >
        Sign In
      </button>
    </div>

    <!-- Footer with Contact, Help Center, Privacy Policy -->
    <AuthFooterLinks />
  </section>
</template>
