<script setup lang="ts">
import {
  contactFaqs,
  contactInfoBlocks,
  inquirySubjectOptions,
  universityOffices,
} from '../data/contactPageData'

import ContactHeroBanner from '../components/contact/ContactHeroBanner.vue'
import ContactInfoCardsSection from '../components/contact/ContactInfoCardsSection.vue'
import ContactFormAndLocationSection from '../components/contact/ContactFormAndLocationSection.vue'
import UniversityOfficesSection from '../components/contact/UniversityOfficesSection.vue'
import ContactFaqSection from '../components/contact/ContactFaqSection.vue'
</script>

<template>
  <main>
    <ContactHeroBanner />
    <ContactInfoCardsSection :blocks="contactInfoBlocks" />
    <ContactFormAndLocationSection :subject-options="inquirySubjectOptions" />
    <UniversityOfficesSection :offices="universityOffices" />
    <ContactFaqSection :faqs="contactFaqs" />
  </main>
</template>
