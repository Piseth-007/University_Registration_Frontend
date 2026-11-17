<script setup lang="ts">
import { ref } from 'vue'
import { assignableOfficersList } from '../../data/officerApplicationManagementData'
import type {
  OfficerManagedAppStatus,
  OfficerManagedApplicationRecord,
  OfficerManagementInteractionState,
} from '../../types/admissions'

const props = defineProps<{
  paginatedApplications: OfficerManagedApplicationRecord[]
  totalFilteredCount: number
  selectedIds: string[]
  currentPage: number
  totalPages: number
  rowsPerPage: number
  sortColumn: 'applicationId' | 'studentName' | 'submissionDate'
  sortDirection: 'asc' | 'desc'
  activeState: OfficerManagementInteractionState
}>()

const emit = defineEmits<{
  (e: 'toggle-select', id: string): void
  (e: 'toggle-select-all'): void
  (e: 'clear-selection'): void
  (e: 'bulk-assign-officer', officerName: string): void
  (e: 'bulk-export'): void
  (e: 'sort-by', col: 'applicationId' | 'studentName' | 'submissionDate'): void
  (e: 'update:rowsPerPage', rows: number): void
  (e: 'change-page', page: number): void
  (e: 'open-detail-drawer', record: OfficerManagedApplicationRecord): void
  (e: 'quick-action', record: OfficerManagedApplicationRecord, action: 'start-review' | 'assign' | 'request-correction' | 'mark-complete' | 'history'): void
  (e: 'reset-filters'): void
}>()

const bulkOfficerSelection = ref(assignableOfficersList[0] ?? 'Sokha Meas (Senior Officer)')
const openMoreMenuId = ref<string | null>(null)

function isAllPageSelected(): boolean {
  if (props.paginatedApplications.length === 0) return false
  return props.paginatedApplications.every((r) => props.selectedIds.includes(r.id))
}

function statusBadgeClass(status: OfficerManagedAppStatus): string {
  if (status === 'Approved') {
    return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
  }
  if (status === 'Rejected') {
    return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
  }
  if (status === 'Need Correction') {
    return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
  }
  if (status === 'Under Review' || status === 'Resubmitted') {
    return 'bg-[#FDF2F4] text-[#781D2B] border-[#F2D0D6]'
  }
  if (status === 'Submitted') {
    return 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
  }
  return 'bg-[#F3F4F6] text-[#4B5563] border-[#D1D5DB]'
}
</script>

<template>
  <div class="space-y-4">
    <!-- 7. Bulk Actions Toolbar (Displayed when multiple applications are selected) -->
    <div
      v-if="selectedIds.length > 0"
      role="region"
      aria-label="Bulk Application Actions"
      class="bg-[#FDF7F8] border-2 border-[#781D2B] rounded-[4px] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs"
    >
      <div class="flex flex-wrap items-center gap-3">
        <span
          class="px-2.5 py-1 rounded-[3px] bg-[#781D2B] text-white text-[12px] font-bold"
        >
          {{ selectedIds.length }} Selected
        </span>
        <span class="text-[13px] font-semibold text-[#252525]">
          Bulk Actions Toolbar
        </span>
        <span class="text-[11.5px] text-[#6B7280]">
          (Note: Bulk approval/rejection is restricted by university verification policy)
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Assign / Change Officer Selector -->
        <select
          v-model="bulkOfficerSelection"
          aria-label="Select officer for bulk assignment"
          class="h-9 px-2.5 text-[12.5px] font-semibold bg-white border border-[#D1D5DB] rounded-[4px] text-[#252525] focus:border-[#781D2B] focus:outline-none"
        >
          <option v-for="off in assignableOfficersList" :key="off" :value="off">
            {{ off }}
          </option>
        </select>

        <!-- Assign Officer Button -->
        <button
          type="button"
          class="px-3.5 py-1.75 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
          @click="emit('bulk-assign-officer', bulkOfficerSelection)"
        >
          Assign Officer
        </button>

        <!-- Change Assignment Button -->
        <button
          type="button"
          class="px-3.5 py-1.75 rounded-[4px] border border-[#781D2B] bg-white hover:bg-[#FDF7F8] text-[#781D2B] text-[12.5px] font-semibold transition-colors cursor-pointer"
          @click="emit('bulk-assign-officer', bulkOfficerSelection)"
        >
          Change Assignment
        </button>

        <!-- Export Selected Button -->
        <button
          type="button"
          class="px-3.5 py-1.75 rounded-[4px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] text-[#252525] text-[12.5px] font-semibold transition-colors cursor-pointer"
          @click="emit('bulk-export')"
        >
          Export Selected
        </button>

        <!-- Clear Selection -->
        <button
          type="button"
          class="px-2.5 py-1.5 text-[12px] font-semibold text-[#6B7280] hover:text-[#252525] underline cursor-pointer"
          @click="emit('clear-selection')"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- 10. Permission Denied State -->
    <div
      v-if="activeState === 'permission-denied'"
      role="alert"
      class="bg-[#FEF2F2] border border-[#FECACA] border-l-4 border-l-[#991B1B] rounded-[4px] p-5 flex items-start gap-3.5"
    >
      <div
        class="w-9 h-9 rounded-full bg-[#991B1B] text-white flex items-center justify-center shrink-0 mt-0.5"
        aria-hidden="true"
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
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div>
        <h3 class="text-[14.5px] font-bold text-[#991B1B]">
          Permission Denied — Final Admission Decision Restricted
        </h3>
        <p class="text-[13px] text-[#7F1D1D] mt-0.5 leading-relaxed">
          Your current staff role (<strong>Admission Verification Officer</strong>) authorizes you to review applications, assign officers, and request corrections. Final admission approvals or rejections must be submitted through the <strong>Admission Decisions</strong> senate module.
        </p>
      </div>
    </div>

    <!-- 6. All Applications Table Section -->
    <section
      aria-labelledby="all-applications-table-heading"
      class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)] space-y-5"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EBECEF]"
      >
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
            CENTRAL ADMISSIONS REGISTRY
          </span>
          <h2 id="all-applications-table-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
            All Applications
          </h2>
        </div>

        <div class="flex flex-wrap items-center gap-3 text-[12.5px]">
          <span class="text-[#555555]">
            Total Records: <strong class="text-[#252525]">{{ totalFilteredCount }}</strong>
          </span>

          <div class="flex items-center gap-1.5">
            <label for="rows-per-page-select" class="text-[#6B7280] font-medium">
              Rows per page:
            </label>
            <select
              id="rows-per-page-select"
              :value="rowsPerPage"
              class="h-8 px-2 rounded-[3px] border border-[#D1D5DB] bg-[#F5F6F8] font-bold text-[#252525]"
              @change="
                emit(
                  'update:rowsPerPage',
                  Number(($event.target as HTMLSelectElement).value),
                )
              "
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 10. Loading Table State -->
      <div v-if="activeState === 'loading'" class="space-y-3 py-2" aria-busy="true">
        <div
          v-for="r in 5"
          :key="r"
          class="h-12 rounded-[4px] bg-[#F5F6F8] border border-[#EBECEF] animate-pulse"
        ></div>
      </div>

      <!-- 10. Empty Search / Filter Results State -->
      <div
        v-else-if="activeState === 'no-results' || paginatedApplications.length === 0"
        class="py-12 px-6 text-center bg-[#FAFAFB] border border-[#E2E4E9] rounded-[4px]"
      >
        <h3 class="text-[16.5px] font-bold text-[#252525]">
          No Applications Found
        </h3>
        <p class="text-[13px] text-[#555555] mt-1 max-w-[440px] mx-auto">
          No student admission applications match your current search query or filter criteria.
        </p>
        <button
          type="button"
          class="mt-4 px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
          @click="emit('reset-filters')"
        >
          Reset Search &amp; Filters
        </button>
      </div>

      <!-- Data Table (Desktop & Tablet) -->
      <div v-else class="space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[1040px]">
            <thead>
              <tr
                class="bg-[#FAFAFB] border-y border-[#E5E7EB] text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#6B7280]"
              >
                <!-- 1. Checkbox -->
                <th class="py-3 px-3 w-10">
                  <input
                    type="checkbox"
                    :checked="isAllPageSelected()"
                    aria-label="Select all applications on this page"
                    class="w-4 h-4 accent-[#781D2B] rounded cursor-pointer"
                    @change="emit('toggle-select-all')"
                  />
                </th>

                <!-- 2. Application ID (Sortable) -->
                <th class="py-3 px-3">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 font-bold uppercase tracking-[0.07em] hover:text-[#781D2B] cursor-pointer"
                    @click="emit('sort-by', 'applicationId')"
                  >
                    <span>Application ID</span>
                    <span v-if="sortColumn === 'applicationId'">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>

                <!-- 3. Student Name (Sortable) -->
                <th class="py-3 px-3">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 font-bold uppercase tracking-[0.07em] hover:text-[#781D2B] cursor-pointer"
                    @click="emit('sort-by', 'studentName')"
                  >
                    <span>Student Name</span>
                    <span v-if="sortColumn === 'studentName'">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>

                <!-- 4. Gender -->
                <th class="py-3 px-3">Gender</th>

                <!-- 5. Faculty -->
                <th class="py-3 px-3">Faculty</th>

                <!-- 6. Major -->
                <th class="py-3 px-3">Major</th>

                <!-- 7. Submission Date (Sortable) -->
                <th class="py-3 px-3">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 font-bold uppercase tracking-[0.07em] hover:text-[#781D2B] cursor-pointer"
                    @click="emit('sort-by', 'submissionDate')"
                  >
                    <span>Submission Date</span>
                    <span v-if="sortColumn === 'submissionDate'">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>

                <!-- 8. Status -->
                <th class="py-3 px-3">Status</th>

                <!-- 9. Assigned Officer -->
                <th class="py-3 px-3">Assigned Officer</th>

                <!-- 10. Actions -->
                <th class="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-[#EBECEF] text-[12.5px]">
              <tr
                v-for="record in paginatedApplications"
                :key="record.id"
                class="transition-colors"
                :class="
                  selectedIds.includes(record.id)
                    ? 'bg-[#FDF7F8]'
                    : 'hover:bg-[#FAFAFB]'
                "
              >
                <!-- 1. Checkbox -->
                <td class="py-3.5 px-3">
                  <input
                    type="checkbox"
                    :checked="selectedIds.includes(record.id)"
                    :aria-label="`Select ${record.applicationId}`"
                    class="w-4 h-4 accent-[#781D2B] rounded cursor-pointer"
                    @change="emit('toggle-select', record.id)"
                  />
                </td>

                <!-- 2. Application ID -->
                <td class="py-3.5 px-3 font-bold text-[#781D2B] whitespace-nowrap">
                  {{ record.applicationId }}
                </td>

                <!-- 3. Student Name -->
                <td class="py-3.5 px-3">
                  <span class="font-bold text-[#252525] block">{{ record.studentName }}</span>
                  <span class="text-[11px] text-[#6B7280]" lang="km">
                    {{ record.studentNameKhmer }}
                  </span>
                </td>

                <!-- 4. Gender -->
                <td class="py-3.5 px-3 text-[#555555] whitespace-nowrap">
                  {{ record.gender }}
                </td>

                <!-- 5. Faculty -->
                <td class="py-3.5 px-3 text-[#374151]">
                  {{ record.faculty }}
                </td>

                <!-- 6. Major -->
                <td class="py-3.5 px-3 font-semibold text-[#252525]">
                  {{ record.major }}
                </td>

                <!-- 7. Submission Date -->
                <td class="py-3.5 px-3 text-[#555555] whitespace-nowrap">
                  {{ record.submissionDate }}
                </td>

                <!-- 8. Status -->
                <td class="py-3.5 px-3 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-[3px] text-[11px] font-bold border"
                    :class="statusBadgeClass(record.status)"
                  >
                    {{ record.status }}
                  </span>
                </td>

                <!-- 9. Assigned Officer -->
                <td class="py-3.5 px-3 whitespace-nowrap">
                  <span
                    class="text-[12px] font-medium"
                    :class="
                      record.assignedOfficer === 'Unassigned'
                        ? 'text-[#B45309] font-semibold'
                        : 'text-[#252525]'
                    "
                  >
                    {{ record.assignedOfficer }}
                  </span>
                </td>

                <!-- 10. Actions: View Details + Review Application + More Actions Menu -->
                <td class="py-3.5 px-3 text-right whitespace-nowrap">
                  <div class="inline-flex items-center gap-1.5 relative">
                    <button
                      type="button"
                      class="px-2.5 py-1.25 rounded-[3px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] hover:text-[#781D2B] text-[#252525] text-[11.5px] font-semibold transition-colors cursor-pointer"
                      @click="emit('open-detail-drawer', record)"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      class="px-2.5 py-1.25 rounded-[3px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[11.5px] font-semibold transition-colors cursor-pointer"
                      @click="emit('open-detail-drawer', record)"
                    >
                      Review Application
                    </button>

                    <!-- More Actions Menu Button -->
                    <button
                      type="button"
                      class="w-7 h-7 rounded-[3px] border border-[#D1D5DB] bg-white hover:border-[#781D2B] text-[#555555] hover:text-[#781D2B] flex items-center justify-center cursor-pointer"
                      aria-label="More actions"
                      @click="
                        openMoreMenuId =
                          openMoreMenuId === record.id ? null : record.id
                      "
                    >
                      ⋮
                    </button>

                    <!-- More Actions Dropdown -->
                    <div
                      v-if="openMoreMenuId === record.id"
                      class="absolute right-0 top-8 w-[195px] bg-white border border-[#E2E4E9] rounded-[4px] shadow-lg py-1 z-30 text-left text-[12px]"
                    >
                      <button
                        type="button"
                        class="w-full px-3 py-1.75 hover:bg-[#F5F6F8] hover:text-[#781D2B] font-medium text-[#252525] block text-left cursor-pointer"
                        @click="
                          emit('quick-action', record, 'start-review');
                          openMoreMenuId = null
                        "
                      >
                        Start Review
                      </button>
                      <button
                        type="button"
                        class="w-full px-3 py-1.75 hover:bg-[#F5F6F8] hover:text-[#781D2B] font-medium text-[#252525] block text-left cursor-pointer"
                        @click="
                          emit('quick-action', record, 'assign');
                          openMoreMenuId = null
                        "
                      >
                        Assign to Officer
                      </button>
                      <button
                        type="button"
                        class="w-full px-3 py-1.75 hover:bg-[#F5F6F8] hover:text-[#781D2B] font-medium text-[#92400E] block text-left cursor-pointer"
                        @click="
                          emit('quick-action', record, 'request-correction');
                          openMoreMenuId = null
                        "
                      >
                        Request Correction
                      </button>
                      <button
                        type="button"
                        class="w-full px-3 py-1.75 hover:bg-[#F5F6F8] hover:text-[#781D2B] font-medium text-[#166534] block text-left cursor-pointer"
                        @click="
                          emit('quick-action', record, 'mark-complete');
                          openMoreMenuId = null
                        "
                      >
                        Mark Review Complete
                      </button>
                      <button
                        type="button"
                        class="w-full px-3 py-1.75 hover:bg-[#F5F6F8] hover:text-[#781D2B] font-medium text-[#252525] block text-left cursor-pointer border-t border-[#EBECEF]"
                        @click="
                          emit('quick-action', record, 'history');
                          openMoreMenuId = null
                        "
                      >
                        View Application History
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div
          class="pt-3 border-t border-[#EBECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px] text-[#555555]"
        >
          <span>
            Showing <strong>{{ paginatedApplications.length }}</strong> of
            <strong>{{ totalFilteredCount }}</strong> applications (Page
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
  </div>
</template>
