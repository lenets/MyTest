<template>
  <div class="toggle-switch">
    <div
      class="switch-wrapper text-center inline-block rounded-full py-8 px-8 bg-grey-lighter"
    >
      <label
        v-for="item in items"
        class="inline-block hover:cursor-pointer"
        :key="item.id"
      >
        <input
          class="switch-input hidden"
          type="radio"
          name="switchGroup"
          :checked="item.id === modelValue"
          :value="item.id"
          @change="$emit('update:modelValue', handleInputEvent($event))"
        />
        <span
          class="active-fill inline-block rounded-full leading-none py-[9px] px-16 md:px-24 text-16 text-black"
        >
          {{ item.name }}
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleInputEvent } from '../helpers';
defineProps<{
  items: Array<{ id: string; name: string }>;
  modelValue?: string;
}>();
defineEmits(['update:modelValue']);
</script>

<style scoped>
.switch-input:checked + .active-fill {
  @apply text-white bg-primary ring-inset ring-1 ring-primary;
}
</style>
