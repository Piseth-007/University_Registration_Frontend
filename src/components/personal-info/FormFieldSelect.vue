<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  placeholder?: string
  options: Array<{ value: string; label: string }>
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  helperText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <!-- Clear Label Above Dropdown -->
    <label :for="id" class="text-[13px] font-semibold text-[#252525] flex items-center gap-1">
      <span>{{ label }}</span>
      <span v-if="required" class="text-[#781D2B] font-bold" aria-hidden="true">*</span>
      <span v-else class="text-[11px] font-normal text-[#6B7280] ml-1">(Optional)</span>
    </label>

    <!-- Select Dropdown with Custom Lucide Chevron -->
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :aria-invalid="Boolean(errorMessage)"
        :aria-describedby="`${id}-feedback`"
        class="w-full appearance-none pl-3.5 pr-9 py-2.5 text-[13.5px] bg-white border rounded-[4px] transition-colors focus:outline-none disabled:bg-[#F5F6F8] disabled:text-[#9CA3AF] cursor-pointer"
        :class="[
          modelValue ? 'text-[#252525]' : 'text-[#6B7280]',
          errorMessage
            ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
            : 'border-[#D1D5DB] focus:border-[#781D2B]',
        ]"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">{{ placeholder || 'Select an option' }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <span
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] pointer-events-none"
        aria-hidden="true"
      >
        <!-- Lucide ChevronDown icon -->
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>

    <!-- Validation Message or Helper Text Beneath Field -->
    <p
      :id="`${id}-feedback`"
      class="text-[12px] flex items-center gap-1.5 min-h-[18px]"
      :class="errorMessage ? 'text-[#B91C1C] font-medium' : 'text-[#6B7280]'"
    >
      <svg
        v-if="errorMessage"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{{ errorMessage || helperText || '' }}</span>
    </p>
  </div>
</template>
