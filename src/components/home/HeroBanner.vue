<script setup lang="ts">
import { navigateTo } from '../../router'
</script>

<template>
  <section
    class="relative min-h-[460px] lg:min-h-[540px] flex items-center text-white overflow-hidden bg-[linear-gradient(180deg,#4d5b50_0%,#667366_46%,#2d1b1e_100%)]"
  >
    <!-- Campus Building Image & Multi-Stop Editorial Overlay -->
    <div class="absolute inset-0 z-1">
      <img
        src="/images/hero-campus.webp"
        alt="Royal University of Phnom Penh Campus"
        class="w-full h-full object-cover object-[center_88%] block select-none"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,14,18,0.90)_0%,rgba(38,17,22,0.72)_38%,rgba(42,28,30,0.22)_72%,rgba(42,28,30,0.06)_100%)]"
      ></div>
    </div>

    <div class="container-layout relative z-2 py-16 lg:py-22">
      <div class="max-w-[540px]">
        <div
          class="inline-block bg-white text-crimson text-[10.5px] font-bold tracking-[0.1em] px-3 py-1.25 rounded-[2px] mb-5 uppercase shadow-xs"
        >
          ADMISSIONS OPEN · 2026–2027
        </div>
        <h1
          class="font-serif text-[34px] sm:text-[44px] font-medium leading-[1.14] text-white mb-4 drop-shadow-xs"
        >
          Your future begins<br />
          with one application.
        </h1>
        <p class="text-[14px] leading-[1.68] text-white/90 mb-7">
          Welcome to the official undergraduate and graduate admissions portal of
          the Royal University of Phnom Penh. Explore degree programs, review
          requirements, and submit your application online.
        </p>
        <div class="flex items-center flex-wrap gap-5">
          <a
            href="/apply"
            class="btn-primary px-6 py-3 shadow-sm"
            @click.prevent="navigateTo('/apply')"
          >
            <span>Apply for Admission</span>
            <span class="text-[14px] leading-none" aria-hidden="true">→</span>
          </a>
          <a
            href="/programs"
            class="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white/95 hover:text-white hover:underline transition-colors"
            @click.prevent="navigateTo('/programs')"
          >
            <span>Explore academic programs</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
