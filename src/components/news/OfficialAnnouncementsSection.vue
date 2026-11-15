<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
  AnnouncementStatusLabel,
  OfficialAnnouncementRecord,
  OfficialAnnouncementType,
} from '../../types/admissions'

const props = defineProps<{
  announcements: OfficialAnnouncementRecord[]
}>()

const selectedType = ref<OfficialAnnouncementType | 'ALL'>('ALL')

const announcementTypes: Array<{ label: string; value: OfficialAnnouncementType | 'ALL' }> = [
  { label: 'All Notices', value: 'ALL' },
  { label: 'Admission Announcements', value: 'Admission Announcement' },
  { label: 'Registration Deadlines', value: 'Registration Deadline' },
  { label: 'Examination Schedules', value: 'Examination Schedule' },
  { label: 'Admission Results', value: 'Admission Result' },
  { label: 'University Notices', value: 'University Notice' },
]

const filteredAnnouncements = computed(() => {
  if (selectedType.value === 'ALL') return props.announcements
  return props.announcements.filter((item) => item.type === selectedType.value)
})

function getStatusBadgeClasses(label: AnnouncementStatusLabel): string {
  switch (label) {
    case 'OPEN':
      return 'bg-[#781D2B] text-white'
    case 'DEADLINE':
      return 'bg-[#9e281d] text-white'
    case 'SCHEDULED':
      return 'bg-[#252525] text-white'
    case 'PUBLISHED':
      return 'bg-[#2c5e3b] text-white'
    case 'NOTICE':
    default:
      return 'bg-[#ebe4da] text-[#781D2B]'
  }
}
</script>

<template>
  <section id="official-announcements" class="py-16 bg-white border-t border-border-warm">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">OFFICIAL BULLETINS</span>
          <h2 class="section-title text-[#252525]">Official announcements</h2>
        </div>
        <span
          class="text-[11px] font-medium text-ink-muted bg-[#F5F6F8] border border-border-warm px-3 py-1 rounded-[2px]"
        >
          Dates &amp; notices marked as [Placeholder]
        </span>
      </div>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-6">
        Official circulars regarding admission openings, registration deadlines,
        examination schedules, result publications, and university administrative notices.
      </p>

      <!-- Announcement Type Filter Pills -->
      <div class="flex flex-wrap gap-1.5 mb-6">
        <button
          v-for="tab in announcementTypes"
          :key="tab.value"
          type="button"
          class="px-3 py-1.5 text-[12px] rounded-[2px] border cursor-pointer transition-colors"
          :class="
            selectedType === tab.value
              ? 'bg-[#781D2B] border-[#781D2B] text-white font-semibold'
              : 'bg-[#F5F6F8] border-border-warm text-[#252525] hover:border-[#781D2B]'
          "
          @click="selectedType = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Structured Announcement List -->
      <div class="border-t border-border-warm">
        <div
          v-for="item in filteredAnnouncements"
          :key="item.id"
          class="flex flex-col sm:flex-row sm:items-center gap-5 py-5 border-b border-border-warm hover:bg-[#fcfbfa] px-3 transition-colors"
        >
          <!-- Date Badge -->
          <div
            class="w-[58px] h-[60px] bg-[#F5F6F8] border border-border-warm flex flex-col items-center justify-center shrink-0 rounded-[2px]"
          >
            <span class="font-serif text-[18px] font-bold text-[#781D2B] leading-none">
              {{ item.dayPlaceholder }}
            </span>
            <span
              class="text-[9.5px] font-bold tracking-[0.08em] text-[#252525] mt-1 uppercase"
            >
              {{ item.monthPlaceholder }}
            </span>
          </div>

          <!-- Announcement Body -->
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                class="text-[9.5px] font-bold tracking-[0.09em] px-2 py-0.5 rounded-[2px] uppercase"
                :class="getStatusBadgeClasses(item.statusLabel)"
              >
                {{ item.statusLabel }}
              </span>
              <span
                class="text-[11px] font-semibold text-[#781D2B] bg-[#F5F6F8] border border-border-warm px-2 py-0.5 rounded-[2px]"
              >
                {{ item.type }}
              </span>
              <span class="text-[11px] text-ink-muted">
                {{ item.referenceCodePlaceholder }}
              </span>
            </div>

            <h3 class="text-[15.5px] font-semibold text-[#252525] mb-1">
              {{ item.title }}
            </h3>
            <p class="text-[12.5px] text-ink-secondary leading-[1.55]">
              {{ item.summary }}
            </p>
          </div>

          <!-- Action Link -->
          <div class="shrink-0">
            <a
              href="#official-announcements"
              class="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#781D2B] hover:underline"
              @click.prevent
            >
              <span>View Notice</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
