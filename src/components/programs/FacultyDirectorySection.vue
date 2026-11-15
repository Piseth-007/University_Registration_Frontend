<script setup lang="ts">
import type { FacultyDirectoryItem } from '../../types/admissions'

defineProps<{
  faculties: FacultyDirectoryItem[]
  selectedFacultyId: string
}>()

const emit = defineEmits<{
  (e: 'selectFaculty', facultyId: string): void
}>()
</script>

<template>
  <section id="faculty-directory" class="py-16 bg-[#F5F6F8]">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">FACULTY DIRECTORY</span>
          <h2 class="section-title text-[#252525]">Academic faculties</h2>
        </div>
        <span class="text-[12px] text-ink-muted">
          Select a faculty below to filter its academic programs
        </span>
      </div>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-8">
        Explore our six academic faculties, each dedicated to teaching excellence,
        practical inquiry, and student mentorship.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="fac in faculties"
          :key="fac.id"
          class="bg-white border transition-all flex flex-col overflow-hidden rounded-[2px]"
          :class="
            selectedFacultyId === fac.id
              ? 'border-[#781D2B] shadow-[0_8px_24px_rgba(120,29,43,0.1)]'
              : 'border-border-warm hover:border-[#cbbab8] hover:shadow-[0_6px_18px_rgba(37,37,37,0.06)]'
          "
        >
          <!-- Faculty Photograph -->
          <div class="relative aspect-[16/9] overflow-hidden bg-[#e5e0d8]">
            <img
              :src="fac.image"
              :alt="fac.name"
              class="w-full h-full object-cover block"
            />
            <span
              class="absolute top-3 right-3 bg-white/95 text-[#781D2B] text-[10px] font-bold tracking-[0.06em] px-2.5 py-1 rounded-[2px] shadow-xs"
            >
              {{ fac.programCountPlaceholder }}
            </span>
          </div>

          <!-- Faculty Body -->
          <div class="p-6 flex flex-col flex-1">
            <h3 class="text-[18px] font-semibold text-[#252525] mb-2">
              {{ fac.name }}
            </h3>
            <p class="text-[12.5px] text-ink-secondary leading-[1.6] mb-5 flex-1">
              {{ fac.description }}
            </p>

            <div class="pt-3 border-t border-border-warm flex items-center justify-between">
              <button
                type="button"
                class="inline-flex items-center gap-2 bg-[#781D2B] hover:bg-[#5c121d] text-white text-[12px] font-medium px-4 py-2 rounded-[2px] transition-colors cursor-pointer"
                @click="emit('selectFaculty', fac.id)"
              >
                <span>View Programs</span>
                <span aria-hidden="true">→</span>
              </button>
              <span
                v-if="selectedFacultyId === fac.id"
                class="text-[11px] font-semibold text-[#781D2B]"
              >
                Active filter
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
