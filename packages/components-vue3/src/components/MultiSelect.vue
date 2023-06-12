<template>
  <div class="relative">
    <Multiselect
      mode="tags"
      :value="value"
      :close-on-select="true"
      :searchable="true"
      :options="options"
      :valueProp="valueProp"
      :track-by="valueProp"
      :label="valueProp"
      :searchStart="true"
      :canClear="false"
      :max="maxItemsSelected"
      @open="$emit('open', $event)"
      @change="$emit('change', $event)"
    >
      <template v-slot:tag="{ option, handleTagRemove }">
        <div
          class="multiselect-tag"
          :class="{
            'is-default': option.isSecondary,
          }"
        >
          {{ option.name }}
          <span
            class="multiselect-tag-remove"
            :class="{
              'is-default-remove': option.isSecondary,
            }"
            @mousedown.prevent="handleTagRemove(option, $event)"
          >
            <span class="multiselect-tag-remove-icon"></span>
          </span>
        </div>
      </template>
      <template v-slot:caret>
        <MultiselectWrapIcon class="multiselect-wrap-icon text-primary shrink-0" :class="{ 'self-start': props.value.length }" />
      </template>
    </Multiselect>
    <div v-if="errors" class="error-message">
      {{ errors }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import { computed, onMounted } from 'vue';

import MapPointer from './icons/MapPointer.vue';
import FlightInternational from './icons/FlightInternational.vue';

export interface MultiChooseItem {
  name?: string;
  isSecondary?: boolean;
}

export interface Props {
  options: Array<MultiChooseItem>;
  value: Array<string>;
  valueProp: string;
  placeholder: string;
  iconName: 'location' | 'airport';
  errors?: string | string[];
  maxItemsSelected?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxItemsSelected: 20,
});

defineEmits(['change']);

const MultiselectWrapIcon = computed(() =>
  props.iconName === 'location' ? MapPointer : FlightInternational
);

onMounted(() => {
  const multiSelect = document.getElementsByClassName('multiselect')[0];
  const multiSelectWrapIcon = multiSelect.getElementsByClassName(
    'multiselect-wrap-icon'
  )[0];
  const multiSelectInput = document.getElementsByClassName(
    'multiselect-tags-search'
  )[0];

  multiSelectInput.setAttribute('placeholder', props.placeholder);
  multiSelect.insertAdjacentElement('afterbegin', multiSelectWrapIcon);
});
</script>

<style>
.multiselect {
  @apply border border-grey px-12 py-8 min-h-[58px];
}

.multiselect.is-active {
  @apply shadow-none;
}

div.multiselect-tags,
.multiselect-tags-search-wrapper,
.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label,
.multiselect-tag {
  padding: 0;
  margin: 0;
  @apply m-0 p-0;
}

div.multiselect-tag {
  margin: 0;
  font-weight: 500;
  @apply whitespace-normal
}

div.multiselect-tags {
  @apply gap-x-[10px] gap-y-[20px] ml-[12px]
}

.multiselect-tags-search-wrapper {
  min-width: 150px;
  position: relative;
  margin-left: 30px;
}

.multiselect-tags-search-wrapper::before {
  @apply w-24 h-24 top-2 -left-20 absolute z-10;
  content: '';
  background: url('../assets/addItemToInput.svg') no-repeat;
}

.multiselect-tag {
  @apply flex justify-center items-center bg-primary text-16 font-semibold rounded-[8px];
  margin: 5px;
  padding: 6px 6px 6px 14px;
}

.multiselect-tag.is-default {
  @apply bg-grey-dark;
}

.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label {
  @apply pl-44;
}

.multiselect-tags-search {
  @apply pl-8;
}

.multiselect-caret {
  @apply hidden;
}

.multiselect-tag-remove {
  @apply bg-primary ml-8 rounded-full border border-2 border-white;
  width: 24px;
  height: 24px;
}

.multiselect-tag-remove.is-default-remove:not(:hover) {
  @apply bg-grey-dark;
}

.multiselect-tags {
  padding: 3px 5px;
}

.multiselect-tag + .multiselect-input-icon {
  @apply ml-20;
}

.multiselect-tag-remove-icon {
  opacity: 1;
  width: 18px;
  height: 18px;
}
</style>
