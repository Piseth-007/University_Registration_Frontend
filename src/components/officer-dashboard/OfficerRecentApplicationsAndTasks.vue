<script setup lang="ts">
import { ref } from 'vue'
import {
  officerFacultyFilterOptions,
  officerPendingTasks,
  officerRecentActivities,
} from '../../data/officerDashboardData'
import type {
  OfficerApplicationRecord,
  OfficerApplicationStatus,
  OfficerDashboardInteractionState,
  OfficerNavId,
} from '../../types/admissions'

defineProps<{
  paginatedApplications: OfficerApplicationRecord[]
  totalFilteredCount: number
  currentPage: number
  totalPages: number
  tableSearchQuery: string
  statusFilter: string
  facultyFilter: string
  sortDirection: 'newest' | 'oldest'
  activeState: OfficerDashboardInteractionState
  isEmptyApplicationsDemo: boolean
  isNoPendingTasksDemo: boolean
}>()

const emit = defineEmits<{
  (e: 'update:tableSearchQuery', value: string): void
  (e: 'update:statusFilter', value: string): void
  (e: 'update:facultyFilter', value: string): void
  (e: 'update:sortDirection', value: 'newest' | 'oldest'): void
  (e: 'change-page', page: number): void
  (e: 'reset-filters'): void
  (e: 'select-module', module: OfficerNavId): void
  (e: 'update-record-status', recordId: string, newStatus: OfficerApplicationStatus): void
}>()

const inspectedApplication = ref<OfficerApplicationRecord | null>(null)
const pendingStatusUpdate = ref<OfficerApplicationStatus | null>(null)

function statusBadgeClass(status: OfficerApplicationStatus): string {
  if (status === 'Approved') {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  if (status === 'Rejected') {
    return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
  }
  if (status === 'Need Correction') {
    return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
  if (status === 'Under Review') {
    return 'bg-[#FDF2F4] text-[#781D2B] border-[#F2D0D6]'
  }
  return 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
}

function confirmStatusAction() {
  if (!inspectedApplication.value || !pendingStatusUpdate.value) return
  emit(
    'update-record-status',
    inspectedApplication.value.id,
    pendingStatusUpdate.value,
  )
  inspectedApplication.value.status = pendingStatusUpdate.value
  pendingStatusUpdate.value = null
}
</script>

<template>
  <div class="space-y-6">
    <!-- 6. Recent Applications Table Section -->
    <section
      aria-labelledby="recent-applications-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#EBECEF]"
      >
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            APPLICANT DOSSIER REGISTRY (SAMPLE RECORDS)
          </span>
          <h2 id="recent-applications-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            Recent Applications
          </h2>
          <p class="text-[12.5px] text-[#555555] mt-0.5">
            Review incoming student applications, filter by status or faculty, and inspect individual records.
          </p>
        </div>

        <!-- Search + Status Filter + Faculty Filter + Date Sort -->
        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Table Search -->
          <input
            :value="tableSearchQuery"
            type="search"
            placeholder="Search ID or student..."
            aria-label="Search applications table"
            class="h-9 px-3 text-[12.5px] bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:bg-white focus:border-[#781D2B] focus:outline-none w-full sm:w-[190px]"
            @input="
              emit('update:tableSearchQuery', ($event.target as HTMLInputElement).value)
            "
          />

          <!-- Filter by Status -->
          <select
            :value="statusFilter"
            aria-label="Filter by status"
            class="h-9 px-2.5 text-[12.5px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
            @change="
              emit('update:statusFilter', ($event.target as HTMLSelectElement).value)
            "
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Need Correction">Need Correction</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <!-- Filter by Faculty -->
          <select
            :value="facultyFilter"
            aria-label="Filter by faculty"
            class="h-9 px-2.5 text-[12.5px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none max-w-[210px]"
            @change="
              emit('update:facultyFilter', ($event.target as HTMLSelectElement).value)
            "
          >
            <option
              v-for="fac in officerFacultyFilterOptions"
              :key="fac"
              :value="fac"
            >
              {{ fac }}
            </option>
          </select>

          <!-- Sort by Submission Date -->
          <select
            :value="sortDirection"
            aria-label="Sort by submission date"
            class="h-9 px-2.5 text-[12.5px] font-semibold bg-[#F5F6F8] border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
            @change="
              emit(
                'update:sortDirection',
                ($event.target as HTMLSelectElement).value as 'newest' | 'oldest',
              )
            "
          >
            <option value="newest">Sort: Newest Date</option>
            <option value="oldest">Sort: Oldest Date</option>
          </select>
        </div>
      </div>

      <!-- Empty Recent Applications State -->
      <div
        v-if="isEmptyApplicationsDemo || paginatedApplications.length === 0"
        class="py-10 px-6 text-center bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px]"
      >
        <h3 class="text-[16px] font-bold text-[#252525]">
          No Recent Applications Found
        </h3>
        <p class="text-[13px] text-[#555555] mt-1">
          No application records match the current search or filter selection.
        </p>
        <button
          type="button"
          class="mt-4 px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
          @click="emit('reset-filters')"
        >
          Reset Table Filters
        </button>
      </div>

      <!-- Applications Table -->
      <div v-else class="space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr
                class="bg-[#FAFAFB] border-y border-[#E5E7EB] text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6B7280]"
              >
                <th class="py-3 px-3.5">Application ID</th>
                <th class="py-3 px-3.5">Student Name</th>
                <th class="py-3 px-3.5">Faculty</th>
                <th class="py-3 px-3.5">Major</th>
                <th class="py-3 px-3.5">Submission Date</th>
                <th class="py-3 px-3.5">Status</th>
                <th class="py-3 px-3.5 text-right">Action</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-[#EBECEF] text-[13px]">
              <tr
                v-for="app in paginatedApplications"
                :key="app.id"
                class="hover:bg-[#FAFAFB] transition-colors"
              >
                <td class="py-3.5 px-3.5 font-bold text-[#781D2B] whitespace-nowrap">
                  {{ app.applicationId }}
                </td>
                <td class="py-3.5 px-3.5">
                  <span class="font-bold text-[#252525] block">{{ app.studentName }}</span>
                  <span class="text-[11.5px] text-[#6B7280]" lang="km">
                    {{ app.studentNameKhmer }}
                  </span>
                </td>
                <td class="py-3.5 px-3.5 text-[#374151]">
                  {{ app.faculty }}
                </td>
                <td class="py-3.5 px-3.5 font-medium text-[#252525]">
                  {{ app.major }}
                </td>
                <td class="py-3.5 px-3.5 text-[#555555] whitespace-nowrap">
                  {{ app.submissionDate }}
                </td>
                <td class="py-3.5 px-3.5 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold border"
                    :class="statusBadgeClass(app.status)"
                  >
                    {{ app.status }}
                  </span>
                </td>
                <td class="py-3.5 px-3.5 text-right whitespace-nowrap">
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-[3px] text-[12px] font-semibold border border-[#781D2B] bg-white hover:bg-[#781D2B] text-[#781D2B] hover:text-white transition-colors cursor-pointer"
                    @click="inspectedApplication = app"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Bar -->
        <div
          class="pt-3 border-t border-[#EBECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px] text-[#555555]"
        >
          <span>
            Showing <strong>{{ paginatedApplications.length }}</strong> of
            <strong>{{ totalFilteredCount }}</strong> sample application records (Page
            {{ currentPage }} of {{ totalPages }})
          </span>

          <div class="inline-flex items-center gap-1.5">
            <button
              type="button"
              :disabled="currentPage <= 1"
              class="px-3 py-1.5 rounded-[3px] border text-[12px] font-semibold transition-colors"
              :class="
                currentPage <= 1
                  ? 'border-[#E5E7EB] bg-[#F5F6F8] text-[#9CA3AF] cursor-not-allowed'
                  : 'border-[#D1D5DB] bg-white hover:border-[#781D2B] text-[#252525] cursor-pointer'
              "
              @click="emit('change-page', currentPage - 1)"
            >
              Previous
            </button>

            <button
              v-for="p in totalPages"
              :key="p"
              type="button"
              class="w-8 h-8 rounded-[3px] text-[12px] font-bold border transition-colors cursor-pointer"
              :class="
                currentPage === p
                  ? 'bg-[#781D2B] text-white border-[#781D2B]'
                  : 'bg-white text-[#252525] border-[#D1D5DB] hover:border-[#781D2B]'
              "
              @click="emit('change-page', p)"
            >
              {{ p }}
            </button>

            <button
              type="button"
              :disabled="currentPage >= totalPages"
              class="px-3 py-1.5 rounded-[3px] border text-[12px] font-semibold transition-colors"
              :class="
                currentPage >= totalPages
                  ? 'border-[#E5E7EB] bg-[#F5F6F8] text-[#9CA3AF] cursor-not-allowed'
                  : 'border-[#D1D5DB] bg-white hover:border-[#781D2B] text-[#252525] cursor-pointer'
              "
              @click="emit('change-page', currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom 3-Column Grid: 7. Pending Tasks + 8. Recent Activities + 9. Quick Actions -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      <!-- 7. Pending Tasks (5 columns) -->
      <section
        aria-labelledby="officer-pending-tasks-heading"
        class="xl:col-span-5 bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-4"
      >
        <div class="pb-4 border-b border-[#EBECEF] flex items-center justify-between">
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
              DAILY WORKLOAD QUEUE
            </span>
            <h2 id="officer-pending-tasks-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
              Pending Tasks
            </h2>
          </div>

          <span
            class="px-2 py-0.5 rounded-[3px] text-[11px] font-bold bg-[#FDF2F4] text-[#781D2B] border border-[#F2D0D6]"
          >
            {{ isNoPendingTasksDemo ? 0 : officerPendingTasks.length }} Active Queues
          </span>
        </div>

        <!-- No Pending Tasks Empty State -->
        <div
          v-if="isNoPendingTasksDemo"
          class="py-8 px-4 text-center bg-[#FAFAFB] border border-[#E5E7EB] rounded-[4px]"
        >
          <p class="text-[14px] font-bold text-[#166534]">
            All Assigned Verification Tasks Completed
          </p>
          <p class="text-[12.5px] text-[#555555] mt-1">
            There are no pending application or document verification tasks in your queue.
          </p>
        </div>

        <ul v-else class="space-y-3">
          <li
            v-for="task in officerPendingTasks"
            :key="task.id"
            class="p-4 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] flex items-center justify-between gap-3"
          >
            <div class="space-y-1">
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.06em]"
                  :class="
                    task.priority === 'Urgent'
                      ? 'bg-[#FEE2E2] text-[#991B1B]'
                      : task.priority === 'High'
                        ? 'bg-[#FEF3C7] text-[#92400E]'
                        : 'bg-[#F3F4F6] text-[#4B5563]'
                  "
                >
                  {{ task.priority }} Priority
                </span>
                <span class="text-[12px] font-bold text-[#781D2B]">
                  {{ task.pendingCount }} pending items
                </span>
              </div>
              <h3 class="text-[13.5px] font-bold text-[#252525]">
                {{ task.title }}
              </h3>
            </div>

            <button
              type="button"
              class="px-3 py-1.5 rounded-[3px] bg-white hover:bg-[#781D2B] text-[#781D2B] hover:text-white border border-[#781D2B] text-[12px] font-semibold transition-colors cursor-pointer shrink-0"
              @click="emit('select-module', task.targetModule)"
            >
              View Tasks
            </button>
          </li>
        </ul>
      </section>

      <!-- 8. Recent Activities (4 columns) -->
      <section
        aria-labelledby="officer-recent-activities-heading"
        class="xl:col-span-4 bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-4"
      >
        <div class="pb-4 border-b border-[#EBECEF]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            STAFF AUDIT STREAM
          </span>
          <h2
            id="officer-recent-activities-heading"
            class="text-[17px] font-bold text-[#252525] mt-0.5"
          >
            Recent Activities
          </h2>
        </div>

        <ol class="divide-y divide-[#EBECEF]">
          <li
            v-for="act in officerRecentActivities"
            :key="act.id"
            class="py-3 first:pt-0 last:pb-0 space-y-1"
          >
            <div class="flex items-center justify-between gap-2 text-[11px]">
              <span class="font-bold uppercase tracking-[0.06em] text-[#781D2B]">
                {{ act.activityType }}
              </span>
              <span class="text-[#6B7280]">{{ act.dateTime }}</span>
            </div>
            <p class="text-[12.5px] font-semibold text-[#252525] leading-snug">
              {{ act.description }}
            </p>
            <p class="text-[11.5px] text-[#6B7280]">
              Officer: <strong class="text-[#374151]">{{ act.officerResponsible }}</strong>
            </p>
          </li>
        </ol>
      </section>

      <!-- 9. Quick Actions (3 columns) -->
      <section
        aria-labelledby="officer-quick-actions-heading"
        class="xl:col-span-3 bg-white border border-[#E2E4E9] rounded-[4px] p-6 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-4"
      >
        <div class="pb-4 border-b border-[#EBECEF]">
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            STAFF SHORTCUTS
          </span>
          <h2 id="officer-quick-actions-heading" class="text-[17px] font-bold text-[#252525] mt-0.5">
            Quick Actions
          </h2>
        </div>

        <div class="space-y-2.5">
          <button
            type="button"
            class="w-full py-2.75 px-3.5 bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer shadow-xs"
            @click="emit('select-module', 'applications')"
          >
            <span>Review New Applications</span>
            <span>→</span>
          </button>

          <button
            type="button"
            class="w-full py-2.75 px-3.5 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
            @click="emit('select-module', 'document-verification')"
          >
            <span>Verify Documents</span>
            <span>→</span>
          </button>

          <button
            type="button"
            class="w-full py-2.75 px-3.5 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
            @click="emit('select-module', 'admission-decisions')"
          >
            <span>View Admission Decisions</span>
            <span>→</span>
          </button>

          <button
            type="button"
            class="w-full py-2.75 px-3.5 bg-white hover:bg-[#F5F6F8] text-[#252525] hover:text-[#781D2B] border border-[#D1D5DB] hover:border-[#781D2B] text-[13px] font-semibold rounded-[4px] transition-colors flex items-center justify-between cursor-pointer"
            @click="emit('select-module', 'reports')"
          >
            <span>Generate Report</span>
            <span>→</span>
          </button>
        </div>
      </section>
    </div>

    <!-- Application Inspection & Officer Decision Confirmation Modal -->
    <div
      v-if="inspectedApplication"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspect-application-modal-title"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="
        inspectedApplication = null;
        pendingStatusUpdate = null
      "
    >
      <div
        class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[540px] w-full overflow-hidden"
      >
        <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-wider text-white/80">
              OFFICER DOSSIER INSPECTION
            </span>
            <h3 id="inspect-application-modal-title" class="text-[16px] font-bold">
              {{ inspectedApplication.applicationId }} — {{ inspectedApplication.studentName }}
            </h3>
          </div>
          <button
            type="button"
            class="p-1 text-white/85 hover:text-white cursor-pointer"
            aria-label="Close modal"
            @click="
              inspectedApplication = null;
              pendingStatusUpdate = null
            "
          >
            ✕
          </button>
        </div>

        <div class="p-6 space-y-4 text-[13px] text-[#252525]">
          <div class="grid grid-cols-2 gap-3 p-3.5 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
            <div>
              <span class="block text-[10px] font-bold uppercase text-[#6B7280]">Faculty &amp; Major</span>
              <p class="font-bold mt-0.5">{{ inspectedApplication.major }}</p>
              <p class="text-[11.5px] text-[#555555]">{{ inspectedApplication.faculty }}</p>
            </div>
            <div>
              <span class="block text-[10px] font-bold uppercase text-[#6B7280]">Protected Identity</span>
              <p class="font-bold mt-0.5">{{ inspectedApplication.maskedNationalId }}</p>
              <p class="text-[11.5px] text-[#555555]">BacII: {{ inspectedApplication.bacIIGrade }}</p>
            </div>
          </div>

          <!-- Permission Rule Notice -->
          <div class="p-3 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] text-[12px] text-[#781D2B]">
            <strong>Permission Policy:</strong> Admission Officers may mark applications as
            <em>Under Review</em> or <em>Need Correction</em>. Final <em>Approved</em> or
            <em>Rejected</em> decisions require confirmation below.
          </div>

          <!-- Select Status Update Action -->
          <div class="space-y-2">
            <span class="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
              Update Application Status (With Confirmation):
            </span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="st in (['Under Review', 'Need Correction', 'Approved', 'Rejected'] as OfficerApplicationStatus[])"
                :key="st"
                type="button"
                class="px-3 py-1.5 rounded-[3px] text-[12px] font-semibold border transition-colors cursor-pointer"
                :class="
                  pendingStatusUpdate === st
                    ? 'bg-[#781D2B] text-white border-[#781D2B]'
                    : 'bg-white text-[#252525] border-[#D1D5DB] hover:border-[#781D2B]'
                "
                @click="pendingStatusUpdate = st"
              >
                Set {{ st }}
              </button>
            </div>
          </div>

          <!-- Confirmation Box when a status change is selected -->
          <div
            v-if="pendingStatusUpdate"
            class="p-3.5 rounded-[4px] bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between gap-3"
          >
            <span class="text-[12.5px] font-semibold text-[#92400E]">
              Confirm changing status to <strong>{{ pendingStatusUpdate }}</strong>?
            </span>
            <button
              type="button"
              class="px-3.5 py-1.5 rounded-[3px] bg-[#781D2B] text-white text-[12px] font-semibold cursor-pointer"
              @click="confirmStatusAction"
            >
              Confirm Decision
            </button>
          </div>
        </div>

        <div class="px-6 py-3.5 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-[4px] border border-[#D1D5DB] bg-white text-[#252525] text-[12.5px] font-semibold cursor-pointer"
            @click="
              inspectedApplication = null;
              pendingStatusUpdate = null
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
