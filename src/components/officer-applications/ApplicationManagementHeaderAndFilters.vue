<script setup lang="ts">
import {
  officerAcademicYearOptions,
  officerDateRangeOptions,
  officerFacultyOptions,
  officerMajorOptions,
  officerManagementStatePresets,
  officerManagementSummaryCards,
  officerStatusFilterOptions,
} from '../../data/officerApplicationManagementData'
import type { OfficerManagementInteractionState } from '../../types/admissions'

defineProps<{
  searchQuery: string
  statusFilter: string
  academicYearFilter: string
  facultyFilter: string
  majorFilter: string
  dateRangeFilter: string
  activeState: OfficerManagementInteractionState
  actionBannerMessage: string | null
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:statusFilter', value: string): void
  (e: 'update:academicYearFilter', value: string): void
  (e: 'update:facultyFilter', value: string): void
  (e: 'update:majorFilter', value: string): void
  (e: 'update:dateRangeFilter', value: string): void
  (e: 'apply-filters'): void
  (e: 'reset-filters'): void
  (e: 'export-all'): void
  (e: 'select-state', state: OfficerManagementInteractionState): void
  (e: 'dismiss-banner'): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 3. Page Header + Export Button + 10. Interaction States Toolbar -->
    <section
      aria-labelledby="application-management-heading"
      class="bg-white border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-[#EBECEF]"
      >
        <div>
          <!-- Breadcrumb: Admission / Applications -->
          <div class="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280] mb-1">
            <span>Admission</span>
            <span>/</span>
            <span class="text-[#781D2B]">Applications</span>
          </div>

          <h1
            id="application-management-heading"
            class="text-[24px] sm:text-[28px] font-bold text-[#252525] leading-tight"
          >
            Application Management
          </h1>
          <p class="text-[14px] text-[#555555] mt-1">
            View, search, filter, and manage student admission applications.
          </p>
        </div>

        <!-- Export Applications Button -->
        <div class="shrink-0">
          <button
            type="button"
            class="px-4 py-2.5 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            @click="emit('export-all')"
          >
            <!-- Lucide Download Icon -->
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span>Export Applications</span>
          </button>
        </div>
      </div>

      <!-- 10. Interaction States Toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Interaction State Preview:
        </span>
        <div
          class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
          role="group"
          aria-label="Application Management States"
        >
          <button
            v-for="preset in officerManagementStatePresets"
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

      <!-- Successful Action Notification Banner -->
      <div
        v-if="actionBannerMessage"
        role="status"
        class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[4px] px-4 py-3 flex items-center justify-between gap-3 text-[13px] text-[#166534] font-semibold"
      >
        <div class="flex items-center gap-2.5">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>{{ actionBannerMessage }}</span>
        </div>
        <button
          type="button"
          class="text-[12px] underline cursor-pointer"
          @click="emit('dismiss-banner')"
        >
          Dismiss
        </button>
      </div>
    </section>

    <!-- 4. Application Statistics (4 Compact Summary Cards) -->
    <section
      aria-label="Application Management Summary Cards"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      <article
        v-for="card in officerManagementSummaryCards"
        :key="card.id"
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex items-start justify-between gap-4"
      >
        <div>
          <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            {{ card.label }}
          </span>
          <p
            class="text-[25px] font-bold mt-1 leading-none"
            :class="
              card.accent === 'burgundy'
                ? 'text-[#781D2B]'
                : card.accent === 'blue'
                  ? 'text-[#1E40AF]'
                  : card.accent === 'orange'
                    ? 'text-[#B45309]'
                    : 'text-[#252525]'
            "
          >
            {{ card.count }}
          </p>
          <p class="text-[11.5px] text-[#6B7280] mt-2">
            {{ card.indicatorText }}
          </p>
        </div>

        <div
          class="w-10 h-10 rounded-[4px] border flex items-center justify-center shrink-0"
          :class="
            card.accent === 'burgundy'
              ? 'bg-[#FDF7F8] border-[#EBCFD4] text-[#781D2B]'
              : card.accent === 'blue'
                ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]'
                : 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'
          "
          aria-hidden="true"
        >
          <!-- Total Applications Icon -->
          <svg
            v-if="card.icon === 'total'"
            width="18"
            height="18"
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

          <!-- New Applications Icon -->
          <svg
            v-else-if="card.icon === 'new'"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>

          <!-- Under Review Icon -->
          <svg
            v-else-if="card.icon === 'review'"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>

          <!-- Need Correction Icon -->
          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>
      </article>
    </section>

    <!-- 5. Search and Filter Toolbar Section -->
    <section
      aria-label="Search and Filter Applications"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-4"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3.5">
        <!-- Search Input (2 cols on desktop) -->
        <div class="xl:col-span-2">
          <label
            for="mgmt-search-input"
            class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280] mb-1"
          >
            Search Applications
          </label>
          <div class="relative">
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
              id="mgmt-search-input"
              :value="searchQuery"
              type="search"
              placeholder="Application ID, Student Name, Email, Phone..."
              class="w-full h-9.5 pl-9 pr-3 text-[12.5px] bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:bg-white focus:border-[#781D2B] focus:outline-none"
              @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
            />
          </div>
        </div>

        <!-- Filter 1: Application Status -->
        <div>
          <label
            for="mgmt-status-filter"
            class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280] mb-1"
          >
            Application Status
          </label>
          <select
            id="mgmt-status-filter"
            :value="statusFilter"
            class="w-full h-9.5 px-2.5 text-[12.5px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
            @change="emit('update:statusFilter', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="st in officerStatusFilterOptions" :key="st" :value="st">
              {{ st }}
            </option>
          </select>
        </div>

        <!-- Filter 2: Academic Year -->
        <div>
          <label
            for="mgmt-year-filter"
            class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280] mb-1"
          >
            Academic Year
          </label>
          <select
            id="mgmt-year-filter"
            :value="academicYearFilter"
            class="w-full h-9.5 px-2.5 text-[12.5px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
            @change="
              emit('update:academicYearFilter', ($event.target as HTMLSelectElement).value)
            "
          >
            <option v-for="yr in officerAcademicYearOptions" :key="yr" :value="yr">
              {{ yr }}
            </option>
          </select>
        </div>

        <!-- Filter 3: Faculty -->
        <div>
          <label
            for="mgmt-faculty-filter"
            class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280] mb-1"
          >
            Faculty
          </label>
          <select
            id="mgmt-faculty-filter"
            :value="facultyFilter"
            class="w-full h-9.5 px-2.5 text-[12.5px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
            @change="emit('update:facultyFilter', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="fac in officerFacultyOptions" :key="fac" :value="fac">
              {{ fac }}
            </option>
          </select>
        </div>

        <!-- Filter 4: Major -->
        <div>
          <label
            for="mgmt-major-filter"
            class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280] mb-1"
          >
            Major
          </label>
          <select
            id="mgmt-major-filter"
            :value="majorFilter"
            class="w-full h-9.5 px-2.5 text-[12.5px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
            @change="emit('update:majorFilter', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="maj in officerMajorOptions" :key="maj" :value="maj">
              {{ maj }}
            </option>
          </select>
        </div>
      </div>

      <!-- Bottom Row of Filter Toolbar: Submission Date Range + Apply Filters + Reset Filters -->
      <div
        class="pt-3 border-t border-[#EBECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div class="flex flex-wrap items-center gap-2.5">
          <label
            for="mgmt-date-range-filter"
            class="text-[11.5px] font-bold uppercase tracking-[0.07em] text-[#6B7280]"
          >
            Submission Date Range:
          </label>
          <select
            id="mgmt-date-range-filter"
            :value="dateRangeFilter"
            class="h-8.5 px-2.5 text-[12px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
            @change="
              emit('update:dateRangeFilter', ($event.target as HTMLSelectElement).value)
            "
          >
            <option v-for="dr in officerDateRangeOptions" :key="dr" :value="dr">
              {{ dr }}
            </option>
          </select>
        </div>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            class="px-3.5 py-1.75 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[12.5px] font-semibold transition-colors cursor-pointer"
            @click="emit('reset-filters')"
          >
            Reset Filters
          </button>

          <button
            type="button"
            class="px-4 py-1.75 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer shadow-2xs"
            @click="emit('apply-filters')"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
