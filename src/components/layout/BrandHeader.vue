<script setup lang="ts">
import { isStudentAuthenticated, navigateTo, navigateToStudentPortal } from '../../router'
</script>

<template>
  <header class="bg-white py-4.5">
    <div
      class="container-layout flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
    >
      <a
        href="/"
        class="flex items-center gap-3.5 group"
        @click.prevent="navigateTo('/')"
      >
        <img
          src="/images/rupp-logo.png"
          alt="Royal University of Phnom Penh Logo"
          class="w-15 h-15 sm:w-16 sm:h-16 object-contain shrink-0"
        />
        <div class="flex flex-col">
          <span class="font-khmer text-[15px] text-crimson leading-snug tracking-[0.01em]">
            សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ
          </span>
          <span class="font-serif text-[22px] sm:text-[23px] font-semibold text-crimson leading-tight mt-0.5">
            Royal University of Phnom Penh
          </span>
          <span
            class="text-[9.5px] font-semibold tracking-[0.12em] text-ink-muted mt-1 uppercase"
          >
            OFFICE OF ADMISSIONS &amp; REGISTRATION
          </span>
        </div>
      </a>

      <div class="flex items-center gap-5.5">
        <a
          :href="isStudentAuthenticated ? '/dashboard' : '/login'"
          class="text-[13px] font-medium text-ink hover:text-crimson transition-colors"
          @click.prevent="navigateToStudentPortal()"
        >
          {{ isStudentAuthenticated ? 'Student Portal (Dashboard)' : 'Applicant Login' }}
        </a>
        <a href="/apply" class="btn-primary" @click.prevent="navigateTo('/apply')">
          <span>Apply for Admission</span>
          <span class="text-[14px] leading-none" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </header>
</template>
