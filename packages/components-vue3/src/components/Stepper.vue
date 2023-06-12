<template>
  <div>
    <div class="flex justify-between bg-lighter">
      <Step
        v-for="(step, index) in steps"
        :key="step.name"
        :name="step.name"
        :stepNumber="index + 1"
        :link="step.link"
        :active="activeStep === step.key"
        :is-previous="activeStepNumber > index + 1"
        :has-separator="index !== steps.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Step from './Step.vue';

defineProps<{
  activeStep: string;
  activeStepNumber: number;
  steps: Array<{ name?: string; key: string; link: string }>;
}>();
</script>

<style scoped></style>
