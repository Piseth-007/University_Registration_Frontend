<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { loginStudentSession } from '../../router'
import type { AuthScreenMode, StudentLoginPayload } from '../../types/admissions'
import { validateLoginForm } from '../../utils/helpers'
import AuthFooterLinks from './AuthFooterLinks.vue'

const props = defineProps<{
  previewValidation?: boolean
}>()

const emit = defineEmits<{
  (e: 'switch-screen', mode: AuthScreenMode): void
}>()

const form = reactive<StudentLoginPayload>({
  email: '',
  password: '',
  rememberMe: false,
})

const showPassword = ref(false)
const submitted = ref(false)
const loginSuccess = ref(false)
const fieldErrors = ref<Partial<Record<keyof StudentLoginPayload, string>>>({})

watch(
  () => props.previewValidation,
  (enabled) => {
    if (enabled) {
      fieldErrors.value = {
        email: 'Please enter a valid university or personal email address.',
        password: 'Password must be at least 8 characters long.',
      }
      loginSuccess.value = false
    } else if (!submitted.value) {
      fieldErrors.value = {}
    }
  },
  { immediate: true },
)

const emailError = computed(() => fieldErrors.value.email || '')
const passwordError = computed(() => fieldErrors.value.password || '')

function handleSubmit() {
  submitted.value = true
  loginSuccess.value = false
  const errors = validateLoginForm(form)
  fieldErrors.value = errors

  if (Object.keys(errors).length === 0) {
    loginSuccess.value = true
    loginStudentSession(form.email)
  }
}

function clearFieldError(field: keyof StudentLoginPayload) {
  if (fieldErrors.value[field]) {
    const next = { ...fieldErrors.value }
    delete next[field]
    fieldErrors.value = next
  }
}
</script>

<template>
  <section
    aria-labelledby="login-heading"
    class="w-full max-w-[480px] bg-white border border-[#E0E2E7] border-t-4 border-t-[#781D2B] rounded-[2px] shadow-[0_6px_24px_rgba(37,37,37,0.06)] p-7 sm:p-10"
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
          Office of Admissions &amp; Academic Records
        </span>
      </div>
    </div>

    <!-- Heading & Subtitle -->
    <div class="mb-6">
      <span
        class="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-[#781D2B] mb-1.5"
      >
        SCREEN 1 — STUDENT AUTHENTICATION
      </span>
      <h1
        id="login-heading"
        class="text-[26px] sm:text-[28px] font-bold text-[#252525] leading-tight"
      >
        Student Portal
      </h1>
      <p class="text-[14px] text-[#555555] mt-1.5 leading-relaxed">
        Sign in to manage your university application.
      </p>
    </div>

    <!-- Success Notification Banner -->
    <div
      v-if="loginSuccess"
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
        <p class="font-semibold">Authentication verified</p>
        <p class="text-[12px] mt-0.5">
          Welcome back. Your student application session is active.
        </p>
        <button
          type="button"
          class="mt-2 text-[12px] font-bold underline cursor-pointer"
          @click="loginStudentSession(form.email)"
        >
          Proceed to Student Dashboard →
        </button>
      </div>
    </div>

    <!-- Login Form -->
    <form class="flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
      <!-- Email Address Input -->
      <div class="flex flex-col gap-1.5">
        <label for="login-email" class="text-[13px] font-semibold text-[#252525]">
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
            id="login-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="student.name@email.com"
            :aria-invalid="Boolean(emailError)"
            aria-describedby="login-email-feedback"
            class="w-full pl-10 pr-3.5 py-2.5 text-[14px] text-[#252525] bg-white border rounded-[2px] transition-colors focus:outline-none"
            :class="
              emailError
                ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                : 'border-[#D1D5DB] focus:border-[#781D2B]'
            "
            @input="clearFieldError('email')"
          />
        </div>
        <!-- Validation Message Placeholder -->
        <p
          id="login-email-feedback"
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
              emailError || 'Use the email address registered with your admission profile.'
            }}
          </span>
        </p>
      </div>

      <!-- Password Input with Show/Hide Icon -->
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <label for="login-password" class="text-[13px] font-semibold text-[#252525]">
            Password <span class="text-[#781D2B]">*</span>
          </label>
        </div>
        <div class="relative">
          <span
            class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B7280] pointer-events-none"
            aria-hidden="true"
          >
            <!-- Lucide Lock icon -->
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
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            id="login-password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="Enter your password"
            :aria-invalid="Boolean(passwordError)"
            aria-describedby="login-password-feedback"
            class="w-full pl-10 pr-10 py-2.5 text-[14px] text-[#252525] bg-white border rounded-[2px] transition-colors focus:outline-none"
            :class="
              passwordError
                ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
                : 'border-[#D1D5DB] focus:border-[#781D2B]'
            "
            @input="clearFieldError('password')"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#252525] cursor-pointer"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="showPassword = !showPassword"
          >
            <!-- Lucide EyeOff icon -->
            <svg
              v-if="showPassword"
              width="17"
              height="17"
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
            <!-- Lucide Eye icon -->
            <svg
              v-else
              width="17"
              height="17"
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
        <!-- Validation Message Placeholder -->
        <p
          id="login-password-feedback"
          class="text-[12px] flex items-center gap-1.5 min-h-[18px]"
          :class="passwordError ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
        >
          <svg
            v-if="passwordError"
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
            {{ passwordError || 'Minimum 8 characters required.' }}
          </span>
        </p>
      </div>

      <!-- Remember Me Checkbox & Forgot Password Link -->
      <div class="flex items-center justify-between gap-2 pt-0.5">
        <label class="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            v-model="form.rememberMe"
            type="checkbox"
            class="w-4 h-4 accent-[#781D2B] rounded-[2px] border-[#D1D5DB] cursor-pointer"
          />
          <span class="text-[13px] text-[#252525]">Remember me</span>
        </label>

        <button
          type="button"
          class="text-[13px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
          @click="emit('switch-screen', 'forgot-password')"
        >
          Forgot password?
        </button>
      </div>

      <!-- Burgundy Sign In Button -->
      <button
        type="submit"
        class="w-full py-3 px-5 bg-[#781D2B] hover:bg-[#5E1520] text-white font-semibold text-[14px] rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <span>Sign In</span>
        <!-- Lucide ArrowRight icon -->
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
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </form>

    <!-- Create Account Link -->
    <div
      class="mt-6 pt-5 border-t border-[#EBECEF] text-center text-[13.5px] text-[#555555]"
    >
      <span>Don't have an account?</span>
      <button
        type="button"
        class="ml-1.5 font-semibold text-[#781D2B] hover:underline cursor-pointer"
        @click="emit('switch-screen', 'register')"
      >
        Create Account
      </button>
    </div>

    <!-- Footer with Contact, Help Center, Privacy Policy -->
    <AuthFooterLinks />
  </section>
</template>
