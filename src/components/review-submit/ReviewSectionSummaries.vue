<script setup lang="ts">
import { navigateTo } from '../../router'
import type { ReviewApplicationSummaryData } from '../../types/admissions'

defineProps<{
  summaryData: ReviewApplicationSummaryData
  inlineEditEnabled: boolean
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 5. Personal Information Summary Card -->
    <section
      aria-labelledby="review-personal-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-5 border-b border-[#EBECEF]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <!-- Lucide User Icon -->
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              STEP 1 SUMMARY
            </span>
            <h2 id="review-personal-heading" class="text-[17px] font-bold text-[#252525]">
              Personal Information Summary
            </h2>
          </div>
        </div>

        <!-- Edit Information Button -->
        <button
          type="button"
          class="self-start sm:self-center px-3.5 py-1.75 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          @click="navigateTo('/personal-information')"
        >
          <!-- Lucide Pencil Icon -->
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
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
          <span>Edit Information</span>
        </button>
      </div>

      <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Full Name (Khmer)
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.fullNameKhmer"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.fullNameKhmer }}</span>
          </dd>
        </div>

        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Full Name (English)
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.fullNameEnglish"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.fullNameEnglish }}</span>
          </dd>
        </div>

        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Gender
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.gender"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.gender }}</span>
          </dd>
        </div>

        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Date of Birth
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.dateOfBirth"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.dateOfBirth }}</span>
          </dd>
        </div>

        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Nationality
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.nationality"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.nationality }}</span>
          </dd>
        </div>

        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Phone Number
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.phoneNumber"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.phoneNumber }}</span>
          </dd>
        </div>

        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Email Address
          </dt>
          <dd class="mt-1 text-[13.5px] font-semibold text-[#252525] truncate">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.emailAddress"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.emailAddress }}</span>
          </dd>
        </div>

        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Current Address
          </dt>
          <dd class="mt-1 text-[13px] font-semibold text-[#252525]">
            <input
              v-if="inlineEditEnabled"
              v-model="summaryData.personalInfo.currentAddress"
              type="text"
              class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
            />
            <span v-else>{{ summaryData.personalInfo.currentAddress }}</span>
          </dd>
        </div>
      </dl>
    </section>

    <!-- 6 & 7. Two-Column Grid for Academic Background & Faculty and Major Summary -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 6. Academic Background Summary Card -->
      <section
        aria-labelledby="review-academic-heading"
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex flex-col justify-between"
      >
        <div>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-5 border-b border-[#EBECEF]"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <!-- Lucide GraduationCap Icon -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
                  />
                  <path d="M22 10v6" />
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                </svg>
              </div>
              <div>
                <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
                  STEP 2 SUMMARY
                </span>
                <h2 id="review-academic-heading" class="text-[17px] font-bold text-[#252525]">
                  Academic Background Summary
                </h2>
              </div>
            </div>

            <button
              type="button"
              class="self-start sm:self-center px-3.5 py-1.75 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              @click="navigateTo('/academic-background')"
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              <span>Edit Information</span>
            </button>
          </div>

          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="sm:col-span-2 p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                High School Name
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <input
                  v-if="inlineEditEnabled"
                  v-model="summaryData.academicBackground.highSchoolName"
                  type="text"
                  class="w-full px-2 py-1 bg-white border border-[#781D2B] rounded-[3px] text-[13px]"
                />
                <span v-else>{{ summaryData.academicBackground.highSchoolName }}</span>
              </dd>
            </div>

            <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                School Province
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <span>{{ summaryData.academicBackground.schoolProvince }}</span>
              </dd>
            </div>

            <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Graduation Year
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <span>{{ summaryData.academicBackground.graduationYear }}</span>
              </dd>
            </div>

            <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Examination Year
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <span>{{ summaryData.academicBackground.examinationYear }}</span>
              </dd>
            </div>

            <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Examination Result
              </dt>
              <dd class="mt-1 text-[13px] font-bold text-[#166534]">
                <span>{{ summaryData.academicBackground.examinationResult }}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- 7. Faculty and Major Summary Card -->
      <section
        aria-labelledby="review-faculty-heading"
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex flex-col justify-between"
      >
        <div>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-5 border-b border-[#EBECEF]"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <!-- Lucide BookOpen Icon -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div>
                <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
                  STEP 3 SUMMARY
                </span>
                <h2 id="review-faculty-heading" class="text-[17px] font-bold text-[#252525]">
                  Faculty &amp; Major Summary
                </h2>
              </div>
            </div>

            <button
              type="button"
              class="self-start sm:self-center px-3.5 py-1.75 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              @click="navigateTo('/faculty-major')"
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              <span>Edit Selection</span>
            </button>
          </div>

          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Selected Faculty
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <span>{{ summaryData.facultyMajor.selectedFaculty }}</span>
              </dd>
            </div>

            <div class="p-3.5 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#781D2B]">
                Selected Major
              </dt>
              <dd class="mt-1 text-[13.5px] font-bold text-[#781D2B]">
                <span>{{ summaryData.facultyMajor.selectedMajor }}</span>
              </dd>
            </div>

            <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Degree Level
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <span>{{ summaryData.facultyMajor.degreeLevel }}</span>
              </dd>
            </div>

            <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Study Duration
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <span>{{ summaryData.facultyMajor.studyDuration }}</span>
              </dd>
            </div>

            <div class="sm:col-span-2 p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
                Study Mode
              </dt>
              <dd class="mt-1 text-[13.5px] font-semibold text-[#252525]">
                <span>{{ summaryData.facultyMajor.studyMode }}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  </div>
</template>
