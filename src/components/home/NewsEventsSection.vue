<script setup lang="ts">
import type { NewsArticleItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  articles: NewsArticleItem[]
}>()
</script>

<template>
  <section id="news" class="py-16 bg-warm">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6"
      >
        <div>
          <span class="eyebrow">CAMPUS UPDATES</span>
          <h2 class="section-title">University news &amp; events</h2>
        </div>
        <a
          href="/news"
          class="text-[12.5px] font-semibold text-crimson hover:underline whitespace-nowrap"
          @click.prevent="navigateTo('/news')"
        >
          View all news <span aria-hidden="true">→</span>
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="item in articles"
          :key="item.id"
          class="bg-white border border-border-warm flex flex-col overflow-hidden hover:shadow-[0_8px_22px_rgba(31,25,26,0.06)] transition-shadow"
        >
          <div class="aspect-video overflow-hidden bg-[#e6e1da]">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover block"
            />
          </div>
          <div class="p-5.5 flex flex-col flex-1">
            <div
              class="flex items-center justify-between text-[9.5px] font-semibold tracking-[0.08em] text-ink-muted mb-2.5"
            >
              <span class="text-crimson">{{ item.category }}</span>
              <span>{{ item.date }}</span>
            </div>
            <h3
              class="font-serif text-[18px] font-semibold text-ink leading-[1.3] mb-2.5"
            >
              {{ item.title }}
            </h3>
            <p class="text-[12.5px] text-ink-secondary leading-[1.55] mb-4 flex-1">
              {{ item.excerpt }}
            </p>
            <a
              href="/news"
              class="text-[12px] font-semibold text-crimson hover:underline inline-flex items-center gap-1.25"
              @click.prevent="navigateTo('/news')"
            >
              {{ item.cta }} <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
