<script setup lang="ts">
import { navigateTo } from '../../router'
</script>

<template>
  <footer
    aria-label="Student Portal Footer"
    class="bg-white border-t border-[#E2E4E9] px-4 sm:px-7 py-5 mt-auto"
  >
    <div
      class="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-[#555555]"
    >
      <div class="flex items-center gap-2">
        <!-- Lucide ShieldCheck Icon -->
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#781D2B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span class="font-semibold text-[#252525]">University Registration System</span>
        <span class="text-[#C4C7CE]" aria-hidden="true">|</span>
        <span>Student Admission Portal</span>
      </div>

      <nav aria-label="Dashboard Footer Navigation" class="flex flex-wrap items-center gap-5">
        <a
          href="/help-support"
          class="hover:text-[#781D2B] hover:underline transition-colors"
          @click.prevent="navigateTo('/help-support')"
        >
          Help Center
        </a>
        <a
          href="/contact"
          class="hover:text-[#781D2B] hover:underline transition-colors"
          @click.prevent="navigateTo('/contact')"
        >
          Contact Us
        </a>
        <a
          href="/about"
          class="hover:text-[#781D2B] hover:underline transition-colors"
          @click.prevent="navigateTo('/about')"
        >
          Privacy Policy
        </a>
      </nav>
    </div>
  </footer>
</template>
