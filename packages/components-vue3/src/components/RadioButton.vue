<template>
  <div class="radiobtn-component">
    <div class="flex" :class="flexDirection">
      <div v-for="item in items" :key="item.id" class="mr-24 md:mr-50 my-8">
        <label class="radio inline-flex items-center cursor-pointer relative text-primary-dark">
          <input
            type="radio"
            class="radiobtn-component__input input cursor-pointer"
            :name="name"
            :checked="item.id === modelValue"
            :value="item.id"
            @change="onChange($event)"
          />
          <span class="ml-30">{{ item.name }}</span>
        </label>
      </div>
    </div>
    <div v-if="errors" class="error-message">{{ errors }}</div>
  </div>
</template>

<script setup lang="ts">
import { handleInputEvent } from '../helpers';

export interface Props {
  items: {
    id: string;
    name: string;
  }[];
  modelValue?: string;
  name: string;
  errors?: string;
  layout?: 'row' | 'col';
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'col',
});

const flexDirection = `flex-${props.layout}`;

const emit = defineEmits(['update:modelValue']);

function onChange(event: Event) {
  const value = handleInputEvent(event);
  emit('update:modelValue', value);
}
</script>

<style scoped>
.input[type='radio'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  line-height: 0;
  @apply absolute;
}

.input[type='radio']::before {
  @apply bg-white border border-grey-dark h-24 w-24 inline-block box-border rounded-full;
  content: '';
  /* box-shadow: Its temporary solution, have some porblems in tailwind config */
  box-shadow: inset 0 0 0 6px #eeeeee;
  transition: all 200ms ease;
}

.input[type='radio']:checked:before {
  @apply bg-primary;
  /* box-shadow: Its temporary solution, have some porblems in tailwind config */
  box-shadow: inset 0 0 0 6px #eeeeee;
}
</style>
