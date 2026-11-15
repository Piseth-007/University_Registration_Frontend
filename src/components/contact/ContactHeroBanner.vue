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
      <span class="text-[#781D2B] font-semibold">Contact Us</span>
    </div>
  </div>

  <!-- Hero Section -->
  <section
    class="relative min-h-[280px] lg:min-h-[330px] flex items-center text-white overflow-hidden bg-[linear-gradient(180deg,#4d5b50_0%,#667366_46%,#2d1b1e_100%)]"
  >
    <div class="absolute inset-0 z-1">
      <img
        src="/images/hero-campus.webp"
        alt="University campus building"
        class="w-full h-full object-cover object-[center_85%] block select-none"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,14,18,0.88)_0%,rgba(120,29,43,0.68)_45%,rgba(37,37,37,0.20)_100%)]"
      ></div>
    </div>

    <div class="container-layout relative z-2 py-14">
      <span
        class="inline-block bg-white/15 border border-white/25 text-white text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-[2px] uppercase mb-3"
      >
        INQUIRIES &amp; CAMPUS DIRECTORY
      </span>
      <h1
        class="font-serif text-[30px] sm:text-[38px] font-semibold leading-[1.16] text-white mb-2"
      >
        Contact Us
      </h1>
      <p class="text-[14px] text-white/90 max-w-[540px] leading-[1.6]">
        We are here to help you.
      </p>
    </div>
  </section>
</template>
