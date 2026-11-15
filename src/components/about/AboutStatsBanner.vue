<script setup lang="ts">
import type { InstitutionalStatItem } from '../../types/admissions'

defineProps<{
  stats: InstitutionalStatItem[]
}>()
</script>

<template>
  <section class="py-16 bg-crimson text-white">
    <div class="container-layout">
      <span
        class="block text-[10px] font-bold tracking-[0.12em] text-white/72 uppercase mb-6"
      >
        INSTITUTIONAL SNAPSHOT
      </span>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <div
          v-for="(item, idx) in stats"
          :key="idx"
          class="flex flex-col"
        >
          <div class="font-serif text-[28px] font-medium text-white mb-2 leading-none">
            {{ item.metric }}
          </div>
          <h3 class="text-[13.5px] font-semibold text-white mb-0.75">
            {{ item.title }}
          </h3>
          <p class="text-[11.5px] text-white/72">{{ item.subtitle }}</p>
        </div>
      </div>

      <p class="text-[11px] text-white/58 mt-6.5">
        * Official institutional figures are published in the annual university report.
      </p>
    </div>
  </section>
</template>
