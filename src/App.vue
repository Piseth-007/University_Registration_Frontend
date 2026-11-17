<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LanguageCode, NavItem } from './types/admissions'
import { navItems } from './data/admissionsData'
import { useRoute } from './router'

import TopUtilityBar from './components/layout/TopUtilityBar.vue'
import BrandHeader from './components/layout/BrandHeader.vue'
import MainNavbar from './components/layout/MainNavbar.vue'
import SiteFooter from './components/layout/SiteFooter.vue'

const activeLang = ref<LanguageCode>('EN')
const selectedSectionId = ref<string>('home')

const { path, matchedRoute } = useRoute()

const currentNavId = computed(() => {
  if (path.value === '/about') return 'about'
  if (path.value === '/programs') return 'programs'
  if (path.value === '/news') return 'news'
  if (path.value === '/contact') return 'contact'
  if (path.value === '/results') return 'results'
  return selectedSectionId.value
})

const isPortalLayout = computed(
  () =>
    matchedRoute.value.path === '/dashboard' ||
    matchedRoute.value.path === '/my-application' ||
    matchedRoute.value.path === '/application-status' ||
    matchedRoute.value.path === '/personal-information' ||
    matchedRoute.value.path === '/academic-background' ||
    matchedRoute.value.path === '/faculty-major' ||
    matchedRoute.value.path === '/documents' ||
    matchedRoute.value.path === '/review-submit' ||
    matchedRoute.value.path === '/examination' ||
    matchedRoute.value.path === '/examination-results' ||
    matchedRoute.value.path === '/notifications' ||
    matchedRoute.value.path === '/my-profile' ||
    matchedRoute.value.path === '/help-support' ||
    matchedRoute.value.path === '/officer-dashboard' ||
    matchedRoute.value.path === '/officer-applications',
)

function handleNavSelect(item: NavItem) {
  selectedSectionId.value = item.id
}
</script>

<template>
  <div id="top" class="page-wrapper">
    <template v-if="!isPortalLayout">
      <TopUtilityBar v-model:active-lang="activeLang" />
      <BrandHeader />
      <MainNavbar
        :items="navItems"
        :active-id="currentNavId"
        @select="handleNavSelect"
      />
    </template>

    <component :is="matchedRoute.component" />

    <SiteFooter v-if="!isPortalLayout" />
  </div>
</template>
