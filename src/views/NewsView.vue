<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { NewsCategory, NewsDetailArticle } from '../types/admissions'
import {
  allNewsArticles,
  newsCategories,
  officialAnnouncements,
  scholarshipOpportunities,
} from '../data/newsPageData'
import { filterNewsArticles, paginateItems } from '../utils/helpers'

import NewsHeroBanner from '../components/news/NewsHeroBanner.vue'
import FeaturedNewsSection from '../components/news/FeaturedNewsSection.vue'
import LatestNewsSection from '../components/news/LatestNewsSection.vue'
import OfficialAnnouncementsSection from '../components/news/OfficialAnnouncementsSection.vue'
import ScholarshipsSection from '../components/news/ScholarshipsSection.vue'
import NewsArticleDetailSection from '../components/news/NewsArticleDetailSection.vue'

const selectedCategory = ref<NewsCategory>('All News')
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 6

// Active article for the separate News Article Details view (null = show main News & Announcements page)
const activeDetailArticle = ref<NewsDetailArticle | null>(null)

const featuredArticle = computed<NewsDetailArticle>(
  () => allNewsArticles.find((a) => a.isFeatured) ?? allNewsArticles[0]!,
)

const filteredArticles = computed(() =>
  filterNewsArticles(allNewsArticles, selectedCategory.value, searchQuery.value),
)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredArticles.value.length / pageSize)),
)

const paginatedArticles = computed(() =>
  paginateItems(filteredArticles.value, currentPage.value, pageSize),
)

const relatedArticles = computed(() => {
  if (!activeDetailArticle.value) return []
  return allNewsArticles
    .filter((a) => a.id !== activeDetailArticle.value?.id)
    .slice(0, 3)
})

watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1
})

function handleOpenArticle(article: NewsDetailArticle) {
  activeDetailArticle.value = article
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleBackToNews() {
  activeDetailArticle.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main>
    <NewsHeroBanner
      :active-article-title="activeDetailArticle?.title ?? null"
      @back-to-news="handleBackToNews"
    />

    <!-- News Article Details View -->
    <template v-if="activeDetailArticle">
      <NewsArticleDetailSection
        :article="activeDetailArticle"
        :related-articles="relatedArticles"
        @back-to-news="handleBackToNews"
        @select-article="handleOpenArticle"
      />
    </template>

    <!-- Main News & Announcements Directory View -->
    <template v-else>
      <FeaturedNewsSection
        :article="featuredArticle"
        @read-article="handleOpenArticle"
      />

      <LatestNewsSection
        v-model:selected-category="selectedCategory"
        v-model:search-query="searchQuery"
        v-model:current-page="currentPage"
        :articles="paginatedArticles"
        :total-count="filteredArticles.length"
        :categories="newsCategories"
        :total-pages="totalPages"
        @read-article="handleOpenArticle"
      />

      <OfficialAnnouncementsSection :announcements="officialAnnouncements" />

      <ScholarshipsSection :scholarships="scholarshipOpportunities" />
    </template>
  </main>
</template>
