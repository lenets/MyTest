<script lang="ts" setup>
import VerticalStepCheckIcon from './icons/VerticalStepCheckIcon.vue';

export interface Props {
  content?: string;
  state?: 'completed' | 'active' | 'default';
}

withDefaults(defineProps<Props>(), {
  content: 'Lorem ipsum',
  state: 'default',
});
</script>

<template>
  <div class="step flex flex-row justify-start" :class="state">
    <div class="relative">
      <div
        class="circle bg-white border-2 border-grey rounded-full w-24 h-24 inline-block"
      >
        <VerticalStepCheckIcon v-if="state === 'completed'" class="w-12 h-12" />
      </div>
    </div>
    <div class="ml-24 font-secondary font-normal text-primary-dark inline-block">{{ content }}</div>
  </div>
</template>

<style scoped>
.step.completed .circle {
  @apply border-primary text-primary flex justify-center items-center;
}

.step.completed .line {
  @apply border-l-2 border-primary;
}

.step.active .circle {
  @apply bg-primary border-2 border-primary;
  /* box-shadow: Its temporary solution, have some porblems in tailwind config */
  box-shadow: inset 0 0 0 6px #eee;
}

.step:last-child .line {
  border-left: 2px solid white;
  z-index: -1; /* behind the circle to completely hide */
}
</style>
