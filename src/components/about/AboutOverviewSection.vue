<script setup lang="ts">
defineProps<{
  highlights: string[]
}>()
</script>

<template>
  <section class="py-16 bg-white">
    <div
      class="container-layout grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start"
    >
      <div>
        <span class="eyebrow">UNIVERSITY OVERVIEW</span>
        <h2 class="section-title mb-4">
          Education with purpose.<br />
          Opportunity for the future.
        </h2>
        <p class="text-[13.5px] text-ink-secondary leading-[1.65] mb-3.5">
          Our university brings together rigorous academic standards, dedicated faculty,
          and a supportive learning environment to prepare students for meaningful
          careers and leadership across Cambodia and the region.
        </p>
        <p class="text-[13.5px] text-ink-secondary leading-[1.65] mb-3.5">
          Whether entering your first undergraduate degree or advancing through graduate
          research, you will find a vibrant community committed to inquiry and impact.
        </p>

        <div class="mt-5.5">
          <span
            class="block text-[10px] font-bold tracking-[0.1em] text-ink uppercase mb-2.5"
          >
            INSTITUTIONAL HIGHLIGHTS
          </span>
          <ul class="list-none flex flex-col">
            <li
              v-for="(item, idx) in highlights"
              :key="idx"
              class="flex items-start gap-2.5 text-[12.5px] text-ink-secondary py-2.5 border-b border-border-warm first:border-t"
            >
              <span
                class="text-crimson font-bold text-[12px] leading-[1.4]"
                aria-hidden="true"
              >
                ✓
              </span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <figure class="flex flex-col gap-2">
          <div class="rounded-[2px] overflow-hidden border border-border-warm">
            <img
              src="/images/about/overview-walkway.jpg"
              alt="Students walking along the campus walkway"
              class="w-full h-auto block"
            />
          </div>
          <figcaption class="text-[11px] text-ink-muted">
            Students on the main campus walkway during the academic term.
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
