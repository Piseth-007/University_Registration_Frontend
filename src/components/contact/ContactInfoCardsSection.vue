<script setup lang="ts">
import type { ContactInfoBlockItem } from '../../types/admissions'

defineProps<{
  blocks: ContactInfoBlockItem[]
}>()
</script>

<template>
  <section class="py-14 bg-white border-b border-border-warm">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-7"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">DIRECT CHANNELS</span>
          <h2 class="section-title text-[#252525]">Contact information</h2>
        </div>
        <span
          class="text-[11px] font-medium text-ink-muted bg-[#F5F6F8] border border-border-warm px-3 py-1 rounded-[2px]"
        >
          Editable Placeholder Contact Details
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <article
          v-for="item in blocks"
          :key="item.id"
          class="bg-[#F5F6F8] border border-border-warm p-6 rounded-[2px] flex flex-col"
        >
          <!-- Icon Box -->
          <div
            class="w-10 h-10 bg-white border border-border-warm text-[#781D2B] flex items-center justify-center rounded-[2px] mb-4"
            aria-hidden="true"
          >
            <!-- Address Pin Icon -->
            <svg
              v-if="item.icon === 'address'"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <path
                d="M10 17.5s5.5-5.2 5.5-9.5a5.5 5.5 0 10-11 0c0 4.3 5.5 9.5 5.5 9.5z"
              />
              <circle cx="10" cy="8" r="2" />
            </svg>

            <!-- Phone Icon -->
            <svg
              v-else-if="item.icon === 'phone'"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <path
                d="M4.5 3.5h3l1.5 3.5-2 1.5a10.5 10.5 0 004.5 4.5l1.5-2 3.5 1.5v3a1.5 1.5 0 01-1.5 1.5A12.5 12.5 0 013 4.5 1.5 1.5 0 014.5 3.5z"
              />
            </svg>

            <!-- Email Icon -->
            <svg
              v-else-if="item.icon === 'email'"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
              <path d="M3 5.5l7 5 7-5" />
            </svg>

            <!-- Hours Clock Icon -->
            <svg
              v-else
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="M10 6.5V10l2.5 2" />
            </svg>
          </div>

          <h3 class="text-[15.5px] font-semibold text-[#252525] mb-2">
            {{ item.title }}
          </h3>
          <p class="text-[13px] font-semibold text-[#781D2B] mb-1 leading-snug">
            {{ item.primaryValuePlaceholder }}
          </p>
          <p class="text-[12px] text-ink-secondary leading-snug">
            {{ item.secondaryValuePlaceholder }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
