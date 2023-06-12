<template>
  <div class="monthpicker">
    <Carousel>
      <label
        v-for="item in items"
        class="hover:cursor-pointer py-4 pr-8 md:px-8"
        :key="item.id"
      >
        <input
          class="month-picker__input hidden input"
          :checked="isChecked(item.id)"
          type="checkbox"
          :name="name"
          @change="$emit('change', getEmitedValue(item.id))"
        />
        <div
          class="month-wrapper checked-fill text-black leading-4 ring-1 rounded-xl ring-grey-light bg-white"
        >
          <div class="flex flex-col items-center justify-center w-[89px] h-[104px]">
            <MonthPickerIcon class="month-picker-icon-fill" />
            <div class="mt-10 text-16">{{ item.name }}</div>
            <div class="mt-4 text-12">{{ item.year }}</div>
          </div>
        </div>
      </label>
    </Carousel>

    <span v-if="errors" class="error-message"> {{ errors }}</span>
  </div>
</template>

<script setup lang="ts">
import MonthPickerIcon from './icons/MonthPickerIcon.vue';
import Carousel from './Carousel.vue';

export interface DateItem {
  name: string;
  year: string;
  id: string;
}

export interface Props {
  items: DateItem[];
  name: string;
  value: string[];
  errors?: string;
}
const props = withDefaults(defineProps<Props>(), {
  value: () => [],
});

function getEmitedValue(item: string) {
  if (isChecked(item)) {
    return (props.value as string[]).filter((x) => x != item);
  }
  return [...(props.value as string[]), item];
}

function isChecked(itemId: string) {
  return props.value?.some((x) => x === itemId);
}

defineEmits(['change']);
</script>

<style scoped>
.month-wrapper {
  @apply text-[#c4c4c4];
}
.input:checked + .checked-fill {
  @apply text-white bg-primary;
}

.input:hover + .checked-fill {
  @apply transition ease-in-out ring-2 duration-300;
}

.month-picker-icon-fill {
  @apply text-grey-dark;
}

.input:checked + .checked-fill .month-picker-icon-fill {
  @apply text-white;
}
</style>
