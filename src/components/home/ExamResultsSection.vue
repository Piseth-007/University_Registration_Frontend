<script setup lang="ts">
import type { ExamScheduleItem } from '../../types/admissions'
import { getExamStatusClass } from '../../utils/helpers'
import { navigateTo } from '../../router'

defineProps<{
  schedules: ExamScheduleItem[]
}>()
</script>

<template>
  <section id="results" class="py-16 bg-white">
    <div class="container-layout">
      <span class="eyebrow">EXAMINATION &amp; RESULTS</span>
      <h2 class="section-title">Examinations &amp; admission results</h2>

      <div
        class="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-11 mt-7 items-start"
      >
        <!-- Left: Schedule & Table -->
        <div>
          <h3 class="font-serif text-[18px] font-semibold text-ink mb-1">
            Upcoming examination schedule
          </h3>
          <p class="text-[12.5px] text-ink-secondary mb-4.5">
            Official dates for national and faculty entrance examinations.
          </p>

          <div
            class="bg-card-warm border-l-3 border-crimson px-4 py-3 mb-5"
          >
            <span
              class="block text-[9.5px] font-bold tracking-[0.1em] text-crimson mb-0.75"
            >
              IMPORTANT NOTICE
            </span>
            <p class="text-[12px] text-ink-secondary">
              Candidates must bring their printed Examination Slip and National ID Card
              at least 30 minutes before the examination starts.
            </p>
          </div>

          <div class="border-t border-border-warm mb-4 overflow-x-auto">
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
                <tr v-for="row in schedules" :key="row.id">
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
                    class="text-[13px] text-ink-secondary font-medium p-3.5 border-b border-border-warm"
                    :class="getExamStatusClass(row.status)"
                  >
                    {{ row.status }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <a
            href="/results"
            class="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-crimson hover:underline mt-1"
            @click.prevent="navigateTo('/results')"
          >
            View full examination schedule <span aria-hidden="true">→</span>
          </a>
        </div>

        <!-- Right: Results Portal Card -->
        <aside class="bg-card-warm border border-border-warm p-7 rounded-[2px]">
          <span
            class="inline-block bg-[#ebe4da] text-crimson text-[9.5px] font-bold tracking-[0.1em] px-2.25 py-1 rounded-[2px] mb-3.5"
          >
            RESULTS PORTAL
          </span>
          <h3
            class="font-serif text-[22px] font-semibold text-ink leading-[1.22] mb-3"
          >
            Your next chapter<br />
            is almost here
          </h3>
          <p class="text-[12.5px] font-semibold text-ink mb-2">
            Admission and scholarship results for the 2026–2027 intake.
          </p>
          <p class="text-[12px] text-ink-secondary leading-[1.55] mb-5">
            Enter your candidate number or application ID to check your entrance
            exam score and placement result.
          </p>
          <a
            href="/results"
            class="btn-primary mb-4"
            @click.prevent="navigateTo('/results')"
          >
            <span>Check exam results</span>
            <span class="text-[14px] leading-none" aria-hidden="true">→</span>
          </a>
          <p class="text-[11px] text-ink-muted leading-[1.45]">
            Need assistance locating your candidate ID? Contact the Admissions Office.
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>
