<script setup lang="ts">
import type { NewsCategory, NewsDetailArticle } from '../../types/admissions'

defineProps<{
  articles: NewsDetailArticle[]
  totalCount: number
  categories: NewsCategory[]
  selectedCategory: NewsCategory
  searchQuery: string
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:selectedCategory', category: NewsCategory): void
  (e: 'update:searchQuery', query: string): void
  (e: 'update:currentPage', page: number): void
  (e: 'readArticle', article: NewsDetailArticle): void
}>()
</script>

<template>
  <section id="latest-news" class="py-16 bg-[#F5F6F8]">
    <div class="container-layout">
      <!-- Header Row -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">CAMPUS CHRONICLE</span>
          <h2 class="section-title text-[#252525]">Latest university news</h2>
        </div>
        <span class="text-[12px] text-ink-secondary">
          Showing <strong class="text-[#252525]">{{ totalCount }}</strong> article(s)
        </span>
      </div>

      <!-- Category Tabs + Search Control Bar -->
      <div
        class="bg-white border border-border-warm p-4 rounded-[2px] mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <!-- 6. News Categories Filter Pills -->
        <div class="flex flex-wrap items-center gap-1.5" role="tablist">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="px-3.5 py-1.75 text-[12px] rounded-[2px] border transition-colors cursor-pointer"
            :class="
              selectedCategory === cat
                ? 'bg-[#781D2B] border-[#781D2B] text-white font-semibold'
                : 'bg-[#F5F6F8] border-border-warm text-[#252525] font-medium hover:border-[#781D2B]'
            "
            @click="emit('update:selectedCategory', cat)"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="w-full lg:w-[290px]">
          <input
            :value="searchQuery"
            type="search"
            placeholder="Search news articles..."
            class="w-full bg-[#F5F6F8] border border-border-warm focus:border-[#781D2B] focus:bg-white focus:outline-none px-3.5 py-2 text-[12.5px] rounded-[2px] text-[#252525]"
            @input="
              emit('update:searchQuery', ($event.target as HTMLInputElement).value)
            "
          />
        </div>
      </div>

      <!-- News Cards Grid -->
      <div
        v-if="articles.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <article
          v-for="item in articles"
          :key="item.id"
          class="bg-white border border-border-warm hover:border-[#cbbab8] hover:shadow-[0_8px_24px_rgba(37,37,37,0.06)] rounded-[2px] overflow-hidden flex flex-col transition-all"
        >
          <!-- Thumbnail -->
          <div class="relative aspect-video overflow-hidden bg-[#e5e0d8]">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover block"
            />
            <span
              class="absolute top-3 left-3 bg-white/95 text-[#781D2B] text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.75 rounded-[2px]"
            >
              {{ item.category }}
            </span>
          </div>

          <!-- Card Body -->
          <div class="p-6 flex flex-col flex-1">
            <div class="text-[11px] font-medium text-ink-muted mb-2">
              {{ item.datePlaceholder }}
            </div>

            <h3
              class="font-serif text-[17.5px] font-semibold text-[#252525] leading-[1.32] mb-2.5"
            >
              {{ item.title }}
            </h3>

            <p class="text-[12.5px] text-ink-secondary leading-[1.58] mb-5 flex-1">
              {{ item.excerpt }}
            </p>

            <div class="pt-3.5 border-t border-border-warm">
              <button
                type="button"
                class="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
                @click="emit('readArticle', item)"
              >
                <span>Read More</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty Search State -->
      <div
        v-else
        class="bg-white border border-border-warm p-10 text-center rounded-[2px]"
      >
        <p class="text-[14px] font-semibold text-[#252525] mb-1">
          No news articles found matching your criteria.
        </p>
        <p class="text-[12.5px] text-ink-secondary mb-4">
          Try selecting "All News" or clearing your search keyword.
        </p>
        <button
          type="button"
          class="btn-primary"
          @click="
            () => {
              emit('update:selectedCategory', 'All News')
              emit('update:searchQuery', '')
            }
          "
        >
          Reset Filters
        </button>
      </div>

      <!-- Pagination Controls -->
      <div
        v-if="totalPages > 1"
        class="mt-8 pt-6 border-t border-border-warm flex items-center justify-between gap-4"
      >
        <span class="text-[12px] text-ink-secondary">
          Page <strong class="text-[#252525]">{{ currentPage }}</strong> of
          <strong class="text-[#252525]">{{ totalPages }}</strong>
        </span>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            :disabled="currentPage <= 1"
            class="px-3 py-1.5 text-[12px] font-medium rounded-[2px] border border-border-warm bg-white text-[#252525] disabled:opacity-45 cursor-pointer disabled:cursor-not-allowed hover:border-[#781D2B]"
            @click="emit('update:currentPage', currentPage - 1)"
          >
            ← Previous
          </button>

          <button
            v-for="p in totalPages"
            :key="p"
            type="button"
            class="w-8 h-8 text-[12px] rounded-[2px] border cursor-pointer transition-colors"
            :class="
              p === currentPage
                ? 'bg-[#781D2B] border-[#781D2B] text-white font-semibold'
                : 'bg-white border-border-warm text-[#252525] hover:border-[#781D2B]'
            "
            @click="emit('update:currentPage', p)"
          >
            {{ p }}
          </button>

          <button
            type="button"
            :disabled="currentPage >= totalPages"
            class="px-3 py-1.5 text-[12px] font-medium rounded-[2px] border border-border-warm bg-white text-[#252525] disabled:opacity-45 cursor-pointer disabled:cursor-not-allowed hover:border-[#781D2B]"
            @click="emit('update:currentPage', currentPage + 1)"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
