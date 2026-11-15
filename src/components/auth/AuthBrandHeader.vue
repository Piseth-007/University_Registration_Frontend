<script setup lang="ts">
import type { AuthScreenMode } from '../../types/admissions'

defineProps<{
  activeScreen: AuthScreenMode
  previewValidation: boolean
}>()

const emit = defineEmits<{
  (e: 'select-screen', mode: AuthScreenMode): void
  (e: 'toggle-validation'): void
}>()

const screenTabs: Array<{ mode: AuthScreenMode; step: string; label: string }> = [
  { mode: 'login', step: 'Screen 1', label: 'Student Login' },
  { mode: 'register', step: 'Screen 2', label: 'Create Student Account' },
  { mode: 'forgot-password', step: 'Screen 3', label: 'Forgot Password' },
]
</script>

<template>
  <div class="w-full mb-8">
    <div
      class="bg-white border border-[#E2E4E9] rounded-[2px] px-5 py-3.5 shadow-[0_1px_3px_rgba(37,37,37,0.04)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
    >
      <!-- Institutional Identity Summary -->
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-[2px] bg-[#781D2B] text-white flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide GraduationCap icon -->
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
            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
            <path d="M22 10v6" />
            <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
          </svg>
        </div>
        <div>
          <span class="block text-[10.5px] font-bold tracking-[0.12em] uppercase text-[#781D2B]">
            STUDENT AUTHENTICATION INTERFACE
          </span>
          <p class="text-[12.5px] text-[#555555]">
            Switch between the three authentication screens or toggle validation states
          </p>
        </div>
      </div>

      <!-- Screen Switcher Pills + Validation Preview Toggle -->
      <div class="flex flex-wrap items-center gap-2">
        <div
          class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[2px] border border-[#E2E4E9]"
          role="tablist"
          aria-label="Authentication Screens"
        >
          <button
            v-for="tab in screenTabs"
            :key="tab.mode"
            type="button"
            role="tab"
            :aria-selected="activeScreen === tab.mode"
            class="px-3 py-1.5 text-[12px] font-medium rounded-[2px] transition-colors cursor-pointer flex items-center gap-1.5"
            :class="
              activeScreen === tab.mode
                ? 'bg-[#781D2B] text-white font-semibold shadow-xs'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-screen', tab.mode)"
          >
            <span
              class="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px]"
              :class="
                activeScreen === tab.mode
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-[#6E6E6E] border border-[#E2E4E9]'
              "
            >
              {{ tab.step }}
            </span>
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <button
          type="button"
          class="px-3 py-1.5 text-[12px] font-medium rounded-[2px] border transition-colors cursor-pointer inline-flex items-center gap-1.5"
          :class="
            previewValidation
              ? 'bg-[#FDF2F4] border-[#781D2B] text-[#781D2B] font-semibold'
              : 'bg-white border-[#D6D9E0] text-[#252525] hover:border-[#781D2B]'
          "
          @click="emit('toggle-validation')"
        >
          <!-- Lucide AlertCircle icon -->
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{{ previewValidation ? 'Validation Preview: ON' : 'Preview Validation' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
