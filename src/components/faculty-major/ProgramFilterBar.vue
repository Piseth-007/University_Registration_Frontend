<script setup lang="ts">
import {
  portalDegreeLevelOptions,
  portalFacultyCards,
  portalStudyModeOptions,
} from '../../data/facultyMajorPageData'
import type { PortalDegreeLevel, PortalStudyMode } from '../../types/admissions'

defineProps<{
  searchQuery: string
  selectedFacultyId: string
  selectedDegreeLevel: PortalDegreeLevel | ''
  selectedStudyMode: PortalStudyMode | ''
  totalMatchingPrograms: number
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedFacultyId', value: string): void
  (e: 'update:selectedDegreeLevel', value: PortalDegreeLevel | ''): void
  (e: 'update:selectedStudyMode', value: PortalStudyMode | ''): void
  (e: 'reset-filters'): void
}>()
</script>

<template>
  <section
    aria-labelledby="faculty-major-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <!-- 3. Page Heading & Subtitle -->
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 mb-6 border-b border-[#EBECEF]"
    >
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
          ACADEMIC PROGRAM SELECTION
        </span>
        <h1
          id="faculty-major-heading"
          class="text-[24px] sm:text-[27px] font-bold text-[#252525] mt-1 leading-tight"
        >
          Select Your Faculty &amp; Major
        </h1>
        <p class="text-[14px] text-[#555555] mt-1.5">
          Explore academic programs and choose the program you wish to apply for.
        </p>
      </div>

      <!-- Illustrative Configuration Disclaimer Badge -->
      <div
        class="bg-[#F5F6F8] border border-[#E2E4E9] rounded-[4px] px-4 py-3 max-w-[440px] flex items-start gap-2.5 text-[12px] text-[#555555]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#781D2B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>
          <strong class="text-[#252525]">Illustrative Catalog:</strong> Sample faculties and programs are shown for portal demonstration. Actual degree offerings and admission quotas must be configured by the university.
        </span>
      </div>
    </div>

    <!-- 4. Program Search and Filters -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 items-end">
      <!-- Search Academic Programs Input (4 cols) -->
      <div class="xl:col-span-4 flex flex-col gap-1.5">
        <label for="portal-program-search" class="text-[12.5px] font-semibold text-[#252525]">
          Search Academic Programs
        </label>
        <div class="relative">
          <span
            class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B7280] pointer-events-none"
            aria-hidden="true"
          >
            <!-- Lucide Search Icon -->
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
            id="portal-program-search"
            :value="searchQuery"
            type="search"
            placeholder="e.g. Computer Science, Information Technology, Biology..."
            class="w-full pl-9.5 pr-3.5 py-2.5 text-[13.5px] text-[#252525] bg-white border border-[#D1D5DB] rounded-[4px] focus:border-[#781D2B] focus:outline-none transition-colors placeholder:text-[#9CA3AF]"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <!-- Faculty Dropdown (3 cols) -->
      <div class="xl:col-span-3 flex flex-col gap-1.5">
        <label for="portal-faculty-filter" class="text-[12.5px] font-semibold text-[#252525]">
          Faculty
        </label>
        <div class="relative">
          <select
            id="portal-faculty-filter"
            :value="selectedFacultyId"
            class="w-full appearance-none pl-3.5 pr-9 py-2.5 text-[13.5px] text-[#252525] bg-white border border-[#D1D5DB] rounded-[4px] focus:border-[#781D2B] focus:outline-none cursor-pointer"
            @change="emit('update:selectedFacultyId', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">All Faculties (6)</option>
            <option
              v-for="fac in portalFacultyCards"
              :key="fac.id"
              :value="fac.id"
            >
              {{ fac.name }}
            </option>
          </select>
          <span
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] pointer-events-none"
            aria-hidden="true"
          >
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Degree Level Dropdown (3 cols) -->
      <div class="xl:col-span-3 flex flex-col gap-1.5">
        <label for="portal-degree-filter" class="text-[12.5px] font-semibold text-[#252525]">
          Degree Level
        </label>
        <div class="relative">
          <select
            id="portal-degree-filter"
            :value="selectedDegreeLevel"
            class="w-full appearance-none pl-3.5 pr-9 py-2.5 text-[13.5px] text-[#252525] bg-white border border-[#D1D5DB] rounded-[4px] focus:border-[#781D2B] focus:outline-none cursor-pointer"
            @change="
              emit(
                'update:selectedDegreeLevel',
                ($event.target as HTMLSelectElement).value as PortalDegreeLevel | '',
              )
            "
          >
            <option value="">All Degree Levels</option>
            <option
              v-for="deg in portalDegreeLevelOptions"
              :key="deg.value"
              :value="deg.value"
            >
              {{ deg.label }}
            </option>
          </select>
          <span
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] pointer-events-none"
            aria-hidden="true"
          >
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Study Mode Dropdown (2 cols) -->
      <div class="xl:col-span-2 flex flex-col gap-1.5">
        <label for="portal-mode-filter" class="text-[12.5px] font-semibold text-[#252525]">
          Study Mode
        </label>
        <div class="relative">
          <select
            id="portal-mode-filter"
            :value="selectedStudyMode"
            class="w-full appearance-none pl-3.5 pr-9 py-2.5 text-[13.5px] text-[#252525] bg-white border border-[#D1D5DB] rounded-[4px] focus:border-[#781D2B] focus:outline-none cursor-pointer"
            @change="
              emit(
                'update:selectedStudyMode',
                ($event.target as HTMLSelectElement).value as PortalStudyMode | '',
              )
            "
          >
            <option value="">All Study Modes</option>
            <option
              v-for="mode in portalStudyModeOptions"
              :key="mode.value"
              :value="mode.value"
            >
              {{ mode.label }}
            </option>
          </select>
          <span
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] pointer-events-none"
            aria-hidden="true"
          >
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Filter Status Bar -->
    <div
      class="mt-4 pt-3.5 border-t border-[#EBECEF] flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-[#555555]"
    >
      <span>
        Showing <strong class="text-[#252525]">{{ totalMatchingPrograms }}</strong> matching academic
        {{ totalMatchingPrograms === 1 ? 'program' : 'programs' }}
      </span>

      <button
        v-if="searchQuery || selectedFacultyId || selectedDegreeLevel || selectedStudyMode"
        type="button"
        class="text-[#781D2B] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
        @click="emit('reset-filters')"
      >
        <span>Reset all filters</span>
      </button>
    </div>
  </section>
</template>
