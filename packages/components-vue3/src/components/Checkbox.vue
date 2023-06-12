<template>
  <div>
    <label
      v-for="item in items"
      class="flex cursor-pointer relative"
      :key="item.id"
    >
      <input
        type="checkbox"
        class="input"
        :checked="isChecked(item.id)"
        :name="name"
        @change="$emit('change', getEmitedValue(item.id))"
      />
      <div class="pb-2 my-4 text-black text-16 select-none ml-36">
        {{ item.name }}
      </div>
    </label>
    <div v-if="errors" class="error-message">{{ errors }}</div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  items: {
    id: string;
    name: string;
  }[];
  name: string;
  value?: string[];
  errors?: string;
}
const props = defineProps<Props>();

function getEmitedValue(item: string) {
  if ((props.value as string[]).includes(item)) {
    return (props.value as string[]).filter((x) => x != item);
  }
  return [...(props.value as string[]), item];
}

function isChecked(item: string) {
  return props.value?.includes(item);
}

defineEmits(['change']);
</script>

<style scoped>
/* Source of styles: https://moderncss.dev/pure-css-custom-checkbox-style/ */

.input[type='checkbox'] {
  @apply flex justify-center items-center bg-white rounded-sm border border-grey-dark w-20 h-20 absolute top-8;
  font: inherit;
  transform: translateY(-0.075em);
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
}

.input[type='checkbox']:before {
  @apply bg-primary w-12 h-12 origin-bottom-left;
  content: '';
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
}

.input[type='checkbox']:checked:before {
  transform: scale(1);
}
</style>
