<script setup lang="ts">
import type { ScholarshipOpportunityItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  scholarships: ScholarshipOpportunityItem[]
}>()
</script>

<template>
  <section id="scholarships" class="py-16 bg-[#F5F6F8] border-t border-border-warm">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">FINANCIAL AID &amp; MERIT AWARDS</span>
          <h2 class="section-title text-[#252525]">Scholarships &amp; opportunities</h2>
        </div>
        <a
          href="/apply"
          class="text-[12.5px] font-semibold text-[#781D2B] hover:underline whitespace-nowrap"
          @click.prevent="navigateTo('/apply')"
        >
          Apply for scholarship admission <span aria-hidden="true">→</span>
        </a>
      </div>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-8">
        Explore merit-based and state-supported scholarship tracks along with important
        application deadlines.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article
          v-for="sch in scholarships"
          :key="sch.id"
          class="bg-white border border-border-warm p-6.5 rounded-[2px] flex flex-col justify-between"
        >
          <div>
            <!-- Top Badges -->
            <div class="flex items-center justify-between gap-2 mb-3.5">
              <span
                class="bg-[#781D2B]/10 text-[#781D2B] text-[10px] font-bold tracking-[0.09em] uppercase px-2.5 py-1 rounded-[2px]"
              >
                {{ sch.badge }}
              </span>
              <span
                class="text-[10.5px] font-semibold px-2.5 py-0.75 rounded-[2px]"
                :class="
                  sch.status === 'Closing Soon'
                    ? 'bg-[#fceae8] text-[#9e281d]'
                    : 'bg-[#ebf3ed] text-[#2c5e3b]'
                "
              >
                {{ sch.status }}
              </span>
            </div>

            <h3 class="font-serif text-[18px] font-semibold text-[#252525] mb-2">
              {{ sch.title }}
            </h3>

            <div
              class="bg-[#F5F6F8] border border-border-warm px-3 py-2 rounded-[2px] text-[12px] font-semibold text-[#781D2B] mb-3.5"
            >
              {{ sch.coveragePlaceholder }}
            </div>

            <p class="text-[12.5px] text-ink-secondary leading-[1.6] mb-5">
              {{ sch.eligibilitySummary }}
            </p>
          </div>

          <div class="pt-4 border-t border-border-warm flex flex-col gap-3">
            <div class="flex items-center justify-between text-[11.5px]">
              <span class="font-bold text-[#252525] uppercase tracking-[0.05em]">
                DEADLINE
              </span>
              <span class="font-semibold text-[#781D2B]">
                {{ sch.deadlinePlaceholder }}
              </span>
            </div>
            <a
              href="/apply"
              class="inline-flex items-center justify-center gap-2 bg-[#781D2B] hover:bg-[#5c121d] text-white text-[12.5px] font-medium px-4 py-2.25 rounded-[2px] transition-colors"
              @click.prevent="navigateTo('/apply')"
            >
              <span>Apply for Scholarship</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
