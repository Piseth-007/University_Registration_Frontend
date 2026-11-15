<script setup lang="ts">
import type { AcademicStructureBlock } from '../../data/programsPageData'

defineProps<{
  structureBlocks: AcademicStructureBlock[]
}>()
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container-layout">
      <!-- Top 2-Column Introduction & Overview -->
      <div
        class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start pb-12 border-b border-border-warm"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">ACADEMIC OVERVIEW</span>
          <h2 class="section-title text-[#252525] mb-4">
            Rigorous academic education.<br />
            Structured for lifelong success.
          </h2>
          <p class="text-[13.5px] text-ink-secondary leading-[1.68] mb-3.5">
            Our academic education is built on a balance of foundational theory,
            laboratory and field inquiry, and professional readiness. Across every
            faculty, curricula are structured to cultivate analytical thinking, ethical
            leadership, and practical competence suited to national and regional needs.
          </p>
          <p class="text-[13.5px] text-ink-secondary leading-[1.68]">
            Students progress through a clear academic credit framework, beginning with
            broad foundational studies before advancing into specialized major
            coursework, research seminars, and industry or community practicums.
          </p>
        </div>

        <!-- Academic Structure Summary Box -->
        <div class="bg-[#F5F6F8] border border-border-warm p-6.5 rounded-[2px]">
          <span
            class="block text-[10px] font-bold tracking-[0.12em] text-[#781D2B] uppercase mb-2"
          >
            UNIVERSITY ACADEMIC STRUCTURE
          </span>
          <h3 class="text-[17px] font-semibold text-[#252525] mb-3">
            Overview of Available Programs
          </h3>
          <p class="text-[12.5px] text-ink-secondary leading-[1.6] mb-4">
            Academic programs are organized across six core faculties offering
            undergraduate, postgraduate, and continuing study tracks. Official credit
            requirements and intake capacities are maintained by each faculty.
          </p>

          <div class="grid grid-cols-2 gap-3 pt-3 border-t border-border-warm">
            <div class="bg-white border border-border-warm p-3.5 rounded-[2px]">
              <span
                class="block text-[9.5px] font-bold tracking-[0.09em] text-ink-muted uppercase"
              >
                CORE FACULTIES
              </span>
              <span class="text-[15px] font-semibold text-[#781D2B] mt-0.5 block">
                6 Academic Divisions
              </span>
            </div>
            <div class="bg-white border border-border-warm p-3.5 rounded-[2px]">
              <span
                class="block text-[9.5px] font-bold tracking-[0.09em] text-ink-muted uppercase"
              >
                TOTAL PROGRAMS
              </span>
              <span class="text-[13px] font-semibold text-[#252525] mt-0.5 block">
                [ Placeholder · Editable ]
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3-Column Academic Structure Pathways -->
      <div class="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="block in structureBlocks"
          :key="block.id"
          class="bg-[#F5F6F8] border border-border-warm p-6 rounded-[2px] flex flex-col"
        >
          <span
            class="text-[9.5px] font-bold tracking-[0.1em] text-[#781D2B] uppercase mb-1.5"
          >
            {{ block.label }}
          </span>
          <h3 class="text-[16.5px] font-semibold text-[#252525] mb-2">
            {{ block.title }}
          </h3>
          <p class="text-[12.5px] text-ink-secondary leading-[1.58] mb-4 flex-1">
            {{ block.description }}
          </p>
          <span
            class="inline-block self-start text-[11px] font-medium text-ink-muted bg-white border border-border-warm px-2.5 py-1 rounded-[2px]"
          >
            {{ block.placeholderTag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
