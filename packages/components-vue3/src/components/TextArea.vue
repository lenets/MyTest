<template>
  <div class="textarea-component">
    <textarea
      class="rounded placeholder-text-grey-dark text-black h-full w-full border border-grey resize-none leading-7 outline-primary"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', handleInputEvent($event).trim())"
    ></textarea>

    <span v-if="errors" class="error-message"> {{ errors }}</span>
  </div>
</template>

<script setup lang="ts">
import { handleInputEvent } from '../helpers';

defineProps<{
  placeholder: string;
  modelValue: string;
  errors?: string;
}>();
defineEmits(['update:modelValue']);
</script>

<style scoped>
textarea {
  @apply text-18 p-16 leading-relaxed text-16;
}
</style>
