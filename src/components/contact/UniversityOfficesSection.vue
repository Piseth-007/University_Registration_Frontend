<script setup lang="ts">
import type { UniversityOfficeItem } from '../../types/admissions'

defineProps<{
  offices: UniversityOfficeItem[]
}>()
</script>

<template>
  <section id="university-offices" class="py-16 bg-white border-t border-border-warm">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">ADMINISTRATIVE DIRECTORY</span>
          <h2 class="section-title text-[#252525]">University offices</h2>
        </div>
        <span class="text-[12px] text-ink-muted">
          Direct departmental contact placeholders
        </span>
      </div>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-8">
        Connect directly with the appropriate administrative office for specialized
        assistance with admissions, academic records, student services, or general
        administration.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article
          v-for="office in offices"
          :key="office.id"
          class="bg-[#F5F6F8] border border-border-warm p-6.5 rounded-[2px] flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between gap-3 mb-2">
              <h3 class="font-serif text-[19px] font-semibold text-[#252525]">
                {{ office.name }}
              </h3>
              <span
                class="bg-white border border-border-warm text-[#781D2B] text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.75 rounded-[2px]"
              >
                Office Directory
              </span>
            </div>
            <p class="text-[12.5px] text-ink-secondary leading-[1.6] mb-5">
              {{ office.roleSummary }}
            </p>
          </div>

          <div
            class="bg-white border border-border-warm p-4 rounded-[2px] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]"
          >
            <div>
              <span
                class="block text-[9.5px] font-bold tracking-[0.09em] text-ink-muted uppercase"
              >
                OFFICE LOCATION
              </span>
              <span class="font-medium text-[#252525]">
                {{ office.locationPlaceholder }}
              </span>
            </div>
            <div>
              <span
                class="block text-[9.5px] font-bold tracking-[0.09em] text-ink-muted uppercase"
              >
                TELEPHONE
              </span>
              <span class="font-medium text-[#252525]">
                {{ office.phonePlaceholder }}
              </span>
            </div>
            <div>
              <span
                class="block text-[9.5px] font-bold tracking-[0.09em] text-ink-muted uppercase"
              >
                OFFICIAL EMAIL
              </span>
              <span class="font-semibold text-[#781D2B]">
                {{ office.emailPlaceholder }}
              </span>
            </div>
            <div>
              <span
                class="block text-[9.5px] font-bold tracking-[0.09em] text-ink-muted uppercase"
              >
                SERVICE HOURS
              </span>
              <span class="font-medium text-[#252525]">
                {{ office.hoursPlaceholder }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
