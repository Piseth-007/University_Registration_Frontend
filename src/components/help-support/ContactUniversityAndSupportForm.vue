<script setup lang="ts">
import {
  helpContactOfficeCards,
  supportCategoryOptions,
} from '../../data/helpSupportPageData'
import type {
  SupportRequestFormState,
  SupportTicketCategory,
} from '../../types/admissions'

defineProps<{
  supportForm: SupportRequestFormState
  formErrors: Record<string, string>
  submittedTicketId: string | null
}>()

const emit = defineEmits<{
  (e: 'select-office-contact', category: SupportTicketCategory, officeName: string): void
  (e: 'attach-sample-file'): void
  (e: 'remove-attachment'): void
  (e: 'submit-request'): void
  (e: 'dismiss-submitted-banner'): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 6. Contact the University Section -->
    <section
      aria-labelledby="contact-university-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div class="pb-4 border-b border-[#EBECEF]">
        <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          OFFICIAL ASSISTANCE CHANNELS
        </span>
        <h2 id="contact-university-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          Contact the University
        </h2>
        <p class="text-[13px] text-[#555555] mt-1">
          Reach out to the appropriate university office below. Contact details shown are illustrative sample placeholders.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <article
          v-for="office in helpContactOfficeCards"
          :key="office.id"
          class="rounded-[4px] bg-[#FAFAFB] border border-[#E5E7EB] p-5 flex flex-col justify-between gap-4"
        >
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <!-- Lucide Building2 / Headphones / Wrench Icon -->
                <svg
                  v-if="office.id === 'office-admission'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                </svg>

                <svg
                  v-else-if="office.id === 'office-student-support'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>

                <svg
                  v-else
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="20" height="14" x="2" y="3" rx="2" />
                  <line x1="8" x2="16" y1="21" y2="21" />
                  <line x1="12" x2="12" y1="17" y2="21" />
                </svg>
              </div>

              <h3 class="text-[15.5px] font-bold text-[#252525]">
                {{ office.officeName }}
              </h3>
            </div>

            <p class="text-[12.5px] text-[#555555] leading-relaxed">
              {{ office.shortDescription }}
            </p>

            <div class="pt-2 border-t border-[#EBECEF] space-y-1.5 text-[12px]">
              <p class="text-[#252525]">
                <strong class="text-[#6B7280] uppercase text-[10px] tracking-wider block">
                  Email Placeholder
                </strong>
                <span class="font-semibold text-[#781D2B]">{{ office.emailPlaceholder }}</span>
              </p>

              <p class="text-[#252525]">
                <strong class="text-[#6B7280] uppercase text-[10px] tracking-wider block">
                  Phone Placeholder
                </strong>
                <span class="font-semibold text-[#252525]">{{ office.phonePlaceholder }}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            class="w-full py-2 px-3.5 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#781D2B] text-[#781D2B] hover:text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
            @click="emit('select-office-contact', office.defaultSupportCategory, office.officeName)"
          >
            Contact {{ office.officeName }}
          </button>
        </article>
      </div>
    </section>

    <!-- 7. Submit a Support Request Section -->
    <section
      id="submit-support-request-section"
      aria-labelledby="submit-support-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div class="pb-4 border-b border-[#EBECEF] flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            DIRECT HELPDESK TICKET
          </span>
          <h2 id="submit-support-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            Submit a Support Request
          </h2>
          <p class="text-[13px] text-[#555555] mt-0.5">
            Complete the form below to open an inquiry ticket with our Admissions or Technical Support team.
          </p>
        </div>

        <span class="text-[11.5px] text-[#6B7280]">
          Fields marked with <strong class="text-[#781D2B]">*</strong> are required
        </span>
      </div>

      <!-- 9. Request Submitted Successfully Confirmation State -->
      <div
        v-if="submittedTicketId"
        role="status"
        class="p-4 rounded-[4px] bg-[#F0FDF4] border border-[#BBF7D0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-9 h-9 rounded-full bg-[#166534] text-white flex items-center justify-center shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3 class="text-[14px] font-bold text-[#14532D]">
              Support Request Submitted Successfully — Ticket {{ submittedTicketId }}
            </h3>
            <p class="text-[12.5px] text-[#166534] mt-0.5">
              Your inquiry has been logged under "My Support Requests". Our support team will respond within 1–2 working days.
            </p>
          </div>
        </div>

        <button
          type="button"
          class="self-start sm:self-center text-[12px] font-semibold text-[#166534] hover:underline cursor-pointer shrink-0"
          @click="emit('dismiss-submitted-banner')"
        >
          Dismiss
        </button>
      </div>

      <!-- Support Request Form -->
      <form class="space-y-4" novalidate @submit.prevent="emit('submit-request')">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- 1. Full Name -->
          <div>
            <label
              for="support-fullname"
              class="block text-[12px] font-bold text-[#252525] mb-1.5"
            >
              Full Name <span class="text-[#781D2B]">*</span>
            </label>
            <input
              id="support-fullname"
              v-model="supportForm.fullName"
              type="text"
              placeholder="Sample Student"
              class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border"
              :class="
                formErrors.fullName
                  ? 'bg-[#FEF2F2] border-[#991B1B]'
                  : 'bg-white border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none'
              "
            />
            <p v-if="formErrors.fullName" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
              {{ formErrors.fullName }}
            </p>
          </div>

          <!-- 2. Student ID / Application Reference -->
          <div>
            <label
              for="support-student-ref"
              class="block text-[12px] font-bold text-[#252525] mb-1.5"
            >
              Student ID / Application Reference <span class="text-[#781D2B]">*</span>
            </label>
            <input
              id="support-student-ref"
              v-model="supportForm.studentIdOrReference"
              type="text"
              placeholder="STU-2026-00125 / APP-2027-0001"
              class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border"
              :class="
                formErrors.studentIdOrReference
                  ? 'bg-[#FEF2F2] border-[#991B1B]'
                  : 'bg-white border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none'
              "
            />
            <p
              v-if="formErrors.studentIdOrReference"
              class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
            >
              {{ formErrors.studentIdOrReference }}
            </p>
          </div>

          <!-- 3. Email Address -->
          <div>
            <label
              for="support-email"
              class="block text-[12px] font-bold text-[#252525] mb-1.5"
            >
              Email Address <span class="text-[#781D2B]">*</span>
            </label>
            <input
              id="support-email"
              v-model="supportForm.emailAddress"
              type="email"
              placeholder="sample.student@student.rupp.edu.kh"
              class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border"
              :class="
                formErrors.emailAddress
                  ? 'bg-[#FEF2F2] border-[#991B1B]'
                  : 'bg-white border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none'
              "
            />
            <p
              v-if="formErrors.emailAddress"
              class="text-[11.5px] font-semibold text-[#991B1B] mt-1"
            >
              {{ formErrors.emailAddress }}
            </p>
          </div>

          <!-- 4. Support Category Dropdown -->
          <div>
            <label
              for="support-category"
              class="block text-[12px] font-bold text-[#252525] mb-1.5"
            >
              Support Category <span class="text-[#781D2B]">*</span>
            </label>
            <select
              id="support-category"
              v-model="supportForm.category"
              class="w-full h-10 px-3 rounded-[4px] text-[13.5px] border"
              :class="
                formErrors.category
                  ? 'bg-[#FEF2F2] border-[#991B1B]'
                  : 'bg-white border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none'
              "
            >
              <option value="">Select category...</option>
              <option v-for="cat in supportCategoryOptions" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
            <p v-if="formErrors.category" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
              {{ formErrors.category }}
            </p>
          </div>
        </div>

        <!-- 5. Subject -->
        <div>
          <label
            for="support-subject"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Subject <span class="text-[#781D2B]">*</span>
          </label>
          <input
            id="support-subject"
            v-model="supportForm.subject"
            type="text"
            placeholder="Brief summary of your question or issue"
            class="w-full h-10 px-3.5 rounded-[4px] text-[13.5px] border"
            :class="
              formErrors.subject
                ? 'bg-[#FEF2F2] border-[#991B1B]'
                : 'bg-white border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none'
            "
          />
          <p v-if="formErrors.subject" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
            {{ formErrors.subject }}
          </p>
        </div>

        <!-- 6. Description -->
        <div>
          <label
            for="support-description"
            class="block text-[12px] font-bold text-[#252525] mb-1.5"
          >
            Description <span class="text-[#781D2B]">*</span>
          </label>
          <textarea
            id="support-description"
            v-model="supportForm.description"
            rows="4"
            placeholder="Please describe your question or technical issue in detail..."
            class="w-full p-3.5 rounded-[4px] text-[13.5px] border"
            :class="
              formErrors.description
                ? 'bg-[#FEF2F2] border-[#991B1B]'
                : 'bg-white border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none'
            "
          ></textarea>
          <p v-if="formErrors.description" class="text-[11.5px] font-semibold text-[#991B1B] mt-1">
            {{ formErrors.description }}
          </p>
        </div>

        <!-- 7. Optional File Attachment + 8. Submit Request Button -->
        <div
          class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div class="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              class="px-3.5 py-2 rounded-[4px] border border-dashed border-[#C4C7CE] bg-[#FAFAFB] hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[12.5px] font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
              @click="emit('attach-sample-file')"
            >
              <!-- Lucide Paperclip Icon -->
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
                <path
                  d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
                />
              </svg>
              <span>
                {{
                  supportForm.attachmentFileName
                    ? 'Replace Optional Attachment'
                    : 'Attach Optional Screenshot / Document'
                }}
              </span>
            </button>

            <div
              v-if="supportForm.attachmentFileName"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] bg-[#FDF7F8] border border-[#EBCFD4] text-[12px] text-[#781D2B] font-semibold"
            >
              <span>{{ supportForm.attachmentFileName }}</span>
              <button
                type="button"
                class="text-[#991B1B] hover:underline ml-1 cursor-pointer"
                @click="emit('remove-attachment')"
              >
                Remove
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="px-6 py-2.5 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
          >
            Submit Request
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
