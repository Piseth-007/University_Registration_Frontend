<script setup lang="ts">
import { ref } from 'vue'
import { assignableOfficersList } from '../../data/officerApplicationManagementData'
import type { OfficerManagedApplicationRecord } from '../../types/admissions'

const props = defineProps<{
  drawerRecord: OfficerManagedApplicationRecord | null
  confirmDialogOpen: boolean
  confirmActionTitle: string
  confirmActionDescription: string
}>()

const emit = defineEmits<{
  (e: 'close-drawer'): void
  (e: 'start-review', record: OfficerManagedApplicationRecord): void
  (e: 'assign-officer', record: OfficerManagedApplicationRecord, officerName: string): void
  (e: 'submit-correction-request', record: OfficerManagedApplicationRecord, reason: string, requiredUpdate: string): void
  (e: 'request-mark-complete', record: OfficerManagedApplicationRecord): void
  (e: 'cancel-confirm'): void
  (e: 'confirm-action'): void
}>()

const selectedOfficer = ref(assignableOfficersList[0] ?? 'Sokha Meas (Senior Officer)')
const showCorrectionForm = ref(false)
const correctionReason = ref('Uploaded High School Certificate scan is partially cropped.')
const requiredStudentUpdate = ref(
  'Please re-upload a full-page color PDF or JPG scan of your High School Certificate (BacII) showing the official Ministry seal.',
)
const correctionError = ref('')
const previewedDocName = ref<string | null>(null)

function handleSendCorrection() {
  if (!props.drawerRecord) return
  if (!correctionReason.value.trim() || !requiredStudentUpdate.value.trim()) {
    correctionError.value =
      'Both a correction reason and specific instructions for what the student needs to update are required.'
    return
  }
  correctionError.value = ''
  emit(
    'submit-correction-request',
    props.drawerRecord,
    correctionReason.value.trim(),
    requiredStudentUpdate.value.trim(),
  )
  showCorrectionForm.value = false
}
</script>

<template>
  <!-- 8. Right-Side Application Detail Drawer -->
  <div
    v-if="drawerRecord"
    role="dialog"
    aria-modal="true"
    aria-labelledby="drawer-application-heading"
    class="fixed inset-0 z-50 flex justify-end bg-black/45"
    @click.self="emit('close-drawer')"
  >
    <div
      class="w-full max-w-[660px] h-full bg-white border-l border-[#E2E4E9] shadow-2xl flex flex-col justify-between overflow-hidden"
    >
      <!-- Drawer Header -->
      <div
        class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between gap-3 shrink-0"
      >
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.1em] text-white/80">
            APPLICATION DETAIL DRAWER
          </span>
          <h2 id="drawer-application-heading" class="text-[17px] font-bold leading-snug">
            {{ drawerRecord.applicationId }} — {{ drawerRecord.studentName }}
          </h2>
        </div>

        <button
          type="button"
          class="p-1.5 rounded-[3px] text-white/85 hover:text-white hover:bg-white/10 cursor-pointer"
          aria-label="Close detail drawer"
          @click="emit('close-drawer')"
        >
          ✕
        </button>
      </div>

      <!-- Drawer Scrollable Body (Sections A, B, C, D, E + Review Actions) -->
      <div class="p-6 overflow-y-auto space-y-6 flex-1 text-[13px]">
        <!-- 9. Context-Sensitive Application Review Actions Bar -->
        <div
          class="p-4 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4] space-y-3"
        >
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-[11px] font-bold uppercase tracking-[0.08em] text-[#781D2B]">
              9. Application Review Actions
            </span>
            <span class="text-[11px] text-[#6B7280]">
              Final Approved/Rejected decisions belong to Admission Decisions role
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.75 rounded-[3px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12px] font-semibold transition-colors cursor-pointer"
              @click="emit('start-review', drawerRecord)"
            >
              Start Review
            </button>

            <button
              type="button"
              class="px-3 py-1.75 rounded-[3px] border border-[#F59E0B] bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] text-[12px] font-semibold transition-colors cursor-pointer"
              @click="showCorrectionForm = !showCorrectionForm"
            >
              Request Correction
            </button>

            <button
              type="button"
              class="px-3 py-1.75 rounded-[3px] border border-[#166534] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] text-[12px] font-semibold transition-colors cursor-pointer"
              @click="emit('request-mark-complete', drawerRecord)"
            >
              Mark Review Complete
            </button>
          </div>

          <!-- Assign to Officer Inline Control -->
          <div class="pt-2 border-t border-[#EBCFD4] flex flex-wrap items-center gap-2">
            <label for="drawer-assign-officer" class="text-[12px] font-semibold text-[#252525]">
              Assign to Officer:
            </label>
            <select
              id="drawer-assign-officer"
              v-model="selectedOfficer"
              class="h-8 px-2.5 rounded-[3px] border border-[#D1D5DB] bg-white text-[12px] font-semibold text-[#252525]"
            >
              <option v-for="off in assignableOfficersList" :key="off" :value="off">
                {{ off }}
              </option>
            </select>
            <button
              type="button"
              class="px-3 py-1 rounded-[3px] border border-[#781D2B] bg-white hover:bg-[#781D2B] text-[#781D2B] hover:text-white text-[11.5px] font-semibold transition-colors cursor-pointer"
              @click="emit('assign-officer', drawerRecord, selectedOfficer)"
            >
              Save Assignment
            </button>
          </div>

          <!-- Request Correction Expandable Sub-Form (Requires Reason & Specific Update) -->
          <div
            v-if="showCorrectionForm"
            class="p-3.5 rounded-[4px] bg-white border border-[#F59E0B] space-y-3"
          >
            <h3 class="text-[13px] font-bold text-[#92400E]">
              Request Application Correction
            </h3>
            <div>
              <label class="block text-[11.5px] font-bold text-[#252525] mb-1">
                Correction Reason <span class="text-[#781D2B]">*</span>
              </label>
              <input
                v-model="correctionReason"
                type="text"
                placeholder="Reason why correction is needed..."
                class="w-full h-9 px-2.5 rounded-[3px] border border-[#D1D5DB] text-[12.5px]"
              />
            </div>
            <div>
              <label class="block text-[11.5px] font-bold text-[#252525] mb-1">
                What the Student Needs to Update <span class="text-[#781D2B]">*</span>
              </label>
              <textarea
                v-model="requiredStudentUpdate"
                rows="2"
                placeholder="Specify the exact document or field the student must update..."
                class="w-full p-2.5 rounded-[3px] border border-[#D1D5DB] text-[12.5px]"
              ></textarea>
            </div>
            <p v-if="correctionError" class="text-[11.5px] font-semibold text-[#991B1B]">
              {{ correctionError }}
            </p>
            <div class="flex justify-end gap-2">
              <button
                type="button"
                class="px-3 py-1.5 rounded-[3px] border border-[#D1D5DB] text-[12px] font-semibold cursor-pointer"
                @click="showCorrectionForm = false"
              >
                Cancel
              </button>
              <button
                type="button"
                class="px-3.5 py-1.5 rounded-[3px] bg-[#D97706] hover:bg-[#B45309] text-white text-[12px] font-semibold cursor-pointer"
                @click="handleSendCorrection"
              >
                Send Correction Request
              </button>
            </div>
          </div>
        </div>

        <!-- A. Applicant Information -->
        <section class="space-y-3">
          <h3 class="text-[14px] font-bold uppercase tracking-[0.06em] text-[#781D2B] border-b border-[#EBECEF] pb-1.5">
            A. Applicant Information
          </h3>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Application Reference</dt>
              <dd class="font-bold text-[#781D2B] mt-0.5">{{ drawerRecord.applicationId }}</dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Full Name</dt>
              <dd class="font-bold text-[#252525] mt-0.5">
                {{ drawerRecord.studentName }} ({{ drawerRecord.studentNameKhmer }})
              </dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Gender &amp; Date of Birth</dt>
              <dd class="font-semibold text-[#252525] mt-0.5">
                {{ drawerRecord.gender }} • {{ drawerRecord.dateOfBirth }}
              </dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Email &amp; Phone Number</dt>
              <dd class="font-semibold text-[#252525] mt-0.5">
                {{ drawerRecord.email }} • {{ drawerRecord.phoneNumber }}
              </dd>
            </div>
            <div class="sm:col-span-2 p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Address</dt>
              <dd class="font-medium text-[#252525] mt-0.5">{{ drawerRecord.address }}</dd>
            </div>
          </dl>
        </section>

        <!-- B. Academic Background -->
        <section class="space-y-3">
          <h3 class="text-[14px] font-bold uppercase tracking-[0.06em] text-[#781D2B] border-b border-[#EBECEF] pb-1.5">
            B. Academic Background
          </h3>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Previous School</dt>
              <dd class="font-bold text-[#252525] mt-0.5">{{ drawerRecord.previousSchool }}</dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Graduation Year</dt>
              <dd class="font-bold text-[#252525] mt-0.5">{{ drawerRecord.graduationYear }}</dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Previous Qualification</dt>
              <dd class="font-semibold text-[#252525] mt-0.5">{{ drawerRecord.previousQualification }}</dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">GPA or Grade</dt>
              <dd class="font-bold text-[#166534] mt-0.5">{{ drawerRecord.gpaOrGrade }}</dd>
            </div>
          </dl>
        </section>

        <!-- C. Program Selection -->
        <section class="space-y-3">
          <h3 class="text-[14px] font-bold uppercase tracking-[0.06em] text-[#781D2B] border-b border-[#EBECEF] pb-1.5">
            C. Program Selection
          </h3>
          <dl class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Selected Faculty</dt>
              <dd class="font-bold text-[#252525] mt-0.5">{{ drawerRecord.faculty }}</dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FDF7F8] border border-[#EBCFD4]">
              <dt class="text-[10.5px] font-bold uppercase text-[#781D2B]">Selected Major</dt>
              <dd class="font-bold text-[#781D2B] mt-0.5">{{ drawerRecord.major }}</dd>
            </div>
            <div class="p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF]">
              <dt class="text-[10.5px] font-bold uppercase text-[#6B7280]">Academic Year</dt>
              <dd class="font-bold text-[#252525] mt-0.5">{{ drawerRecord.academicYear }}</dd>
            </div>
          </dl>
        </section>

        <!-- D. Submitted Documents -->
        <section class="space-y-3">
          <h3 class="text-[14px] font-bold uppercase tracking-[0.06em] text-[#781D2B] border-b border-[#EBECEF] pb-1.5">
            D. Submitted Documents
          </h3>

          <div
            v-if="previewedDocName"
            class="p-3 rounded-[4px] bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-between text-[12px] text-[#1E40AF]"
          >
            <span>Previewing document: <strong>{{ previewedDocName }}</strong> (Sample Preview)</span>
            <button type="button" class="underline cursor-pointer" @click="previewedDocName = null">
              Close Preview
            </button>
          </div>

          <ul v-if="drawerRecord.submittedDocuments.length > 0" class="divide-y divide-[#EBECEF] border border-[#E5E7EB] rounded-[4px]">
            <li
              v-for="doc in drawerRecord.submittedDocuments"
              :key="doc.id"
              class="p-3 flex items-center justify-between gap-3 bg-white"
            >
              <div>
                <p class="font-bold text-[#252525]">{{ doc.documentName }}</p>
                <p class="text-[11.5px] text-[#6B7280]">
                  Type: {{ doc.fileType }} • Uploaded: {{ doc.uploadDate }}
                </p>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <span
                  class="px-2 py-0.5 rounded-[3px] text-[10.5px] font-bold"
                  :class="
                    doc.verificationStatus === 'Verified'
                      ? 'bg-[#DCFCE7] text-[#166534]'
                      : doc.verificationStatus === 'Correction Needed'
                        ? 'bg-[#FEF3C7] text-[#92400E]'
                        : 'bg-[#F3F4F6] text-[#4B5563]'
                  "
                >
                  {{ doc.verificationStatus }}
                </span>
                <button
                  type="button"
                  class="px-2.5 py-1 rounded-[3px] border border-[#D1D5DB] hover:border-[#781D2B] text-[11.5px] font-semibold cursor-pointer"
                  @click="previewedDocName = doc.documentName"
                >
                  Preview
                </button>
              </div>
            </li>
          </ul>
          <p v-else class="text-[12.5px] text-[#6B7280] italic">
            No documents uploaded yet (Draft application).
          </p>
        </section>

        <!-- E. Application Information & History -->
        <section id="drawer-history-section" class="space-y-3">
          <h3 class="text-[14px] font-bold uppercase tracking-[0.06em] text-[#781D2B] border-b border-[#EBECEF] pb-1.5">
            E. Application Information &amp; History
          </h3>
          <div class="grid grid-cols-3 gap-3 p-3 rounded-[4px] bg-[#FAFAFB] border border-[#EBECEF] text-[12px]">
            <div>
              <span class="block text-[10px] font-bold uppercase text-[#6B7280]">Submission Date</span>
              <strong class="text-[#252525]">{{ drawerRecord.submissionDate }}</strong>
            </div>
            <div>
              <span class="block text-[10px] font-bold uppercase text-[#6B7280]">Current Status</span>
              <strong class="text-[#781D2B]">{{ drawerRecord.status }}</strong>
            </div>
            <div>
              <span class="block text-[10px] font-bold uppercase text-[#6B7280]">Assigned Officer</span>
              <strong class="text-[#252525]">{{ drawerRecord.assignedOfficer }}</strong>
            </div>
          </div>

          <ul class="space-y-2">
            <li
              v-for="(h, idx) in drawerRecord.applicationHistory"
              :key="idx"
              class="p-2.5 rounded-[3px] bg-[#FAFAFB] border border-[#EBECEF] flex items-center justify-between gap-2 text-[12px]"
            >
              <div>
                <p class="font-bold text-[#252525]">{{ h.activity }}</p>
                <p class="text-[11px] text-[#6B7280]">By: {{ h.actor }}</p>
              </div>
              <span class="text-[11px] font-semibold text-[#781D2B] shrink-0">{{ h.dateTime }}</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Drawer Footer with Prominent "Open Full Review" Button -->
      <div
        class="px-6 py-4 bg-[#FAFAFB] border-t border-[#E2E4E9] flex items-center justify-between gap-3 shrink-0"
      >
        <button
          type="button"
          class="px-4 py-2 rounded-[4px] border border-[#D1D5DB] bg-white text-[#252525] text-[13px] font-semibold cursor-pointer"
          @click="emit('close-drawer')"
        >
          Close Drawer
        </button>

        <button
          type="button"
          class="px-5 py-2.25 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[13.5px] font-semibold transition-colors cursor-pointer shadow-xs"
          @click="emit('start-review', drawerRecord)"
        >
          Open Full Review →
        </button>
      </div>
    </div>
  </div>

  <!-- 10. Confirmation Dialog Before Important Status Changes -->
  <div
    v-if="confirmDialogOpen"
    role="dialog"
    aria-modal="true"
    aria-labelledby="mgmt-confirm-dialog-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    @click.self="emit('cancel-confirm')"
  >
    <div
      class="bg-white border border-[#E2E4E9] rounded-[4px] shadow-xl max-w-[460px] w-full overflow-hidden"
    >
      <div class="px-6 py-4 bg-[#781D2B] text-white flex items-center justify-between">
        <h3 id="mgmt-confirm-dialog-title" class="text-[16px] font-bold">
          {{ confirmActionTitle }}
        </h3>
        <button
          type="button"
          class="p-1 text-white/85 hover:text-white cursor-pointer"
          aria-label="Close confirmation dialog"
          @click="emit('cancel-confirm')"
        >
          ✕
        </button>
      </div>

      <div class="p-6 text-[13.5px] text-[#252525] space-y-2">
        <p class="text-[#555555] leading-relaxed">
          {{ confirmActionDescription }}
        </p>
      </div>

      <div class="px-6 py-3.5 bg-[#FAFAFB] border-t border-[#E2E4E9] flex justify-end gap-2.5">
        <button
          type="button"
          class="px-4 py-2 rounded-[4px] border border-[#D1D5DB] bg-white text-[#252525] text-[12.5px] font-semibold cursor-pointer"
          @click="emit('cancel-confirm')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-[4px] bg-[#781D2B] hover:bg-[#5E1520] text-white text-[12.5px] font-semibold cursor-pointer"
          @click="emit('confirm-action')"
        >
          Confirm Status Update
        </button>
      </div>
    </div>
  </div>
</template>
