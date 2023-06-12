<template>
  <legend class="pointer-heading font-semibold text-18 mb-20 font-secondary">
    <span v-if="point" class="text-primary mr-6">{{ point }}.</span>

    {{ title }}

    <span v-if="subtitle" class="text-grey-dark font-normal">{{
      subtitle
    }}</span>
  </legend>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  subtitle?: string;
  point?: number;
}>();
</script>

<style scoped>
</style>
