<script setup lang="ts">
defineProps<{
  pageTitle: string
  pageSubtitle: string
  totalCount: number
  unreadCount: number
  readCount: number
  isEmptyDemo: boolean
  inlineEditEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'update:pageTitle', value: string): void
  (e: 'update:pageSubtitle', value: string): void
  (e: 'mark-all-read'): void
  (e: 'toggle-empty-demo', empty: boolean): void
  (e: 'restore-samples'): void
  (e: 'toggle-inline-edit'): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- 2. Page Header Card -->
    <section
      aria-labelledby="portal-notifications-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
    >
      <div
        class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4"
      >
        <div class="min-w-0 flex-1">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#781D2B]">
            STUDENT PORTAL COMMUNICATIONS CENTER
          </span>

          <input
            v-if="inlineEditEnabled"
            :value="pageTitle"
            type="text"
            aria-label="Page Title"
            class="w-full max-w-[420px] mt-1 px-2.5 py-1 text-[23px] sm:text-[26px] font-bold text-[#252525] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            @input="emit('update:pageTitle', ($event.target as HTMLInputElement).value)"
          />
          <h1
            v-else
            id="portal-notifications-heading"
            class="text-[24px] sm:text-[28px] font-bold text-[#252525] mt-1 leading-tight"
          >
            {{ pageTitle }}
          </h1>

          <input
            v-if="inlineEditEnabled"
            :value="pageSubtitle"
            type="text"
            aria-label="Page Subtitle"
            class="w-full max-w-[640px] mt-1.5 px-2.5 py-1 text-[13.5px] text-[#555555] bg-[#F5F6F8] border border-[#781D2B] rounded-[3px]"
            @input="emit('update:pageSubtitle', ($event.target as HTMLInputElement).value)"
          />
          <p v-else class="text-[14px] text-[#555555] mt-1.5">
            {{ pageSubtitle }}
          </p>
        </div>

        <!-- State Switcher & Global Actions -->
        <div class="flex flex-col sm:items-end gap-2.5 shrink-0">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
              Page State Preview
            </span>
            <button
              type="button"
              class="text-[11.5px] font-semibold text-[#781D2B] underline cursor-pointer"
              @click="emit('toggle-inline-edit')"
            >
              {{ inlineEditEnabled ? 'Lock Inline Editing' : 'Edit Sample Text Inline' }}
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <!-- State Toggle: Active List vs Empty State -->
            <div
              class="inline-flex bg-[#F5F6F8] p-1 rounded-[4px] border border-[#E2E4E9] gap-1"
              role="group"
              aria-label="Notification Page State"
            >
              <button
                type="button"
                class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
                :class="
                  !isEmptyDemo
                    ? 'bg-[#781D2B] text-white shadow-2xs'
                    : 'text-[#252525] hover:text-[#781D2B]'
                "
                @click="emit('toggle-empty-demo', false)"
              >
                1. Active Notifications
              </button>
              <button
                type="button"
                class="px-2.5 py-1.5 text-[11.5px] font-semibold rounded-[3px] transition-colors cursor-pointer"
                :class="
                  isEmptyDemo
                    ? 'bg-[#781D2B] text-white shadow-2xs'
                    : 'text-[#252525] hover:text-[#781D2B]'
                "
                @click="emit('toggle-empty-demo', true)"
              >
                2. Empty State
              </button>
            </div>

            <!-- Mark All as Read Button -->
            <button
              type="button"
              :disabled="unreadCount === 0 || isEmptyDemo"
              class="px-3.5 py-2 rounded-[4px] text-[12.5px] font-semibold border transition-colors inline-flex items-center gap-1.5"
              :class="
                unreadCount === 0 || isEmptyDemo
                  ? 'bg-[#F5F6F8] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-[#781D2B] hover:bg-[#5E1520] border-[#781D2B] text-white cursor-pointer shadow-xs'
              "
              @click="emit('mark-all-read')"
            >
              <!-- Lucide CheckCheck Icon -->
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
                <path d="M18 6 7 17l-5-5" />
                <path d="m22 10-7.5 7.5L13 16" />
              </svg>
              <span>Mark All as Read</span>
            </button>

            <button
              type="button"
              class="px-3 py-2 rounded-[4px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[12px] font-semibold transition-colors cursor-pointer"
              @click="emit('restore-samples')"
            >
              Reset Sample Data
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Notification Summary Cards (3 Cards) -->
    <section
      aria-label="Notification Summary Statistics"
      class="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      <!-- Card 1: Total Notifications -->
      <article
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex items-start justify-between gap-4"
      >
        <div>
          <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
            Total Notifications
          </span>
          <p class="text-[26px] font-bold text-[#252525] mt-1 leading-none">
            {{ isEmptyDemo ? 0 : totalCount }}
          </p>
          <p class="text-[12px] text-[#6B7280] mt-2">
            All admission, document, exam &amp; university updates
          </p>
        </div>

        <div
          class="w-10 h-10 rounded-[4px] bg-[#F5F6F8] border border-[#E2E4E9] text-[#252525] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide Bell Icon -->
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </div>
      </article>

      <!-- Card 2: Unread Notifications -->
      <article
        class="bg-white border border-[#EBCFD4] border-l-4 border-l-[#781D2B] rounded-[4px] p-5 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex items-start justify-between gap-4"
      >
        <div>
          <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#781D2B]">
            Unread Notifications
          </span>
          <p class="text-[26px] font-bold text-[#781D2B] mt-1 leading-none">
            {{ isEmptyDemo ? 0 : unreadCount }}
          </p>
          <p class="text-[12px] text-[#6B7280] mt-2">
            Requires your review or action
          </p>
        </div>

        <div
          class="w-10 h-10 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide MailWarning / BellDot Icon -->
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9a6 6 0 0 1 7-5.9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            <circle cx="18" cy="8" r="3" />
          </svg>
        </div>
      </article>

      <!-- Card 3: Read Notifications -->
      <article
        class="bg-white border border-[#E2E4E9] rounded-[4px] p-5 shadow-[0_1px_3px_rgba(37,37,37,0.03)] flex items-start justify-between gap-4"
      >
        <div>
          <span class="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#166534]">
            Read Notifications
          </span>
          <p class="text-[26px] font-bold text-[#166534] mt-1 leading-none">
            {{ isEmptyDemo ? 0 : readCount }}
          </p>
          <p class="text-[12px] text-[#6B7280] mt-2">
            Acknowledged &amp; archived messages
          </p>
        </div>

        <div
          class="w-10 h-10 rounded-[4px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <!-- Lucide CheckCircle2 Icon -->
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
      </article>
    </section>
  </div>
</template>
