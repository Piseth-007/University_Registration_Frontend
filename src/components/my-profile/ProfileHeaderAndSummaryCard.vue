<script setup lang="ts">
import { profileStatePresets } from '../../data/myProfilePageData'
import type {
  ProfileInteractionState,
  StudentProfilePageData,
} from '../../types/admissions'

defineProps<{
  profileData: StudentProfilePageData
  activeState: ProfileInteractionState
  isEditingContact: boolean
  savedSuccessMessage: string | null
}>()

const emit = defineEmits<{
  (e: 'select-state', state: ProfileInteractionState): void
  (e: 'start-edit-profile'): void
  (e: 'dismiss-success'): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 3. Page Header + 9. Interaction State Switcher -->
    <section
      aria-labelledby="my-profile-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-6"
    >
      <div
        class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-6 border-b border-[#EBECEF]"
      >
        <div>
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
            STUDENT ACCOUNT &amp; SECURITY MANAGEMENT
          </span>
          <h1
            id="my-profile-heading"
            class="text-[24px] sm:text-[28px] font-bold text-[#252525] mt-1 leading-tight"
          >
            {{ profileData.pageTitle }}
          </h1>
          <p class="text-[14px] text-[#555555] mt-1.5">
            {{ profileData.pageSubtitle }}
          </p>
        </div>

        <!-- 9. Interaction States Preview Toolbar -->
        <div class="flex flex-col sm:items-end gap-2 shrink-0">
          <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Interaction State Preview
          </span>
          <div
            class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
            role="group"
            aria-label="Profile Interaction States"
          >
            <button
              v-for="preset in profileStatePresets"
              :key="preset.id"
              type="button"
              class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
              :class="
                activeState === preset.id
                  ? 'bg-[#781D2B] text-white shadow-2xs'
                  : 'text-[#252525] hover:text-[#781D2B]'
              "
              @click="emit('select-state', preset.id)"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- 9. Successful Update Notification Banner -->
      <div
        v-if="savedSuccessMessage"
        role="status"
        class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[4px] px-4 py-3.5 flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-3 text-[13.5px] text-[#166534]">
          <!-- Lucide CheckCircle2 Icon -->
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span class="font-semibold">{{ savedSuccessMessage }}</span>
        </div>
        <button
          type="button"
          class="text-[12px] font-semibold text-[#166534] hover:underline cursor-pointer"
          @click="emit('dismiss-success')"
        >
          Dismiss
        </button>
      </div>

      <!-- 4. Profile Summary Card -->
      <div
        class="bg-[#FAFAFB] border border-[#E2E4E9] border-l-4 border-l-[#781D2B] rounded-[4px] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
      >
        <!-- Left: Avatar + Student Name + Student ID + Metadata -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <!-- Student Profile Photo / Avatar Placeholder -->
          <div class="relative w-16 h-16 rounded-full bg-[#781D2B] text-white flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
            <span class="text-[20px] font-bold tracking-wide">
              {{ profileData.summary.avatarInitials }}
            </span>
            <span
              class="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#166534] border-2 border-white flex items-center justify-center"
              title="Active Account"
              aria-hidden="true"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </div>

          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2.5">
              <h2 class="text-[20px] font-bold text-[#252525] leading-snug">
                {{ profileData.summary.fullName }}
              </h2>
              <!-- Account Status: Active -->
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold uppercase tracking-[0.06em] bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#166534]"></span>
                <span>Account Status: {{ profileData.summary.accountStatus }}</span>
              </span>
            </div>

            <!-- Student ID, Email, Phone -->
            <div class="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-[#555555]">
              <span class="inline-flex items-center gap-1.5">
                <strong class="text-[#252525]">Student ID:</strong>
                <span class="font-bold text-[#781D2B]">{{ profileData.summary.studentId }}</span>
              </span>

              <span class="inline-flex items-center gap-1.5">
                <!-- Lucide Mail Icon -->
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
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{{ profileData.contactInfo.emailAddress }}</span>
              </span>

              <span class="inline-flex items-center gap-1.5">
                <!-- Lucide Phone Icon -->
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
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  />
                </svg>
                <span>{{ profileData.contactInfo.phoneNumber }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Edit Profile Button -->
        <div class="shrink-0">
          <button
            type="button"
            class="px-4 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            :class="
              isEditingContact
                ? 'bg-[#F5F6F8] text-[#252525] border border-[#D1D5DB]'
                : 'bg-[#781D2B] hover:bg-[#5E1520] text-white'
            "
            @click="emit('start-edit-profile')"
          >
            <!-- Lucide Pencil Icon -->
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
            <span>{{ isEditingContact ? 'Editing Profile Active' : 'Edit Profile' }}</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
