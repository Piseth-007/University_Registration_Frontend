<script setup lang="ts">
import type { DashboardNavId, DashboardSidebarItem } from '../../types/admissions'
import { logoutStudentSession, navigateTo, useRoute } from '../../router'

const props = defineProps<{
  items: DashboardSidebarItem[]
  activeId: DashboardNavId
  mobileOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: DashboardNavId): void
  (e: 'close-mobile'): void
  (e: 'logout'): void
}>()

const { path } = useRoute()

const applicationSubRoutes: Array<{ id: DashboardNavId; path: string; label: string }> = [
  { id: 'my-application', path: '/my-application', label: 'Application Hub & Overview' },
  { id: 'personal-info', path: '/personal-information', label: '1. Personal Information' },
  { id: 'academic-background', path: '/academic-background', label: '2. Academic Background' },
  { id: 'faculty-major', path: '/faculty-major', label: '3. Faculty & Major' },
  { id: 'documents', path: '/documents', label: '4. Uploaded Documents' },
  { id: 'review-submit', path: '/review-submit', label: '5. Review & Submission' },
]

function isMyApplicationActive(): boolean {
  return (
    props.activeId === 'my-application' ||
    props.activeId === 'personal-info' ||
    props.activeId === 'academic-background' ||
    props.activeId === 'faculty-major' ||
    props.activeId === 'documents' ||
    props.activeId === 'review-submit' ||
    path.value === '/my-application' ||
    path.value === '/personal-information' ||
    path.value === '/academic-background' ||
    path.value === '/faculty-major' ||
    path.value === '/documents' ||
    path.value === '/review-submit'
  )
}

function isItemHighlighted(itemId: DashboardNavId): boolean {
  if (itemId === 'my-application') {
    return isMyApplicationActive()
  }
  return props.activeId === itemId
}

function handleSelect(id: DashboardNavId) {
  emit('select', id)
  emit('close-mobile')

  if (id === 'dashboard') {
    navigateTo('/dashboard')
  } else if (id === 'my-application') {
    navigateTo('/my-application')
  } else if (id === 'results') {
    navigateTo('/results')
  } else if (id === 'help-support') {
    navigateTo('/contact')
  } else if (path.value !== '/dashboard') {
    navigateTo('/dashboard')
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

  <!-- Sidebar Container (Fixed on viewport, never scrolls up with page content) -->
  <aside
    aria-label="Student Portal Sidebar Navigation"
    class="fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-[272px] h-screen shrink-0 bg-white border-r border-[#E2E4E9] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 overflow-hidden"
    :class="mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'"
  >
    <!-- Top Section: University Brand & 7 Main Navigation Items -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- University Logo & System Name -->
      <div class="px-5 py-5 border-b border-[#E8EAEF] flex items-center justify-between gap-3 shrink-0">
        <a
          href="/dashboard"
          class="flex items-center gap-3 min-w-0 group"
          @click.prevent="handleSelect('dashboard')"
        >
          <img
            src="/images/rupp-logo.png"
            alt="University Logo"
            class="w-11 h-11 object-contain shrink-0"
          />
          <div class="min-w-0">
            <span class="khmer-title block text-[10.5px] text-[#781D2B] leading-tight truncate">
              ប្រព័ន្ធចុះឈ្មោះចូលរៀនសាកលវិទ្យាល័យ
            </span>
            <span
              class="block text-[13px] font-bold tracking-[0.01em] text-[#252525] leading-snug truncate"
            >
              University Registration System
            </span>
            <span
              class="block text-[10.5px] text-[#6B7280] font-medium uppercase tracking-[0.06em]"
            >
              Student Portal
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
          Student Portal Menu
        </span>
      </div>

      <!-- Sidebar Links (1–7) -->
      <nav aria-label="Student Dashboard Navigation" class="px-3 pb-4 space-y-1 flex-1 overflow-y-auto">
        <div v-for="item in items" :key="item.id">
          <button
            type="button"
            class="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-[4px] text-[13.5px] transition-colors cursor-pointer text-left"
            :class="
              isItemHighlighted(item.id)
                ? 'bg-[#781D2B] text-white font-semibold shadow-xs'
                : 'text-[#252525] font-medium hover:bg-[#F5F6F8] hover:text-[#781D2B]'
            "
            :aria-current="isItemHighlighted(item.id) ? 'page' : undefined"
            @click="handleSelect(item.id)"
          >
            <span class="flex items-center gap-3 min-w-0">
              <!-- 1. Dashboard Icon (LayoutDashboard) -->
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

              <!-- 2. My Application Icon (FileText) -->
              <svg
                v-else-if="item.id === 'my-application'"
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

              <!-- 3. Examination Icon (CalendarCheck) -->
              <svg
                v-else-if="item.id === 'examination'"
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
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="m9 16 2 2 4-4" />
              </svg>

              <!-- 4. Results Icon (Award) -->
              <svg
                v-else-if="item.id === 'results'"
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

              <!-- 5. Notifications Icon (Bell) -->
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

              <!-- 6. My Profile Icon (User) -->
              <svg
                v-else-if="item.id === 'my-profile'"
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

              <!-- 7. Help & Support Icon (LifeBuoy / HelpCircle) -->
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>

              <span class="truncate">{{ item.label }}</span>
            </span>

            <!-- Optional Item Badge -->
            <span
              v-if="item.badge"
              class="text-[11px] font-semibold px-2 py-0.5 rounded-[3px]"
              :class="
                isItemHighlighted(item.id)
                  ? 'bg-white/20 text-white'
                  : 'bg-[#F5F6F8] text-[#781D2B] border border-[#E2E4E9]'
              "
            >
              {{ item.badge }}
            </span>
          </button>

          <!-- Sub-Navigation under My Application when My Application is active -->
          <div
            v-if="item.id === 'my-application' && isMyApplicationActive()"
            class="mt-1 ml-4 pl-3 border-l-2 border-[#EBCFD4] space-y-0.5 py-1"
          >
            <button
              v-for="sub in applicationSubRoutes"
              :key="sub.id"
              type="button"
              class="w-full text-left px-2.5 py-1.5 rounded-[3px] text-[12px] transition-colors cursor-pointer block truncate"
              :class="
                path === sub.path
                  ? 'bg-[#FDF7F8] text-[#781D2B] font-bold'
                  : 'text-[#555555] hover:text-[#781D2B] hover:bg-[#F5F6F8]'
              "
              @click="
                navigateTo(sub.path);
                emit('close-mobile')
              "
            >
              {{ sub.label }}
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Bottom Section: Reference Info & 8. Logout Button -->
    <div class="p-3 border-t border-[#E8EAEF] bg-[#FAFAFB] shrink-0">
      <div class="px-3 py-2.5 mb-2 rounded-[4px] bg-white border border-[#E5E7EB]">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#781D2B]">
          Application Reference
        </span>
        <span class="block text-[12.5px] font-semibold text-[#252525] mt-0.5">
          APP-2027-0001
        </span>
      </div>

      <!-- 8. Logout -->
      <button
        type="button"
        class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[4px] text-[13.5px] font-semibold text-[#781D2B] hover:bg-[#FDF2F4] transition-colors cursor-pointer"
        @click="logoutStudentSession()"
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
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>
