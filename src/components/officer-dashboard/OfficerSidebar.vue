<script setup lang="ts">
import { navigateTo } from '../../router'
import type { OfficerNavId, OfficerSidebarItem } from '../../types/admissions'

defineProps<{
  items: OfficerSidebarItem[]
  activeId: OfficerNavId
  mobileOpen: boolean
  officerId: string
}>()

const emit = defineEmits<{
  (e: 'select', id: OfficerNavId): void
  (e: 'close-mobile'): void
  (e: 'logout'): void
}>()

function handleSelect(id: OfficerNavId) {
  emit('select', id)
  emit('close-mobile')

  if (id === 'dashboard') {
    navigateTo('/officer-dashboard')
  } else if (id === 'applications') {
    navigateTo('/officer-applications')
  }
}
</script>

<template>
  <!-- Mobile Backdrop Overlay -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
    aria-hidden="true"
    @click="emit('close-mobile')"
  ></div>

  <!-- Staff Administration Sidebar (Fixed on viewport) -->
  <aside
    aria-label="Admission Officer Sidebar Navigation"
    class="fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-[276px] h-screen shrink-0 bg-white border-r border-[#E2E4E9] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 overflow-hidden"
    :class="mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'"
  >
    <!-- Top Section: University Brand & 8 Staff Navigation Items -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- University Logo & Staff Portal Header -->
      <div
        class="px-5 py-5 border-b border-[#E8EAEF] flex items-center justify-between gap-3 shrink-0"
      >
        <a
          href="/officer-dashboard"
          class="flex items-center gap-3 min-w-0"
          @click.prevent="handleSelect('dashboard')"
        >
          <img
            src="/images/rupp-logo.png"
            alt="University Logo"
            class="w-11 h-11 object-contain shrink-0"
          />
          <div class="min-w-0">
            <span class="khmer-title block text-[10.5px] text-[#781D2B] leading-tight truncate">
              ប្រព័ន្ធគ្រប់គ្រងការចុះឈ្មោះចូលរៀន
            </span>
            <span
              class="block text-[13px] font-bold tracking-[0.01em] text-[#252525] leading-snug truncate"
            >
              University Registration System
            </span>
            <span
              class="inline-block mt-0.5 px-1.5 py-0.25 rounded-[2px] bg-[#FDF2F4] border border-[#F2D0D6] text-[9.5px] text-[#781D2B] font-bold uppercase tracking-[0.08em]"
            >
              Admission Officer Portal
            </span>
          </div>
        </a>

        <!-- Close button on mobile -->
        <button
          type="button"
          class="lg:hidden p-1.5 text-[#6B7280] hover:text-[#252525] rounded-[3px] cursor-pointer"
          aria-label="Close sidebar"
          @click="emit('close-mobile')"
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

      <!-- Navigation Section Label -->
      <div class="px-5 pt-4 pb-2 shrink-0">
        <span class="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
          Staff Administration Menu
        </span>
      </div>

      <!-- Sidebar Links (1–8) -->
      <nav
        aria-label="Admission Officer Navigation"
        class="px-3 pb-4 space-y-1 flex-1 overflow-y-auto"
      >
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-[4px] text-[13.5px] transition-colors cursor-pointer text-left"
          :class="
            activeId === item.id
              ? 'bg-[#781D2B] text-white font-semibold shadow-xs'
              : 'text-[#252525] font-medium hover:bg-[#F5F6F8] hover:text-[#781D2B]'
          "
          :aria-current="activeId === item.id ? 'page' : undefined"
          @click="handleSelect(item.id)"
        >
          <span class="flex items-center gap-3 min-w-0">
            <!-- 1. Dashboard -->
            <svg
              v-if="item.id === 'dashboard'"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>

            <!-- 2. Applications -->
            <svg
              v-else-if="item.id === 'applications'"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>

            <!-- 3. Document Verification -->
            <svg
              v-else-if="item.id === 'document-verification'"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="m3 15 2 2 4-4" />
            </svg>

            <!-- 4. Admission Decisions -->
            <svg
              v-else-if="item.id === 'admission-decisions'"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>

            <!-- 5. Student Directory -->
            <svg
              v-else-if="item.id === 'student-directory'"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>

            <!-- 6. Reports -->
            <svg
              v-else-if="item.id === 'reports'"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>

            <!-- 7. Notifications -->
            <svg
              v-else-if="item.id === 'notifications'"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>

            <!-- 8. My Profile -->
            <svg
              v-else
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>

            <span class="truncate">{{ item.label }}</span>
          </span>

          <span
            v-if="item.badge"
            class="text-[11px] font-semibold px-2 py-0.5 rounded-[3px]"
            :class="
              activeId === item.id
                ? 'bg-white/20 text-white'
                : 'bg-[#F5F6F8] text-[#781D2B] border border-[#E2E4E9]'
            "
          >
            {{ item.badge }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Bottom Section: Officer Credential Badge, Switch to Student Portal & 9. Logout -->
    <div class="p-3 border-t border-[#E8EAEF] bg-[#FAFAFB] shrink-0 space-y-2">
      <div class="px-3 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB]">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-[0.08em] text-[#781D2B]">
            Authorized Officer ID
          </span>
          <span class="text-[10px] font-semibold text-[#166534]">Verified Staff</span>
        </div>
        <span class="block text-[12.5px] font-bold text-[#252525] mt-0.5">
          {{ officerId }}
        </span>
      </div>

      <button
        type="button"
        class="w-full px-3 py-1.75 rounded-[4px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[12px] font-semibold transition-colors cursor-pointer text-left flex items-center justify-between"
        @click="navigateTo('/dashboard')"
      >
        <span>Switch to Student Portal</span>
        <span>→</span>
      </button>

      <!-- 9. Logout -->
      <button
        type="button"
        class="w-full flex items-center gap-3 px-3.5 py-2.25 rounded-[4px] text-[13.5px] font-semibold text-[#781D2B] hover:bg-[#FDF2F4] transition-colors cursor-pointer"
        @click="emit('logout')"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
        <span>9. Logout</span>
      </button>
    </div>
  </aside>
</template>
