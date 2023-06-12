<template>
  <div class="multi-inputs max-w-[290px] font-secondary">
      <Counter
          class="mt-0 mb-0 text-primary-dark"
          :title="counterTitle"
          :subTitle="counterSubTitle"
          :modelValue="counter"
          :min="min"
          :max="max"
          @update:modelValue="changeCounter($event)"
      />
      <div v-if="values.length" class="mt-12">
          <p class="multi-inputs__title text-18 leading-tight text-primary-dark min-h-[45px] flex items-center">{{ title }}</p>
          <div>
              <div
                  class="multi-inputs__item item flex items-start mt-12 input-wrapper text-primary-dark"
                  :class="itemsWrapperClasses"
                  v-for="value, idx in values"
              >
                  <span class="text-18 mr-24 mt-4 min-w-[51px]">{{ beforeInputTitle + ` ${idx + 1}` }}</span>
                  <NumberInput
                      :value="value === 0 ? '' : value"
                      :displayPlaceholder="false"
                      :min="minValue"
                      :max="maxValue"
                      placeholder="0"
                      inputClass="rounded font-secondary font-bold text-16 h-48 p-12 w-full border border-grey outline-primary w-[48px] h-[32px] text-center"
                      @input="changeInputValue($event, idx)"
                      @keydown="['e', 'E'].includes($event.key) && $event.preventDefault()"
                  />
                  <span class="ml-8 mt-4 text-18">{{ afterInputTitle }}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import Counter from './Counter.vue';
import NumberInput from './NumberInput.vue';

export interface Props {
counterTitle: string;
counterSubTitle?: string;
min?: number;
max?: number;
title: string;
beforeInputTitle: string;
afterInputTitle: string;
counter?: number;
values: number[];
minValue?: number;
maxValue?: number;
itemsWrapperClasses?: string;
}

const props = withDefaults(defineProps<Props>(), {
counter: 0,
counterSubTitle: '',
min: 0,
minValue: 0,
maxValue: 99,
});

const emit = defineEmits(['update:counter', 'update:values']);

function changeCounter(number: number) {
  const isInvalid = isNaN(number)
  
  if(isInvalid) return

  if(props.counter > number) {
      emit('update:values', props.values.slice(0, number))
  } else {
      emit('update:values', [...props.values].concat(new Array(number - props.counter).fill(0)))
  }

  emit('update:counter', number);
}

function changeInputValue(number: number, idx: number) {
  const copy = [...props.values];
  copy[idx] = Math.min(Math.max(number, props.minValue), props.maxValue);
  
  emit('update:values', copy);
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
