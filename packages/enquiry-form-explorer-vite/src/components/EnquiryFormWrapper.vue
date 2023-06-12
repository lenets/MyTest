<template>
  <div class="lg:flex lg:justify-between font-primary">
    <div class="w-full lg:w-2/3">
      <nav
        class="header-nav sticky top-0 z-50 flex justify-start items-center py-20 pl-16 lg:pl-32 xl:pl-64"
      >
        <a :href="siteData.domenUrl" target="_blank">
          <img :alt="`${siteData.siteName} logo`" :src="getImageUrl(siteData.logoImg)" />
        </a>
        <Stepper
          v-if="showStepper"
          class="w-full ml-24"
          :active-step="String(currentStep.number)"
          :active-step-number="currentStep.number"
          :steps="stepperAvailableSteps"
        />
        <div v-else class="w-full h-28 ml-24"></div>
      </nav>

      <div class="mx-24 lg:mx-32 xl:mx-64 overflow-hidden lg:overflow-visible">
        <div class="main-content mx-auto">
          <transition name="slot" mode="out-in" appear>
            <slot></slot>
          </transition>
        </div>
      </div>
    </div>

    <aside class="hidden lg:block h-screen w-1/3 sticky top-0">
      <img
        alt="Aside image"
        :src="getImageUrl(siteData.sidebarImg)"
        class="w-full h-full object-cover"
      />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Stepper } from 'components-vue3';
import { getSiteData, getImageUrl } from '@/helpers';

export interface Props {
  showStepper?: boolean;
}

withDefaults(defineProps<Props>(), {
  showStepper: true,
});

interface Step {
  name?: string;
  key: string;
  link: string;
}
const stepperAvailableSteps: Step[] = [
  { key: '1', link: 'first' },
  { key: '2', link: 'second' },
  { key: '3', link: 'third' },
];
const siteData = getSiteData();
const route = useRoute();
const currentStep = computed(() => {
  switch (route.name) {
    case 'first':
      return { name: route.name, number: 1 };
    case 'second':
      return { name: route.name, number: 2 };
    case 'third':
      return { name: route.name, number: 3 };
    default:
      return { name: '404', number: 0 };
  }
});
</script>

<style>
.main-content {
  max-width: 600px;
  width: 100%;
}
.slot-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slot-enter-active {
  transition: all 0.3s ease-out;
}
.slot-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.slot-leave-active {
  transition: all 0.3s ease-in;
}
</style>
