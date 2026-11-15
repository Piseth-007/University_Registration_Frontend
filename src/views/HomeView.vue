<script setup lang="ts">
import {
  announcements,
  applicationSteps,
  examSchedules,
  faculties,
  keyDates,
  newsArticles,
  quickLinks,
  requirementsList,
} from '../data/admissionsData'

import HeroBanner from '../components/home/HeroBanner.vue'
import QuickActionStrip from '../components/home/QuickActionStrip.vue'
import AnnouncementsSection from '../components/home/AnnouncementsSection.vue'
import AboutUniversitySection from '../components/home/AboutUniversitySection.vue'
import FacultiesSection from '../components/home/FacultiesSection.vue'
import RequirementsSection from '../components/home/RequirementsSection.vue'
import ApplicationStepsSection from '../components/home/ApplicationStepsSection.vue'
import ExamResultsSection from '../components/home/ExamResultsSection.vue'
import NewsEventsSection from '../components/home/NewsEventsSection.vue'
</script>

<template>
  <main>
    <HeroBanner />
    <QuickActionStrip :items="quickLinks" />
    <AnnouncementsSection :announcements="announcements" :key-dates="keyDates" />
    <AboutUniversitySection />
    <FacultiesSection :faculties="faculties" />
    <RequirementsSection :requirements="requirementsList" />
    <ApplicationStepsSection :steps="applicationSteps" />
    <ExamResultsSection :schedules="examSchedules" />
    <NewsEventsSection :articles="newsArticles" />
  </main>
</template>
