<script setup lang="ts">
import type {
  AcademicProgramItem,
  DegreeLevel,
  FacultyDirectoryItem,
  StudyMode,
} from '../../types/admissions'

defineProps<{
  programs: AcademicProgramItem[]
  faculties: FacultyDirectoryItem[]
  degreeLevels: DegreeLevel[]
  studyModes: StudyMode[]
  searchQuery: string
  selectedFacultyId: string
  selectedDegreeLevel: DegreeLevel | 'ALL'
  selectedStudyMode: StudyMode | 'ALL'
  activeProgramId: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', val: string): void
  (e: 'update:selectedFacultyId', val: string): void
  (e: 'update:selectedDegreeLevel', val: DegreeLevel | 'ALL'): void
  (e: 'update:selectedStudyMode', val: StudyMode | 'ALL'): void
  (e: 'resetFilters'): void
  (e: 'viewDetails', program: AcademicProgramItem): void
}>()
</script>

<template>
  <section id="program-directory" class="py-16 bg-white">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">ACADEMIC PROGRAM DIRECTORY</span>
          <h2 class="section-title text-[#252525]">Search &amp; explore degree programs</h2>
        </div>
        <span
          class="text-[11.5px] font-medium text-[#781D2B] bg-[#F5F6F8] border border-border-warm px-3 py-1 rounded-[2px]"
        >
          Note: Sample data — unconfirmed details marked as [Placeholder]
        </span>
      </div>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-6">
        Filter programs by faculty, degree level, or study mode, and select any program
        to inspect its curriculum and admission details below.
      </p>

      <!-- Search & Filter Bar -->
      <div class="bg-[#F5F6F8] border border-border-warm p-5 rounded-[2px] mb-7">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search Keyword -->
          <div class="flex flex-col gap-1.5">
            <label
              for="program-search"
              class="text-[11px] font-bold tracking-[0.08em] text-[#252525] uppercase"
            >
              Search Program
            </label>
            <input
              id="program-search"
              :value="searchQuery"
              type="search"
              placeholder="Program name or keyword..."
              class="bg-white border border-border-warm focus:border-[#781D2B] focus:outline-none px-3 py-2 text-[13px] rounded-[2px] text-[#252525]"
              @input="
                emit('update:searchQuery', ($event.target as HTMLInputElement).value)
              "
            />
          </div>

          <!-- Filter: Faculty -->
          <div class="flex flex-col gap-1.5">
            <label
              for="filter-faculty"
              class="text-[11px] font-bold tracking-[0.08em] text-[#252525] uppercase"
            >
              Faculty
            </label>
            <select
              id="filter-faculty"
              :value="selectedFacultyId"
              class="bg-white border border-border-warm focus:border-[#781D2B] focus:outline-none px-3 py-2 text-[13px] rounded-[2px] text-[#252525]"
              @change="
                emit(
                  'update:selectedFacultyId',
                  ($event.target as HTMLSelectElement).value,
                )
              "
            >
              <option value="ALL">All Faculties</option>
              <option v-for="fac in faculties" :key="fac.id" :value="fac.id">
                {{ fac.name }}
              </option>
            </select>
          </div>

          <!-- Filter: Degree Level -->
          <div class="flex flex-col gap-1.5">
            <label
              for="filter-degree"
              class="text-[11px] font-bold tracking-[0.08em] text-[#252525] uppercase"
            >
              Degree Level
            </label>
            <select
              id="filter-degree"
              :value="selectedDegreeLevel"
              class="bg-white border border-border-warm focus:border-[#781D2B] focus:outline-none px-3 py-2 text-[13px] rounded-[2px] text-[#252525]"
              @change="
                emit(
                  'update:selectedDegreeLevel',
                  ($event.target as HTMLSelectElement).value as DegreeLevel | 'ALL',
                )
              "
            >
              <option value="ALL">All Degree Levels</option>
              <option v-for="deg in degreeLevels" :key="deg" :value="deg">
                {{ deg }}
              </option>
            </select>
          </div>

          <!-- Filter: Study Mode -->
          <div class="flex flex-col gap-1.5">
            <label
              for="filter-mode"
              class="text-[11px] font-bold tracking-[0.08em] text-[#252525] uppercase"
            >
              Study Mode
            </label>
            <select
              id="filter-mode"
              :value="selectedStudyMode"
              class="bg-white border border-border-warm focus:border-[#781D2B] focus:outline-none px-3 py-2 text-[13px] rounded-[2px] text-[#252525]"
              @change="
                emit(
                  'update:selectedStudyMode',
                  ($event.target as HTMLSelectElement).value as StudyMode | 'ALL',
                )
              "
            >
              <option value="ALL">All Study Modes</option>
              <option v-for="mode in studyModes" :key="mode" :value="mode">
                {{ mode }}
              </option>
            </select>
          </div>
        </div>

        <!-- Filter Status Bar -->
        <div
          class="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3.5 border-t border-border-warm text-[12px]"
        >
          <span class="text-ink-secondary">
            Showing <strong class="text-[#252525]">{{ programs.length }}</strong> sample
            program(s)
          </span>
          <button
            type="button"
            class="text-[#781D2B] font-semibold hover:underline cursor-pointer"
            @click="emit('resetFilters')"
          >
            Reset all filters
          </button>
        </div>
      </div>

      <!-- Program Listing Cards -->
      <div v-if="programs.length > 0" class="flex flex-col gap-4">
        <article
          v-for="prog in programs"
          :key="prog.id"
          class="border rounded-[2px] p-6 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          :class="
            activeProgramId === prog.id
              ? 'bg-[#fcfaf8] border-[#781D2B] shadow-[0_4px_16px_rgba(120,29,43,0.08)]'
              : 'bg-white border-border-warm hover:border-[#cbbab8]'
          "
        >
          <div class="flex-1">
            <!-- Metadata Pills -->
            <div class="flex flex-wrap items-center gap-2 mb-2.5">
              <span
                class="bg-[#781D2B]/10 text-[#781D2B] text-[10.5px] font-bold tracking-[0.06em] uppercase px-2.5 py-0.75 rounded-[2px]"
              >
                {{ prog.facultyName }}
              </span>
              <span
                class="bg-[#F5F6F8] border border-border-warm text-[#252525] text-[11px] font-medium px-2.5 py-0.75 rounded-[2px]"
              >
                {{ prog.degreeLevel }}
              </span>
              <span
                class="bg-[#F5F6F8] border border-border-warm text-ink-secondary text-[11px] px-2.5 py-0.75 rounded-[2px]"
              >
                Mode: {{ prog.studyMode }}
              </span>
              <span
                class="bg-[#F5F6F8] border border-border-warm text-ink-muted text-[11px] px-2.5 py-0.75 rounded-[2px]"
              >
                Duration: {{ prog.durationPlaceholder }}
              </span>
            </div>

            <h3 class="text-[17.5px] font-semibold text-[#252525] mb-1.5">
              {{ prog.name }}
            </h3>
            <p class="text-[13px] text-ink-secondary leading-[1.58]">
              {{ prog.summary }}
            </p>
          </div>

          <div class="shrink-0 flex items-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4.5 py-2.5 text-[12.5px] font-semibold rounded-[2px] border transition-colors cursor-pointer"
              :class="
                activeProgramId === prog.id
                  ? 'bg-[#781D2B] border-[#781D2B] text-white'
                  : 'bg-white border-[#781D2B] text-[#781D2B] hover:bg-[#781D2B] hover:text-white'
              "
              @click="emit('viewDetails', prog)"
            >
              <span>View Details</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </article>
      </div>

      <!-- Empty Filter State -->
      <div
        v-else
        class="bg-[#F5F6F8] border border-border-warm p-10 text-center rounded-[2px]"
      >
        <p class="text-[14px] font-semibold text-[#252525] mb-1">
          No sample programs match your current filter selection.
        </p>
        <p class="text-[12.5px] text-ink-secondary mb-4">
          Try clearing one or more filters to view all editable sample programs.
        </p>
        <button
          type="button"
          class="btn-primary"
          @click="emit('resetFilters')"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </section>
</template>
