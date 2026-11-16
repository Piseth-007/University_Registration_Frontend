<script setup lang="ts">
import { ref } from 'vue'
import { logoutStudentSession, navigateTo } from '../../router'
import type { DashboardNavId } from '../../types/admissions'

defineProps<{
  studentName: string
  avatarInitials: string
  applicantId: string
  unreadCount: number
  searchQuery: string
  activeSectionLabel: string
  pageTitle?: string
  breadcrumbTrail?: Array<{ label: string; route?: string; navId?: DashboardNavId }>
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'open-mobile-sidebar'): void
  (e: 'select-nav', id: DashboardNavId): void
}>()

const profileDropdownOpen = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-30 bg-white border-b border-[#E2E4E9] px-4 sm:px-7 h-16 flex items-center justify-between gap-4"
  >
    <!-- Left: Mobile Menu Button + Breadcrumb (Home / Dashboard) -->
    <div class="flex items-center gap-3 min-w-0">
      <button
        type="button"
        class="lg:hidden p-2 -ml-1 rounded-[4px] border border-[#E2E4E9] text-[#252525] hover:border-[#781D2B] hover:text-[#781D2B] cursor-pointer"
        aria-label="Open navigation sidebar"
        @click="emit('open-mobile-sidebar')"
      >
        <!-- Lucide Menu icon -->
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
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      <div class="min-w-0">
        <h1
          v-if="pageTitle"
          class="text-[16px] sm:text-[17px] font-bold text-[#252525] leading-tight truncate"
        >
          {{ pageTitle }}
        </h1>

        <!-- Custom Breadcrumb Trail (e.g. Dashboard / My Application / Personal Information) -->
        <nav
          v-if="breadcrumbTrail && breadcrumbTrail.length > 0"
          aria-label="Breadcrumb"
          class="flex items-center gap-1.5 text-[12px] truncate mt-0.5"
        >
          <template v-for="(crumb, index) in breadcrumbTrail" :key="crumb.label">
            <a
              v-if="crumb.route"
              :href="crumb.route"
              class="text-[#6B7280] hover:text-[#781D2B] transition-colors font-medium truncate"
              @click.prevent="navigateTo(crumb.route)"
            >
              {{ crumb.label }}
            </a>
            <button
              v-else-if="crumb.navId"
              type="button"
              class="text-[#6B7280] hover:text-[#781D2B] transition-colors font-medium cursor-pointer truncate"
              @click="emit('select-nav', crumb.navId)"
            >
              {{ crumb.label }}
            </button>
            <span v-else class="text-[#781D2B] font-semibold truncate">
              {{ crumb.label }}
            </span>
            <span
              v-if="index < breadcrumbTrail.length - 1"
              class="text-[#C4C7CE]"
              aria-hidden="true"
            >
              /
            </span>
          </template>
        </nav>

        <!-- Default Dashboard Breadcrumb (Home / Dashboard) -->
        <nav v-else aria-label="Breadcrumb" class="flex items-center gap-2 text-[13px] truncate">
          <a
            href="/"
            class="text-[#6B7280] hover:text-[#781D2B] transition-colors font-medium inline-flex items-center gap-1.5"
            @click.prevent="navigateTo('/')"
          >
            <!-- Lucide Home icon -->
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </a>
          <span class="text-[#C4C7CE]" aria-hidden="true">/</span>
          <button
            type="button"
            class="text-[#252525] font-semibold hover:text-[#781D2B] cursor-pointer truncate"
            @click="emit('select-nav', 'dashboard')"
          >
            Dashboard
          </button>
          <template v-if="activeSectionLabel !== 'Dashboard'">
            <span class="text-[#C4C7CE]" aria-hidden="true">/</span>
            <span class="text-[#781D2B] font-semibold truncate">{{ activeSectionLabel }}</span>
          </template>
        </nav>
      </div>
    </div>

    <!-- Right: Search Field + Notification Icon + Student Profile Avatar & Dropdown -->
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Search Field -->
      <div class="relative hidden md:block w-[260px] lg:w-[300px]">
        <span
          class="absolute inset-y-0 left-0 pl-3 flex items-center text-[#6B7280] pointer-events-none"
          aria-hidden="true"
        >
          <!-- Lucide Search icon -->
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          :value="searchQuery"
          type="search"
          placeholder="Search checklist, documents, notices..."
          aria-label="Search dashboard"
          class="w-full pl-9 pr-3 py-1.5 text-[13px] text-[#252525] bg-[#F5F6F8] border border-[#E0E2E7] rounded-[4px] focus:bg-white focus:border-[#781D2B] focus:outline-none transition-colors"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Notification Icon with Unread Indicator -->
      <button
        type="button"
        class="relative p-2 rounded-[4px] border border-[#E2E4E9] bg-white text-[#252525] hover:border-[#781D2B] hover:text-[#781D2B] transition-colors cursor-pointer"
        aria-label="View notifications"
        @click="emit('select-nav', 'notifications')"
      >
        <!-- Lucide Bell icon -->
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        <!-- Unread Dot & Count -->
        <span
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#781D2B] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white"
        >
          {{ unreadCount }}
        </span>
      </button>

      <!-- Student Profile Avatar, Name & Dropdown -->
      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-2.5 py-1.5 px-2.5 rounded-[4px] border border-[#E2E4E9] hover:border-[#781D2B] bg-white transition-colors cursor-pointer"
          :aria-expanded="profileDropdownOpen"
          aria-haspopup="true"
          @click="profileDropdownOpen = !profileDropdownOpen"
        >
          <div
            class="w-8 h-8 rounded-full bg-[#781D2B] text-white text-[12px] font-bold flex items-center justify-center shrink-0"
          >
            {{ avatarInitials }}
          </div>
          <div class="hidden sm:block text-left">
            <span class="block text-[13px] font-semibold text-[#252525] leading-tight">
              {{ studentName }}
            </span>
            <span class="block text-[11px] text-[#6B7280] leading-tight">
              {{ applicantId }}
            </span>
          </div>
          <!-- Lucide ChevronDown icon -->
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform"
            :class="profileDropdownOpen ? 'rotate-180' : ''"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="profileDropdownOpen"
          class="absolute right-0 mt-2 w-56 bg-white border border-[#E0E2E7] rounded-[4px] shadow-lg py-1.5 z-50"
          @mouseleave="profileDropdownOpen = false"
        >
          <div class="px-3.5 py-2 border-b border-[#EBECEF]">
            <p class="text-[12.5px] font-semibold text-[#252525]">{{ studentName }}</p>
            <p class="text-[11px] text-[#6B7280]">Applicant ID: {{ applicantId }}</p>
          </div>

          <button
            type="button"
            class="w-full px-3.5 py-2 text-left text-[12.5px] text-[#252525] hover:bg-[#F5F6F8] hover:text-[#781D2B] flex items-center gap-2 cursor-pointer"
            @click="
              emit('select-nav', 'my-application');
              profileDropdownOpen = false
            "
          >
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
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            <span>My Application</span>
          </button>

          <button
            type="button"
            class="w-full px-3.5 py-2 text-left text-[12.5px] text-[#252525] hover:bg-[#F5F6F8] hover:text-[#781D2B] flex items-center gap-2 cursor-pointer"
            @click="
              navigateTo('/my-profile');
              profileDropdownOpen = false
            "
          >
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile &amp; Settings</span>
          </button>

          <a
            href="/"
            class="w-full px-3.5 py-2 text-left text-[12.5px] text-[#252525] hover:bg-[#F5F6F8] hover:text-[#781D2B] flex items-center gap-2"
            @click.prevent="navigateTo('/')"
          >
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
              <path d="M2 12h20" />
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              />
            </svg>
            <span>University Public Website</span>
          </a>

          <div class="my-1 border-t border-[#EBECEF]"></div>

          <button
            type="button"
            class="w-full px-3.5 py-2 text-left text-[12.5px] font-semibold text-[#781D2B] hover:bg-[#FDF2F4] flex items-center gap-2 cursor-pointer"
            @click="logoutStudentSession()"
          >
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
