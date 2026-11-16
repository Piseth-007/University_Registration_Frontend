<script setup lang="ts">
import { ref } from 'vue'
import type {
  HelpSupportInteractionState,
  SupportTicketItem,
  SupportTicketStatus,
} from '../../types/admissions'

defineProps<{
  tickets: SupportTicketItem[]
  selectedTicket: SupportTicketItem | null
  activeState: HelpSupportInteractionState
  isEmptyTicketsDemo: boolean
}>()

const emit = defineEmits<{
  (e: 'select-ticket', ticket: SupportTicketItem): void
  (e: 'send-reply', ticketId: string, replyMessage: string): void
  (e: 'restore-sample-tickets'): void
}>()

const replyDraft = ref('')

function handleSendReply(ticketId: string) {
  const trimmed = replyDraft.value.trim()
  if (!trimmed) return
  emit('send-reply', ticketId, trimmed)
  replyDraft.value = ''
}

function statusPillClasses(status: SupportTicketStatus): string {
  if (status === 'Open') {
    return 'bg-[#FDF2F4] text-[#781D2B] border-[#F2D0D6]'
  }
  if (status === 'In Progress') {
    return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
  if (status === 'Resolved') {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  return 'bg-[#F3F4F6] text-[#4B5563] border-[#D1D5DB]'
}
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
    <!-- Left / Main Column (7 columns on desktop): 8. My Support Requests Table -->
    <section
      aria-labelledby="my-support-requests-heading"
      class="xl:col-span-7 bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#EBECEF]"
      >
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            TICKET HISTORY
          </span>
          <h2 id="my-support-requests-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            My Support Requests
          </h2>
        </div>

        <span
          class="self-start sm:self-center px-2.5 py-0.5 rounded-[3px] text-[11.5px] font-bold bg-[#F5F6F8] text-[#252525] border border-[#E2E4E9]"
        >
          {{ isEmptyTicketsDemo ? 0 : tickets.length }} Tickets
        </span>
      </div>

      <!-- 9. Loading State -->
      <div v-if="activeState === 'loading'" class="space-y-3 py-2" aria-busy="true">
        <div
          v-for="r in 3"
          :key="r"
          class="h-12 bg-[#F5F6F8] border border-[#EBECEF] rounded-[4px] animate-pulse"
        ></div>
      </div>

      <!-- 9. Empty State: No Support Requests Yet -->
      <div
        v-else-if="isEmptyTicketsDemo || tickets.length === 0"
        class="py-10 px-6 text-center bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px]"
      >
        <div
          class="w-12 h-12 mx-auto rounded-full bg-[#FDF7F8] border border-[#EBCFD4] text-[#781D2B] flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h3 class="text-[16px] font-bold text-[#252525] mt-3">
          No Support Requests Yet
        </h3>
        <p class="text-[13px] text-[#555555] mt-1 max-w-[400px] mx-auto">
          You have not submitted any support tickets yet. Any inquiries submitted using the form above will appear here.
        </p>
        <button
          type="button"
          class="mt-4 px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
          @click="emit('restore-sample-tickets')"
        >
          Restore Sample Tickets
        </button>
      </div>

      <!-- Support Requests Table (Horizontally scrollable on mobile) -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr
              class="bg-[#FAFAFB] border-y border-[#E5E7EB] text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]"
            >
              <th class="py-3 px-3">Ticket ID</th>
              <th class="py-3 px-3">Subject</th>
              <th class="py-3 px-3">Category</th>
              <th class="py-3 px-3">Submitted Date</th>
              <th class="py-3 px-3">Status</th>
              <th class="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#EBECEF] text-[13px]">
            <tr
              v-for="tkt in tickets"
              :key="tkt.id"
              class="transition-colors"
              :class="
                selectedTicket?.id === tkt.id
                  ? 'bg-[#FDF7F8]'
                  : 'hover:bg-[#FAFAFB]'
              "
            >
              <td class="py-3.5 px-3 font-bold text-[#781D2B] whitespace-nowrap">
                {{ tkt.ticketId }}
              </td>

              <td class="py-3.5 px-3 font-semibold text-[#252525] max-w-[210px] truncate">
                {{ tkt.subject }}
              </td>

              <td class="py-3.5 px-3 text-[#555555] whitespace-nowrap">
                {{ tkt.category }}
              </td>

              <td class="py-3.5 px-3 text-[#6B7280] text-[12px] whitespace-nowrap">
                {{ tkt.submittedDate }}
              </td>

              <td class="py-3.5 px-3 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold border"
                  :class="statusPillClasses(tkt.status)"
                >
                  {{ tkt.status }}
                </span>
              </td>

              <td class="py-3.5 px-3 text-right whitespace-nowrap">
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-[3px] text-[11.5px] font-semibold border transition-colors cursor-pointer"
                  :class="
                    selectedTicket?.id === tkt.id
                      ? 'bg-[#781D2B] text-white border-[#781D2B]'
                      : 'bg-white text-[#781D2B] border-[#781D2B] hover:bg-[#FDF7F8]'
                  "
                  @click="emit('select-ticket', tkt)"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Right Column (5 columns on desktop): Ticket Details Panel -->
    <section
      aria-labelledby="ticket-detail-panel-heading"
      class="xl:col-span-5 bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5 xl:sticky xl:top-24"
    >
      <div class="pb-4 border-b border-[#EBECEF] flex items-center justify-between gap-2">
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            TICKET INSPECTOR &amp; CONVERSATION
          </span>
          <h2 id="ticket-detail-panel-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
            Ticket Details Panel
          </h2>
        </div>

        <span
          v-if="selectedTicket && !isEmptyTicketsDemo"
          class="px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold border"
          :class="statusPillClasses(selectedTicket.status)"
        >
          {{ selectedTicket.status }}
        </span>
      </div>

      <div
        v-if="selectedTicket && !isEmptyTicketsDemo"
        class="space-y-4 text-[13px]"
      >
        <!-- Ticket Metadata Header -->
        <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] space-y-1.5">
          <div class="flex items-center justify-between text-[12px]">
            <span class="font-bold text-[#781D2B]">{{ selectedTicket.ticketId }}</span>
            <span class="text-[#6B7280]">{{ selectedTicket.submittedDate }}</span>
          </div>
          <h3 class="text-[14.5px] font-bold text-[#252525] leading-snug">
            {{ selectedTicket.subject }}
          </h3>
          <p class="text-[11.5px] text-[#555555]">
            Category: <strong>{{ selectedTicket.category }}</strong> • Ref: {{ selectedTicket.studentReference }}
          </p>
        </div>

        <!-- Original Message & Latest Support Team Response -->
        <div class="space-y-2.5">
          <div class="p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
              Original Student Message
            </span>
            <p class="text-[12.5px] text-[#252525] mt-1 leading-relaxed">
              {{ selectedTicket.originalMessage }}
            </p>
          </div>

          <div class="p-3.5 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4]">
            <span class="block text-[10px] font-bold uppercase tracking-[0.07em] text-[#781D2B]">
              Support Team Response
            </span>
            <p class="text-[12.5px] text-[#252525] mt-1 leading-relaxed">
              {{ selectedTicket.supportResponse }}
            </p>
          </div>
        </div>

        <!-- Conversation History Thread -->
        <div class="space-y-2.5 pt-2 border-t border-[#EBECEF]">
          <span class="block text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#6B7280]">
            Conversation History ({{ selectedTicket.conversationHistory.length }} Messages)
          </span>

          <div class="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            <div
              v-for="msg in selectedTicket.conversationHistory"
              :key="msg.id"
              class="p-3 rounded-[4px] border text-[12.5px]"
              :class="
                msg.senderRole === 'Support Team'
                  ? 'bg-[#FDF7F8] border-[#EBCFD4]'
                  : 'bg-white border-[#E5E7EB]'
              "
            >
              <div class="flex items-center justify-between text-[11px] mb-1">
                <strong
                  :class="
                    msg.senderRole === 'Support Team' ? 'text-[#781D2B]' : 'text-[#252525]'
                  "
                >
                  {{ msg.senderName }} ({{ msg.senderRole }})
                </strong>
                <span class="text-[#6B7280]">{{ msg.timestamp }}</span>
              </div>
              <p class="text-[#374151] leading-relaxed">{{ msg.message }}</p>
            </div>
          </div>
        </div>

        <!-- Reply Option when Ticket is Open or In Progress -->
        <form
          v-if="selectedTicket.status === 'Open' || selectedTicket.status === 'In Progress'"
          class="pt-3 border-t border-[#EBECEF] space-y-2.5"
          @submit.prevent="handleSendReply(selectedTicket.id)"
        >
          <label
            for="ticket-reply-input"
            class="block text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#252525]"
          >
            Reply to Support Team
          </label>
          <textarea
            id="ticket-reply-input"
            v-model="replyDraft"
            rows="2"
            placeholder="Write a follow-up message on this open ticket..."
            class="w-full p-2.5 rounded-[4px] text-[12.5px] bg-white border border-[#D1D5DB] focus:border-[#781D2B] focus:outline-none"
          ></textarea>
          <div class="flex justify-end">
            <button
              type="submit"
              class="px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
            >
              Send Reply
            </button>
          </div>
        </form>

        <!-- Closed / Resolved Ticket Notice -->
        <div
          v-else
          class="p-3 rounded-[4px] bg-[#F3F4F6] border border-[#E5E7EB] text-[12px] text-[#4B5563] text-center"
        >
          This ticket is marked as <strong>{{ selectedTicket.status }}</strong>. If you need further assistance, please submit a new support request above.
        </div>
      </div>

      <div
        v-else
        class="py-10 px-4 text-center bg-[#FAFAFB] border border-[#EBECEF] rounded-[4px] text-[13px] text-[#555555]"
      >
        Select a ticket from "My Support Requests" to inspect its conversation history.
      </div>
    </section>
  </div>
</template>
