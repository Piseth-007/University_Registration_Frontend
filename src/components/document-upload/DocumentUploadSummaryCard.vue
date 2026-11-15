<script setup lang="ts">
defineProps<{
  requiredTotal: number
  uploadedRequiredCount: number
  remainingRequiredCount: number
  overallProgressPercentage: number
  activePreset: 'empty' | 'mixed' | 'complete'
}>()

const emit = defineEmits<{
  (e: 'apply-preset', preset: 'empty' | 'mixed' | 'complete'): void
}>()
</script>

<template>
  <section
    aria-labelledby="document-upload-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-6"
  >
    <!-- 3. Page Heading & Policy Note -->
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-[#EBECEF]"
    >
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
          SUPPORTING ADMISSION DOSSIER
        </span>
        <h1
          id="document-upload-heading"
          class="text-[24px] sm:text-[27px] font-bold text-[#252525] mt-1 leading-tight"
        >
          Upload Required Documents
        </h1>
        <p class="text-[14px] text-[#555555] mt-1.5">
          Upload clear and readable documents for your university admission application.
        </p>
      </div>

      <!-- Interactive Sample State Switcher for UI Review -->
      <div class="flex flex-col sm:items-end gap-2">
        <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Sample State Presets
        </span>
        <div
          class="inline-flex flex-wrap bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
        >
          <button
            type="button"
            class="px-3 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activePreset === 'empty'
                ? 'bg-[#781D2B] text-white'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('apply-preset', 'empty')"
          >
            Empty (0 of 4)
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activePreset === 'mixed'
                ? 'bg-[#781D2B] text-white'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('apply-preset', 'mixed')"
          >
            Demo All States
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
            :class="
              activePreset === 'complete'
                ? 'bg-[#781D2B] text-white'
                : 'text-[#252525] hover:text-[#781D2B]'
            "
            @click="emit('apply-preset', 'complete')"
          >
            All Required Uploaded (4 of 4)
          </button>
        </div>
      </div>
    </div>

    <!-- 6. Upload Summary Card -->
    <div class="bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px] p-5">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div class="flex items-center gap-2">
          <!-- Lucide FileCheck2 Icon -->
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#781D2B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="m3 15 2 2 4-4" />
          </svg>
          <h2 class="text-[15.5px] font-bold text-[#252525]">
            Document Upload Summary
          </h2>
        </div>

        <span
          class="text-[12px] font-bold px-2.5 py-0.5 rounded-[3px]"
          :class="
            remainingRequiredCount === 0
              ? 'bg-[#DCFCE7] text-[#166534]'
              : 'bg-[#FDF2F4] text-[#781D2B] border border-[#F2D0D6]'
          "
        >
          {{
            remainingRequiredCount === 0
              ? 'All Required Documents Uploaded'
              : `${remainingRequiredCount} Required ${remainingRequiredCount === 1 ? 'Document' : 'Documents'} Remaining`
          }}
        </span>
      </div>

      <!-- Summary Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-4">
          <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Required Documents
          </span>
          <p class="text-[22px] font-bold text-[#252525] mt-1">
            {{ requiredTotal }}
          </p>
          <span class="block text-[11.5px] text-[#6B7280] mt-0.5">
            Mandatory for admission review
          </span>
        </div>

        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-4">
          <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Uploaded Documents
          </span>
          <p class="text-[22px] font-bold text-[#166534] mt-1">
            {{ uploadedRequiredCount }} of {{ requiredTotal }}
          </p>
          <span class="block text-[11.5px] text-[#6B7280] mt-0.5">
            Verified readable files
          </span>
        </div>

        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-4">
          <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Remaining Documents
          </span>
          <p
            class="text-[22px] font-bold mt-1"
            :class="remainingRequiredCount > 0 ? 'text-[#781D2B]' : 'text-[#252525]'"
          >
            {{ remainingRequiredCount }}
          </p>
          <span class="block text-[11.5px] text-[#6B7280] mt-0.5">
            Pending upload before submission
          </span>
        </div>

        <div class="bg-white border border-[#E5E7EB] rounded-[4px] p-4 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
                Overall Upload Progress
              </span>
              <span class="text-[14px] font-bold text-[#781D2B]">
                {{ overallProgressPercentage }}%
              </span>
            </div>
            <div
              class="w-full h-2.5 bg-[#F0F1F5] rounded-full overflow-hidden mt-3"
              role="progressbar"
              :aria-valuenow="overallProgressPercentage"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="h-full transition-all duration-300 rounded-full"
                :class="
                  overallProgressPercentage === 100 ? 'bg-[#166534]' : 'bg-[#781D2B]'
                "
                :style="{ width: `${overallProgressPercentage}%` }"
              ></div>
            </div>
          </div>
          <span class="block text-[11.5px] text-[#6B7280] mt-2">
            {{ overallProgressPercentage === 100 ? 'Ready for Step 5' : 'Upload all 4 required files' }}
          </span>
        </div>
      </div>

      <!-- Configurable Policy Disclaimer -->
      <p class="text-[12px] text-[#6B7280] mt-4 pt-3 border-t border-[#EBECEF]">
        <strong class="text-[#252525]">University Policy Note:</strong> Document requirements, accepted formats (PDF, JPG, PNG), and maximum file size limits are configurable university policies. Placeholders indicate unconfirmed institutional limits.
      </p>
    </div>
  </section>
</template>
