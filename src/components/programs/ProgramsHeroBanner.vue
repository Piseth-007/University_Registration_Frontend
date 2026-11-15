<script setup lang="ts">
import { navigateTo } from '../../router'
</script>

<template>
  <!-- Breadcrumb Bar -->
  <div class="bg-white border-b border-border-warm text-[11.5px]">
    <div class="container-layout flex items-center gap-2 h-9">
      <a
        href="/"
        class="text-ink-muted hover:text-[#781D2B] transition-colors"
        @click.prevent="navigateTo('/')"
      >
        Home
      </a>
      <span class="text-[#ccc5bc]" aria-hidden="true">/</span>
      <span class="text-[#781D2B] font-semibold">Faculties &amp; Programs</span>
    </div>
  </div>

  <!-- Hero Section -->
  <section
    class="relative min-h-[280px] lg:min-h-[330px] flex items-center text-white overflow-hidden bg-[#252525]"
  >
    <div class="absolute inset-0 z-1">
      <img
        src="/images/graduation.jpg"
        alt="University students on campus"
        class="w-full h-full object-cover object-[center_35%] block"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,14,18,0.88)_0%,rgba(120,29,43,0.68)_46%,rgba(37,37,37,0.22)_100%)]"
      ></div>
    </div>

    <div class="container-layout relative z-2 py-14">
      <span
        class="inline-block bg-white/15 border border-white/25 text-white text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-[2px] uppercase mb-3"
      >
        ACADEMIC DIVISIONS &amp; DEGREES
      </span>
      <h1
        class="font-serif text-[30px] sm:text-[38px] font-semibold leading-[1.16] text-white mb-2.5"
      >
        Faculties &amp; Academic Programs
      </h1>
      <p class="text-[14px] text-white/90 max-w-[580px] leading-[1.6]">
        Explore academic opportunities and discover your future.
      </p>
    </div>
  </section>
</template>
