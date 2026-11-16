<script setup lang="ts">
import { notificationCategoryTabs } from '../../data/notificationsPageData'
import type {
  PortalNotificationCategory,
  PortalNotificationFilterTab,
  PortalNotificationItem,
} from '../../types/admissions'

defineProps<{
  notifications: PortalNotificationItem[]
  filteredNotifications: PortalNotificationItem[]
  activeCategory: PortalNotificationFilterTab
  searchQuery: string
  selectedNotificationId: string | null
  isEmptyDemo: boolean
  emptyHeading: string
  emptyMessage: string
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'update:activeCategory', tab: PortalNotificationFilterTab): void
  (e: 'update:searchQuery', value: string): void
  (e: 'update:emptyHeading', value: string): void
  (e: 'update:emptyMessage', value: string): void
  (e: 'view-details', item: PortalNotificationItem): void
  (e: 'toggle-read', id: string): void
  (e: 'request-delete', item: PortalNotificationItem): void
  (e: 'restore-samples'): void
}>()

function categoryBadgeClass(category: PortalNotificationCategory): string {
  if (category === 'Admission') {
    return 'bg-[#FDF2F4] text-[#781D2B] border-[#F2D0D6]'
  }
  if (category === 'Documents') {
    return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
  if (category === 'Examination') {
    return 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
  }
  if (category === 'Results') {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  return 'bg-[#F5F6F8] text-[#252525] border-[#E2E4E9]'
}
</script>

<template>
  <section
    aria-labelledby="notification-list-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
  >
    <!-- 4. Category Filters & Search Input -->
    <div class="space-y-4 pb-5 border-b border-[#EBECEF]">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 id="notification-list-heading" class="text-[17px] font-bold text-[#252525]">
            Notification Feed
          </h2>
          <p class="text-[12.5px] text-[#555555] mt-0.5">
            Filter by category or search for specific admission notices.
          </p>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-[300px]">
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
            :value="searchQuery"
            type="search"
            placeholder="Search notifications..."
            aria-label="Search notifications"
            class="w-full h-9 pl-9 pr-3 text-[13px] bg-[#F5F6F8] border border-[#E2E4E9] rounded-[4px] text-[#252525] placeholder:text-[#6B7280] focus:outline-none focus:bg-white focus:border-[#781D2B]"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div
        class="flex flex-wrap items-center gap-1.5"
        role="tablist"
        aria-label="Notification Categories"
      >
        <button
          v-for="tab in notificationCategoryTabs"
          :key="tab"
          type="button"
          role="tab"
          :aria-selected="activeCategory === tab"
          class="px-3 py-1.5 rounded-[4px] text-[12px] font-semibold transition-colors cursor-pointer"
          :class="
            activeCategory === tab
              ? 'bg-[#781D2B] text-white shadow-2xs'
              : 'bg-[#F5F6F8] text-[#555555] hover:text-[#781D2B] border border-[#E2E4E9]'
          "
          @click="emit('update:activeCategory', tab)"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- 8. Empty State ("No Notifications Yet") -->
    <div
      v-if="isEmptyDemo || notifications.length === 0"
      class="py-12 px-6 text-center bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px]"
    >
      <div
        class="w-14 h-14 mx-auto rounded-full bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center"
        aria-hidden="true"
      >
        <!-- Lucide Bell Icon -->
        <svg
          width="26"
          height="26"
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
      </div>

      <div class="mt-3.5 max-w-[420px] mx-auto">
        <input
          v-if="inlineEditEnabled"
          :value="emptyHeading"
          type="text"
          class="w-full text-center px-2.5 py-1 text-[19px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
          @input="emit('update:emptyHeading', ($event.target as HTMLInputElement).value)"
        />
        <h3 v-else class="text-[20px] font-bold text-[#252525]">
          {{ emptyHeading }}
        </h3>

        <input
          v-if="inlineEditEnabled"
          :value="emptyMessage"
          type="text"
          class="w-full mt-2 text-center px-2.5 py-1 text-[13.5px] text-[#555555] bg-white border border-[#781D2B] rounded-[3px]"
          @input="emit('update:emptyMessage', ($event.target as HTMLInputElement).value)"
        />
        <p v-else class="text-[14px] text-[#555555] mt-1.5">
          {{ emptyMessage }}
        </p>
      </div>

      <button
        type="button"
        class="mt-5 px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
        @click="emit('restore-samples')"
      >
        Restore Sample Notifications
      </button>
    </div>

    <!-- Filtered Search Empty State -->
    <div
      v-else-if="filteredNotifications.length === 0"
      class="py-10 px-6 text-center bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px]"
    >
      <p class="text-[14px] font-semibold text-[#252525]">
        No notifications match your current category or search filter.
      </p>
      <button
        type="button"
        class="mt-3 text-[12.5px] font-semibold text-[#781D2B] underline cursor-pointer"
        @click="
          emit('update:activeCategory', 'All');
          emit('update:searchQuery', '')
        "
      >
        Clear Filter &amp; Show All
      </button>
    </div>

    <!-- 5. Notification List -->
    <ul v-else class="space-y-3">
      <li
        v-for="item in filteredNotifications"
        :key="item.id"
        class="rounded-[4px] border p-4 sm:p-5 transition-all"
        :class="[
          item.unread
            ? 'bg-[#FDFBFC] border-[#EBCFD4] border-l-4 border-l-[#781D2B] shadow-2xs'
            : 'bg-white border-[#E5E7EB] hover:border-[#C4C7CE]',
          selectedNotificationId === item.id ? 'ring-1 ring-[#781D2B]' : '',
        ]"
      >
        <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
          <!-- Left: Category Icon + Title + Short Description -->
          <div class="flex items-start gap-3.5 min-w-0 flex-1">
            <!-- Category Icon Box -->
            <div
              class="w-10 h-10 rounded-[4px] border flex items-center justify-center shrink-0 mt-0.5"
              :class="
                item.unread
                  ? 'bg-[#781D2B] border-[#781D2B] text-white'
                  : 'bg-[#F5F6F8] border-[#E2E4E9] text-[#555555]'
              "
              aria-hidden="true"
            >
              <!-- Admission Icon (FileCheck) -->
              <svg
                v-if="item.category === 'Admission'"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="m9 15 2 2 4-4" />
              </svg>

              <!-- Documents Icon (FileWarning / Upload) -->
              <svg
                v-else-if="item.category === 'Documents'"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>

              <!-- Examination Icon (Calendar) -->
              <svg
                v-else-if="item.category === 'Examination'"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>

              <!-- Results Icon (Award) -->
              <svg
                v-else-if="item.category === 'Results'"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>

              <!-- University Announcements Icon (Megaphone / Bell) -->
              <svg
                v-else
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
            </div>

            <div class="min-w-0 flex-1">
              <!-- Top Meta Row: Category Badge + Read/Unread Indicator + Date/Time -->
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] border"
                    :class="categoryBadgeClass(item.category)"
                  >
                    {{ item.category }}
                  </span>

                  <!-- Read or Unread Indicator -->
                  <span
                    v-if="item.unread"
                    class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold bg-[#781D2B] text-white"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                    Unread
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10.5px] font-semibold bg-[#F3F4F6] text-[#6B7280]"
                  >
                    Read
                  </span>
                </div>

                <span class="text-[11.5px] font-medium text-[#6B7280]">
                  {{ item.dateTime }}
                </span>
              </div>

              <!-- Notification Title -->
              <input
                v-if="inlineEditEnabled"
                v-model="item.title"
                type="text"
                class="w-full mt-2 px-2 py-1 text-[14px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
              />
              <h3
                v-else
                class="text-[15px] mt-1.5 leading-snug"
                :class="item.unread ? 'font-bold text-[#252525]' : 'font-semibold text-[#374151]'"
              >
                {{ item.title }}
              </h3>

              <!-- Short Description -->
              <textarea
                v-if="inlineEditEnabled"
                v-model="item.shortDescription"
                rows="2"
                class="w-full mt-1.5 px-2 py-1 text-[12.5px] text-[#555555] bg-white border border-[#781D2B] rounded-[3px]"
              ></textarea>
              <p v-else class="text-[13px] text-[#555555] mt-1 leading-relaxed">
                {{ item.shortDescription }}
              </p>

              <!-- 6. Item Actions Row: View Details + Mark as Read + Delete -->
              <div class="mt-3.5 pt-3 border-t border-[#EBECEF] flex flex-wrap items-center justify-between gap-2">
                <div class="flex flex-wrap items-center gap-2">
                  <!-- View Details Button -->
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-[3px] text-[12px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    :class="
                      selectedNotificationId === item.id
                        ? 'bg-[#781D2B] text-white'
                        : 'bg-[#FDF7F8] text-[#781D2B] border border-[#EBCFD4] hover:bg-[#781D2B] hover:text-white'
                    "
                    @click="emit('view-details', item)"
                  >
                    <span>View Details</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>

                  <!-- Mark as Read / Unread Button -->
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-[3px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[12px] font-semibold transition-colors cursor-pointer"
                    @click="emit('toggle-read', item.id)"
                  >
                    {{ item.unread ? 'Mark as Read' : 'Mark as Unread' }}
                  </button>
                </div>

                <!-- Delete Button -->
                <button
                  type="button"
                  class="px-2.5 py-1.5 rounded-[3px] text-[12px] font-semibold text-[#991B1B] hover:bg-[#FEF2F2] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  @click="emit('request-delete', item)"
                >
                  <!-- Lucide Trash2 Icon -->
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
