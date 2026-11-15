<script setup lang="ts">
import type { DashboardSummaryCardItem } from '../../types/admissions'

defineProps<{
  cards: DashboardSummaryCardItem[]
}>()
</script>

<template>
  <section aria-label="Application Summary Cards" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <article
      v-for="card in cards"
      :key="card.id"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex items-start justify-between gap-4"
    >
      <div class="min-w-0">
        <span class="block text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          {{ card.label }}
        </span>
        <p
          class="text-[20px] sm:text-[22px] font-bold mt-1.5 leading-tight truncate"
          :class="
            card.accentTone === 'burgundy'
              ? 'text-[#781D2B]'
              : 'text-[#252525]'
          "
        >
          {{ card.value }}
        </p>
        <p class="text-[12px] text-[#6B7280] mt-1.5">
          {{ card.helperText }}
        </p>
      </div>

      <!-- Icon Box -->
      <div
        class="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 border"
        :class="
          card.accentTone === 'burgundy'
            ? 'bg-[#FDF7F8] border-[#EBCFD4] text-[#781D2B]'
            : card.accentTone === 'amber'
              ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'
              : 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525]'
        "
        aria-hidden="true"
      >
        <!-- Application Status Icon (Activity / Clock) -->
        <svg
          v-if="card.icon === 'status'"
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

        <!-- Documents Uploaded Icon (FileCheck) -->
        <svg
          v-else-if="card.icon === 'documents'"
          width="19"
          height="19"
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

        <!-- Selected Faculty Icon (Building2 / BookOpen) -->
        <svg
          v-else-if="card.icon === 'faculty'"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>

        <!-- Application Deadline Icon (CalendarClock) -->
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
          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h5" />
          <path d="M17.5 17.5 16 16.3V14" />
          <circle cx="16" cy="16" r="6" />
        </svg>
      </div>
    </article>
  </section>
</template>
