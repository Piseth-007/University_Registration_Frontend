<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  type?: 'text' | 'email' | 'date' | 'tel'
  placeholder?: string
  required?: boolean
  errorMessage?: string
  helperText?: string
  phonePrefix?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <!-- Clear Label Above Input -->
    <label :for="id" class="text-[13px] font-semibold text-[#252525] flex items-center gap-1">
      <span>{{ label }}</span>
      <span v-if="required" class="text-[#781D2B] font-bold" aria-hidden="true">*</span>
      <span v-else class="text-[11px] font-normal text-[#6B7280] ml-1">(Optional)</span>
    </label>

    <!-- Phone Input with +855 Country Code Prefix -->
    <div v-if="phonePrefix" class="flex items-stretch">
      <div
        class="inline-flex items-center gap-1.5 px-3.5 bg-[#F5F6F8] border border-r-0 rounded-l-[4px] text-[13px] font-semibold text-[#252525] select-none shrink-0"
        :class="errorMessage ? 'border-[#B91C1C]' : 'border-[#D1D5DB]'"
      >
        <!-- Lucide Phone Icon -->
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#781D2B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          />
        </svg>
        <span>{{ phonePrefix }}</span>
      </div>
      <input
        :id="id"
        :value="modelValue"
        :type="type || 'tel'"
        :placeholder="placeholder"
        :aria-invalid="Boolean(errorMessage)"
        :aria-describedby="`${id}-feedback`"
        class="w-full px-3.5 py-2.5 text-[13.5px] text-[#252525] bg-white border rounded-r-[4px] transition-colors focus:outline-none placeholder:text-[#9CA3AF]"
        :class="
          errorMessage
            ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
            : 'border-[#D1D5DB] focus:border-[#781D2B]'
        "
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Standard Text / Email / Date Picker Input -->
    <div v-else class="relative">
      <input
        :id="id"
        :value="modelValue"
        :type="type || 'text'"
        :placeholder="placeholder"
        :aria-invalid="Boolean(errorMessage)"
        :aria-describedby="`${id}-feedback`"
        class="w-full px-3.5 py-2.5 text-[13.5px] text-[#252525] bg-white border rounded-[4px] transition-colors focus:outline-none placeholder:text-[#9CA3AF]"
        :class="
          errorMessage
            ? 'border-[#B91C1C] bg-[#FEF2F2]/40 focus:border-[#781D2B]'
            : 'border-[#D1D5DB] focus:border-[#781D2B]'
        "
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
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
