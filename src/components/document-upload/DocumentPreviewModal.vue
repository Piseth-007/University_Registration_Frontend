<script setup lang="ts">
import type { PortalDocumentSlotItem } from '../../types/admissions'

defineProps<{
  item: PortalDocumentSlotItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    v-if="item"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`preview-modal-title-${item.id}`"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    @click.self="emit('close')"
  >
    <div
      class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[540px] w-full overflow-hidden"
    >
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between gap-3">
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-white/80">
            DOCUMENT PREVIEW
          </span>
          <h3 :id="`preview-modal-title-${item.id}`" class="text-[16px] font-bold leading-snug">
            {{ item.title }}
          </h3>
        </div>
        <button
          type="button"
          class="p-1.5 rounded-[3px] text-white/85 hover:text-white hover:bg-white/15 cursor-pointer"
          aria-label="Close document preview"
          @click="emit('close')"
        >
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6 space-y-4">
        <div
          class="bg-[#F5F6F8] border border-[#E2E4E9] rounded-[4px] p-8 flex flex-col items-center justify-center text-center"
        >
          <div
            class="w-14 h-14 rounded-full bg-white border border-[#E2E4E9] text-[#781D2B] flex items-center justify-center mb-3 shadow-xs"
            aria-hidden="true"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </div>
          <p class="text-[14px] font-bold text-[#252525]">
            {{ item.uploadedFileName }}
          </p>
          <p class="text-[12px] text-[#6B7280] mt-1">
            File Size: {{ item.uploadedFileSize }} • Status: {{ item.status }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3 text-[12.5px]">
          <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
            <span class="block text-[10.5px] font-bold uppercase text-[#6B7280]">
              Requirement Type
            </span>
            <span class="font-semibold text-[#252525] mt-0.5 block">
              {{ item.required ? 'Required Document' : 'Optional Document' }}
            </span>
          </div>
          <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
            <span class="block text-[10.5px] font-bold uppercase text-[#6B7280]">
              Accepted Formats
            </span>
            <span class="font-semibold text-[#252525] mt-0.5 block">
              {{ item.acceptedFormats }}
            </span>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3.5 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end">
        <button
          type="button"
          class="px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold cursor-pointer"
          @click="emit('close')"
        >
          Close Preview
        </button>
      </div>
    </div>
  </div>
</template>
