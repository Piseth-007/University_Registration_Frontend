<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AcademicProgramItem, DegreeLevel, StudyMode } from '../types/admissions'
import {
  academicProgramsCatalog,
  academicStrengths,
  academicStructureBlocks,
  degreeLevelOptions,
  facultyDirectoryList,
  studyModeOptions,
} from '../data/programsPageData'
import { filterAcademicPrograms, scrollToSection } from '../utils/helpers'

import ProgramsHeroBanner from '../components/programs/ProgramsHeroBanner.vue'
import AcademicOverviewSection from '../components/programs/AcademicOverviewSection.vue'
import FacultyDirectorySection from '../components/programs/FacultyDirectorySection.vue'
import ProgramDirectorySection from '../components/programs/ProgramDirectorySection.vue'
import ProgramDetailsSection from '../components/programs/ProgramDetailsSection.vue'
import WhyStudyWithUsSection from '../components/programs/WhyStudyWithUsSection.vue'
import ProgramsAdmissionCta from '../components/programs/ProgramsAdmissionCta.vue'

const searchQuery = ref('')
const selectedFacultyId = ref<string>('ALL')
const selectedDegreeLevel = ref<DegreeLevel | 'ALL'>('ALL')
const selectedStudyMode = ref<StudyMode | 'ALL'>('ALL')

const selectedProgram = ref<AcademicProgramItem>(academicProgramsCatalog[0]!)

const filteredPrograms = computed(() =>
  filterAcademicPrograms(academicProgramsCatalog, {
    searchQuery: searchQuery.value,
    facultyId: selectedFacultyId.value,
    degreeLevel: selectedDegreeLevel.value,
    studyMode: selectedStudyMode.value,
  }),
)

function handleSelectFacultyFromDirectory(facultyId: string) {
  selectedFacultyId.value = facultyId
  const firstMatch = academicProgramsCatalog.find((p) => p.facultyId === facultyId)
  if (firstMatch) {
    selectedProgram.value = firstMatch
  }
  scrollToSection('#program-directory')
}

function handleResetFilters() {
  searchQuery.value = ''
  selectedFacultyId.value = 'ALL'
  selectedDegreeLevel.value = 'ALL'
  selectedStudyMode.value = 'ALL'
}

function handleViewProgramDetails(prog: AcademicProgramItem) {
  selectedProgram.value = prog
  scrollToSection('#program-details')
}
</script>

<template>
  <main>
    <ProgramsHeroBanner />
    <AcademicOverviewSection :structure-blocks="academicStructureBlocks" />
    <FacultyDirectorySection
      :faculties="facultyDirectoryList"
      :selected-faculty-id="selectedFacultyId"
      @select-faculty="handleSelectFacultyFromDirectory"
    />
    <ProgramDirectorySection
      v-model:search-query="searchQuery"
      v-model:selected-faculty-id="selectedFacultyId"
      v-model:selected-degree-level="selectedDegreeLevel"
      v-model:selected-study-mode="selectedStudyMode"
      :programs="filteredPrograms"
      :faculties="facultyDirectoryList"
      :degree-levels="degreeLevelOptions"
      :study-modes="studyModeOptions"
      :active-program-id="selectedProgram.id"
      @reset-filters="handleResetFilters"
      @view-details="handleViewProgramDetails"
    />
    <ProgramDetailsSection
      :program="selectedProgram"
      :all-programs="academicProgramsCatalog"
      @select-program="handleViewProgramDetails"
    />
    <WhyStudyWithUsSection :strengths="academicStrengths" />
    <ProgramsAdmissionCta />
  </main>
</template>
