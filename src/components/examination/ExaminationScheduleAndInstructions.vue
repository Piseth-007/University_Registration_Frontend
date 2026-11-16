<script setup lang="ts">
import { navigateTo } from '../../router'
import type { ExaminationPageData, ExaminationPageState } from '../../types/admissions'

defineProps<{
  pageData: ExaminationPageData
  activeState: ExaminationPageState
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select-state', state: ExaminationPageState): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 7. Helpful Empty State when Examination is "Not Yet Scheduled" -->
    <section
      v-if="activeState === 'Not Yet Scheduled'"
      aria-labelledby="exam-empty-state-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-8 sm:p-10 shadow-[0_1px_3px_rgba(37,37,37,0.03)] text-center"
    >
      <div
        class="w-14 h-14 mx-auto rounded-full bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center"
        aria-hidden="true"
      >
        <!-- Lucide CalendarClock Icon -->
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
          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h5" />
          <path d="M17.5 17.5 16 16.3V14" />
          <circle cx="16" cy="16" r="6" />
        </svg>
      </div>

      <span class="inline-block mt-4 px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold uppercase tracking-[0.08em] bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
        Not Yet Scheduled
      </span>

      <h2 id="exam-empty-state-heading" class="text-[20px] font-bold text-[#252525] mt-2.5">
        Your Examination Schedule Is Not Yet Available
      </h2>

      <p class="text-[13.5px] text-[#555555] max-w-[540px] mx-auto mt-2 leading-relaxed">
        The Office of Admissions is currently finalizing examination building, room, and seat assignments for verified applicants. You will receive a portal notification as soon as your schedule and Admission Card are ready.
      </p>

      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="px-4 py-2.25 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
          @click="emit('select-state', 'Scheduled')"
        >
          <span>Preview Scheduled Assignment</span>
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        <button
          type="button"
          class="px-4 py-2.25 rounded-[4px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[13px] font-semibold transition-colors cursor-pointer"
          @click="navigateTo('/my-application')"
        >
          Review My Application
        </button>
      </div>
    </section>

    <!-- 4. Examination Schedule Card (Displayed when Scheduled, Completed, or Cancelled) -->
    <section
      v-else
      aria-labelledby="examination-schedule-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-5 border-b border-[#EBECEF]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <!-- Lucide Building2 / MapPin Icon -->
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
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
              <path d="M10 6h4" />
              <path d="M10 10h4" />
              <path d="M10 14h4" />
              <path d="M10 18h4" />
            </svg>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              ASSIGNED ROOM &amp; TIMETABLE
            </span>
            <h2 id="examination-schedule-heading" class="text-[17px] font-bold text-[#252525]">
              Examination Schedule &amp; Venue Assignment
            </h2>
          </div>
        </div>

        <span
          class="self-start sm:self-center px-2.5 py-1 rounded-[3px] text-[11px] font-bold uppercase tracking-[0.06em]"
          :class="
            activeState === 'Cancelled'
              ? 'bg-[#FEE2E2] text-[#991B1B]'
              : 'bg-[#F5F6F8] text-[#252525] border border-[#E2E4E9]'
          "
        >
          {{ activeState === 'Cancelled' ? 'Session Cancelled' : 'Official Assignment' }}
        </span>
      </div>

      <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- 1. Examination Name (Full width) -->
        <div class="sm:col-span-2 lg:col-span-3 p-4 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Examination Name
          </dt>
          <dd class="mt-1 text-[14.5px] font-bold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.schedule.examinationName"
              type="text"
              class="w-full px-2.5 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13.5px]"
            />
            <span v-else>{{ pageData.schedule.examinationName }}</span>
          </dd>
        </div>

        <!-- 2. Date -->
        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Date
          </dt>
          <dd class="mt-1 text-[13.5px] font-bold text-[#781D2B]">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.schedule.date"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ pageData.schedule.date }}</span>
          </dd>
        </div>

        <!-- 3. Start Time -->
        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Start Time
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.schedule.startTime"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ pageData.schedule.startTime }}</span>
          </dd>
        </div>

        <!-- 4. End Time -->
        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            End Time
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.schedule.endTime"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ pageData.schedule.endTime }}</span>
          </dd>
        </div>

        <!-- 5. Examination Building -->
        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Examination Building
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.schedule.examinationBuilding"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ pageData.schedule.examinationBuilding }}</span>
          </dd>
        </div>

        <!-- 6. Room Number -->
        <div class="p-3.5 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#781D2B]">
            Room Number
          </dt>
          <dd class="mt-1 text-[14px] font-bold text-[#781D2B]">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.schedule.roomNumber"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ pageData.schedule.roomNumber }}</span>
          </dd>
        </div>

        <!-- 7. Seat Number -->
        <div class="p-3.5 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#781D2B]">
            Seat Number
          </dt>
          <dd class="mt-1 text-[14px] font-bold text-[#781D2B]">
            <input
              v-if="inlineEditEnabled"
              v-model="pageData.schedule.seatNumber"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ pageData.schedule.seatNumber }}</span>
          </dd>
        </div>

        <!-- 8. Examination Center Address (Full width) -->
        <div class="sm:col-span-2 lg:col-span-3 p-4 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] flex items-start gap-3">
          <!-- Lucide MapPin Icon -->
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#781D2B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div class="min-w-0 flex-1">
            <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Examination Center Address
            </dt>
            <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
              <input
                v-if="inlineEditEnabled"
                v-model="pageData.schedule.examinationCenterAddress"
                type="text"
                class="w-full px-2.5 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
              />
              <span v-else>{{ pageData.schedule.examinationCenterAddress }}</span>
            </dd>
          </div>
        </div>
      </dl>
    </section>

    <!-- 6. Examination Instructions Card (Always displayed so candidates know the rules) -->
    <section
      aria-labelledby="examination-instructions-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
    >
      <div class="flex items-center gap-3 pb-4 mb-5 border-b border-[#EBECEF]">
        <div
          class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide ShieldCheck / ClipboardList Icon -->
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
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            CANDIDATE REGULATIONS
          </span>
          <h2 id="examination-instructions-heading" class="text-[17px] font-bold text-[#252525]">
            Examination Instructions &amp; Rules
          </h2>
        </div>
      </div>

      <ol class="space-y-3.5">
        <li
          v-for="rule in pageData.instructions"
          :key="rule.number"
          class="p-4 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] flex items-start gap-3.5"
        >
          <span
            class="w-7 h-7 rounded-full bg-[#781D2B] text-white text-[12.5px] font-bold flex items-center justify-center shrink-0 mt-0.5"
          >
            {{ rule.number }}
          </span>

          <div class="min-w-0 flex-1">
            <input
              v-if="inlineEditEnabled"
              v-model="rule.title"
              type="text"
              class="w-full px-2 py-1 text-[13.5px] font-bold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
            />
            <h3 v-else class="text-[14px] font-bold text-[#252525] leading-snug">
              {{ rule.title }}
            </h3>

            <textarea
              v-if="inlineEditEnabled"
              v-model="rule.description"
              rows="2"
              class="w-full mt-1.5 px-2 py-1 text-[12.5px] text-[#555555] bg-white border border-[#781D2B] rounded-[3px]"
            ></textarea>
            <p v-else class="text-[13px] text-[#555555] mt-1 leading-relaxed">
              {{ rule.description }}
            </p>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>
