<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { AuthScreenMode, StudentForgotPasswordPayload } from '../../types/admissions'
import { validateForgotPasswordForm } from '../../utils/helpers'
import AuthFooterLinks from './AuthFooterLinks.vue'

const props = defineProps<{
  previewValidation?: boolean
}>()

const emit = defineEmits<{
  (e: 'switch-screen', mode: AuthScreenMode): void
}>()

const form = reactive<StudentForgotPasswordPayload>({
  email: '',
})

const submitted = ref(false)
const resetLinkSent = ref(false)
const emailError = ref('')

watch(
  () => props.previewValidation,
  (enabled) => {
    if (enabled) {
      emailError.value = 'Please enter a valid registered email address.'
      resetLinkSent.value = false
    } else if (!submitted.value) {
      emailError.value = ''
    }
  },
  { immediate: true },
)

function handleSubmit() {
  submitted.value = true
  resetLinkSent.value = false
  const errors = validateForgotPasswordForm(form)
  emailError.value = errors.email || ''

  if (!emailError.value) {
    resetLinkSent.value = true
  }
}
</script>

<template>
  <section
    aria-labelledby="forgot-password-heading"
    class="w-full max-w-[460px] bg-white border border-[#E0E2E7] border-t-4 border-t-[#781D2B] rounded-[2px] shadow-[0_6px_24px_rgba(37,37,37,0.06)] p-7 sm:p-10"
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
          Account Password Recovery
        </span>
      </div>
    </div>

    <!-- Heading & Subtitle -->
    <div class="mb-6">
      <span
        class="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-[#781D2B] mb-1.5"
      >
        SCREEN 3 — PASSWORD RECOVERY
      </span>
      <h1
        id="forgot-password-heading"
        class="text-[26px] sm:text-[28px] font-bold text-[#252525] leading-tight"
      >
        Reset Your Password
      </h1>
      <p class="text-[14px] text-[#555555] mt-1.5 leading-relaxed">
        Enter your registered email address to receive password reset instructions.
      </p>
    </div>

    <!-- Confirmation Banner when Reset Link is Sent -->
    <div
      v-if="resetLinkSent"
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
        <p class="font-semibold">Password reset link sent</p>
        <p class="text-[12px] mt-0.5">
          Please check your inbox for instructions to create a new password.
        </p>
      </div>
    </div>

    <!-- Forgot Password Form -->
    <form class="flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
      <!-- Email Address Input -->
      <div class="flex flex-col gap-1.5">
        <label for="forgot-email" class="text-[13px] font-semibold text-[#252525]">
          Registered Email Address <span class="text-[#781D2B]">*</span>
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
            id="forgot-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="student.name@email.com"
            :aria-invalid="Boolean(emailError)"
            aria-describedby="forgot-email-feedback"
            class="w-full pl-10 pr-3.5 py-2.5 text-[14px] text-[#252525] bg-white border rounded-[2px] transition-colors focus:outline-none"
            :class="
              emailError
                ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                : 'border-[#D1D5DB] focus:border-[#781D2B]'
            "
            @input="emailError = ''"
          />
        </div>
        <!-- Validation Message Placeholder -->
        <p
          id="forgot-email-feedback"
          class="text-[12px] flex items-center gap-1.5 min-h-[18px]"
          :class="emailError ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
        >
          <svg
            v-if="emailError"
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
            {{
              emailError || 'A secure one-time password reset link will be sent to your inbox.'
            }}
          </span>
        </p>
      </div>

      <!-- Send Reset Link Button -->
      <button
        type="submit"
        class="w-full py-3 px-5 bg-[#781D2B] hover:bg-[#5E1520] text-white font-semibold text-[14px] rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <!-- Lucide Send icon -->
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
        <span>Send Reset Link</span>
      </button>
    </form>

    <!-- Back to Login Link -->
    <div class="mt-6 pt-5 border-t border-[#EBECEF] flex justify-center">
      <button
        type="button"
        class="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
        @click="emit('switch-screen', 'login')"
      >
        <!-- Lucide ArrowLeft icon -->
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span>Back to Login</span>
      </button>
    </div>

    <!-- Footer with Contact, Help Center, Privacy Policy -->
    <AuthFooterLinks />
  </section>
</template>
