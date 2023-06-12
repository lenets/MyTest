<template>
  <div class="flex justify-center">
    <div>
      <div class="flex justify-center gap-x-[45px] md:gap-x-[60px]">
        <div v-for="rate in maxRate" class="w-[24px] h-[24px]">
          <label class="radio inline-flex w-[24px] h-[24px]" :class="{ 'bg-primary': rate <= modelValue }">
            <input 
              type="radio"
              class="hidden"
              :name="name"
              :checked="rate === modelValue"
              :value="rate"
              @change="onChange($event)"
            />
          </label>  
        </div>
      </div>
      <div v-if="subLabels.length" class="mt-16 flex justify-between font-secondary">
        <p 
          v-for="label in subLabels"
          class="text-16"  
        >
            {{ label }}
        </p>
      </div>
      <div v-if="errors" class="error-message">{{ errors }}</div>
    </div>  
  </div>  
</template>

<script setup lang="ts">
import { handleInputEvent } from '../helpers';

export interface Props {
  maxRate: number;
  name: string;
  modelValue: number;
  subLabels?: string[],
  errors?: string,
}

const props = withDefaults(defineProps<Props>(), {
  subLabels: () => [],
});

const emit = defineEmits(['update:modelValue']);

function onChange(event: Event) {
    const value = parseInt(handleInputEvent(event));

    emit('update:modelValue', value);
}
</script>

<style scoped>
label.radio:not(.bg-primary) {
    background: #D9D9D9;
}
label.radio {
    @apply rounded-full cursor-pointer;
}

.input[type='radio'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  line-height: 0;
  @apply absolute;
}

.input[type='radio']::before {
  @apply bg-white border border-grey-dark h-20 w-20 inline-block box-border rounded-full;
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
