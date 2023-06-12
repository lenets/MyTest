<template>
  <div class="datepicker">
    <TextInput
      :isReadOnly="true"
      :value="value"
      :placeholder="placeholder"
      @focus="$emit('focus')"
      class="cursor-pointer md:w-[264px] datepicker__placeholder"
      :inputClass="inputClass"
    />
    <span v-if="errors" class="error-message"> {{ errors }}</span>
    <Datepicker
      ref="datepicker"
      v-if="showDropdown"
      :value="value"
      inline
      autoApply
      showNowButton
      nowButtonLabel="Go to today"
      monthNameFormat="long"
      :modelType="props.format"
      :monthChangeOnScroll="false"
      :dayNames="dayNames"
      :minDate="props.minDate"
      :enableTimePicker="false"
      :clearable="true"
      :yearRange="props.yearRange"
      @update:modelValue="$emit('update', $event)"
      :locale="lang"
    >
      <template #now-button="{ selectCurrentDate }">
        <Button
          class="btn-gray-outline leading-[30px] w-[108px] px-8"
          @click="clearSelectedDate()"
        >
          {{ btnTextClear }}
        </Button>
        <Button
          class="btn-gray-outline leading-[30px] w-[108px] px-8 ml-8"
          @click="selectCurrentDate()"
        >
          {{ btnTextToday }}
        </Button>
      </template>
    </Datepicker>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import type DatepickerInstance from "@vuepic/vue-datepicker"
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

import TextInput from './TextInput.vue';
import Button from './Button.vue';

export interface Props {
  value: string;
  errors?: string;
  dayNames?: Array<string>;
  yearRange?: Array<number>;
  minDate?: Date;
  format?: string;
  placeholder?: string;
  showDropdown?: boolean;
  btnTextClear?: string;
  btnTextToday?: string;
  lang?: 'en' | 'de';
  inputClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  yearRange: () => [new Date().getFullYear(), new Date().getFullYear() + 8],
  minDate: () => new Date(),
  format: 'dd.MM.yyyy',
  placeholder: 'Choose date',
  showDropdown: true,
  btnTextClear: 'Clear',
  btnTextToday: 'Go to today',
  lang: 'en',
});

const dayNames =
  props.lang === 'en'
    ? ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    : ['M', 'D', 'M', 'D', 'F', 'S', 'S'];

const emit = defineEmits(['update', 'focus']);

const datepicker = ref<typeof DatepickerInstance>();

function clearSelectedDate() {
  datepicker?.value?.clearValue();
  emit('update', '');
}

</script>

<style>
.dp__month_year_row {
  position: initial;
}

.dp__menu {
  @apply p-16 text-14 border-none w-full max-w-[500px] md:w-[264px] z-10;
  box-shadow: 0px 0px 1px rgba(26, 32, 36, 0.32),
    0px 12px 24px rgba(91, 104, 113, 0.24);
}
.dp__cell_inner,
.dp__calendar_header_item {
  @apply w-32 h-32 p-0;
}

.dp__cell_inner {
  @apply rounded-[6px];
}

.dp__date_hover_end:hover,
.dp__date_hover_start:hover,
.dp__date_hover:hover {
  background-color: #eef0f2;
}

.dp__today {
  @apply border-none;
}

.dp__today:not(.dp__range_end, .dp__range_start, .dp__active_date, .dp__cell_disabled) {
  @apply text-primary font-semibold;
}

.dp__cell_disabled {
  @apply line-through;
  color: #d5dadd;
}

.dp__range_end,
.dp__range_start,
.dp__active_date,
.dp__overlay_cell_active {
  @apply bg-primary;
}

.dp__month_year_select {
  @apply h-32 font-semibold;
}

.dp__overlay_cell_pad {
  @apply text-13;
}

.dp__overlay_col {
  @apply p-2;
  width: calc(100% / 3);
}

.dp__calendar_header_item {
  @apply flex items-center justify-center font-normal text-14;
  color: #9aa6ac;
  letter-spacing: -0.006em;
}
</style>
