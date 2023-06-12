<template>
  <button :disabled="disabled" type="submit">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: Boolean,
});
</script>
