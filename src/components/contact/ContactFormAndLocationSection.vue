<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ContactFormPayload } from '../../types/admissions'
import { validateContactForm } from '../../utils/helpers'

defineProps<{
  subjectOptions: string[]
}>()

const form = reactive<ContactFormPayload>({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const touched = reactive<Record<keyof ContactFormPayload, boolean>>({
  fullName: false,
  email: false,
  phone: false,
  subject: false,
  message: false,
})

const errors = ref<Partial<Record<keyof ContactFormPayload, string>>>({})
const isSubmittedSuccess = ref(false)

function validateField(field: keyof ContactFormPayload) {
  touched[field] = true
  const allErrors = validateContactForm(form)
  if (allErrors[field]) {
    errors.value[field] = allErrors[field]
  } else {
    delete errors.value[field]
  }
}

function handleSubmit() {
  touched.fullName = true
  touched.email = true
  touched.phone = true
  touched.subject = true
  touched.message = true

  const validationResult = validateContactForm(form)
  errors.value = validationResult

  if (Object.keys(validationResult).length === 0) {
    isSubmittedSuccess.value = true
  } else {
    isSubmittedSuccess.value = false
  }
}

function handleResetForm() {
  form.fullName = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
  errors.value = {}
  isSubmittedSuccess.value = false
}
</script>

<template>
  <section class="py-16 bg-[#F5F6F8]">
    <div
      class="container-layout grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start"
    >
      <!-- 4. Contact Form Card -->
      <div class="bg-white border border-border-warm p-7 sm:p-9 rounded-[2px]">
        <span class="eyebrow text-[#781D2B]">SEND AN INQUIRY</span>
        <h2 class="section-title text-[#252525] mb-2">Contact form</h2>
        <p class="text-[13px] text-ink-secondary mb-6">
          Complete the form below to send a message to our admissions or administrative
          support team. Fields marked with <span class="text-[#781D2B] font-bold">*</span>
          are required.
        </p>

        <!-- Success Alert Banner -->
        <div
          v-if="isSubmittedSuccess"
          class="bg-[#ebf3ed] border-l-4 border-[#2c5e3b] p-4 mb-6 rounded-[2px] flex items-start justify-between gap-4"
          role="status"
        >
          <div>
            <p class="text-[13px] font-semibold text-[#1e4229] mb-0.5">
              Your inquiry has been recorded (Sample Submission).
            </p>
            <p class="text-[12px] text-[#2c5e3b]">
              Thank you, <strong>{{ form.fullName }}</strong>. An admissions officer will
              respond to <strong>{{ form.email }}</strong> during official office hours.
            </p>
          </div>
          <button
            type="button"
            class="text-[11.5px] font-semibold text-[#1e4229] underline shrink-0 cursor-pointer"
            @click="handleResetForm"
          >
            Send another
          </button>
        </div>

        <form class="flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
          <!-- Full Name -->
          <div class="flex flex-col gap-1.5">
            <label
              for="contact-fullname"
              class="text-[12.5px] font-semibold text-[#252525]"
            >
              Full Name <span class="text-[#781D2B]">*</span>
            </label>
            <input
              id="contact-fullname"
              v-model="form.fullName"
              type="text"
              placeholder="Enter your full name"
              class="px-3.5 py-2.5 border rounded-[2px] text-[13.5px] text-[#252525] focus:outline-none transition-colors"
              :class="
                errors.fullName
                  ? 'border-[#b91c1c] bg-[#fef2f2]'
                  : 'border-border-warm bg-white focus:border-[#781D2B]'
              "
              @blur="validateField('fullName')"
            />
            <span v-if="errors.fullName" class="text-[11.5px] text-[#b91c1c] font-medium">
              {{ errors.fullName }}
            </span>
          </div>

          <!-- Email & Phone Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label
                for="contact-email"
                class="text-[12.5px] font-semibold text-[#252525]"
              >
                Email Address <span class="text-[#781D2B]">*</span>
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                placeholder="name@example.com"
                class="px-3.5 py-2.5 border rounded-[2px] text-[13.5px] text-[#252525] focus:outline-none transition-colors"
                :class="
                  errors.email
                    ? 'border-[#b91c1c] bg-[#fef2f2]'
                    : 'border-border-warm bg-white focus:border-[#781D2B]'
                "
                @blur="validateField('email')"
              />
              <span v-if="errors.email" class="text-[11.5px] text-[#b91c1c] font-medium">
                {{ errors.email }}
              </span>
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                for="contact-phone"
                class="text-[12.5px] font-semibold text-[#252525]"
              >
                Phone Number <span class="text-[#781D2B]">*</span>
              </label>
              <input
                id="contact-phone"
                v-model="form.phone"
                type="tel"
                placeholder="+855 (0) XX XXX XXX"
                class="px-3.5 py-2.5 border rounded-[2px] text-[13.5px] text-[#252525] focus:outline-none transition-colors"
                :class="
                  errors.phone
                    ? 'border-[#b91c1c] bg-[#fef2f2]'
                    : 'border-border-warm bg-white focus:border-[#781D2B]'
                "
                @blur="validateField('phone')"
              />
              <span v-if="errors.phone" class="text-[11.5px] text-[#b91c1c] font-medium">
                {{ errors.phone }}
              </span>
            </div>
          </div>

          <!-- Inquiry Subject -->
          <div class="flex flex-col gap-1.5">
            <label
              for="contact-subject"
              class="text-[12.5px] font-semibold text-[#252525]"
            >
              Inquiry Subject <span class="text-[#781D2B]">*</span>
            </label>
            <select
              id="contact-subject"
              v-model="form.subject"
              class="px-3.5 py-2.5 border rounded-[2px] text-[13.5px] text-[#252525] focus:outline-none transition-colors"
              :class="
                errors.subject
                  ? 'border-[#b91c1c] bg-[#fef2f2]'
                  : 'border-border-warm bg-white focus:border-[#781D2B]'
              "
              @change="validateField('subject')"
            >
              <option value="" disabled>Select an inquiry subject...</option>
              <option v-for="subj in subjectOptions" :key="subj" :value="subj">
                {{ subj }}
              </option>
            </select>
            <span v-if="errors.subject" class="text-[11.5px] text-[#b91c1c] font-medium">
              {{ errors.subject }}
            </span>
          </div>

          <!-- Message -->
          <div class="flex flex-col gap-1.5">
            <label
              for="contact-message"
              class="text-[12.5px] font-semibold text-[#252525]"
            >
              Message <span class="text-[#781D2B]">*</span>
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="4"
              placeholder="Write your question or inquiry details here..."
              class="px-3.5 py-2.5 border rounded-[2px] text-[13.5px] text-[#252525] focus:outline-none transition-colors resize-y"
              :class="
                errors.message
                  ? 'border-[#b91c1c] bg-[#fef2f2]'
                  : 'border-border-warm bg-white focus:border-[#781D2B]'
              "
              @blur="validateField('message')"
            ></textarea>
            <span v-if="errors.message" class="text-[11.5px] text-[#b91c1c] font-medium">
              {{ errors.message }}
            </span>
          </div>

          <div class="pt-1 flex items-center justify-between gap-4">
            <button
              type="submit"
              class="inline-flex items-center gap-2.5 bg-[#781D2B] hover:bg-[#5c121d] text-white text-[13.5px] font-medium px-6 py-3 rounded-[2px] transition-colors cursor-pointer"
            >
              <span>Send Message</span>
              <span aria-hidden="true">→</span>
            </button>
            <span class="text-[11.5px] text-ink-muted">
              Response time: 1–2 working days [Placeholder]
            </span>
          </div>
        </form>
      </div>

      <!-- 6. University Location Card -->
      <aside class="bg-white border border-border-warm p-7 sm:p-8 rounded-[2px] flex flex-col">
        <span class="eyebrow text-[#781D2B]">CAMPUS MAP &amp; ACCESS</span>
        <h2 class="section-title text-[#252525] mb-2">University location</h2>
        <p class="text-[13px] text-ink-secondary mb-5">
          View our campus map placeholder and address details below. Official coordinates
          and interactive map embeds can be configured here.
        </p>

        <!-- Embedded Google Map -->
        <div
          class="border border-border-warm rounded-[2px] overflow-hidden mb-5 bg-[#e9eaee]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7652965627676!2d104.88816677505392!3d11.568675988632677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRoyal%20University%20of%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1794738095891!5m2!1sen!2skh"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            title="Royal University of Phnom Penh Location Map"
            class="w-full h-[300px] block"
          ></iframe>
        </div>

        <!-- Address & Directions Button -->
        <div class="bg-[#F5F6F8] border border-border-warm p-4.5 rounded-[2px] mb-5">
          <span
            class="block text-[9.5px] font-bold tracking-[0.1em] text-ink-muted uppercase mb-1"
          >
            UNIVERSITY ADDRESS
          </span>
          <p class="text-[13px] font-semibold text-[#252525] leading-snug">
            Russian Federation Boulevard, Toul Kork, Phnom Penh, Cambodia
          </p>
          <p class="text-[11.5px] text-ink-secondary mt-1">
            Main Campus &amp; Office of Admissions Reception
          </p>
        </div>

        <a
          href="https://maps.google.com/?q=Royal+University+of+Phnom+Penh"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 bg-white border border-[#781D2B] text-[#781D2B] hover:bg-[#781D2B] hover:text-white text-[13px] font-semibold px-5 py-2.75 rounded-[2px] transition-colors"
        >
          <span>Get Directions</span>
          <span aria-hidden="true">→</span>
        </a>
      </aside>
    </div>
  </section>
</template>
