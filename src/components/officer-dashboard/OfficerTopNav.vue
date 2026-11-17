<script setup lang="ts">
import { navigateTo } from '../../router'
import type {
  OfficerNavId,
  OfficerNotificationDropdownItem,
} from '../../types/admissions'

defineProps<{
  officerName: string
  roleTitle: string
  officerId: string
  avatarInitials: string
  activeSectionLabel: string
  globalSearchQuery: string
  notifications: OfficerNotificationDropdownItem[]
  notificationDropdownOpen: boolean
  profileDropdownOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'open-mobile-sidebar'): void
  (e: 'update:globalSearchQuery', value: string): void
  (e: 'toggle-notification-dropdown'): void
  (e: 'toggle-profile-dropdown'): void
  (e: 'close-dropdowns'): void
  (e: 'mark-all-notifications-read'): void
  (e: 'select-nav', id: OfficerNavId): void
  (e: 'logout'): void
}>()
</script>

<template>
  <header
    aria-label="Admission Officer Top Navigation Bar"
    class="bg-white border-b border-[#E2E4E9] px-4 sm:px-7 h-16 flex items-center justify-between gap-4 sticky top-0 z-30"
  >
    <!-- Left: Mobile Sidebar Toggle + Logo Badge + Breadcrumb -->
    <div class="flex items-center gap-3 min-w-0">
      <button
        type="button"
        class="lg:hidden p-2 rounded-[4px] border border-[#E2E4E9] text-[#252525] hover:border-[#781D2B] hover:text-[#781D2B] cursor-pointer"
        aria-label="Open staff navigation menu"
        @click="emit('open-mobile-sidebar')"
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
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      <!-- University Logo Placeholder + Breadcrumb -->
      <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-[13px] truncate">
        <span class="hidden sm:inline-flex items-center gap-2 font-semibold text-[#555555]">
          <img
            src="/images/rupp-logo.png"
            alt="University Logo"
            class="w-6 h-6 object-contain"
          />
          <span>Staff Administration</span>
        </span>
        <span class="hidden sm:inline text-[#C4C7CE]" aria-hidden="true">/</span>
        <button
          type="button"
          class="font-bold text-[#781D2B] hover:underline cursor-pointer truncate"
          @click="emit('select-nav', 'dashboard')"
        >
          {{ activeSectionLabel }}
        </button>
      </nav>
    </div>

    <!-- Right: Global Search + Notification Dropdown + Officer Profile Dropdown -->
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Global Search -->
      <div class="relative hidden md:block w-[260px] lg:w-[320px]">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6B7280"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          :value="globalSearchQuery"
          type="search"
          placeholder="Global search (Application ID, Student, Major)..."
          aria-label="Global search applications"
          class="w-full h-9 pl-9 pr-3 text-[12.5px] bg-[#F5F6F8] border border-[#E0E2E7] rounded-[4px] text-[#252525] placeholder:text-[#6B7280] focus:bg-white focus:border-[#781D2B] focus:outline-none"
          @input="
            emit('update:globalSearchQuery', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <!-- Notification Icon & Dropdown -->
      <div class="relative">
        <button
          type="button"
          class="relative p-2 rounded-[4px] border border-[#E2E4E9] bg-white text-[#252525] hover:border-[#781D2B] hover:text-[#781D2B] transition-colors cursor-pointer"
          aria-label="Staff notifications"
          :aria-expanded="notificationDropdownOpen"
          @click="emit('toggle-notification-dropdown')"
        >
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
          <span
            v-if="notifications.some((n) => n.unread)"
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#781D2B] text-white text-[10px] font-bold flex items-center justify-center"
          >
            {{ notifications.filter((n) => n.unread).length }}
          </span>
        </button>

        <!-- Notification Dropdown Panel -->
        <div
          v-if="notificationDropdownOpen"
          class="absolute right-0 mt-2 w-[340px] bg-white border border-[#E2E4E9] rounded-[4px] shadow-lg z-50 overflow-hidden"
        >
          <div
            class="px-4 py-3 bg-[#FAFAFB] border-b border-[#EBECEF] flex items-center justify-between"
          >
            <span class="text-[12.5px] font-bold text-[#252525]">
              Officer Notifications
            </span>
            <button
              type="button"
              class="text-[11.5px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
              @click="emit('mark-all-notifications-read')"
            >
              Mark all read
            </button>
          </div>

          <ul class="divide-y divide-[#EBECEF] max-h-[260px] overflow-y-auto">
            <li
              v-for="item in notifications"
              :key="item.id"
              class="px-4 py-3 text-[12.5px]"
              :class="item.unread ? 'bg-[#FDFBFC]' : 'bg-white'"
            >
              <div class="flex items-start justify-between gap-2">
                <p class="font-semibold text-[#252525] leading-snug">
                  {{ item.title }}
                </p>
                <span
                  v-if="item.unread"
                  class="w-2 h-2 rounded-full bg-[#781D2B] shrink-0 mt-1"
                ></span>
              </div>
              <span class="block text-[11px] text-[#6B7280] mt-1">
                {{ item.timestamp }}
              </span>
            </li>
          </ul>

          <div class="px-4 py-2.5 bg-[#FAFAFB] border-t border-[#EBECEF] text-right">
            <button
              type="button"
              class="text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
              @click="
                emit('select-nav', 'notifications');
                emit('close-dropdowns')
              "
            >
              View All Staff Alerts →
            </button>
          </div>
        </div>
      </div>

      <!-- Admission Officer Profile Avatar, Name & Role + Dropdown -->
      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-2.5 pl-2 pr-2.5 py-1.5 rounded-[4px] border border-[#E2E4E9] bg-white hover:border-[#781D2B] transition-colors cursor-pointer"
          :aria-expanded="profileDropdownOpen"
          @click="emit('toggle-profile-dropdown')"
        >
          <div
            class="w-8 h-8 rounded-full bg-[#781D2B] text-white text-[12px] font-bold flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            {{ avatarInitials }}
          </div>
          <div class="hidden sm:block text-left">
            <span class="block text-[12.5px] font-bold text-[#252525] leading-none">
              {{ officerName }}
            </span>
            <span class="block text-[10.5px] text-[#6B7280] mt-0.5 leading-none">
              {{ roleTitle }}
            </span>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="hidden sm:block"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <!-- Officer Profile Dropdown Menu -->
        <div
          v-if="profileDropdownOpen"
          class="absolute right-0 mt-2 w-[250px] bg-white border border-[#E2E4E9] rounded-[4px] shadow-lg py-1.5 z-50"
        >
          <div class="px-3.5 py-2.5 border-b border-[#EBECEF]">
            <p class="text-[13px] font-bold text-[#252525]">{{ officerName }}</p>
            <p class="text-[11px] font-semibold text-[#781D2B] mt-0.5">{{ roleTitle }}</p>
            <p class="text-[11px] text-[#6B7280] mt-0.5">Officer ID: {{ officerId }}</p>
          </div>

          <button
            type="button"
            class="w-full px-3.5 py-2 text-left text-[12.5px] text-[#252525] hover:bg-[#F5F6F8] hover:text-[#781D2B] cursor-pointer"
            @click="
              emit('select-nav', 'my-profile');
              emit('close-dropdowns')
            "
          >
            Officer Profile &amp; Permissions
          </button>

          <button
            type="button"
            class="w-full px-3.5 py-2 text-left text-[12.5px] text-[#252525] hover:bg-[#F5F6F8] hover:text-[#781D2B] cursor-pointer"
            @click="navigateTo('/dashboard')"
          >
            Switch to Student Portal View
          </button>

          <div class="my-1 border-t border-[#EBECEF]"></div>

          <button
            type="button"
            class="w-full px-3.5 py-2 text-left text-[12.5px] font-semibold text-[#781D2B] hover:bg-[#FDF2F4] cursor-pointer"
            @click="emit('logout')"
          >
            Logout Staff Session
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
