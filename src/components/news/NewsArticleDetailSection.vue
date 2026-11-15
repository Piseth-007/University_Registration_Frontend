<script setup lang="ts">
import type { NewsDetailArticle } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  article: NewsDetailArticle
  relatedArticles: NewsDetailArticle[]
}>()

const emit = defineEmits<{
  (e: 'backToNews'): void
  (e: 'selectArticle', article: NewsDetailArticle): void
}>()
</script>

<template>
  <section id="article-detail" class="py-12 bg-white">
    <div class="container-layout">
      <!-- Top Back to News Button -->
      <div class="mb-6 flex items-center justify-between gap-4 pb-4 border-b border-border-warm">
        <button
          type="button"
          class="inline-flex items-center gap-2 text-[13px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
          @click="emit('backToNews')"
        >
          <span aria-hidden="true">←</span>
          <span>Back to News &amp; Announcements</span>
        </button>

        <span
          class="text-[11px] font-medium text-ink-muted bg-[#F5F6F8] border border-border-warm px-3 py-1 rounded-[2px]"
        >
          News Article Details View
        </span>
      </div>

      <!-- Main Editorial Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
        <!-- Left: Full Article Content -->
        <article>
          <!-- Meta & Category -->
          <div class="flex flex-wrap items-center gap-3 mb-3.5">
            <span
              class="bg-[#781D2B] text-white text-[10px] font-bold tracking-[0.09em] uppercase px-2.5 py-1 rounded-[2px]"
            >
              {{ article.category }}
            </span>
            <span class="text-[12px] font-semibold text-[#781D2B]">
              {{ article.datePlaceholder }}
            </span>
            <span class="text-ink-muted">·</span>
            <span class="text-[12px] text-ink-muted">
              {{ article.authorPlaceholder }}
            </span>
            <span class="text-ink-muted">·</span>
            <span class="text-[12px] text-ink-muted">
              {{ article.readTimePlaceholder }}
            </span>
          </div>

          <!-- Article Title -->
          <h1
            class="font-serif text-[26px] sm:text-[34px] font-semibold text-[#252525] leading-[1.22] mb-4"
          >
            {{ article.title }}
          </h1>

          <!-- Lead Excerpt -->
          <p class="text-[15px] text-ink-secondary leading-[1.65] mb-6 font-medium">
            {{ article.excerpt }}
          </p>

          <!-- Main Article Photograph -->
          <figure class="mb-8">
            <div class="aspect-video overflow-hidden rounded-[2px] border border-border-warm bg-[#e5e0d8]">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover block"
              />
            </div>
            <figcaption class="text-[11.5px] text-ink-muted mt-2">
              {{ article.imageCaption }}
            </figcaption>
          </figure>

          <!-- Body Paragraphs -->
          <div class="flex flex-col gap-4.5 text-[14px] text-[#252525] leading-[1.75]">
            <p v-for="(para, pIdx) in article.contentParagraphs" :key="pIdx">
              {{ para }}
            </p>
          </div>

          <!-- Optional Editorial Quote -->
          <blockquote
            v-if="article.quote"
            class="my-7 bg-[#F5F6F8] border-l-4 border-[#781D2B] p-6 font-serif text-[17px] italic text-[#252525] leading-[1.5]"
          >
            {{ article.quote }}
          </blockquote>

          <!-- Optional Key Points Box -->
          <div
            v-if="article.keyPoints && article.keyPoints.length > 0"
            class="mt-7 bg-[#F5F6F8] border border-border-warm p-6 rounded-[2px]"
          >
            <h3
              class="text-[12px] font-bold tracking-[0.09em] text-[#781D2B] uppercase mb-3"
            >
              KEY SUMMARY POINTS
            </h3>
            <ul class="list-none flex flex-col gap-2">
              <li
                v-for="(pt, kIdx) in article.keyPoints"
                :key="kIdx"
                class="flex items-start gap-2.5 text-[13px] text-ink-secondary"
              >
                <span class="text-[#781D2B] font-bold" aria-hidden="true">✓</span>
                <span>{{ pt }}</span>
              </li>
            </ul>
          </div>

          <!-- Bottom Back Button & Share/Apply Bar -->
          <div
            class="mt-10 pt-6 border-t border-border-warm flex flex-wrap items-center justify-between gap-4"
          >
            <button
              type="button"
              class="btn-outline-white"
              @click="emit('backToNews')"
            >
              <span aria-hidden="true">←</span>
              <span>Back to News</span>
            </button>

            <a
              href="/apply"
              class="btn-primary"
              @click.prevent="navigateTo('/apply')"
            >
              <span>Apply for Admission</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        <!-- Right Sidebar: Related Articles -->
        <aside class="bg-[#F5F6F8] border border-border-warm p-6 rounded-[2px]">
          <span
            class="block text-[10px] font-bold tracking-[0.12em] text-[#781D2B] uppercase mb-1"
          >
            FURTHER READING
          </span>
          <h2 class="font-serif text-[19px] font-semibold text-[#252525] mb-5">
            Related articles
          </h2>

          <div class="flex flex-col gap-5">
            <article
              v-for="rel in relatedArticles"
              :key="rel.id"
              class="bg-white border border-border-warm rounded-[2px] overflow-hidden hover:border-[#781D2B] transition-colors"
            >
              <div class="aspect-video overflow-hidden bg-[#e5e0d8]">
                <img
                  :src="rel.image"
                  :alt="rel.title"
                  class="w-full h-full object-cover block"
                />
              </div>
              <div class="p-4">
                <div class="flex items-center justify-between text-[10px] mb-1.5">
                  <span class="font-bold text-[#781D2B] uppercase">
                    {{ rel.category }}
                  </span>
                  <span class="text-ink-muted">{{ rel.datePlaceholder }}</span>
                </div>
                <h3
                  class="text-[14px] font-semibold text-[#252525] leading-snug mb-2.5"
                >
                  {{ rel.title }}
                </h3>
                <button
                  type="button"
                  class="text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
                  @click="emit('selectArticle', rel)"
                >
                  Read Article →
                </button>
              </div>
            </article>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
