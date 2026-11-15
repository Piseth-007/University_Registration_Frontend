<script setup lang="ts">
import type { LanguageCode } from '../../types/admissions'
import { isStudentAuthenticated, navigateTo, navigateToStudentPortal } from '../../router'

defineProps<{
  activeLang: LanguageCode
}>()

const emit = defineEmits<{
  (e: 'update:activeLang', lang: LanguageCode): void
}>()
</script>

<template>
  <div class="bg-utility border-b border-border-warm text-[11.5px] text-ink-muted">
    <div class="container-layout flex items-center justify-between h-8">
      <span>Cambodia's oldest &amp; largest university</span>
      <div class="flex items-center gap-3">
        <a
          :href="isStudentAuthenticated ? '/dashboard' : '/login'"
          class="text-ink-secondary hover:text-crimson transition-colors inline-flex items-center gap-1.5"
          @click.prevent="navigateToStudentPortal()"
        >
          <span>Student Portal</span>
          <span
            v-if="isStudentAuthenticated"
            class="w-1.5 h-1.5 rounded-full bg-[#166534]"
            title="Signed in — Click to open Dashboard"
          ></span>
        </a>
        <span class="text-[#d5cfc7]">|</span>
        <a
          href="/contact"
          class="text-ink-secondary hover:text-crimson transition-colors"
          @click.prevent="navigateTo('/contact')"
        >
          Contact Us
        </a>
        <span class="text-[#d5cfc7]">|</span>
        <div class="inline-flex items-center gap-1.5">
          <button
            type="button"
            class="px-1 py-0.5 cursor-pointer transition-colors"
            :class="
              activeLang === 'KH'
                ? 'text-crimson font-semibold'
                : 'text-ink-secondary hover:text-crimson'
            "
            @click="emit('update:activeLang', 'KH')"
          >
            ភាសាខ្មែរ
          </button>
          <button
            type="button"
            class="px-1 py-0.5 cursor-pointer transition-colors"
            :class="
              activeLang === 'EN'
                ? 'text-crimson font-semibold'
                : 'text-ink-secondary hover:text-crimson'
            "
            @click="emit('update:activeLang', 'EN')"
          >
            English
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
