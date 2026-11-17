<script setup lang="ts">
import {
  officerFacultyApplicants,
  officerInteractionStatePresets,
  officerMonthlySubmissions,
  officerStatCards,
  officerStatusDistribution,
} from '../../data/officerDashboardData'
import type { OfficerDashboardInteractionState } from '../../types/admissions'

defineProps<{
  academicYear: string
  dateFilter: string
  activeState: OfficerDashboardInteractionState
}>()

const emit = defineEmits<{
  (e: 'update:academicYear', value: string): void
  (e: 'update:dateFilter', value: string): void
  (e: 'select-state', state: OfficerDashboardInteractionState): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 3. Dashboard Header + 10. UI State Switcher -->
    <section
      aria-labelledby="officer-dashboard-heading"
      class="bg-white border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-5 border-b border-[#EBECEF]"
      >
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              class="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]"
            >
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span>STAFF ADMINISTRATION • ADMISSIONS COMMAND CENTER</span>
            </span>
            <span
              class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold bg-[#FDF2F4] text-[#781D2B] border border-[#F2D0D6]"
            >
              Welcome back, Admission Officer.
            </span>
          </div>

          <h1
            id="officer-dashboard-heading"
            class="text-[24px] sm:text-[28px] font-bold text-[#252525] leading-tight"
          >
            Admission Dashboard
          </h1>
          <p class="text-[14px] text-[#555555] mt-1">
            Monitor applications and manage the university admission process.
          </p>
        </div>

        <!-- Academic Year Selector & Date Filter -->
        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <div>
            <label
              for="officer-academic-year"
              class="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B7280] mb-1"
            >
              Academic Year
            </label>
            <select
              id="officer-academic-year"
              :value="academicYear"
              class="h-9 px-3 rounded-[4px] text-[12.5px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none"
              @change="
                emit('update:academicYear', ($event.target as HTMLSelectElement).value)
              "
            >
              <option value="2026–2027">2026–2027</option>
              <option value="2027–2028">2027–2028</option>
              <option value="2025–2026">2025–2026</option>
            </select>
          </div>

          <div>
            <label
              for="officer-date-filter"
              class="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B7280] mb-1"
            >
              Date Filter
            </label>
            <select
              id="officer-date-filter"
              :value="dateFilter"
              class="h-9 px-3 rounded-[4px] text-[12.5px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none"
              @change="
                emit('update:dateFilter', ($event.target as HTMLSelectElement).value)
              "
            >
              <option value="All Intake Dates">All Intake Dates</option>
              <option value="November 2026">November 2026</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 10. Interaction & UI States Switcher -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          UI &amp; Interaction State Preview:
        </span>
        <div
          class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
          role="group"
          aria-label="Officer Dashboard UI States"
        >
          <button
            v-for="preset in officerInteractionStatePresets"
            :key="preset.id"
            type="button"
            class="px-2.5 py-1.25 text-[11px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activeState === preset.id
                ? 'bg-[#781D2B] text-white shadow-2xs'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('select-state', preset.id)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- 4. Application Statistics (4 Summary Cards — Read-Only from System Records) -->
    <section aria-label="Application Statistics Summary Cards">
      <!-- Loading Statistics Skeleton State -->
      <div
        v-if="activeState === 'loading'"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        aria-busy="true"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 h-[116px] animate-pulse space-y-2.5"
        >
          <div class="h-3 w-28 bg-[#E5E7EB] rounded"></div>
          <div class="h-7 w-20 bg-[#D1D5DB] rounded"></div>
          <div class="h-2.5 w-36 bg-[#F3F4F6] rounded"></div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <article
          v-for="card in officerStatCards"
          :key="card.id"
          class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex items-start justify-between gap-4"
        >
          <div>
            <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
              {{ card.label }}
            </span>
            <p
              class="text-[26px] font-bold mt-1.5 leading-none"
              :class="
                card.accentTone === 'burgundy'
                  ? 'text-[#781D2B]'
                  : card.accentTone === 'green'
                    ? 'text-[#166534]'
                    : card.accentTone === 'orange'
                      ? 'text-[#B45309]'
                      : 'text-[#252525]'
              "
            >
              {{ card.value }}
            </p>
            <p class="text-[11.5px] text-[#6B7280] mt-2">
              {{ card.trendText }}
            </p>
          </div>

          <div
            class="w-10 h-10 rounded-[4px] border flex items-center justify-center shrink-0"
            :class="
              card.accentTone === 'burgundy'
                ? 'bg-[#FDF7F8] border-[#EBCFD4] text-[#781D2B]'
                : card.accentTone === 'green'
                  ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                  : 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'
            "
            aria-hidden="true"
          >
            <!-- Total Applications Icon -->
            <svg
              v-if="card.icon === 'total'"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>

            <!-- Pending Review Icon -->
            <svg
              v-else-if="card.icon === 'pending'"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>

            <!-- Need Correction Icon -->
            <svg
              v-else-if="card.icon === 'correction'"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>

            <!-- Approved Applications Icon -->
            <svg
              v-else
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </article>
      </div>
    </section>

    <!-- 5. Application Analytics (Donut Chart + Line Chart + Horizontal Bar Chart) -->
    <section
      aria-label="Application Analytics Charts"
      class="grid grid-cols-1 xl:grid-cols-12 gap-6"
    >
      <!-- Chart 1: Applications by Status (Donut Chart — 4 cols) -->
      <article
        class="xl:col-span-4 bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex flex-col justify-between"
      >
        <div class="pb-4 border-b border-[#EBECEF]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            STATUS DISTRIBUTION
          </span>
          <h2 class="text-[16.5px] font-bold text-[#252525] mt-0.5">
            Applications by Status
          </h2>
        </div>

        <div class="py-5 flex flex-col sm:flex-row xl:flex-col items-center gap-5">
          <!-- SVG Donut Chart -->
          <div class="relative w-36 h-36 shrink-0">
            <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#F3F4F6"
                stroke-width="4.2"
              />
              <!-- Approved 57.6% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#166534"
                stroke-width="4.2"
                stroke-dasharray="57.6 42.4"
                stroke-dashoffset="0"
              />
              <!-- Submitted + Under Review 25.6% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#781D2B"
                stroke-width="4.2"
                stroke-dasharray="25.6 74.4"
                stroke-dashoffset="-57.6"
              />
              <!-- Need Correction 6.8% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#D97706"
                stroke-width="4.2"
                stroke-dasharray="6.8 93.2"
                stroke-dashoffset="-83.2"
              />
              <!-- Draft & Rejected 10% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#991B1B"
                stroke-width="4.2"
                stroke-dasharray="10 90"
                stroke-dashoffset="-90"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span class="text-[19px] font-bold text-[#252525] leading-none">1,250</span>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mt-1">
                Total
              </span>
            </div>
          </div>

          <!-- Legend Breakdown -->
          <ul class="w-full space-y-2 text-[12px]">
            <li
              v-for="item in officerStatusDistribution"
              :key="item.status"
              class="flex items-center justify-between gap-2"
            >
              <span class="flex items-center gap-2 text-[#252525] font-medium">
                <span
                  class="w-2.5 h-2.5 rounded-[2px] shrink-0"
                  :style="{ backgroundColor: item.colorHex }"
                ></span>
                <span>{{ item.status }}</span>
              </span>
              <span class="font-bold text-[#252525]">
                {{ item.count }}
                <span class="text-[#6B7280] font-normal">({{ item.percentage }}%)</span>
              </span>
            </li>
          </ul>
        </div>
      </article>

      <!-- Chart 2: Applications Over Time (Line Chart — 4 cols) -->
      <article
        class="xl:col-span-4 bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex flex-col justify-between"
      >
        <div class="pb-4 border-b border-[#EBECEF]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            MONTHLY SUBMISSION VOLUME
          </span>
          <h2 class="text-[16.5px] font-bold text-[#252525] mt-0.5">
            Applications Over Time
          </h2>
        </div>

        <div class="pt-4 space-y-4">
          <!-- SVG Line Chart -->
          <div class="w-full bg-[#FAFAFB] border border-[#EBECEF] rounded-[4px] p-3">
            <svg viewBox="0 0 320 150" class="w-full h-[140px]">
              <!-- Horizontal Grid Lines -->
              <line x1="20" y1="25" x2="300" y2="25" stroke="#E5E7EB" stroke-dasharray="3 3" />
              <line x1="20" y1="65" x2="300" y2="65" stroke="#E5E7EB" stroke-dasharray="3 3" />
              <line x1="20" y1="105" x2="300" y2="105" stroke="#E5E7EB" stroke-dasharray="3 3" />

              <!-- Area Fill under Line -->
              <polygon
                points="30,115 84,90 138,62 192,40 246,24 300,42 300,130 30,130"
                fill="rgba(120, 29, 43, 0.09)"
              />

              <!-- Burgundy Trend Polyline -->
              <polyline
                fill="none"
                stroke="#781D2B"
                stroke-width="2.5"
                points="30,115 84,90 138,62 192,40 246,24 300,42"
              />

              <!-- Data Points -->
              <circle cx="30" cy="115" r="4" fill="#781D2B" />
              <circle cx="84" cy="90" r="4" fill="#781D2B" />
              <circle cx="138" cy="62" r="4" fill="#781D2B" />
              <circle cx="192" cy="40" r="4" fill="#781D2B" />
              <circle cx="246" cy="24" r="4" fill="#781D2B" />
              <circle cx="300" cy="42" r="4" fill="#781D2B" />
            </svg>
          </div>

          <!-- Month Labels & Application Counts -->
          <div class="grid grid-cols-6 gap-1.5 text-center">
            <div
              v-for="pt in officerMonthlySubmissions"
              :key="pt.month"
              class="p-2 rounded-[3px] bg-[#FAFAFB] border border-[#EBECEF]"
            >
              <span class="block text-[10.5px] font-bold uppercase text-[#6B7280]">
                {{ pt.month }}
              </span>
              <span class="block text-[12.5px] font-bold text-[#781D2B] mt-0.5">
                {{ pt.count }}
              </span>
            </div>
          </div>
        </div>
      </article>

      <!-- Chart 3: Applications by Faculty (Horizontal Bar Chart — 4 cols) -->
      <article
        class="xl:col-span-4 bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex flex-col justify-between"
      >
        <div class="pb-4 border-b border-[#EBECEF]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            PROGRAM DEMAND COMPARISON
          </span>
          <h2 class="text-[16.5px] font-bold text-[#252525] mt-0.5">
            Applications by Faculty
          </h2>
        </div>

        <ul class="pt-4 space-y-3">
          <li
            v-for="fac in officerFacultyApplicants"
            :key="fac.facultyName"
            class="space-y-1"
          >
            <div class="flex items-center justify-between text-[12px]">
              <span class="font-semibold text-[#252525] truncate pr-2">
                {{ fac.shortName }}
              </span>
              <span class="font-bold text-[#781D2B] shrink-0">
                {{ fac.applicants }} applicants
              </span>
            </div>
            <div class="w-full h-2.5 bg-[#F0F1F5] rounded-full overflow-hidden">
              <div
                class="h-full bg-[#781D2B] rounded-full transition-all duration-300"
                :style="{ width: `${Math.round((fac.applicants / fac.maxScale) * 100)}%` }"
              ></div>
            </div>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
