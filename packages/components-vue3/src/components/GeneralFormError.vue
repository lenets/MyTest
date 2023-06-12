<template>
  <div class="bg-red h-40 w-full text-white">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  disabled: Boolean,
});
</script>
