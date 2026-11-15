<script setup lang="ts">
import type { CoreValueItem } from '../../types/admissions'

defineProps<{
  missionPoints: string[]
  coreValues: CoreValueItem[]
}>()
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container-layout">
      <!-- Part 1: Vision & Mission -->
      <div class="pb-14 border-b border-border-warm">
        <span class="eyebrow">OUR PURPOSE</span>
        <h2 class="section-title mb-6">Vision &amp; mission</h2>

        <div
          class="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-11 items-center"
        >
          <!-- Left: Crimson Vision Box -->
          <div class="bg-crimson text-white px-8 py-9 rounded-[2px]">
            <span
              class="block text-[9.5px] font-bold tracking-[0.12em] text-white/72 uppercase mb-2.5"
            >
              OUR VISION
            </span>
            <h3
              class="font-serif text-[22px] font-medium leading-[1.28] text-white mb-3.5"
            >
              Learning that transforms.<br />
              Knowledge that serves society.
            </h3>
            <p class="text-[12.5px] leading-[1.65] text-white/84">
              To be a leading institution of higher learning in Cambodia and Southeast
              Asia, recognized for excellence in teaching, research, and community
              engagement that empowers graduates to lead with integrity.
            </p>
          </div>

          <!-- Right: Mission Points -->
          <div>
            <span class="eyebrow">OUR MISSION</span>
            <h3
              class="font-serif text-[21px] font-semibold text-ink leading-[1.3] mb-4.5"
            >
              A commitment to excellence,<br />
              research, and community.
            </h3>

            <ul class="list-none flex flex-col gap-3">
              <li
                v-for="(point, idx) in missionPoints"
                :key="idx"
                class="flex items-start gap-2.5 text-[13px] text-ink-secondary leading-[1.55]"
              >
                <span class="text-crimson text-[12px] leading-normal" aria-hidden="true">
                  ▪
                </span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Part 2: Core Values -->
      <div class="pt-13">
        <span class="eyebrow">WHAT GUIDES US</span>
        <h2 class="section-title mb-7">Our core values</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="val in coreValues" :key="val.num">
            <div class="font-serif text-[16px] font-semibold text-crimson mb-3">
              {{ val.num }}
            </div>
            <h3 class="text-[14px] font-semibold text-ink mb-1.5">
              {{ val.title }}
            </h3>
            <p class="text-[12px] text-ink-secondary leading-[1.55]">
              {{ val.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
