<script setup lang="ts">
import { navigateTo } from '../../router'
import type { PortalNotificationItem } from '../../types/admissions'

defineProps<{
  selectedItem: PortalNotificationItem | null
  pendingDeleteItem: PortalNotificationItem | null
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-read', id: string): void
  (e: 'request-delete', item: PortalNotificationItem): void
  (e: 'cancel-delete'): void
  (e: 'confirm-delete'): void
}>()
</script>

<template>
  <!-- 7. Notification Detail Panel -->
  <section
    aria-labelledby="notification-detail-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
  >
    <div class="pb-4 border-b border-[#EBECEF] flex items-center justify-between gap-2">
      <div>
        <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          MESSAGE INSPECTOR
        </span>
        <h2 id="notification-detail-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
          Notification Details
        </h2>
      </div>

      <span
        v-if="selectedItem"
        class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em]"
        :class="
          selectedItem.unread
            ? 'bg-[#781D2B] text-white'
            : 'bg-[#F3F4F6] text-[#6B7280]'
        "
      >
        {{ selectedItem.unread ? 'Unread' : 'Read' }}
      </span>
    </div>

    <!-- Selected Notification Detail View -->
    <div v-if="selectedItem" class="space-y-4">
      <!-- Category & Sender Header -->
      <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] space-y-2">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span
            class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] bg-[#FDF7F8] text-[#781D2B] border border-[#EBCFD4]"
          >
            {{ selectedItem.category }}
          </span>
          <span class="text-[11.5px] text-[#6B7280]">
            {{ selectedItem.dateTime }}
          </span>
        </div>

        <p class="text-[12px] text-[#555555]">
          From: <strong class="text-[#252525]">{{ selectedItem.senderOffice }}</strong>
        </p>
      </div>

      <!-- Full Notification Title -->
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
          Full Notification Title
        </span>
        <input
          v-if="inlineEditEnabled"
          v-model="selectedItem.title"
          type="text"
          class="w-full mt-1 px-2.5 py-1 text-[14.5px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
        />
        <h3 v-else class="text-[16px] font-bold text-[#252525] mt-1 leading-snug">
          {{ selectedItem.title }}
        </h3>
      </div>

      <!-- Complete Message -->
      <div class="p-4 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#6B7280] mb-1.5">
          Complete Message
        </span>
        <textarea
          v-if="inlineEditEnabled"
          v-model="selectedItem.fullMessage"
          rows="5"
          class="w-full px-2.5 py-1.5 text-[13px] text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
        ></textarea>
        <p v-else class="text-[13.5px] text-[#252525] leading-relaxed">
          {{ selectedItem.fullMessage }}
        </p>
      </div>

      <!-- Metadata: Publication Date & Related Application Reference -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
        <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Publication Date
          </span>
          <input
            v-if="inlineEditEnabled"
            v-model="selectedItem.publicationDate"
            type="text"
            class="w-full mt-1 px-2 py-0.5 text-[12.5px] font-semibold text-[#252525] bg-white border border-[#781D2B] rounded-[3px]"
          />
          <p v-else class="font-bold text-[#252525] mt-1">
            {{ selectedItem.publicationDate }}
          </p>
        </div>

        <div class="p-3 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#781D2B]">
            Application Reference
          </span>
          <p class="font-bold text-[#781D2B] mt-1">
            {{ selectedItem.relatedApplicationReference || 'General University Notice' }}
          </p>
        </div>
      </div>

      <!-- Relevant Action Button (e.g. View Application / View Examination Schedule) -->
      <div class="pt-2 space-y-2.5">
        <button
          type="button"
          class="w-full py-2.75 px-4 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          @click="navigateTo(selectedItem.actionRoute)"
        >
          <span>{{ selectedItem.actionLabel }}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="py-2 px-3 rounded-[4px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[12px] font-semibold transition-colors cursor-pointer"
            @click="emit('toggle-read', selectedItem.id)"
          >
            {{ selectedItem.unread ? 'Mark as Read' : 'Mark as Unread' }}
          </button>

          <button
            type="button"
            class="py-2 px-3 rounded-[4px] border border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] text-[12px] font-semibold transition-colors cursor-pointer"
            @click="emit('request-delete', selectedItem)"
          >
            Delete Message
          </button>
        </div>
      </div>
    </div>

    <!-- No Notification Selected Placeholder -->
    <div v-else class="py-10 px-4 text-center bg-[#FAFAFB] border border-[#EBECEF] rounded-[4px]">
      <p class="text-[13.5px] font-semibold text-[#252525]">
        Select any notification from the list to inspect its full details and quick actions.
      </p>
    </div>

    <!-- 6. Delete Notification Confirmation Dialog -->
    <div
      v-if="pendingDeleteItem"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-notification-modal-title"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="emit('cancel-delete')"
    >
      <div
        class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[460px] w-full overflow-hidden"
      >
        <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
          <h3 id="delete-notification-modal-title" class="text-[16px] font-bold">
            Delete Notification?
          </h3>
          <button
            type="button"
            class="p-1 text-white/85 hover:text-white cursor-pointer"
            aria-label="Close dialog"
            @click="emit('cancel-delete')"
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

        <div class="p-6 space-y-3 text-[13.5px] text-[#252525]">
          <p class="text-[#555555]">
            Are you sure you want to remove this notification from your Student Portal inbox?
          </p>
          <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
            <span class="block text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#781D2B]">
              {{ pendingDeleteItem.category }}
            </span>
            <p class="font-bold text-[#252525] mt-0.5">
              {{ pendingDeleteItem.title }}
            </p>
          </div>
        </div>

        <div class="px-6 py-3.5 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end gap-2.5">
          <button
            type="button"
            class="px-4 py-2 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F5F6F8] text-[#252525] text-[12.5px] font-semibold cursor-pointer"
            @click="emit('cancel-delete')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-[4px] bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-[12.5px] font-semibold cursor-pointer"
            @click="emit('confirm-delete')"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
