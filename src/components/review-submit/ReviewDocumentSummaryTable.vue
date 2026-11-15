<script setup lang="ts">
import { navigateTo } from '../../router'
import type {
  ReviewDocumentStatus,
  ReviewDocumentTableRow,
} from '../../types/admissions'

defineProps<{
  documents: ReviewDocumentTableRow[]
}>()

const emit = defineEmits<{
  (e: 'view-document', row: ReviewDocumentTableRow): void
  (e: 'change-row-status', rowId: string, status: ReviewDocumentStatus): void
}>()

const statusChoices: ReviewDocumentStatus[] = ['Uploaded', 'Missing', 'Rejected']
</script>

<template>
  <section
    aria-labelledby="review-documents-heading"
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
          <!-- Lucide FolderCheck Icon -->
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
              d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
            />
            <path d="m9 13 2 2 4-4" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            STEP 4 SUMMARY
          </span>
          <h2 id="review-documents-heading" class="text-[17px] font-bold text-[#252525]">
            Document Summary
          </h2>
        </div>
      </div>

      <button
        type="button"
        class="self-start sm:self-center px-3.5 py-1.75 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[12.5px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
        @click="navigateTo('/documents')"
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
        <span>Manage Documents</span>
      </button>
    </div>

    <!-- 8. Responsive Document Summary Table -->
    <div class="overflow-x-auto border border-[#E5E7EB] rounded-[4px]">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#F5F6F8] border-b border-[#E5E7EB] text-[11.5px] font-bold uppercase tracking-[0.07em] text-[#555555]">
            <th class="py-3 px-4">Document Name</th>
            <th class="py-3 px-4">Uploaded File</th>
            <th class="py-3 px-4">File Type</th>
            <th class="py-3 px-4">Upload Status</th>
            <th class="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#EBECEF] text-[13.5px]">
          <tr
            v-for="doc in documents"
            :key="doc.id"
            class="hover:bg-[#FAFAFB] transition-colors"
          >
            <!-- Document Name -->
            <td class="py-3.5 px-4">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-semibold text-[#252525]">{{ doc.documentName }}</span>
                <span
                  class="text-[10px] font-bold uppercase px-1.75 py-0.5 rounded-[3px]"
                  :class="
                    doc.required
                      ? 'bg-[#FDF2F4] text-[#781D2B] border border-[#F2D0D6]'
                      : 'bg-[#F5F6F8] text-[#6B7280] border border-[#E2E4E9]'
                  "
                >
                  {{ doc.required ? 'Required' : 'Optional' }}
                </span>
              </div>
              <span class="khmer-title block text-[11px] text-[#6B7280] mt-0.5">
                {{ doc.documentNameKhmer }}
              </span>
            </td>

            <!-- Uploaded File -->
            <td class="py-3.5 px-4">
              <span
                v-if="doc.status !== 'Missing'"
                class="font-medium text-[#252525]"
              >
                {{ doc.uploadedFile }}
                <span class="text-[11.5px] text-[#6B7280]">({{ doc.fileSize }})</span>
              </span>
              <span v-else class="text-[12.5px] italic text-[#9CA3AF]">
                No file attached
              </span>
            </td>

            <!-- File Type -->
            <td class="py-3.5 px-4">
              <span
                class="inline-block px-2 py-0.5 rounded-[3px] text-[11.5px] font-bold bg-[#F5F6F8] text-[#252525] border border-[#E2E4E9]"
              >
                {{ doc.status === 'Missing' ? '—' : doc.fileType }}
              </span>
            </td>

            <!-- Upload Status (Uploaded, Missing, Rejected + Quick Switcher) -->
            <td class="py-3.5 px-4">
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11.5px] font-bold uppercase tracking-[0.06em]"
                  :class="
                    doc.status === 'Uploaded'
                      ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
                      : doc.status === 'Rejected'
                        ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]'
                        : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                  "
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="
                      doc.status === 'Uploaded'
                        ? 'bg-[#166534]'
                        : doc.status === 'Rejected'
                          ? 'bg-[#B91C1C]'
                          : 'bg-[#D97706]'
                    "
                  ></span>
                  <span>{{ doc.status }}</span>
                </span>

                <div class="hidden xl:inline-flex items-center gap-1 text-[10px]">
                  <button
                    v-for="st in statusChoices"
                    :key="st"
                    type="button"
                    class="px-1.5 py-0.5 rounded-[2px] border cursor-pointer"
                    :class="
                      doc.status === st
                        ? 'bg-[#252525] text-white border-[#252525]'
                        : 'bg-white text-[#6B7280] border-[#D1D5DB] hover:border-[#252525]'
                    "
                    @click="emit('change-row-status', doc.id, st)"
                  >
                    {{ st }}
                  </button>
                </div>
              </div>
            </td>

            <!-- View Action -->
            <td class="py-3.5 px-4 text-right">
              <button
                v-if="doc.status !== 'Missing'"
                type="button"
                class="px-3 py-1.25 rounded-[3px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[12px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                @click="emit('view-document', doc)"
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
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>View</span>
              </button>
              <button
                v-else
                type="button"
                class="px-3 py-1.25 rounded-[3px] border border-[#781D2B] bg-[#FDF7F8] hover:bg-[#781D2B] hover:text-white text-[#781D2B] text-[12px] font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                @click="navigateTo('/documents')"
              >
                <span>Upload File</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
