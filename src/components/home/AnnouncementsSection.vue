<script setup lang="ts">
import type { AnnouncementItem, KeyDateItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  announcements: AnnouncementItem[]
  keyDates: KeyDateItem[]
}>()
</script>

<template>
  <section id="announcements" class="py-16 bg-white">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6"
      >
        <div>
          <span class="eyebrow">LATEST UPDATES</span>
          <h2 class="section-title">Admission announcements</h2>
        </div>
        <a
          href="/news"
          class="text-[12.5px] font-semibold text-crimson hover:underline whitespace-nowrap"
          @click.prevent="navigateTo('/news')"
        >
          All announcements <span aria-hidden="true">→</span>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-10 items-start">
        <!-- Announcements List -->
        <div class="flex flex-col">
          <a
            v-for="item in announcements"
            :key="item.id"
            href="#announcements"
            class="group flex items-center gap-4.5 py-4.5 first:pt-2 border-b border-border-warm transition-colors"
            @click.prevent
          >
            <div
              class="w-[46px] h-[48px] bg-warm border border-border-warm flex flex-col items-center justify-center shrink-0 rounded-[2px]"
            >
              <span class="font-serif text-[16px] font-bold text-crimson leading-none">
                {{ item.day }}
              </span>
              <span
                class="text-[9px] font-semibold tracking-[0.08em] text-ink-muted mt-1"
              >
                {{ item.month }}
              </span>
            </div>
            <div class="flex-1">
              <h3
                class="text-[14.5px] font-semibold text-ink group-hover:text-crimson mb-0.75 transition-colors"
              >
                {{ item.title }}
              </h3>
              <p class="text-[12.5px] text-ink-secondary">{{ item.summary }}</p>
            </div>
            <span
              class="text-ink-muted text-[14px] group-hover:text-crimson group-hover:translate-x-0.75 transition-all"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>

        <!-- Key Dates Sidebar Card -->
        <aside class="bg-card-warm border border-border-warm p-6 rounded-[2px]">
          <h3 class="font-serif text-[17px] font-semibold text-crimson mb-4.5">
            2026–2027 Key Dates
          </h3>
          <div class="flex flex-col gap-3.5 mb-5">
            <div
              v-for="(kd, idx) in keyDates"
              :key="idx"
              class="flex flex-col gap-0.5 pb-3 border-b border-border-warm last:border-none last:pb-0"
            >
              <span
                class="text-[9.5px] font-semibold tracking-[0.09em] text-ink-muted uppercase"
              >
                {{ kd.label }}
              </span>
              <span class="text-[13.5px] font-semibold text-ink">{{ kd.date }}</span>
            </div>
          </div>
          <a
            href="#calendar"
            class="inline-block text-[12px] font-semibold text-crimson hover:underline"
            @click.prevent
          >
            Download academic calendar <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </div>
  </section>
</template>
