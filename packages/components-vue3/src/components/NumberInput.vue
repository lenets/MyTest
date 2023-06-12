<template>
  <div 
    class="relative"
    :class="errorsValue ? 'mb-20' : ''"  
  >
    <span
      v-if="displayedValue && props.displayPlaceholder"
      class="font-medium absolute -top-8 left-16 px-2 leading-none bg-white text-12 z-40 select-none"
      >{{ placeholder }}</span
    >
    <input
      class="input text-center"
      :min="min"
      :max="max"
      :type="type"
      :value="displayedValue"
      :name="name"
      :placeholder="placeholder"
      :class="statusClass"
      @blur="setValueAfterBlur()"
      @input="setValue(handleInputEvent($event))"
    />
    <div v-if="errorsValue" class="absolute -bottom-[18px] flex w-[200px]">
      <span class="block text-red text-12">
        {{ errorsValue }}</span
      >
      <Button
      class="w-[15px] ml-2"
      @click="$emit('clear')"
      >
        <img src="@/assets/input-error.svg" alt="Error icon" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { computed, ref } from 'vue';

import { handleInputEvent } from '../helpers';

export interface Props {
  placeholder: string;
  value: number | "";
  name?: string;
  type?: string;
  autocomplete?: string;
  inputClass?: string;
  errors?: string;
  success?: boolean;
  min?: number;
  max?: number;
  displayPlaceholder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'number',
  name: '',
  inputClass: 'text-input-default',
  errors: undefined,
  success: false,
  displayPlaceholder: true,
});

const emit = defineEmits(['input', 'clear', 'blur']);

const blur = ref(true);
const internalError = ref('');
const errorsValue = computed(
  () => (blur.value && internalError.value) || props.errors
);

const internalValue = ref();
const displayedValue = computed(() =>
  internalError.value ? internalValue.value : props.value
);

let statusClass = computed(() => {
  if (errorsValue.value) {
    return [props.inputClass, 'error'];
  } else if (props.success) {
    return [props.inputClass, 'success'];
  } else {
    return props.inputClass;
  }
});

function setValue(value: string) {
  const parseValue = Number(value);

  blur.value = true;
  internalError.value = '';

  if ((props.min || props.min === 0) && parseValue < props.min) {
    internalError.value = `Minimal allowed value is ${props.min}`;
    internalValue.value = parseValue;
  } else if ((props.max || props.max === 0) && parseValue > props.max) {
    internalError.value = `Maximum allowed value is ${props.max}`;
    internalValue.value = parseValue;
  } else {
    internalValue.value = undefined;
    return emit('input', parseValue);
  }
}

function setValueAfterBlur() {
  blur.value = false;
  internalError.value = '';
  return emit('blur');
}
</script>

<style scoped>
.input[type='number']::-webkit-outer-spin-button,
.input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* These selectors provides hiding the spinner in input with type="number"*/
/* https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box */
.input[type='number']::-webkit-outer-spin-button,
.input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input[type='number'] {
  -moz-appearance: textfield;
}
</style>
