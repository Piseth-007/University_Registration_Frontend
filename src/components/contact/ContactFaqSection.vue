<script setup lang="ts">
import { ref } from 'vue'
import type { ContactFaqItem } from '../../types/admissions'
import { navigateTo } from '../../router'
import { scrollToSection } from '../../utils/helpers'

const props = defineProps<{
  faqs: ContactFaqItem[]
}>()

const openFaqId = ref<string>(props.faqs[0]?.id ?? '')

function toggleFaq(id: string) {
  openFaqId.value = openFaqId.value === id ? '' : id
}

function handleFaqAction(routeOrHash?: string) {
  if (!routeOrHash) return
  if (routeOrHash.startsWith('#')) {
    scrollToSection(routeOrHash)
  } else {
    navigateTo(routeOrHash)
  }
}
</script>

<template>
  <section id="faq" class="py-16 bg-[#F5F6F8] border-t border-border-warm">
    <div class="container-layout">
      <div
        class="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start"
      >
        <!-- Left Intro Column -->
        <div>
          <span class="eyebrow text-[#781D2B]">APPLICANT SUPPORT</span>
          <h2 class="section-title text-[#252525] mb-3">
            Frequently asked questions
          </h2>
          <p class="text-[13.5px] text-ink-secondary leading-[1.65] mb-5">
            Find quick answers to common questions regarding online admission
            applications, registration status checks, entrance examination schedules, and
            contacting the Admission Office.
          </p>
          <div class="bg-white border border-border-warm p-5 rounded-[2px]">
            <span
              class="block text-[10px] font-bold tracking-[0.1em] text-[#781D2B] uppercase mb-1"
            >
              STILL HAVE QUESTIONS?
            </span>
            <p class="text-[12.5px] text-ink-secondary leading-[1.55]">
              If your question is not listed here, please submit an inquiry through the
              contact form above or reach out directly to the Admission Office.
            </p>
          </div>
        </div>

        <!-- Right Accordion Column -->
        <div class="flex flex-col gap-3">
          <div
            v-for="item in faqs"
            :key="item.id"
            class="bg-white border rounded-[2px] transition-colors overflow-hidden"
            :class="
              openFaqId === item.id ? 'border-[#781D2B]' : 'border-border-warm'
            "
          >
            <button
              type="button"
              class="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#fcfbfa] transition-colors"
              :aria-expanded="openFaqId === item.id"
              @click="toggleFaq(item.id)"
            >
              <span class="text-[15px] font-semibold text-[#252525]">
                {{ item.question }}
              </span>
              <span
                class="w-6 h-6 rounded-[2px] flex items-center justify-center text-[14px] font-bold shrink-0 transition-colors"
                :class="
                  openFaqId === item.id
                    ? 'bg-[#781D2B] text-white'
                    : 'bg-[#F5F6F8] text-[#781D2B]'
                "
                aria-hidden="true"
              >
                {{ openFaqId === item.id ? '−' : '+' }}
              </span>
            </button>

            <div
              v-if="openFaqId === item.id"
              class="px-6 pb-5 pt-1 border-t border-border-warm bg-[#fcfbfa]"
            >
              <p class="text-[13px] text-ink-secondary leading-[1.65] mb-3.5">
                {{ item.answerPlaceholder }}
              </p>
              <button
                v-if="item.actionLabel && item.actionRoute"
                type="button"
                class="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
                @click="handleFaqAction(item.actionRoute)"
              >
                <span>{{ item.actionLabel }}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
