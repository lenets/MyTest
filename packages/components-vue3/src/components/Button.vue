<template>
  <button type="button" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: Boolean,
});
</script>
