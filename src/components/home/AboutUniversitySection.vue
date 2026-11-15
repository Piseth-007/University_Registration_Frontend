<script setup lang="ts">
import { navigateTo } from '../../router'
</script>

<template>
  <section id="about" class="py-16 bg-warm">
    <div
      class="container-layout grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 items-center"
    >
      <div class="rounded-[2px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <img
          src="/images/graduation.jpg"
          alt="RUPP Graduates celebrating on campus"
          class="w-full h-auto block"
        />
      </div>
      <div>
        <span class="eyebrow">CAMBODIA'S FLAGSHIP UNIVERSITY</span>
        <h2 class="section-title mb-4">
          Rooted in Cambodia.<br />
          Ready for your future.
        </h2>
        <p class="text-[13.5px] text-ink-secondary mb-3.5 leading-[1.65]">
          Founded in 1960, the Royal University of Phnom Penh is Cambodia's oldest
          and largest public university. For over six decades, we have shaped
          generations of scholars, leaders, and innovators dedicated to national
          and regional progress.
        </p>
        <p class="text-[13.5px] text-ink-secondary mb-3.5 leading-[1.65]">
          With internationally recognized degree programs, modern research facilities,
          and partnerships with over 100 global institutions, RUPP prepares you to
          excel in a rapidly changing world.
        </p>
        <a
          href="/about"
          class="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-crimson hover:underline mt-1.5"
          @click.prevent="navigateTo('/about')"
        >
          Discover our history <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</template>
