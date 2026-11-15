<script setup lang="ts">
import { ref, watch } from 'vue'
import AuthBrandHeader from '../components/auth/AuthBrandHeader.vue'
import StudentForgotPasswordCard from '../components/auth/StudentForgotPasswordCard.vue'
import StudentLoginCard from '../components/auth/StudentLoginCard.vue'
import StudentRegisterCard from '../components/auth/StudentRegisterCard.vue'
import { navigateTo, useRoute } from '../router'
import type { AuthScreenMode } from '../types/admissions'

const { path } = useRoute()

function getScreenFromPath(currentPath: string): AuthScreenMode {
  if (currentPath === '/register') return 'register'
  if (currentPath === '/forgot-password') return 'forgot-password'
  return 'login'
}

const activeScreen = ref<AuthScreenMode>(getScreenFromPath(path.value))
const previewValidation = ref(false)
const showAllScreens = ref(false)

watch(path, (newPath) => {
  activeScreen.value = getScreenFromPath(newPath)
})

function handleSelectScreen(mode: AuthScreenMode) {
  activeScreen.value = mode
  showAllScreens.value = false
  const targetRoute =
    mode === 'register'
      ? '/register'
      : mode === 'forgot-password'
        ? '/forgot-password'
        : '/login'
  if (path.value !== targetRoute) {
    navigateTo(targetRoute)
  }
}
</script>

<template>
  <main class="min-h-[calc(100vh-180px)] bg-[#F5F6F8] py-10 sm:py-14 text-[#252525]">
    <div class="container-layout">
      <!-- Top Screen Switcher & Validation State Preview Bar -->
      <AuthBrandHeader
        :active-screen="activeScreen"
        :preview-validation="previewValidation"
        @select-screen="handleSelectScreen"
        @toggle-validation="previewValidation = !previewValidation"
      />

      <!-- View Mode Bar: Single Screen vs All 3 Screens Overview -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-7">
        <nav aria-label="Breadcrumb" class="text-[12.5px] text-[#6B7280] flex items-center gap-2">
          <a
            href="/"
            class="hover:text-[#781D2B] hover:underline transition-colors"
            @click.prevent="navigateTo('/')"
          >
            Home
          </a>
          <span aria-hidden="true">/</span>
          <span class="text-[#252525] font-medium">
            {{
              activeScreen === 'login'
                ? 'Student Portal Login'
                : activeScreen === 'register'
                  ? 'Create Student Account'
                  : 'Reset Password'
            }}
          </span>
        </nav>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3 py-1.5 rounded-[2px] border transition-colors cursor-pointer"
          :class="
            showAllScreens
              ? 'bg-[#781D2B] text-white border-[#781D2B]'
              : 'bg-white text-[#252525] border-[#D6D9E0] hover:border-[#781D2B] hover:text-[#781D2B]'
          "
          @click="showAllScreens = !showAllScreens"
        >
          <!-- Lucide LayoutGrid icon -->
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
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <span>
            {{ showAllScreens ? 'Show Active Screen Only' : 'Compare All 3 Screens' }}
          </span>
        </button>
      </div>

      <!-- Focused Single-Screen Desktop Layout -->
      <div v-if="!showAllScreens" class="flex justify-center py-2">
        <StudentLoginCard
          v-if="activeScreen === 'login'"
          :preview-validation="previewValidation"
          @switch-screen="handleSelectScreen"
        />

        <StudentRegisterCard
          v-else-if="activeScreen === 'register'"
          :preview-validation="previewValidation"
          @switch-screen="handleSelectScreen"
        />

        <StudentForgotPasswordCard
          v-else
          :preview-validation="previewValidation"
          @switch-screen="handleSelectScreen"
        />
      </div>

      <!-- Side-by-Side 3-Screen Showcase Layout -->
      <div
        v-else
        class="grid grid-cols-1 xl:grid-cols-3 gap-7 items-start justify-items-center py-2"
      >
        <StudentLoginCard
          :preview-validation="previewValidation"
          @switch-screen="handleSelectScreen"
        />
        <StudentRegisterCard
          :preview-validation="previewValidation"
          @switch-screen="handleSelectScreen"
        />
        <StudentForgotPasswordCard
          :preview-validation="previewValidation"
          @switch-screen="handleSelectScreen"
        />
      </div>
    </div>
  </main>
</template>
