<script setup lang="ts">
import { navigateTo } from '../../router'
</script>

<template>
  <section class="py-14 bg-[#781D2B] text-white">
    <div
      class="container-layout flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      <div>
        <span
          class="block text-[10px] font-bold tracking-[0.12em] text-white/75 uppercase mb-1.5"
        >
          ADMISSIONS &amp; ENROLLMENT
        </span>
        <h2 class="font-serif text-[26px] sm:text-[28px] font-semibold text-white mb-1.5">
          Find Your Future Academic Program
        </h2>
        <p class="text-[13.5px] text-white/85">
          Explore our programs and apply for admission.
        </p>
      </div>

      <a
        href="/apply"
        class="inline-flex items-center gap-2.5 bg-white hover:bg-[#F5F6F8] text-[#781D2B] text-[13.5px] font-semibold px-6 py-3 rounded-[2px] shrink-0 transition-colors"
        @click.prevent="navigateTo('/apply')"
      >
        <span>Apply Now</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</template>
