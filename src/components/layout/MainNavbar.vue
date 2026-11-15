<script setup lang="ts">
import type { NavItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  items: NavItem[]
  activeId: string
}>()

const emit = defineEmits<{
  (e: 'select', item: NavItem): void
}>()

function handleNavClick(item: NavItem) {
  emit('select', item)
  navigateTo(item.href)
}
</script>

<template>
  <nav class="bg-crimson text-white/88" aria-label="Primary Navigation">
    <div class="container-layout flex items-center overflow-x-auto">
      <a
        v-for="item in items"
        :key="item.id"
        :href="item.href"
        class="text-[12.5px] px-4.5 py-3.25 whitespace-nowrap transition-colors"
        :class="
          activeId === item.id
            ? 'bg-crimson-dark text-white font-semibold'
            : 'text-white/88 font-medium hover:bg-black/14 hover:text-white'
        "
        @click.prevent="handleNavClick(item)"
      >
        {{ item.label }}
      </a>
    </div>
  </nav>
</template>
