<script setup lang="ts">
import { footerGroups } from '../../data/admissionsData'
import { navigateTo } from '../../router'
</script>

<template>
  <!-- Pre-Footer CTA Strip -->
  <section class="bg-cta-strip border-t border-border-warm py-9">
    <div
      class="container-layout flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
    >
      <div>
        <h2 class="font-serif text-[22px] font-semibold text-ink mb-1">
          Your university journey starts here.
        </h2>
        <p class="text-[13px] text-ink-secondary">
          Applications for the 2026–2027 academic year close on 30 November 2026.
        </p>
      </div>
      <a href="/apply" class="btn-primary" @click.prevent="navigateTo('/apply')">
        <span>Start your application</span>
        <span class="text-[14px] leading-none" aria-hidden="true">→</span>
      </a>
    </div>
  </section>

  <!-- Main Footer -->
  <footer id="contact" class="bg-espresso text-white/78 pt-14 pb-8 text-[12.5px]">
    <div class="container-layout">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-9 pb-10 border-b border-white/10"
      >
        <!-- Brand Col -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <img
              src="/images/rupp-logo.png"
              alt="Royal University of Phnom Penh Logo"
              class="w-12 h-12 object-contain shrink-0"
            />
            <div>
              <div class="font-khmer text-[14px] text-white mb-0.5">
                សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ
              </div>
              <div class="font-serif text-[17px] font-semibold text-white">
                Royal University of Phnom Penh
              </div>
            </div>
          </div>
          <div class="text-[9.5px] tracking-[0.1em] text-white/55 mb-3.5 uppercase">
            OFFICE OF ADMISSIONS &amp; REGISTRATION
          </div>
          <p class="text-[12px] leading-relaxed text-white/62">
            Russian Federation Boulevard, Toul Kork, Phnom Penh, Cambodia.<br />
            Tel: +855 23 883 640 · admissions@rupp.edu.kh
          </p>
        </div>

        <!-- Dynamic Footer Columns -->
        <div v-for="(group, idx) in footerGroups" :key="idx">
          <h3 class="text-[12.5px] font-semibold text-white mb-3.5">
            {{ group.heading }}
          </h3>
          <ul class="flex flex-col gap-2.25 list-none">
            <li v-for="(link, lIdx) in group.links" :key="lIdx">
              <a
                :href="link.href"
                class="text-white/68 hover:text-white transition-colors"
                @click.prevent="navigateTo(link.href)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 text-[11.5px] text-white/50">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2"
        >
          <span>© 2026 Royal University of Phnom Penh. All rights reserved.</span>
          <div class="flex gap-5">
            <a href="#privacy" class="hover:text-white/85 transition-colors" @click.prevent>
              Privacy Policy
            </a>
            <a href="#terms" class="hover:text-white/85 transition-colors" @click.prevent>
              Terms of Use
            </a>
            <a
              href="#accessibility"
              class="hover:text-white/85 transition-colors"
              @click.prevent
            >
              Accessibility
            </a>
          </div>
        </div>
        <div class="text-[11px] text-white/40">
          Ministry of Education, Youth and Sport · Kingdom of Cambodia
        </div>
      </div>
    </div>
  </footer>
</template>
