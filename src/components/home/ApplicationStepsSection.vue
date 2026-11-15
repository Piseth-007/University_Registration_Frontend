<script setup lang="ts">
import type { ApplicationStepItem } from '../../types/admissions'

defineProps<{
  steps: ApplicationStepItem[]
}>()
</script>

<template>
  <section id="process" class="py-16 bg-crimson text-white">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-9"
      >
        <div>
          <span
            class="block text-[10px] font-bold tracking-[0.12em] text-white/72 uppercase mb-1.5"
          >
            APPLICATION PROCESS
          </span>
          <h2 class="font-serif text-[28px] font-semibold text-white leading-tight">
            Six steps to your new chapter
          </h2>
        </div>
        <span class="text-[12px] text-white/78">Estimated time: 15–20 minutes</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        <div v-for="step in steps" :key="step.num" class="flex flex-col">
          <div
            class="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/18"
          >
            <span class="font-serif text-[24px] font-medium text-white/92">
              {{ step.num }}
            </span>
            <span class="text-[13px] text-white/55" aria-hidden="true">→</span>
          </div>
          <h3 class="text-[13.5px] font-semibold text-white mb-1.5">
            {{ step.title }}
          </h3>
          <p class="text-[12px] leading-normal text-white/76">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
