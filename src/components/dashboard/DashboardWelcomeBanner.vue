<script setup lang="ts">
import { ref } from 'vue'
import type { DashboardNavId } from '../../types/admissions'

defineProps<{
  studentName: string
  applicantId: string
  avatarInitials: string
  academicYear: string
  admissionPeriod: string
}>()

const emit = defineEmits<{
  (e: 'update:studentName', value: string): void
  (e: 'select-nav', navId: DashboardNavId): void
}>()

const isEditingName = ref(false)
</script>

<template>
  <section
    aria-labelledby="dashboard-welcome-heading"
    class="bg-white border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
  >
    <!-- Top Row: Welcome Message + Academic Session Badges -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-5 border-b border-[#EBECEF]">
      <!-- Left: Heading & Subtitle -->
      <div>
        <div class="flex flex-wrap items-center gap-2.5 mb-2">
          <span
            class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#781D2B]"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <span>STUDENT PORTAL OVERVIEW</span>
          </span>

          <button
            type="button"
            class="text-[11px] font-medium text-[#6B7280] hover:text-[#781D2B] underline cursor-pointer"
            @click="isEditingName = !isEditingName"
          >
            {{ isEditingName ? 'Done editing name' : 'Edit student name' }}
          </button>
        </div>

        <h1
          id="dashboard-welcome-heading"
          class="text-[24px] sm:text-[28px] font-bold text-[#252525] leading-tight flex flex-wrap items-center gap-2"
        >
          <span>Welcome back,</span>
          <input
            v-if="isEditingName"
            :value="studentName"
            type="text"
            aria-label="Editable Student Name"
            class="px-2.5 py-0.5 text-[22px] sm:text-[26px] font-bold text-[#781D2B] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px] focus:outline-none max-w-[280px]"
            @input="emit('update:studentName', ($event.target as HTMLInputElement).value)"
          />
          <span v-else class="text-[#781D2B]">{{ studentName }}.</span>
        </h1>

        <p class="text-[14px] text-[#555555] mt-1.5 leading-relaxed">
          View your student profile snapshot, admission status summary, upcoming examination schedule, and official university announcements.
        </p>
      </div>

      <!-- Right: Academic Year & Admission Period Metadata Badges -->
      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <div
          class="bg-[#F5F6F8] border border-[#E2E4E9] rounded-[4px] px-4 py-2.5 flex items-center gap-3"
        >
          <div
            class="w-8 h-8 rounded-[3px] bg-white border border-[#E2E4E9] flex items-center justify-center text-[#781D2B]"
            aria-hidden="true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </div>
          <div>
            <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
              Academic Year
            </span>
            <span class="block text-[13.5px] font-bold text-[#252525]">
              {{ academicYear }}
            </span>
          </div>
        </div>

        <div
          class="bg-[#FDF7F8] border border-[#EBCFD4] rounded-[4px] px-4 py-2.5 flex items-center gap-3"
        >
          <div
            class="w-8 h-8 rounded-[3px] bg-[#781D2B] flex items-center justify-center text-white"
            aria-hidden="true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <div>
            <span class="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#781D2B]">
              Admission Period
            </span>
            <span class="block text-[13.5px] font-bold text-[#252525]">
              {{ admissionPeriod }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Compact Student Profile Overview Bar -->
    <div
      class="bg-[#FAFAFB] border border-[#E5E7EB] rounded-[4px] p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3.5">
        <div
          class="w-11 h-11 rounded-[4px] bg-[#781D2B] text-white text-[14px] font-bold flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          {{ avatarInitials }}
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[14.5px] font-bold text-[#252525]">Sokha Chan</span>
            <span class="text-[13px] font-medium text-[#555555]" lang="km">(សុខា ចាន់)</span>
            <span
              class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] bg-[#DCFCE7] text-[#166534]"
            >
              Verified Student Account
            </span>
          </div>
          <p class="text-[12px] text-[#6B7280] mt-0.5">
            Applicant ID: <strong class="text-[#781D2B]">{{ applicantId }}</strong> • Email: sokha.chan@student.rupp.edu.kh • Phone: +855 12 345 678
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2.5 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-[4px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          @click="emit('select-nav', 'my-profile')"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>My Profile</span>
        </button>

        <button
          type="button"
          class="px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          @click="emit('select-nav', 'my-application')"
        >
          <span>Open My Application</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
