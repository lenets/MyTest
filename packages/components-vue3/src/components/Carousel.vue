<template>
  <div class="flex items-center">
    <button
      type="button"
      class="carousel-button mr-12"
      :class="{disable: disableBtn === 'left'}"
      @click="slide(prevShift)"
    >
      <DropdownArrowIconVue class="rotate-90" />
    </button>
    <ul class="carousel" ref="carouselContainer">
      <slot></slot>
    </ul>
    <button
      type="button"
      class="carousel-button ml-12"
      :class="{disable: disableBtn === 'right'}"
      @click="slide(nextShift)"
    >
      <DropdownArrowIconVue class="-rotate-90" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DropdownArrowIconVue from './icons/DropdownArrowIcon.vue';

export interface Props {
  scrollValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  scrollValue: 320,
});

const prevShift = props.scrollValue * -1;
const nextShift = props.scrollValue;
const disableBtn = ref('left');

const carouselContainer = ref<HTMLElement | null>(null);

function slide(shift: number) {
  if (carouselContainer.value) {
    const maxScrollLeft = carouselContainer.value.scrollWidth - carouselContainer.value.clientWidth;
    const scrollLeft = carouselContainer.value.scrollLeft;
    carouselContainer.value.scrollBy({ left: shift, behavior: 'smooth' });
    if(scrollLeft + shift < 0) {
      disableBtn.value = 'left';
    } else {
      disableBtn.value = '';
    }
    if(scrollLeft + shift > maxScrollLeft) {
      disableBtn.value = 'right';
    }
  }
}
</script>
<style scoped>
.carousel {
  @apply flex flex-row m-0 overflow-x-auto md:overflow-x-hidden snap-x w-full px-4 pb-8 md:justify-between;
}
.carousel-button {
  @apply hidden px-4 border border-primary rounded-full w-32 h-32 md:flex items-center justify-center;
}
.carousel-button.disable {
  @apply border-[#c4c4c4];
}

.carousel-button.disable svg {
  stroke: #c4c4c4;
}
</style>
