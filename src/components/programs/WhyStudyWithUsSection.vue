<script setup lang="ts">
import type { AcademicStrengthItem } from '../../types/admissions'

defineProps<{
  strengths: AcademicStrengthItem[]
}>()
</script>

<template>
  <section class="py-16 bg-white border-t border-border-warm">
    <div class="container-layout">
      <div class="mb-9">
        <span class="eyebrow text-[#781D2B]">ACADEMIC STRENGTHS</span>
        <h2 class="section-title text-[#252525]">Why study with us</h2>
        <p class="text-[13.5px] text-ink-secondary mt-2 max-w-[620px]">
          Our academic environment combines scholarly tradition with modern resources to
          support every student's intellectual and professional growth.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="item in strengths"
          :key="item.id"
          class="bg-[#F5F6F8] border border-border-warm p-6 rounded-[2px] flex flex-col"
        >
          <div
            class="flex items-center justify-between pb-3 mb-4 border-b border-border-warm"
          >
            <span class="text-[20px] font-bold text-[#781D2B]">{{ item.num }}</span>
            <span class="text-[12px] text-ink-muted" aria-hidden="true">▪</span>
          </div>
          <h3 class="text-[16px] font-semibold text-[#252525] mb-2">
            {{ item.title }}
          </h3>
          <p class="text-[12.5px] text-ink-secondary leading-[1.6]">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
