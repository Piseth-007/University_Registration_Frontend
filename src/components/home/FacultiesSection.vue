<script setup lang="ts">
import type { FacultyItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  faculties: FacultyItem[]
}>()
</script>

<template>
  <section id="programs" class="py-16 bg-white">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
      >
        <div>
          <span class="eyebrow">OUR FACULTIES</span>
          <h2 class="section-title">Faculties &amp; academic programs</h2>
        </div>
        <a
          href="/programs"
          class="text-[12.5px] font-semibold text-crimson hover:underline whitespace-nowrap"
          @click.prevent="navigateTo('/programs')"
        >
          View all programs <span aria-hidden="true">→</span>
        </a>
      </div>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-7">
        Explore undergraduate and postgraduate degrees across six core academic faculties.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="fac in faculties"
          :key="fac.id"
          class="bg-white border border-border-warm hover:border-[#cbbab8] hover:shadow-[0_6px_18px_rgba(31,25,26,0.05)] p-6 flex flex-col transition-all"
        >
          <div class="flex items-center justify-between mb-4">
            <span
              class="w-[22px] h-[22px] text-crimson inline-flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                v-if="fac.icon === 'science'"
                class="w-[18px] h-[18px]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <path
                  d="M7 3h6M8 3v5.5L4.5 15a1.5 1.5 0 001.3 2.2h8.4a1.5 1.5 0 001.3-2.2L12 8.5V3"
                />
              </svg>
              <svg
                v-else-if="fac.icon === 'business'"
                class="w-[18px] h-[18px]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <rect x="3" y="6" width="14" height="11" rx="1.5" />
                <path d="M7 6V4.5A1.5 1.5 0 018.5 3h3A1.5 1.5 0 0113 4.5V6" />
              </svg>
              <svg
                v-else-if="fac.icon === 'arts'"
                class="w-[18px] h-[18px]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <path d="M4 4.5h5v11H4zM11 4.5h5v11h-5z" />
              </svg>
              <svg
                v-else-if="fac.icon === 'engineering'"
                class="w-[18px] h-[18px]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <circle cx="10" cy="10" r="3" />
                <path
                  d="M10 3v2M10 15v2M3 10h2M15 10h2M5 5l1.5 1.5M13.5 13.5L15 15M15 5l-1.5 1.5M6.5 13.5L5 15"
                />
              </svg>
              <svg
                v-else-if="fac.icon === 'law'"
                class="w-[18px] h-[18px]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <path d="M10 3v14M5 17h10M4 7h12M5 7l-2 4h4l-2-4zM15 7l-2 4h4l-2-4z" />
              </svg>
              <svg
                v-else
                class="w-[18px] h-[18px]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <path d="M10 4L2.5 8 10 12l7.5-4L10 4z" />
                <path d="M5.5 10v4.5c0 1.2 2 2.5 4.5 2.5s4.5-1.3 4.5-2.5V10" />
              </svg>
            </span>
            <span
              class="text-[9.5px] font-semibold tracking-[0.08em] text-ink-muted uppercase"
            >
              {{ fac.badge }}
            </span>
          </div>

          <h3 class="font-serif text-[19px] font-semibold text-ink mb-2">
            {{ fac.title }}
          </h3>
          <p class="text-[12.5px] text-ink-secondary leading-[1.55] mb-4.5 flex-1">
            {{ fac.description }}
          </p>

          <a
            href="/programs"
            class="text-[12px] font-semibold text-crimson hover:underline inline-flex items-center gap-1.25"
            @click.prevent="navigateTo('/programs')"
          >
            View programs <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
