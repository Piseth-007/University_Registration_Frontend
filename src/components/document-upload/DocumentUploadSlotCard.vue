<script setup lang="ts">
import { ref } from 'vue'
import type {
  DocumentUploadStatus,
  PortalDocumentSlotItem,
} from '../../types/admissions'

const props = defineProps<{
  slotItem: PortalDocumentSlotItem
}>()

const emit = defineEmits<{
  (e: 'upload-file', slotId: string, file?: File): void
  (e: 'remove-file', slotId: string): void
  (e: 'preview-file', slotItem: PortalDocumentSlotItem): void
  (e: 'set-status', slotId: string, status: DocumentUploadStatus): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDraggingOver = ref(false)

function triggerFileBrowser() {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

function handleFileInputChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    emit('upload-file', props.slotItem.id, file)
    input.value = ''
  }
}

function handleDrop(event: DragEvent) {
  isDraggingOver.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    emit('upload-file', props.slotItem.id, file)
  } else {
    emit('upload-file', props.slotItem.id)
  }
}

const allStatuses: DocumentUploadStatus[] = ['Missing', 'Uploading', 'Uploaded', 'Rejected']
</script>

<template>
  <article
    class="bg-white border rounded-[4px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] transition-colors flex flex-col justify-between gap-4"
    :class="
      slotItem.status === 'Uploaded'
        ? 'border-[#BBF7D0]'
        : slotItem.status === 'Rejected'
          ? 'border-[#FECACA] bg-[#FEF2F2]/20'
          : slotItem.status === 'Uploading'
            ? 'border-[#FDE68A]'
            : 'border-[#E2E4E9]'
    "
  >
    <div>
      <!-- Top Header: Document Title, Required/Optional Badge & Status Label -->
      <div class="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-[#EBECEF]">
        <div class="flex items-start gap-3 min-w-0">
          <!-- Icon Box -->
          <div
            class="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 border"
            :class="
              slotItem.status === 'Uploaded'
                ? 'bg-[#DCFCE7] border-[#BBF7D0] text-[#166534]'
                : slotItem.status === 'Rejected'
                  ? 'bg-[#FEF2F2] border-[#FECACA] text-[#B91C1C]'
                  : slotItem.status === 'Uploading'
                    ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'
                    : 'bg-[#FDF7F8] border-[#EBCFD4] text-[#781D2B]'
            "
            aria-hidden="true"
          >
            <!-- Uploaded Icon (CheckCircle2) -->
            <svg
              v-if="slotItem.status === 'Uploaded'"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>

            <!-- Rejected Icon (AlertTriangle) -->
            <svg
              v-else-if="slotItem.status === 'Rejected'"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>

            <!-- Uploading Icon (UploadCloud) -->
            <svg
              v-else-if="slotItem.status === 'Uploading'"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>

            <!-- Default Missing File Icon (FileText) -->
            <svg
              v-else
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M12 18v-6" />
              <path d="m9 15 3-3 3 3" />
            </svg>
          </div>

          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-[16px] font-bold text-[#252525] leading-snug">
                {{ slotItem.title }}
              </h3>
              <!-- Required or Optional Label -->
              <span
                class="text-[10.5px] font-bold uppercase tracking-[0.07em] px-2 py-0.5 rounded-[3px]"
                :class="
                  slotItem.required
                    ? 'bg-[#FDF2F4] text-[#781D2B] border border-[#F2D0D6]'
                    : 'bg-[#F5F6F8] text-[#6B7280] border border-[#E2E4E9]'
                "
              >
                {{ slotItem.required ? 'Required' : 'Optional' }}
              </span>
            </div>
            <span class="khmer-title block text-[11px] text-[#6B7280] mt-0.5">
              {{ slotItem.titleKhmer }}
            </span>
          </div>
        </div>

        <!-- 5. Document Status Badge -->
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11.5px] font-bold uppercase tracking-[0.06em] shrink-0"
          :class="
            slotItem.status === 'Uploaded'
              ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
              : slotItem.status === 'Uploading'
                ? 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]'
                : slotItem.status === 'Rejected'
                  ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]'
                  : 'bg-[#F3F4F6] text-[#555555] border border-[#E5E7EB]'
          "
        >
          <span
            class="w-2 h-2 rounded-full"
            :class="
              slotItem.status === 'Uploaded'
                ? 'bg-[#166534]'
                : slotItem.status === 'Uploading'
                  ? 'bg-[#D97706]'
                  : slotItem.status === 'Rejected'
                    ? 'bg-[#B91C1C]'
                    : 'bg-[#9CA3AF]'
            "
          ></span>
          <span>{{ slotItem.status }}</span>
        </span>
      </div>

      <!-- Short Explanation -->
      <p class="text-[13px] text-[#555555] mt-3.5 leading-relaxed">
        {{ slotItem.shortExplanation }}
      </p>

      <!-- Hidden File Input -->
      <input
        ref="fileInputRef"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        class="hidden"
        @change="handleFileInputChange"
      />

      <!-- Drag-and-Drop Upload Area -->
      <div
        class="mt-4 rounded-[4px] border-2 border-dashed p-5 text-center transition-colors"
        :class="
          isDraggingOver
            ? 'border-[#781D2B] bg-[#FDF7F8]'
            : slotItem.status === 'Rejected'
              ? 'border-[#FCA5A5] bg-white'
              : 'border-[#D1D5DB] bg-[#FAFAFB] hover:border-[#781D2B]'
        "
        @dragover.prevent="isDraggingOver = true"
        @dragleave.prevent="isDraggingOver = false"
        @drop.prevent="handleDrop"
      >
        <div class="flex flex-col items-center justify-center gap-2">
          <!-- Lucide Upload Icon -->
          <div
            class="w-9 h-9 rounded-full bg-white border border-[#E2E4E9] text-[#781D2B] flex items-center justify-center shadow-2xs"
            aria-hidden="true"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </div>

          <div>
            <p class="text-[13px] font-semibold text-[#252525]">
              Drag and drop your file here, or
            </p>
            <p class="text-[11.5px] text-[#6B7280] mt-0.5">
              Accepted formats: <strong class="text-[#252525]">{{ slotItem.acceptedFormats }}</strong>
              • {{ slotItem.maxFileSizePlaceholder }}
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2 mt-1.5">
            <!-- Browse Files Button (Primary Burgundy) -->
            <button
              type="button"
              class="px-4 py-1.75 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
              @click="triggerFileBrowser"
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
                <path
                  d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                />
              </svg>
              <span>Browse Files</span>
            </button>

            <!-- Quick Sample Upload Button for Demo Convenience -->
            <button
              v-if="slotItem.status !== 'Uploaded'"
              type="button"
              class="px-3 py-1.75 rounded-[4px] bg-white border border-[#D1D5DB] hover:border-[#781D2B] text-[#252525] hover:text-[#781D2B] text-[12px] font-semibold transition-colors cursor-pointer"
              @click="emit('upload-file', slotItem.id)"
            >
              Use Sample File
            </button>
          </div>
        </div>
      </div>

      <!-- Rejected Reason Alert Banner -->
      <div
        v-if="slotItem.status === 'Rejected' && slotItem.rejectionReason"
        role="alert"
        class="mt-3.5 p-3 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] text-[12px] flex items-start gap-2"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <span class="font-bold">Document Rejected:</span>
          <span class="ml-1">{{ slotItem.rejectionReason }}</span>
        </div>
      </div>

      <!-- Upload Progress Bar & Uploaded File Metadata Row -->
      <div
        class="mt-4 p-3.5 rounded-[4px] border"
        :class="
          slotItem.status === 'Uploaded'
            ? 'bg-[#F0FDF4]/60 border-[#BBF7D0]'
            : slotItem.status === 'Uploading'
              ? 'bg-[#FFFBEB]/70 border-[#FDE68A]'
              : slotItem.status === 'Rejected'
                ? 'bg-[#FEF2F2]/50 border-[#FECACA]'
                : 'bg-[#F5F6F8] border-[#E5E7EB]'
        "
      >
        <!-- File Name, Size & Progress Percentage -->
        <div class="flex flex-wrap items-center justify-between gap-2 text-[12.5px]">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Lucide Paperclip / File Icon -->
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0 text-[#6B7280]"
              aria-hidden="true"
            >
              <path
                d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
              />
            </svg>
            <span
              class="font-semibold truncate"
              :class="slotItem.uploadedFileName ? 'text-[#252525]' : 'text-[#6B7280]'"
            >
              {{ slotItem.uploadedFileName || 'No file uploaded yet' }}
            </span>
            <span
              v-if="slotItem.uploadedFileSize"
              class="text-[11.5px] text-[#6B7280] shrink-0"
            >
              ({{ slotItem.uploadedFileSize }})
            </span>
          </div>

          <span
            class="text-[11.5px] font-bold"
            :class="
              slotItem.status === 'Uploaded'
                ? 'text-[#166534]'
                : slotItem.status === 'Uploading'
                  ? 'text-[#B45309]'
                  : slotItem.status === 'Rejected'
                    ? 'text-[#B91C1C]'
                    : 'text-[#6B7280]'
            "
          >
            {{ slotItem.uploadProgress }}%
          </span>
        </div>

        <!-- Upload Progress Bar -->
        <div
          class="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E5E7EB] mt-2"
          role="progressbar"
          :aria-valuenow="slotItem.uploadProgress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="h-full transition-all duration-300 rounded-full"
            :class="
              slotItem.status === 'Uploaded'
                ? 'bg-[#166534]'
                : slotItem.status === 'Uploading'
                  ? 'bg-[#D97706]'
                  : slotItem.status === 'Rejected'
                    ? 'bg-[#B91C1C]'
                    : 'bg-[#9CA3AF]'
            "
            :style="{ width: `${slotItem.uploadProgress}%` }"
          ></div>
        </div>

        <!-- Preview & Remove Actions -->
        <div class="mt-3 pt-2.5 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button
              type="button"
              :disabled="!slotItem.uploadedFileName"
              class="px-3 py-1 rounded-[3px] text-[12px] font-semibold border transition-colors inline-flex items-center gap-1.5"
              :class="
                slotItem.uploadedFileName
                  ? 'bg-white border-[#D1D5DB] text-[#252525] hover:border-[#781D2B] hover:text-[#781D2B] cursor-pointer'
                  : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              "
              @click="emit('preview-file', slotItem)"
            >
              <!-- Lucide Eye Icon -->
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
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Preview</span>
            </button>

            <button
              type="button"
              :disabled="!slotItem.uploadedFileName"
              class="px-3 py-1 rounded-[3px] text-[12px] font-semibold border transition-colors inline-flex items-center gap-1.5"
              :class="
                slotItem.uploadedFileName
                  ? 'bg-white border-[#FECACA] text-[#B91C1C] hover:bg-[#FEF2F2] cursor-pointer'
                  : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              "
              @click="emit('remove-file', slotItem.id)"
            >
              <!-- Lucide Trash2 Icon -->
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              <span>Remove</span>
            </button>
          </div>

          <!-- Per-Card Status Switcher for Testing States -->
          <div class="inline-flex items-center gap-1 text-[10.5px]">
            <span class="text-[#6B7280] mr-1 hidden sm:inline">State:</span>
            <button
              v-for="st in allStatuses"
              :key="st"
              type="button"
              class="px-1.75 py-0.5 rounded-[2px] border cursor-pointer transition-colors"
              :class="
                slotItem.status === st
                  ? 'bg-[#252525] text-white border-[#252525] font-semibold'
                  : 'bg-white text-[#6B7280] border-[#D1D5DB] hover:border-[#252525]'
              "
              @click="emit('set-status', slotItem.id, st)"
            >
              {{ st }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
