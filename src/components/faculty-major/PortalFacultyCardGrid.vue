<script setup lang="ts">
import type { PortalFacultyCardItem } from '../../types/admissions'

defineProps<{
  faculties: PortalFacultyCardItem[]
  activeFacultyId: string
}>()

const emit = defineEmits<{
  (e: 'select-faculty', facultyId: string): void
}>()
</script>

<template>
  <section
    aria-labelledby="faculty-directory-heading"
    class="bg-white border border-[#E2E4E9] rounded-[4px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(37,37,37,0.03)]"
  >
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5 mb-6 border-b border-[#EBECEF]">
      <div>
        <span class="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#781D2B]">
          ACADEMIC FACULTIES
        </span>
        <h2 id="faculty-directory-heading" class="text-[18px] font-bold text-[#252525] mt-0.5">
          Explore University Faculties
        </h2>
        <p class="text-[13px] text-[#555555] mt-0.5">
          Select a faculty card below to filter available degree programs by academic division.
        </p>
      </div>

      <button
        v-if="activeFacultyId"
        type="button"
        class="self-start sm:self-center px-3 py-1.5 text-[12px] font-semibold rounded-[4px] border border-[#781D2B] text-[#781D2B] hover:bg-[#FDF7F8] cursor-pointer"
        @click="emit('select-faculty', '')"
      >
        Show All Faculties
      </button>
    </div>

    <!-- 5. Faculty Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <article
        v-for="faculty in faculties"
        :key="faculty.id"
        class="rounded-[4px] border transition-all flex flex-col justify-between overflow-hidden group"
        :class="
          activeFacultyId === faculty.id
            ? 'border-2 border-[#781D2B] bg-[#FDF7F8]/50 shadow-sm'
            : 'border-[#E2E4E9] bg-white hover:border-[#781D2B]'
        "
      >
        <div>
          <!-- Faculty Image & Program Count Overlay -->
          <div class="relative h-36 bg-[#F5F6F8] overflow-hidden border-b border-[#EBECEF]">
            <img
              :src="faculty.image"
              :alt="faculty.name"
              class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"></div>

            <!-- Icon + Program Count Badge -->
            <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <div
                class="w-8 h-8 rounded-[4px] bg-white/95 text-[#781D2B] flex items-center justify-center shadow-xs"
                aria-hidden="true"
              >
                <!-- Science Icon (Atom / FlaskConical) -->
                <svg
                  v-if="faculty.icon === 'science'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                  <path d="M8.5 2h7" />
                  <path d="M7 16h10" />
                </svg>

                <!-- Engineering Icon (Cpu) -->
                <svg
                  v-else-if="faculty.icon === 'engineering'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <rect width="6" height="6" x="9" y="9" rx="1" />
                  <path d="M15 2v2" />
                  <path d="M15 20v2" />
                  <path d="M2 15h2" />
                  <path d="M2 9h2" />
                  <path d="M20 15h2" />
                  <path d="M20 9h2" />
                  <path d="M9 2v2" />
                  <path d="M9 20v2" />
                </svg>

                <!-- Social Sciences Icon (Globe) -->
                <svg
                  v-else-if="faculty.icon === 'social'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>

                <!-- Development Studies Icon (Sprout / TrendingUp) -->
                <svg
                  v-else-if="faculty.icon === 'development'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>

                <!-- Humanities Icon (BookOpen) -->
                <svg
                  v-else-if="faculty.icon === 'humanities'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>

                <!-- Education Icon (GraduationCap) -->
                <svg
                  v-else
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                  <path d="M22 10v6" />
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                </svg>
              </div>

              <span
                class="px-2.5 py-1 rounded-[3px] text-[11px] font-bold bg-[#781D2B] text-white shadow-xs"
              >
                {{ faculty.programCount }} Available Programs
              </span>
            </div>

            <!-- Khmer & English Name on Image Bottom -->
            <div class="absolute bottom-2.5 left-3.5 right-3.5">
              <span class="khmer-title block text-[11px] text-white/90 leading-snug">
                {{ faculty.nameKhmer }}
              </span>
              <h3 class="text-[16px] font-bold text-white leading-tight">
                {{ faculty.name }}
              </h3>
            </div>
          </div>

          <!-- Card Description -->
          <div class="p-4">
            <p class="text-[13px] text-[#555555] leading-relaxed">
              {{ faculty.shortDescription }}
            </p>
          </div>
        </div>

        <!-- View Programs Action Footer -->
        <div class="px-4 pb-4 pt-1">
          <button
            type="button"
            class="w-full py-2 px-3.5 rounded-[4px] text-[12.5px] font-semibold border transition-colors flex items-center justify-between cursor-pointer"
            :class="
              activeFacultyId === faculty.id
                ? 'bg-[#781D2B] border-[#781D2B] text-white'
                : 'bg-[#F5F6F8] border-[#E2E4E9] text-[#252525] hover:border-[#781D2B] hover:text-[#781D2B]'
            "
            @click="
              emit(
                'select-faculty',
                activeFacultyId === faculty.id ? '' : faculty.id,
              )
            "
          >
            <span>
              {{
                activeFacultyId === faculty.id
                  ? 'Filtering Programs by Faculty'
                  : 'View Programs'
              }}
            </span>
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
