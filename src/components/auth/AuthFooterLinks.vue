<script setup lang="ts">
import { navigateTo } from '../../router'
</script>

<template>
  <footer
    class="mt-7 pt-5 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-[#5C5C5C]"
  >
    <div class="flex items-center gap-1.5">
      <!-- Lucide ShieldCheck icon -->
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#781D2B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <span>University Registration System</span>
    </div>

    <nav aria-label="Authentication Footer Links" class="flex items-center gap-4">
      <a
        href="/contact"
        class="hover:text-[#781D2B] hover:underline transition-colors"
        @click.prevent="navigateTo('/contact')"
      >
        Contact
      </a>
      <span class="text-[#D1D5DB]" aria-hidden="true">•</span>
      <a
        href="/contact#faq"
        class="hover:text-[#781D2B] hover:underline transition-colors"
        @click.prevent="navigateTo('/contact')"
      >
        Help Center
      </a>
      <span class="text-[#D1D5DB]" aria-hidden="true">•</span>
      <a
        href="/about"
        class="hover:text-[#781D2B] hover:underline transition-colors"
        @click.prevent="navigateTo('/about')"
      >
        Privacy Policy
      </a>
    </nav>
  </footer>
</template>
