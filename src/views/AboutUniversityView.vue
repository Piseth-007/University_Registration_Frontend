<script setup lang="ts">
import {
  aboutFaculties,
  campusFacilitiesBottom,
  campusFacilitiesTop,
  coreValues,
  historyMilestones,
  institutionalStats,
  missionPoints,
  overviewHighlights,
  universityContacts,
} from '../data/aboutUniversityData'

import AboutHeroBanner from '../components/about/AboutHeroBanner.vue'
import AboutOverviewSection from '../components/about/AboutOverviewSection.vue'
import AboutHistorySection from '../components/about/AboutHistorySection.vue'
import AboutVisionMissionSection from '../components/about/AboutVisionMissionSection.vue'
import AboutRectorMessageSection from '../components/about/AboutRectorMessageSection.vue'
import AboutFacultiesSection from '../components/about/AboutFacultiesSection.vue'
import AboutFacilitiesSection from '../components/about/AboutFacilitiesSection.vue'
import AboutStatsBanner from '../components/about/AboutStatsBanner.vue'
import AboutContactSection from '../components/about/AboutContactSection.vue'
</script>

<template>
  <main>
    <AboutHeroBanner />
    <AboutOverviewSection :highlights="overviewHighlights" />
    <AboutHistorySection :milestones="historyMilestones" />
    <AboutVisionMissionSection
      :mission-points="missionPoints"
      :core-values="coreValues"
    />
    <AboutRectorMessageSection />
    <AboutFacultiesSection :faculties="aboutFaculties" />
    <AboutFacilitiesSection
      :top-facilities="campusFacilitiesTop"
      :bottom-facilities="campusFacilitiesBottom"
    />
    <AboutStatsBanner :stats="institutionalStats" />
    <AboutContactSection :contacts="universityContacts" />
  </main>
</template>
