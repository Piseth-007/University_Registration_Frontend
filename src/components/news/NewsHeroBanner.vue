<script setup lang="ts">
import { navigateTo } from '../../router'

defineProps<{
  activeArticleTitle?: string | null
}>()

const emit = defineEmits<{
  (e: 'backToNews'): void
}>()
</script>

<template>
  <!-- Breadcrumb Bar -->
  <div class="bg-white border-b border-border-warm text-[11.5px]">
    <div class="container-layout flex items-center gap-2 h-9 overflow-x-auto whitespace-nowrap">
      <a
        href="/"
        class="text-ink-muted hover:text-[#781D2B] transition-colors"
        @click.prevent="navigateTo('/')"
      >
        Home
      </a>
      <span class="text-[#ccc5bc]" aria-hidden="true">/</span>
      <template v-if="activeArticleTitle">
        <button
          type="button"
          class="text-ink-muted hover:text-[#781D2B] transition-colors cursor-pointer"
          @click="emit('backToNews')"
        >
          News &amp; Announcements
        </button>
        <span class="text-[#ccc5bc]" aria-hidden="true">/</span>
        <span class="text-[#781D2B] font-semibold truncate max-w-[320px]">
          {{ activeArticleTitle }}
        </span>
      </template>
      <span v-else class="text-[#781D2B] font-semibold">
        News &amp; Announcements
      </span>
    </div>
  </div>

  <!-- Hero Section -->
  <section
    class="relative min-h-[280px] lg:min-h-[330px] flex items-center text-white overflow-hidden bg-[#252525]"
  >
    <div class="absolute inset-0 z-1">
      <img
        src="/images/about/overview-walkway.png"
        alt="University campus event"
        class="w-full h-full object-cover object-[center_40%] block"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,14,18,0.88)_0%,rgba(120,29,43,0.68)_48%,rgba(37,37,37,0.24)_100%)]"
      ></div>
    </div>

    <div class="container-layout relative z-2 py-14">
      <span
        class="inline-block bg-white/15 border border-white/25 text-white text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-[2px] uppercase mb-3"
      >
        UNIVERSITY PRESS &amp; BULLETINS
      </span>
      <h1
        class="font-serif text-[30px] sm:text-[38px] font-semibold leading-[1.16] text-white mb-2.5"
      >
        News &amp; Announcements
      </h1>
      <p class="text-[14px] text-white/90 max-w-[600px] leading-[1.6]">
        Stay informed about university news, activities, and important updates.
      </p>
    </div>
  </section>
</template>
