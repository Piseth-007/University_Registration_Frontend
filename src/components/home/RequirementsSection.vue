<script setup lang="ts">
import type { RequirementItem } from '../../types/admissions'

defineProps<{
  requirements: RequirementItem[]
}>()
</script>

<template>
  <section id="requirements" class="py-16 bg-warm">
    <div
      class="container-layout grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start"
    >
      <div>
        <span class="eyebrow">PREPARE YOUR APPLICATION</span>
        <h2 class="section-title mb-4">Admission requirements</h2>
        <p class="text-[13.5px] text-ink-secondary mb-3.5 leading-[1.65]">
          Applicants for undergraduate programs must hold a recognized High School
          Diploma (BacII) or equivalent qualification approved by the Ministry of
          Education, Youth and Sport.
        </p>
        <p class="text-[13.5px] text-ink-secondary mb-3.5 leading-[1.65]">
          Please ensure all supporting documents are scanned clearly before starting
          your online application.
        </p>

        <a href="#requirements" class="btn-outline-white mt-2" @click.prevent>
          <span>Download checklist (PDF)</span>
          <span class="text-crimson" aria-hidden="true">↓</span>
        </a>
      </div>

      <div class="bg-white border border-border-warm px-7 py-6.5 rounded-[2px]">
        <div
          v-for="req in requirements"
          :key="req.id"
          class="flex items-start gap-3.5 py-3.5 first:pt-0 border-b border-border-warm"
        >
          <span class="w-5 h-5 text-crimson shrink-0 mt-0.5" aria-hidden="true">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <rect x="4" y="2.5" width="12" height="15" rx="1.5" />
              <path d="M7 7h6M7 10.5h6M7 14h4" />
            </svg>
          </span>
          <div>
            <h3 class="text-[13.5px] font-semibold text-ink mb-0.5">
              {{ req.title }}
            </h3>
            <p class="text-[12px] text-ink-secondary">{{ req.subtitle }}</p>
          </div>
        </div>
        <p class="text-[11px] text-ink-muted mt-3.5 italic">
          * Additional program-specific requirements may apply for honours and graduate tracks.
        </p>
      </div>
    </div>
  </section>
</template>
