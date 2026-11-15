<script setup lang="ts">
import type { NewsDetailArticle } from '../../types/admissions'

defineProps<{
  article: NewsDetailArticle
}>()

const emit = defineEmits<{
  (e: 'readArticle', article: NewsDetailArticle): void
}>()
</script>

<template>
  <section class="py-14 bg-white border-b border-border-warm">
    <div class="container-layout">
      <div class="flex items-center justify-between gap-4 mb-5">
        <div>
          <span class="eyebrow text-[#781D2B]">FEATURED STORY</span>
          <h2 class="section-title text-[#252525]">Featured news</h2>
        </div>
        <span
          class="text-[11px] font-medium text-ink-muted bg-[#F5F6F8] border border-border-warm px-3 py-1 rounded-[2px]"
        >
          Editorial Highlight
        </span>
      </div>

      <article
        class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] bg-[#F5F6F8] border border-border-warm rounded-[2px] overflow-hidden shadow-[0_6px_20px_rgba(37,37,37,0.04)]"
      >
        <!-- Featured Image -->
        <div class="relative aspect-video lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-[#e5e0d8]">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover block"
          />
          <span
            class="absolute top-4 left-4 bg-[#781D2B] text-white text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-[2px]"
          >
            {{ article.category }}
          </span>
        </div>

        <!-- Featured Content -->
        <div class="p-7 sm:p-9 flex flex-col justify-center">
          <div
            class="flex flex-wrap items-center gap-3 text-[11.5px] font-medium text-ink-muted mb-3"
          >
            <span class="text-[#781D2B] font-semibold">
              {{ article.datePlaceholder }}
            </span>
            <span>·</span>
            <span>{{ article.authorPlaceholder }}</span>
          </div>

          <h3
            class="font-serif text-[22px] sm:text-[25px] font-semibold text-[#252525] leading-[1.28] mb-3.5"
          >
            {{ article.title }}
          </h3>

          <p class="text-[13.5px] text-ink-secondary leading-[1.65] mb-6">
            {{ article.excerpt }}
          </p>

          <div>
            <button
              type="button"
              class="inline-flex items-center gap-2.5 bg-[#781D2B] hover:bg-[#5c121d] text-white text-[13px] font-medium px-5.5 py-2.75 rounded-[2px] transition-colors cursor-pointer"
              @click="emit('readArticle', article)"
            >
              <span>Read Full Article</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
