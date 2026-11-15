<script setup lang="ts">
import type { HistoryMilestoneItem } from '../../types/admissions'

defineProps<{
  milestones: HistoryMilestoneItem[]
}>()
</script>

<template>
  <section class="py-16 bg-warm">
    <div class="container-layout">
      <div
        class="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-3 lg:gap-8 mb-9"
      >
        <div>
          <span class="eyebrow">OUR JOURNEY</span>
          <h2 class="section-title">History &amp; development</h2>
        </div>
        <p class="text-[12.5px] text-ink-secondary max-w-[380px] leading-[1.55]">
          Key milestones that shaped our growth from a foundational institution into a
          comprehensive modern university.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, idx) in milestones"
          :key="idx"
          class="flex flex-col"
        >
          <div
            class="font-serif text-[20px] font-semibold text-crimson pb-3 mb-3.5 border-b-2 border-[#cbb799]"
          >
            {{ item.year }}
          </div>
          <h3 class="text-[13.5px] font-semibold text-ink mb-1.5">
            {{ item.title }}
          </h3>
          <p class="text-[12px] text-ink-secondary leading-[1.55]">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
