<script setup lang="ts">
import {
  helpFaqCategoryTabs,
  helpInteractionStatePresets,
  helpSuggestedKeywords,
} from '../../data/helpSupportPageData'
import type {
  HelpFaqFilterTab,
  HelpFaqItem,
  HelpSupportInteractionState,
} from '../../types/admissions'

defineProps<{
  pageTitle: string
  pageSubtitle: string
  searchQuery: string
  activeCategory: HelpFaqFilterTab
  filteredFaqs: HelpFaqItem[]
  expandedFaqIds: string[]
  activeState: HelpSupportInteractionState
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'update:pageTitle', value: string): void
  (e: 'update:pageSubtitle', value: string): void
  (e: 'update:searchQuery', value: string): void
  (e: 'update:activeCategory', category: HelpFaqFilterTab): void
  (e: 'toggle-faq', faqId: string): void
  (e: 'select-state', state: HelpSupportInteractionState): void
  (e: 'toggle-inline-edit'): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 3. Page Header + 9. Interaction State Switcher -->
    <section
      aria-labelledby="help-support-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-6"
    >
      <div
        class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-6 border-b border-[#EBECEF]"
      >
        <div class="min-w-0 flex-1">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
            APPLICANT ASSISTANCE &amp; UNIVERSITY HELPDESK
          </span>

          <input
            v-if="inlineEditEnabled"
            :value="pageTitle"
            type="text"
            aria-label="Page Title"
            class="w-full max-w-[420px] mt-1 px-2.5 py-1 text-[23px] sm:text-[26px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            @input="emit('update:pageTitle', ($event.target as HTMLInputElement).value)"
          />
          <h1
            v-else
            id="help-support-heading"
            class="text-[24px] sm:text-[28px] font-bold text-[#252525] mt-1 leading-tight"
          >
            {{ pageTitle }}
          </h1>

          <input
            v-if="inlineEditEnabled"
            :value="pageSubtitle"
            type="text"
            aria-label="Page Subtitle"
            class="w-full max-w-[640px] mt-1.5 px-2.5 py-1 text-[13.5px] text-[#555555] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            @input="emit('update:pageSubtitle', ($event.target as HTMLInputElement).value)"
          />
          <p v-else class="text-[14px] text-[#555555] mt-1.5">
            {{ pageSubtitle }}
          </p>
        </div>

        <!-- 9. Empty & Interaction State Preview Toolbar -->
        <div class="flex flex-col sm:items-end gap-2 shrink-0">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
              Screen &amp; State Preview
            </span>
            <button
              type="button"
              class="text-[11.5px] font-semibold text-[#781D2B] underline cursor-pointer"
              @click="emit('toggle-inline-edit')"
            >
              {{ inlineEditEnabled ? 'Lock Inline Editing' : 'Edit Sample Text Inline' }}
            </button>
          </div>

          <div
            class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1 max-w-[680px] justify-end"
            role="group"
            aria-label="Help & Support Interaction States"
          >
            <button
              v-for="preset in helpInteractionStatePresets"
              :key="preset.id"
              type="button"
              class="px-2.5 py-1.5 text-[11px] font-semibold rounded-[3px] transition-colors cursor-pointer"
              :class="
                activeState === preset.id
                  ? 'bg-[#781D2B] text-white shadow-2xs'
                  : 'text-[#252525] hover:text-[#781D2B]'
              "
              @click="emit('select-state', preset.id)"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Search Help Center Section -->
      <div
        class="bg-[#FAFAFB] border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-5 sm:p-6 space-y-4"
      >
        <div>
          <h2 class="text-[19px] sm:text-[21px] font-bold text-[#252525]">
            How can we help you?
          </h2>
          <p class="text-[13px] text-[#555555] mt-0.5">
            Search our knowledge base for instant answers about registration, required documents, entrance exams, and results.
          </p>
        </div>

        <!-- Search Input with Search Icon -->
        <div class="relative max-w-[680px]">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#781D2B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            :value="searchQuery"
            type="search"
            placeholder="Search for help..."
            aria-label="Search for help"
            class="w-full h-11 pl-10 pr-24 text-[14px] bg-white border border-[#D1D5DB] rounded-[4px] text-[#252525] placeholder:text-[#6B7280] focus:outline-none focus:border-[#781D2B]"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#781D2B] hover:underline cursor-pointer"
            @click="emit('update:searchQuery', '')"
          >
            Clear
          </button>
        </div>

        <!-- Suggested Search Keywords -->
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <span class="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#6B7280]">
            Suggested keywords:
          </span>
          <button
            v-for="keyword in helpSuggestedKeywords"
            :key="keyword"
            type="button"
            class="px-2.5 py-1 rounded-[3px] text-[12px] font-semibold border transition-colors cursor-pointer"
            :class="
              searchQuery.toLowerCase() === keyword.toLowerCase()
                ? 'bg-[#781D2B] text-white border-[#781D2B]'
                : 'bg-white text-[#252525] border-[#D1D5DB] hover:border-[#781D2B] hover:text-[#781D2B]'
            "
            @click="
              emit('update:activeCategory', 'All');
              emit('update:searchQuery', keyword)
            "
          >
            {{ keyword }}
          </button>
        </div>
      </div>
    </section>

    <!-- 5. Frequently Asked Questions (FAQ) Section -->
    <section
      aria-labelledby="faq-section-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-[#EBECEF]"
      >
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            KNOWLEDGE BASE
          </span>
          <h2 id="faq-section-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <!-- Category Tabs -->
        <div
          class="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="FAQ Categories"
        >
          <button
            v-for="cat in helpFaqCategoryTabs"
            :key="cat"
            type="button"
            role="tab"
            :aria-selected="activeCategory === cat"
            class="px-3 py-1.5 rounded-[4px] text-[12px] font-semibold transition-colors cursor-pointer"
            :class="
              activeCategory === cat
                ? 'bg-[#781D2B] text-white shadow-2xs'
                : 'bg-[#F5F6F8] text-[#555555] hover:text-[#781D2B] border border-[#E2E4E9]'
            "
            @click="emit('update:activeCategory', cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- 9. Loading State Preview -->
      <div v-if="activeState === 'loading'" class="space-y-3 py-2" aria-busy="true">
        <div
          v-for="n in 4"
          :key="n"
          class="p-4 rounded-[4px] border border-[#E5E7EB] bg-[#FAFAFB] animate-pulse space-y-2"
        >
          <div class="h-3.5 w-32 bg-[#E5E7EB] rounded"></div>
          <div class="h-4 w-3/4 bg-[#D1D5DB] rounded"></div>
        </div>
      </div>

      <!-- 9. No Matching FAQ Results Empty State -->
      <div
        v-else-if="filteredFaqs.length === 0"
        class="py-10 px-6 text-center bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px]"
      >
        <div
          class="w-12 h-12 mx-auto rounded-full bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center"
          aria-hidden="true"
        >
          <!-- Lucide SearchX / HelpCircle Icon -->
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <h3 class="text-[16px] font-bold text-[#252525] mt-3">
          No matching FAQ results found
        </h3>
        <p class="text-[13px] text-[#555555] mt-1 max-w-[460px] mx-auto">
          We couldn’t find any FAQ items matching "{{ searchQuery }}". Try clearing your search filter or submit a support request below.
        </p>
        <button
          type="button"
          class="mt-4 px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
          @click="
            emit('update:activeCategory', 'All');
            emit('update:searchQuery', '')
          "
        >
          Reset FAQ Filters
        </button>
      </div>

      <!-- Expandable FAQ Accordion Items -->
      <div v-else class="divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-[4px]">
        <div
          v-for="faq in filteredFaqs"
          :key="faq.id"
          class="bg-white transition-colors"
        >
          <button
            type="button"
            class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAFB] cursor-pointer"
            :aria-expanded="expandedFaqIds.includes(faq.id)"
            @click="emit('toggle-faq', faq.id)"
          >
            <div class="min-w-0 flex-1">
              <span
                class="inline-block px-2 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-[0.07em] bg-[#FDF7F8] text-[#781D2B] border border-[#EBCFD4] mb-1.5"
              >
                {{ faq.category }}
              </span>
              <input
                v-if="inlineEditEnabled"
                v-model="faq.question"
                type="text"
                class="w-full px-2.5 py-1 text-[14px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
                @click.stop
              />
              <h3 v-else class="text-[14.5px] font-bold text-[#252525] leading-snug">
                {{ faq.question }}
              </h3>
            </div>

            <!-- Accordion Chevron Icon -->
            <span
              class="w-7 h-7 rounded-[3px] bg-[#F5F6F8] border border-[#E2E4E9] flex items-center justify-center text-[#781D2B] shrink-0 transition-transform"
              :class="expandedFaqIds.includes(faq.id) ? 'rotate-180 bg-[#FDF7F8]' : ''"
              aria-hidden="true"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>

          <!-- Expanded FAQ Answer -->
          <div
            v-if="expandedFaqIds.includes(faq.id)"
            class="px-5 pb-4 pt-1 bg-[#FAFAFB] border-t border-[#EBECEF]"
          >
            <textarea
              v-if="inlineEditEnabled"
              v-model="faq.answer"
              rows="3"
              class="w-full px-2.5 py-1.5 text-[13px] text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
            ></textarea>
            <p v-else class="text-[13.5px] text-[#374151] leading-relaxed">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
