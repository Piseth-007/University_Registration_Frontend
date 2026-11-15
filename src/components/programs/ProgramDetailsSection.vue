<script setup lang="ts">
import type { AcademicProgramItem } from '../../types/admissions'
import { navigateTo } from '../../router'

defineProps<{
  program: AcademicProgramItem
  allPrograms: AcademicProgramItem[]
}>()

const emit = defineEmits<{
  (e: 'selectProgram', program: AcademicProgramItem): void
}>()
</script>

<template>
  <section id="program-details" class="py-16 bg-[#F5F6F8] border-t border-border-warm">
    <div class="container-layout">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6"
      >
        <div>
          <span class="eyebrow text-[#781D2B]">PROGRAM DETAILS SECTION</span>
          <h2 class="section-title text-[#252525]">Detailed program information</h2>
        </div>
        <!-- Quick Program Switcher Pills -->
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="item in allPrograms"
            :key="item.id"
            type="button"
            class="px-2.5 py-1 text-[11px] rounded-[2px] border cursor-pointer transition-colors"
            :class="
              item.id === program.id
                ? 'bg-[#781D2B] border-[#781D2B] text-white font-semibold'
                : 'bg-white border-border-warm text-ink-secondary hover:border-[#781D2B]'
            "
            @click="emit('selectProgram', item)"
          >
            {{ item.facultyName.replace('Faculty of ', '') }}
          </button>
        </div>
      </div>

      <!-- Main Program Detail Card -->
      <div class="bg-white border border-border-warm rounded-[2px] overflow-hidden">
        <!-- Top Header Banner inside Card -->
        <div
          class="bg-[#781D2B] text-white px-7 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
        >
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span
                class="bg-white/18 text-white text-[10px] font-bold tracking-[0.09em] uppercase px-2.5 py-0.75 rounded-[2px]"
              >
                {{ program.facultyName }}
              </span>
              <span
                class="bg-white/12 text-white/90 text-[10px] font-medium px-2.5 py-0.75 rounded-[2px]"
              >
                Editable Sample Profile
              </span>
            </div>
            <h3 class="text-[22px] sm:text-[24px] font-semibold text-white leading-snug">
              {{ program.name }}
            </h3>
          </div>

          <a
            href="/apply"
            class="inline-flex items-center gap-2.5 bg-white hover:bg-[#f4f2ee] text-[#781D2B] text-[13px] font-semibold px-5 py-2.75 rounded-[2px] shrink-0 self-start lg:self-center transition-colors"
            @click.prevent="navigateTo('/apply')"
          >
            <span>Apply Now</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <!-- Key Metadata Strip (Degree Awarded, Study Duration, Degree Level, Study Mode) -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-border-warm bg-[#fcfbfa]"
        >
          <div class="p-5 border-b sm:border-b-0 sm:border-r border-border-warm">
            <span
              class="block text-[9.5px] font-bold tracking-[0.1em] text-ink-muted uppercase mb-1"
            >
              DEGREE AWARDED
            </span>
            <span class="text-[13.5px] font-semibold text-[#252525]">
              {{ program.degreeAwardedPlaceholder }}
            </span>
          </div>
          <div class="p-5 border-b lg:border-b-0 lg:border-r border-border-warm">
            <span
              class="block text-[9.5px] font-bold tracking-[0.1em] text-ink-muted uppercase mb-1"
            >
              STUDY DURATION
            </span>
            <span class="text-[13.5px] font-semibold text-[#252525]">
              {{ program.durationPlaceholder }}
            </span>
          </div>
          <div class="p-5 border-b sm:border-b-0 sm:border-r border-border-warm">
            <span
              class="block text-[9.5px] font-bold tracking-[0.1em] text-ink-muted uppercase mb-1"
            >
              DEGREE LEVEL
            </span>
            <span class="text-[13.5px] font-semibold text-[#252525]">
              {{ program.degreeLevel }}
            </span>
          </div>
          <div class="p-5">
            <span
              class="block text-[9.5px] font-bold tracking-[0.1em] text-ink-muted uppercase mb-1"
            >
              STUDY MODE
            </span>
            <span class="text-[13.5px] font-semibold text-[#252525]">
              {{ program.studyMode }}
            </span>
          </div>
        </div>

        <!-- Main 2-Column Content Body -->
        <div
          class="p-7 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 items-start"
        >
          <!-- Left Column: Program Introduction, Learning Objectives, Curriculum Overview -->
          <div class="flex flex-col gap-8">
            <!-- Program Introduction -->
            <div>
              <h4
                class="text-[14px] font-bold tracking-[0.06em] text-[#781D2B] uppercase mb-2.5"
              >
                Program Introduction
              </h4>
              <p class="text-[13.5px] text-ink-secondary leading-[1.68]">
                {{ program.introduction }}
              </p>
            </div>

            <!-- Learning Objectives -->
            <div>
              <h4
                class="text-[14px] font-bold tracking-[0.06em] text-[#781D2B] uppercase mb-3"
              >
                Learning Objectives
              </h4>
              <ul class="list-none flex flex-col gap-2.5">
                <li
                  v-for="(obj, idx) in program.learningObjectives"
                  :key="idx"
                  class="flex items-start gap-2.5 text-[13px] text-ink-secondary leading-[1.58] bg-[#F5F6F8] p-3.5 rounded-[2px] border border-border-warm"
                >
                  <span class="text-[#781D2B] font-bold" aria-hidden="true">✓</span>
                  <span>{{ obj }}</span>
                </li>
              </ul>
            </div>

            <!-- Curriculum Overview -->
            <div>
              <h4
                class="text-[14px] font-bold tracking-[0.06em] text-[#781D2B] uppercase mb-3"
              >
                Curriculum Overview
              </h4>
              <div class="flex flex-col border-t border-border-warm">
                <div
                  v-for="(stageItem, sIdx) in program.curriculumOverview"
                  :key="sIdx"
                  class="py-3.5 border-b border-border-warm flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6"
                >
                  <span
                    class="text-[13px] font-semibold text-[#252525] sm:w-[250px] shrink-0"
                  >
                    {{ stageItem.stage }}
                  </span>
                  <span class="text-[12.5px] text-ink-secondary leading-[1.55]">
                    {{ stageItem.focus }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Admission Requirements, Career Opportunities, Apply CTA -->
          <div class="flex flex-col gap-6">
            <!-- Admission Requirements Box -->
            <div class="bg-[#F5F6F8] border border-border-warm p-6 rounded-[2px]">
              <h4
                class="text-[13.5px] font-bold tracking-[0.06em] text-[#781D2B] uppercase mb-3"
              >
                Admission Requirements
              </h4>
              <ul class="list-none flex flex-col gap-2.5">
                <li
                  v-for="(req, rIdx) in program.admissionRequirements"
                  :key="rIdx"
                  class="flex items-start gap-2 text-[12.5px] text-ink-secondary leading-[1.55]"
                >
                  <span class="text-[#781D2B] font-bold" aria-hidden="true">▪</span>
                  <span>{{ req }}</span>
                </li>
              </ul>
            </div>

            <!-- Career Opportunities Box -->
            <div class="bg-[#F5F6F8] border border-border-warm p-6 rounded-[2px]">
              <h4
                class="text-[13.5px] font-bold tracking-[0.06em] text-[#781D2B] uppercase mb-3"
              >
                Career Opportunities
              </h4>
              <ul class="list-none flex flex-col gap-2.5">
                <li
                  v-for="(career, cIdx) in program.careerOpportunities"
                  :key="cIdx"
                  class="flex items-center gap-2 text-[12.5px] font-medium text-[#252525] bg-white px-3 py-2 rounded-[2px] border border-border-warm"
                >
                  <span class="text-[#781D2B]" aria-hidden="true">→</span>
                  <span>{{ career }}</span>
                </li>
              </ul>
            </div>

            <!-- Action Box -->
            <div class="bg-[#fcfaf8] border border-[#e5d8d5] p-6 rounded-[2px]">
              <span
                class="block text-[10px] font-bold tracking-[0.1em] text-[#781D2B] uppercase mb-1"
              >
                READY TO ENROLL?
              </span>
              <p class="text-[12.5px] text-ink-secondary leading-[1.55] mb-4">
                Submit your online application for
                <strong class="text-[#252525]">{{ program.name }}</strong> through the
                university admissions portal.
              </p>
              <a
                href="/apply"
                class="btn-primary w-full justify-center"
                @click.prevent="navigateTo('/apply')"
              >
                <span>Apply Now</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
