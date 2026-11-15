<script setup lang="ts">
import { ref } from 'vue'
import { applicationSteps, faculties } from '../data/admissionsData'
import { navigateTo } from '../router'

const currentStep = ref(1)
const fullName = ref('')
const email = ref('')
const phone = ref('')
const selectedFaculty = ref(faculties[0]?.id ?? '')
</script>

<template>
  <main class="py-16 bg-warm">
    <div class="container-layout">
      <div class="mb-4.5">
        <a
          href="/"
          class="text-[12.5px] font-semibold text-crimson hover:underline"
          @click.prevent="navigateTo('/')"
        >
          ← Back to Admissions Home
        </a>
      </div>

      <span class="eyebrow">2026–2027 ACADEMIC INTAKE</span>
      <h1 class="section-title">Online Admission Application</h1>
      <p class="text-[13.5px] text-ink-secondary mt-2 mb-7">
        Complete the steps below to submit your undergraduate or postgraduate application to RUPP.
      </p>

      <div class="bg-white border border-border-warm p-8 rounded-[2px]">
        <div
          class="flex flex-wrap gap-2 mb-7 pb-4.5 border-b border-border-warm"
        >
          <button
            v-for="(step, idx) in applicationSteps"
            :key="step.num"
            type="button"
            class="px-3 py-1.75 text-[12px] rounded-[2px] border cursor-pointer transition-colors"
            :class="
              currentStep === idx + 1
                ? 'bg-crimson border-crimson text-white font-semibold'
                : 'bg-warm border-border-warm text-ink-secondary font-medium hover:border-crimson'
            "
            @click="currentStep = idx + 1"
          >
            <span>{{ step.num }}. {{ step.title }}</span>
          </button>
        </div>

        <form class="flex flex-col gap-4.5 max-w-[640px]" @submit.prevent>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-ink">
              Full Name (as on National ID / BacII)
            </label>
            <input
              v-model="fullName"
              type="text"
              class="px-3 py-2.5 border border-border-warm rounded-[2px] font-sans text-[13.5px]"
              placeholder="e.g. Sokha Chan"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[12.5px] font-semibold text-ink">Email Address</label>
              <input
                v-model="email"
                type="email"
                class="px-3 py-2.5 border border-border-warm rounded-[2px] font-sans text-[13.5px]"
                placeholder="applicant@example.com"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[12.5px] font-semibold text-ink">Phone Number</label>
              <input
                v-model="phone"
                type="tel"
                class="px-3 py-2.5 border border-border-warm rounded-[2px] font-sans text-[13.5px]"
                placeholder="+855 12 345 678"
              />
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-ink">
              Preferred Academic Faculty
            </label>
            <select
              v-model="selectedFaculty"
              class="px-3 py-2.5 border border-border-warm rounded-[2px] font-sans text-[13.5px] bg-white"
            >
              <option v-for="fac in faculties" :key="fac.id" :value="fac.id">
                {{ fac.title }} ({{ fac.badge }})
              </option>
            </select>
          </div>

          <div class="mt-2">
            <button type="submit" class="btn-primary">
              <span>Save &amp; Continue</span>
              <span class="text-[14px] leading-none" aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
