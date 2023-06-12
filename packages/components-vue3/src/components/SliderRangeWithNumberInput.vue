<template>
  <div class="wrapper">
    <SliderRange
      :value="[setMinValue, setMaxValue]"
      :min="min"
      :max="max"
      :step="step"
      :currency="currency"
      @change="getChangValues($event)"
    />
    <div class="flex justify-between mt-40">
      <NumberInput
        class="mr-4"
        inputClass="text-input-default min-w-[120px] font-secondary font-medium"
        placeholder="Min"
        :value="displayedMinValue"
        :min="min"
        :max="max"
        :errors="errorMinValue"
        @blur="setMinValueAfterBlur()"
        @input="setInputMinValue($event)"
      />
      <NumberInput
        class="ml-4"
        inputClass="text-input-default min-w-[120px] font-secondary font-medium"
        placeholder="Max"
        :value="displayedMaxValue"
        :min="min"
        :max="max"
        :errors="errorMaxValue"
        @blur="setMaxValueAfterBlur()"
        @input="setInputMaxValue($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import SliderRange from './SliderRange.vue';
import NumberInput from './NumberInput.vue';

export interface Props {
  value?: Array<number>;
  min?: number;
  max?: number;
  step?: number;
  errors?: string;
  currency?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [20, 50],
});

const emit = defineEmits(['change']);

const internalMinError = ref('');
const errorMinValue = computed(() => internalMinError.value || props.errors);

const internalMaxError = ref('');
const errorMaxValue = computed(() => internalMaxError.value || props.errors);

const internalMinValue = ref();
const displayedMinValue = computed(() =>
  errorMinValue.value ? internalMinValue.value : setMinValue.value
);
const internalMaxValue = ref();
const displayedMaxValue = computed(() =>
  errorMaxValue.value ? internalMaxValue.value : setMaxValue.value
);

const changedMinValue = ref();
const changedMaxValue = ref();

function getChangValues(data: number[]) {
  changedMinValue.value = data[0];
  changedMaxValue.value = data[1];

  emit('change', [setMinValue.value, setMaxValue.value]);
}
function setInputMinValue(value: number) {
  internalMinError.value = '';

  if (props.value && props.value[1] && value > setMaxValue.value) {
    internalMinError.value = `Value is more then ${setMaxValue.value}`;
    internalMinValue.value = value;
    changedMinValue.value = setMinValue.value;
  } else {
    changedMinValue.value = value;
  }

  emit('change', [setMinValue.value, setMaxValue.value]);
}
function setInputMaxValue(value: number) {
  internalMaxError.value = '';

  if (props.value && props.value[0] && value < setMinValue.value) {
    internalMaxError.value = `Value is less then ${setMinValue.value}`;
    internalMaxValue.value = value;
    changedMaxValue.value = setMaxValue.value;
  } else {
    changedMaxValue.value = value;
  }

  emit('change', [setMinValue.value, setMaxValue.value]);
}

function setMinValueAfterBlur() {
  internalMinError.value = '';
  changedMinValue.value = setMinValue.value;
}

function setMaxValueAfterBlur() {
  internalMaxError.value = '';
  changedMaxValue.value = setMaxValue.value;
}

const setMinValue = computed(() =>
  changedMinValue.value >= 0
    ? changedMinValue.value
    : props.value && props.value[0]
);
const setMaxValue = computed(
  () => changedMaxValue.value || (props.value && props.value[1])
);
</script>

<style scoped>
  @media screen and (max-width: 750px) {
    .wrapper {
      max-width: calc(100% - 77px);
      margin: 0 auto;
    }
  }
</style>
