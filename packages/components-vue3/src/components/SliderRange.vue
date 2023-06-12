<template>
  <div class="relative h-[2px] bg-[#DDE2E4]" ref="sliderRange">
    <span
      class="block absolute bg-primary h-[4px] top-0 left-0"
      :style="rangeStyle"
    ></span>
    <span
      class="slider-range block absolute cursor-grab h-20 w-20 bg-primary ring-1 ring-inset ring-primary rounded-full"
      :style="rangeStartHandleStyle"
      @touchstart.passive="onDragStart($event, 0)"
      @touchmove.passive="onDrag($event)"
      @touchend="onDragEnd()"
      @mousedown="onMouseDown($event, 0)"
    >
      <span
        class="slider-range__value absolute text-primary text-12 font-semibold p-4 leading-4 ring-1 ring-inset ring-[#777] rounded-[4px] whitespace-nowrap mb-4 bg-white select-none"
      >
        {{ currency }} {{ value[0] }}
      </span>
    </span>
    <span
      class="slider-range block absolute cursor-grab h-20 w-20 bg-primary ring-1 ring-inset ring-primary rounded-full"
      :style="rangeEndHandleStyle"
      @touchstart.passive="onDragStart($event, 1)"
      @touchmove.passive="onDrag($event)"
      @touchend="onDragEnd()"
      @mousedown="onMouseDown($event, 1)"
    >
      <span
        class="slider-range__value flex items-center absolute text-primary text-12 font-semibold leading-4 p-4 ring-1 ring-inset ring-[#777] rounded-[4px] whitespace-nowrap mb-4 bg-white select-none"
      >
        {{ currency }}
        {{ value[1] }}
        <div class="ml-2 mb-2 text-[12px]" v-if="value[1] === max">+</div>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface Props {
  value: Array<number>;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [20, 50],
  min: 0,
  max: 100,
  step: 1,
  currency: 'USD',
});

const emit = defineEmits(['change']);

const sliderRange = ref();

let dragging: boolean = false;
let handleIndex: 0 | 1 = 0;
let initX: number = 0;
let barWidth: number = 0;
let dragListener: ((event: MouseEvent | TouchEvent) => void) | undefined =
  undefined;
let dragEndListener: (() => void) | undefined = undefined;

function updateDomData() {
  const getWindowScrollLeft =
    (window.pageXOffset || document.documentElement.scrollLeft) -
    (document.documentElement.clientLeft || 0);

  let rect = sliderRange.value.getBoundingClientRect();
  initX = rect.left + getWindowScrollLeft;
  barWidth = sliderRange.value.offsetWidth;
}

function setValue(event: MouseEvent | TouchEvent) {
  let pageX;
  if (event instanceof TouchEvent) {
    pageX = event.touches[0].pageX;
  } else {
    pageX = event.pageX;
  }

  const handleValue = ((pageX - initX) * 100) / barWidth;
  let newValue = (props.max - props.min) * (handleValue / 100) + props.min;

  if (props.step) {
    const oldValue = props.value[handleIndex];
    const diff = newValue - oldValue;

    if (diff < 0)
      newValue =
        oldValue +
        Math.ceil(newValue / props.step - oldValue / props.step) * props.step;
    else if (diff > 0)
      newValue =
        oldValue +
        Math.floor(newValue / props.step - oldValue / props.step) * props.step;
  } else {
    newValue = Math.floor(newValue);
  }

  updateModel(event, newValue);
}

function updateModel(event: MouseEvent | TouchEvent, value: number) {
  let newValue = parseFloat(value.toFixed(10));

  let modelValue = props.value ? [...props.value] : [];

  if (handleIndex == 0) {
    let maxValue = props.value ? props.value[1] : props.max;

    if (newValue < props.min) newValue = props.min;
    else if (newValue >= maxValue) newValue = maxValue;

    modelValue[0] = newValue;
    modelValue[1] = modelValue[1] || props.max;
  } else {
    let minValue = props.value ? props.value[0] : props.min;

    if (newValue > props.max) newValue = props.max;
    else if (newValue <= minValue) newValue = minValue;

    modelValue[0] = modelValue[0] || props.min;
    modelValue[1] = newValue;
  }

  emit('change', modelValue);
}

function onDragStart(event: MouseEvent | TouchEvent, index: 0 | 1) {
  dragging = true;
  updateDomData();

  props.value[0] === props.max ? (handleIndex = 0) : (handleIndex = index);
}

function onDrag(event: MouseEvent | TouchEvent) {
  dragging && setValue(event);
}

function onDragEnd() {
  dragging && (dragging = false);
}

function bindDragListeners() {
  if (!dragListener) {
    dragListener = onDrag.bind(sliderRange.value);
    document.addEventListener('mousemove', dragListener);
  }

  if (!dragEndListener) {
    dragEndListener = onDragEnd.bind(sliderRange.value);
    document.addEventListener('mouseup', dragEndListener);
  }
}

function onMouseDown(event: MouseEvent, index: 0 | 1) {
  bindDragListeners();
  onDragStart(event, index);
}

const rangeStyle = computed(() => ({
  left: rangeStartPosition.value + '%',
  width:
    rangeEndPosition.value < rangeStartPosition.value
      ? '0%'
      : rangeEndPosition.value - rangeStartPosition.value + '%',
}));
const rangeStartPosition = computed(() => {
  if (props.value[0] < props.min) {
    return ((0 - props.min) * 100) / (props.max - props.min);
  } else if (props.value[0] > props.max) {
    return ((100 - props.min) * 100) / (props.max - props.min);
  } else {
    return ((props.value[0] - props.min) * 100) / (props.max - props.min);
  }
});
const rangeEndPosition = computed(() => {
  if (props.value[1] > props.max) {
    return ((100 - props.min) * 100) / (props.max - props.min);
  } else if (props.value[1] < props.min) {
    return ((0 - props.min) * 100) / (props.max - props.min);
  } else {
    return ((props.value[1] - props.min) * 100) / (props.max - props.min);
  }
});
const rangeStartHandleStyle = computed(() => {
  return {
    left: rangeStartPosition.value + '%',
  };
});
const rangeEndHandleStyle = computed(() => {
  return {
    left: rangeEndPosition.value + '%',
  };
});
</script>

<style>
.slider-range {
  top: 50%;
  margin-top: -0.625rem;
  margin-left: -0.625rem;
}

.slider-range__value {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
