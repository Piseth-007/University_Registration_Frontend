<script setup lang="ts">
import { computed, ref } from 'vue'
import { examSchedules } from '../data/admissionsData'
import { filterExamSchedule, formatCandidateId } from '../utils/helpers'
import { navigateTo } from '../router'

const candidateQuery = ref('')
const scheduleFilter = ref('')
const lookupSubmitted = ref(false)

const filteredSchedules = computed(() =>
  filterExamSchedule(examSchedules, scheduleFilter.value),
)

function handleLookup() {
  candidateQuery.value = formatCandidateId(candidateQuery.value)
  lookupSubmitted.value = Boolean(candidateQuery.value)
}
</script>

<template>
  <main class="py-16 bg-warm">
    <div class="container-layout">
      <div class="mb-4.5">
        <a
          href="/"
          class="text-[12.5px] font-semibold text-crimson hover:underline"
          @click.prevent="navigateTo('/')"
        >
          ← Back to Admissions Home
        </a>
      </div>

      <span class="eyebrow">RESULTS PORTAL</span>
      <h1 class="section-title">Examination &amp; Admission Results</h1>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-7">
        Check your entrance examination result by Candidate ID or browse the upcoming exam schedule.
      </p>

      <div class="bg-white border border-border-warm p-7 rounded-[2px] mb-6">
        <form class="flex flex-col sm:flex-row gap-3 max-w-[560px]" @submit.prevent="handleLookup">
          <input
            v-model="candidateQuery"
            type="text"
            class="flex-1 px-3.5 py-2.5 border border-border-warm rounded-[2px] text-[13.5px]"
            placeholder="Enter Candidate ID (e.g. RUPP-2026-0142)"
          />
          <button type="submit" class="btn-primary">
            <span>Search Result</span>
            <span class="text-[14px] leading-none" aria-hidden="true">→</span>
          </button>
        </form>
        <p v-if="lookupSubmitted" class="mt-3.5 text-[13px] text-ink-secondary">
          Checking official registry for Candidate ID:
          <strong class="text-ink">{{ candidateQuery }}</strong>. Results for the
          December 2026 examination session will be published following the exam dates
          below.
        </p>
      </div>

      <div class="bg-white border border-border-warm p-7 rounded-[2px]">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4.5"
        >
          <h2 class="font-serif text-[20px] font-semibold text-ink">
            2026–2027 Entrance Examination Schedule
          </h2>
          <input
            v-model="scheduleFilter"
            type="search"
            class="px-3 py-2 border border-border-warm rounded-[2px] text-[12.5px]"
            placeholder="Filter by faculty..."
          />
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr>
                <th
                  class="bg-warm text-[10px] font-bold tracking-[0.08em] text-ink-muted px-3.5 py-2.75 border-b border-border-warm"
                >
                  FACULTY / TRACK
                </th>
                <th
                  class="bg-warm text-[10px] font-bold tracking-[0.08em] text-ink-muted px-3.5 py-2.75 border-b border-border-warm"
                >
                  EXAM DATE
                </th>
                <th
                  class="bg-warm text-[10px] font-bold tracking-[0.08em] text-ink-muted px-3.5 py-2.75 border-b border-border-warm"
                >
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredSchedules" :key="row.id">
                <td
                  class="text-[13px] font-semibold text-ink p-3.5 border-b border-border-warm"
                >
                  {{ row.faculty }}
                </td>
                <td
                  class="text-[13px] text-ink-secondary p-3.5 border-b border-border-warm"
                >
                  {{ row.date }}
                </td>
                <td
                  class="text-[13px] text-ink-secondary p-3.5 border-b border-border-warm"
                >
                  {{ row.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
