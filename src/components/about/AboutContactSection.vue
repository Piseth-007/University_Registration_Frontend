<script setup lang="ts">
import type { ContactDetailItem } from '../../types/admissions'

defineProps<{
  contacts: ContactDetailItem[]
}>()
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container-layout">
      <span class="eyebrow">GET IN TOUCH</span>
      <h2 class="section-title mb-7">University contact information</h2>

      <div
        class="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-stretch"
      >
        <!-- Left: Contact Info List -->
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, idx) in contacts"
            :key="idx"
            class="flex flex-col gap-0.75 pb-3.5 border-b border-border-warm"
          >
            <span
              class="text-[9.5px] font-bold tracking-[0.1em] text-ink-muted uppercase"
            >
              {{ item.label }}
            </span>
            <span class="text-[13px] font-semibold text-ink leading-[1.45]">
              {{ item.value }}
            </span>
          </div>
          <p class="text-[11px] text-ink-muted">
            Closed on weekends and official national holidays.
          </p>
        </div>

        <!-- Right: University Map Placeholder -->
        <div
          class="bg-[#eceae5] border border-border-warm rounded-[2px] min-h-[240px] p-8 flex flex-col items-center justify-center text-center"
        >
          <span
            class="text-[9.5px] font-bold tracking-[0.1em] text-ink-muted uppercase mb-1.5"
          >
            LOCATION MAP
          </span>
          <h3 class="font-serif text-[18px] font-semibold text-ink mb-1">
            University map
          </h3>
          <p class="text-[12px] text-ink-secondary mb-1">
            Interactive campus map placeholder
          </p>
          <p class="text-[11px] text-ink-muted">
            Embed Google Maps or official campus directory map here.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
