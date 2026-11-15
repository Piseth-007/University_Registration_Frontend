<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo } from '../../router'
import type {
  DashboardAdmissionDateItem,
  DashboardAnnouncementItem,
  DashboardExamScheduleRow,
  DashboardNavId,
  DashboardNotificationItem,
} from '../../types/admissions'

const props = defineProps<{
  examSchedule: DashboardExamScheduleRow[]
  notifications: DashboardNotificationItem[]
  announcements: DashboardAnnouncementItem[]
  admissionDates: DashboardAdmissionDateItem[]
  searchQuery: string
}>()

const emit = defineEmits<{
  (e: 'select-nav', navId: DashboardNavId): void
  (e: 'mark-all-read'): void
}>()

const filteredExamSchedule = computed(() => {
  const q = props.searchQuery.trim().toLowerCase()
  if (!q) return props.examSchedule
  return props.examSchedule.filter(
    (row) =>
      row.subjectOrPaper.toLowerCase().includes(q) ||
      row.venuePlaceholder.toLowerCase().includes(q) ||
      row.seatStatus.toLowerCase().includes(q),
  )
})

const filteredNotifications = computed(() => {
  const q = props.searchQuery.trim().toLowerCase()
  if (!q) return props.notifications
  return props.notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.message.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q),
  )
})

const filteredAnnouncements = computed(() => {
  const q = props.searchQuery.trim().toLowerCase()
  if (!q) return props.announcements
  return props.announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.referenceCode.toLowerCase().includes(q),
  )
})
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
    <!-- Left / Main Column (8 columns on desktop): Upcoming Examination Schedule + Latest Notifications -->
    <div class="xl:col-span-8 flex flex-col gap-6">
      <!-- 1. Upcoming Examination Schedule Card -->
      <section
        aria-labelledby="exam-schedule-heading"
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EBECEF]"
        >
          <div>
            <div class="flex items-center gap-2.5">
              <h2 id="exam-schedule-heading" class="text-[17px] font-bold text-[#252525]">
                Upcoming Examination Schedule
              </h2>
              <span
                class="text-[11px] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded-[3px] bg-[#FDF7F8] text-[#781D2B] border border-[#EBCFD4]"
              >
                Entrance Examination
              </span>
            </div>
            <p class="text-[13px] text-[#555555] mt-1">
              National entrance examination timetable for your selected degree program.
            </p>
          </div>

          <button
            type="button"
            class="self-start sm:self-center text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
            @click="emit('select-nav', 'examination')"
          >
            View Examination Details →
          </button>
        </div>

        <div class="overflow-x-auto mt-3">
          <table class="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr class="border-b border-[#E5E7EB] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
                <th class="py-3 pr-3">Examination Paper</th>
                <th class="py-3 px-3">Date &amp; Session</th>
                <th class="py-3 px-3">Assigned Venue</th>
                <th class="py-3 pl-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#EBECEF] text-[13px]">
              <tr v-for="exam in filteredExamSchedule" :key="exam.id" class="hover:bg-[#FAFAFB]">
                <td class="py-3.5 pr-3 font-bold text-[#252525]">
                  {{ exam.subjectOrPaper }}
                </td>
                <td class="py-3.5 px-3">
                  <span class="block font-semibold text-[#781D2B]">{{ exam.examDatePlaceholder }}</span>
                  <span class="block text-[11.5px] text-[#6B7280] mt-0.5">{{ exam.timeSlot }}</span>
                </td>
                <td class="py-3.5 px-3 text-[#555555]">
                  {{ exam.venuePlaceholder }}
                </td>
                <td class="py-3.5 pl-3 text-right">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold"
                    :class="
                      exam.seatStatus === 'Scheduled' || exam.seatStatus === 'Confirmed'
                        ? 'bg-[#DCFCE7] text-[#166534]'
                        : 'bg-[#FEF3C7] text-[#92400E]'
                    "
                  >
                    {{ exam.seatStatus }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. Latest Notifications Card -->
      <section
        aria-labelledby="notifications-heading"
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#EBECEF]"
        >
          <div>
            <h2 id="notifications-heading" class="text-[17px] font-bold text-[#252525]">
              Latest Notifications
            </h2>
            <p class="text-[13px] text-[#555555] mt-0.5">
              Personal application alerts and document verification messages.
            </p>
          </div>

          <button
            type="button"
            class="self-start sm:self-center text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
            @click="emit('mark-all-read')"
          >
            Mark all as read
          </button>
        </div>

        <div class="divide-y divide-[#EBECEF] mt-2">
          <article
            v-for="item in filteredNotifications"
            :key="item.id"
            class="py-4 flex items-start gap-3.5"
          >
            <div
              class="w-9 h-9 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 border"
              :class="
                item.unread
                  ? 'bg-[#FDF7F8] border-[#EBCFD4] text-[#781D2B]'
                  : 'bg-[#F5F6F8] border-[#E2E4E9] text-[#6B7280]'
              "
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
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
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span
                    class="text-[10.5px] font-bold uppercase tracking-[0.07em] px-2 py-0.5 rounded-[3px] bg-[#F5F6F8] text-[#252525] border border-[#E2E4E9]"
                  >
                    {{ item.category }}
                  </span>
                  <span
                    v-if="item.unread"
                    class="inline-flex items-center gap-1 text-[11px] font-bold text-[#781D2B]"
                  >
                    <span class="w-2 h-2 rounded-full bg-[#781D2B]"></span>
                    Unread
                  </span>
                </div>
                <span class="text-[11.5px] text-[#6B7280]">{{ item.timestamp }}</span>
              </div>

              <h3 class="text-[14px] font-bold text-[#252525] mt-1.5 leading-snug">
                {{ item.title }}
              </h3>
              <p class="text-[13px] text-[#555555] mt-1 leading-relaxed">
                {{ item.message }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>

    <!-- Right / Secondary Column (4 columns on desktop): Quick Action Links + Important Admission Announcements -->
    <div class="xl:col-span-4 flex flex-col gap-6">
      <!-- 3. Quick Action Links Card -->
      <section
        aria-labelledby="quick-actions-heading"
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
      >
        <h2 id="quick-actions-heading" class="text-[17px] font-bold text-[#252525]">
          Quick Action Links
        </h2>
        <p class="text-[12.5px] text-[#555555] mt-1 mb-4">
          Direct shortcuts across the Student Portal.
        </p>

        <div class="flex flex-col gap-2.5">
          <!-- Primary Action: Manage My Application -->
          <button
            type="button"
            class="w-full py-2.75 px-4 bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer shadow-xs"
            @click="emit('select-nav', 'my-application')"
          >
            <span class="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
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
              <span>Manage My Application</span>
            </span>
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <!-- Action: View Examination Schedule -->
          <button
            type="button"
            class="w-full py-2.75 px-4 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
            @click="emit('select-nav', 'examination')"
          >
            <span class="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>View Examination Schedule</span>
            </span>
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <!-- Action: Check Admission Results -->
          <button
            type="button"
            class="w-full py-2.75 px-4 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
            @click="navigateTo('/results')"
          >
            <span class="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              <span>Check Admission Results</span>
            </span>
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <!-- Action: Help & Support -->
          <button
            type="button"
            class="w-full py-2.75 px-4 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13.5px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
            @click="emit('select-nav', 'help-support')"
          >
            <span class="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span>Help &amp; Support</span>
            </span>
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <!-- 4. Important Admission Announcements Card -->
      <section
        aria-labelledby="admission-announcements-heading"
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
      >
        <div class="pb-4 border-b border-[#EBECEF]">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            OFFICIAL REGISTRAR BULLETINS
          </span>
          <h2 id="admission-announcements-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
            Important Admission Announcements
          </h2>
        </div>

        <ul class="divide-y divide-[#EBECEF] mt-2">
          <li
            v-for="item in filteredAnnouncements"
            :key="item.id"
            class="py-3.5 flex flex-col gap-1.5"
          >
            <div class="flex items-center justify-between gap-2">
              <span
                class="text-[10px] font-bold uppercase tracking-[0.07em] px-2 py-0.5 rounded-[3px]"
                :class="
                  item.tag === 'Intake Notice'
                    ? 'bg-[#FDF2F4] text-[#781D2B] border border-[#F2D0D6]'
                    : 'bg-[#F3F4F6] text-[#252525]'
                "
              >
                {{ item.tag }} • {{ item.referenceCode }}
              </span>
              <span class="text-[11.5px] font-bold text-[#781D2B]">
                {{ item.datePlaceholder }}
              </span>
            </div>
            <p class="text-[13.5px] font-bold text-[#252525] leading-snug">
              {{ item.title }}
            </p>
            <p class="text-[12px] text-[#555555] leading-relaxed">
              {{ item.summary }}
            </p>
          </li>
        </ul>

        <!-- Key Admission Dates Footer Strip -->
        <div class="mt-4 pt-3.5 border-t border-[#EBECEF] space-y-2">
          <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Key Intake Deadlines
          </p>
          <div
            v-for="dateItem in admissionDates.slice(0, 2)"
            :key="dateItem.id"
            class="flex items-center justify-between text-[12px]"
          >
            <span class="text-[#555555] truncate pr-2">{{ dateItem.eventTitle }}</span>
            <span class="font-bold text-[#781D2B] shrink-0">{{ dateItem.datePlaceholder }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
