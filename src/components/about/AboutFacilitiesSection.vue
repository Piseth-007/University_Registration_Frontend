<script setup lang="ts">
import type { CampusFacilityItem } from '../../types/admissions'

defineProps<{
  topFacilities: CampusFacilityItem[]
  bottomFacilities: CampusFacilityItem[]
}>()
</script>

<template>
  <section class="py-16 bg-warm">
    <div class="container-layout">
      <span class="eyebrow">CAMPUS &amp; FACILITIES</span>
      <h2 class="section-title">Spaces to learn, discover, and belong</h2>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-7">
        Our campus provides the resources and environment students need to thrive
        academically and socially.
      </p>

      <!-- Top 2-Column Featured Facilities -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        <article
          v-for="item in topFacilities"
          :key="item.id"
          class="flex flex-col"
        >
          <div
            class="aspect-[16/8.5] overflow-hidden rounded-[2px] bg-[#e2ddd5] mb-3"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover block"
            />
          </div>
          <h3 class="font-serif text-[16.5px] font-semibold text-ink mb-1">
            {{ item.title }}
          </h3>
          <p class="text-[12px] text-ink-secondary leading-[1.55]">
            {{ item.description }}
          </p>
        </article>
      </div>

      <!-- Bottom 3-Column Facilities -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article
          v-for="item in bottomFacilities"
          :key="item.id"
          class="flex flex-col"
        >
          <div class="aspect-video overflow-hidden rounded-[2px] bg-[#e2ddd5] mb-3">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover block"
            />
          </div>
          <h3 class="font-serif text-[16.5px] font-semibold text-ink mb-1">
            {{ item.title }}
          </h3>
          <p class="text-[12px] text-ink-secondary leading-[1.55]">
            {{ item.description }}
          </p>
        </article>
      </div>

      <p class="text-[11px] text-ink-muted mt-5.5">
        * Campus tours are available for prospective students and families by appointment.
      </p>
    </div>
  </section>
</template>
