<script setup lang="ts">
import type { QuickLinkItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  items: QuickLinkItem[]
}>()

function handleClick(item: QuickLinkItem) {
  navigateTo(item.route ?? item.href)
}
</script>

<template>
  <section class="bg-card-warm border-b border-border-warm" aria-label="Quick Links">
    <div class="container-layout grid grid-cols-1 sm:grid-cols-4 gap-6 py-4.5">
      <a
        v-for="(item, idx) in items"
        :key="idx"
        :href="item.route ?? item.href"
        class="group flex flex-col gap-0.75 pr-3 pb-2.5 sm:pb-0 border-b sm:border-b-0 sm:border-r border-border-warm last:border-none"
        @click.prevent="handleClick(item)"
      >
        <span
          class="text-[9.5px] font-semibold tracking-[0.1em] text-ink-muted uppercase"
        >
          {{ item.eyebrow }}
        </span>
        <span
          class="text-[13px] font-semibold text-ink group-hover:text-crimson inline-flex items-center gap-1.25 transition-colors"
        >
          {{ item.label }}
          <span class="text-crimson text-[12px]" aria-hidden="true">→</span>
        </span>
      </a>
    </div>
  </section>
</template>
