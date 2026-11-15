<script setup lang="ts">
import type { AboutFacultyCardItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  faculties: AboutFacultyCardItem[]
}>()
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
      >
        <div>
          <span class="eyebrow">ACADEMIC STRUCTURE</span>
          <h2 class="section-title">Faculties &amp; institutes</h2>
        </div>
        <a
          href="/programs"
          class="text-[12.5px] font-semibold text-crimson hover:underline whitespace-nowrap"
          @click.prevent="navigateTo('/programs')"
        >
          Explore all programs <span aria-hidden="true">→</span>
        </a>
      </div>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-7">
        Our academic programs are organized across specialized faculties and institutes.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="fac in faculties"
          :key="fac.id"
          class="bg-white border border-border-warm hover:border-[#cbbab8] hover:shadow-[0_8px_22px_rgba(31,25,26,0.05)] flex flex-col overflow-hidden transition-all"
        >
          <div class="aspect-[16/8.5] overflow-hidden bg-[#e6e1da]">
            <img
              :src="fac.image"
              :alt="fac.title"
              class="w-full h-full object-cover block"
            />
          </div>
          <div class="p-5.5 pt-5 flex flex-col flex-1">
            <div
              class="flex items-center justify-between text-[9.5px] font-semibold tracking-[0.09em] text-ink-muted uppercase mb-2"
            >
              <span>{{ fac.eyebrow }}</span>
              <span aria-hidden="true">→</span>
            </div>
            <h3 class="font-serif text-[18px] font-semibold text-ink mb-2">
              {{ fac.title }}
            </h3>
            <p class="text-[12px] text-ink-secondary leading-[1.55] mb-4 flex-1">
              {{ fac.description }}
            </p>
            <a
              href="/programs"
              class="text-[12px] font-semibold text-crimson hover:underline inline-flex items-center gap-1.25"
              @click.prevent="navigateTo('/programs')"
            >
              View faculty <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </div>

      <p class="text-[11px] text-ink-muted mt-5">
        * Program offerings and department structures are updated each academic year.
      </p>
    </div>
  </section>
</template>
