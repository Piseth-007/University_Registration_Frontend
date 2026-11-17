<script setup lang="ts">
import { navigateTo } from '../../router'
</script>

<template>
  <!-- Breadcrumb Bar -->
  <div class="bg-white border-b border-border-warm text-[11.5px]">
    <div class="container-layout flex items-center gap-2 h-9">
      <a
        href="/"
        class="text-ink-muted hover:text-crimson transition-colors"
        @click.prevent="navigateTo('/')"
      >
        Home
      </a>
      <span class="text-[#ccc5bc]" aria-hidden="true">/</span>
      <span class="text-crimson font-semibold">About University</span>
    </div>
  </div>

  <!-- About Hero Banner -->
  <section
    class="relative min-h-[280px] lg:min-h-[330px] flex items-center text-white overflow-hidden bg-[#2b181b]"
  >
    <div class="absolute inset-0 z-1">
      <img
        src="/images/about/about-hero.jpg"
        alt="Royal University of Phnom Penh Heritage Campus"
        class="w-full h-full object-cover object-center block"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,14,18,0.86)_0%,rgba(38,19,23,0.62)_50%,rgba(35,25,22,0.20)_100%)]"
      ></div>
    </div>

    <div class="container-layout relative z-2 py-14">
      <span
        class="block text-[10.5px] font-bold tracking-[0.14em] text-white/80 uppercase mb-2.5"
      >
        DISCOVER OUR INSTITUTION
      </span>
      <h1
        class="font-serif text-[30px] sm:text-[38px] font-medium leading-[1.16] text-white mb-3"
      >
        About Our University
      </h1>
      <p class="text-[14px] text-white/88 max-w-[580px] leading-[1.62]">
        Rooted in heritage, driven by academic excellence, and dedicated to shaping
        Cambodia's future generations.
      </p>
    </div>
  </section>
</template>
