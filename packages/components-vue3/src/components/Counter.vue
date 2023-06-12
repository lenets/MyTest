<template>
  <div class="counter-component font-secondary flex items-center my-16 min-h-[48px]">
    <label class="counter-component__label cursor-pointer select-none mr-32 font-medium" :for="title">
      <div class="counter-component__label-title text-18">{{ title }}</div>
      <div class="counter-component__label-subtitle text-14" v-if="subTitle">{{ subTitle }}</div>
    </label>
    <div class="flex items-center select-none">
      <Button class="counter-button" @click="onInput(modelValue - 1)">
        <img src="@/assets/counterMinus.svg" alt="Minus icon" />
      </Button>
      <input
        :min="min"
        :max="max"
        class="counter-input text-center font-bold mx-16 w-48 h-32 rounded border border-grey outline-grey text-black focus:bg-grey-lighter"
        type="number"
        :id="title"
        :name="title"
        :value="modelValue"
        @keydown="onKeyDown($event)"
        @input="onInput(parseInt(handleInputEvent($event)))"
      />
      <Button class="counter-button" @click="onInput(modelValue + 1)">
        <img src="@/assets/counterPlus.svg" alt="Plus icon" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { handleInputEvent, maxNumberOfValues, getNumberOfZeros } from '../helpers';

export interface Props {
  title: string;
  modelValue?: number;
  subTitle?: string;
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  subTitle: '',
  min: 0,
  max: 99,
});

const emit = defineEmits(['update:modelValue']);

function onInput(inputValue: number) {
  emit('update:modelValue', getValidatedValue(inputValue));
}

function onKeyDown(event: KeyboardEvent) {
  const isValidKey = /^[0-9]+$/.test(event.key);
  const target = (event.target as HTMLInputElement);
  
  if(event.key === 'Backspace' && getNumberOfZeros(+target.value) === 1) {
    event.preventDefault();
    target.value = props.min.toString();
    emit('update:modelValue', props.min);
    return;
  }

  if(event.key === 'Backspace') {
    return;
  }

  if(!isValidKey) {
    event.preventDefault();
    return;
  }

  const newValue = props.modelValue === 0 
    ? +event.key 
    : +(props.modelValue.toString() + event.key);

  

  if(newValue > props.max) {
    const numberOfZeros = getNumberOfZeros(props.max);
    target.value = props.max.toString().slice(0, numberOfZeros === 1 ? 0 : numberOfZeros - 1);
    
    emit('update:modelValue', +target.value);
    return;
  }

  if(newValue < props.min) {
    target.value = props.min.toString();
    emit('update:modelValue', props.min);
    event.preventDefault()
  }
}

function getValidatedValue(value: number) {
  return Math.min(Math.max(value, props.min), props.max);
}

</script>

<style scoped>
.counter-button {
  @apply flex items-center justify-center rounded-full border-primary w-32 h-32 border;
}

/* These selectors provides hiding the spinner in input with type="number"*/
/* https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box */
.counter-input[type='number']::-webkit-outer-spin-button,
.counter-input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.counter-input[type='number'] {
  -moz-appearance: textfield;
}
</style>
