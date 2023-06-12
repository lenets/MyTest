<template>
  <div class="relative">
    <span
      v-if="!!value"
      class="font-normal absolute -top-8 px-2 leading-none bg-white text-12 z-40"
      :class="hasIcon ? 'left-16' : 'left-12'"
      >{{ placeholder }}</span
    >
    <div v-if="hasIcon" class="absolute pt-32 pl-16 left-0 -top-16 z-10">
      <slot></slot>
    </div>

    <input
      :autocomplete="autocomplete"
      :readonly="isReadOnly"
      :type="type"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :class="[
        statusClass,
        hasIcon ? 'has-icon' : '',
        isReadOnly ? 'cursor-pointer' : '',
      ]"
      @input="$emit('input', handleInputEvent($event))"
      @focus="$emit('focus', $event)"
    />
    <Button
      v-if="errors"
      class="absolute h-16 py-34 px-16 right-0 -top-16"
      @click="$emit('clear')"
    >
      <img src="@/assets/input-error.svg" alt="Error icon" />
    </Button>
    <span v-if="errors" class="error-message"> {{ errors }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { handleInputEvent } from '../helpers';
import Button from './Button.vue';

export interface Props {
  placeholder: string;
  value: string;
  name?: string;
  type?: string;
  autocomplete?: string;
  inputClass?: string;
  errors?: string;
  success?: boolean;
  hasIcon?: boolean;
  isReadOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  name: '',
  inputClass: 'text-input-default',
  errors: undefined,
  success: false,
  isReadOnly: false,
});

const statusClass = computed(() => {
  if (props.errors) {
    return [props.inputClass, 'error'];
  } else if (props.success) {
    return [props.inputClass, 'success'];
  } else {
    return props.inputClass;
  }
});

defineEmits(['input', 'focus']);
</script>

<style>
.text-input-default {
  @apply rounded text-grey-darkest placeholder:text-[#777] text-16 p-12 w-full border border-grey outline-primary;

  &.has-icon {
    @apply pl-48;
  }
}

.text-input-default .text-input-default:focus {
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.08);
}
.text-input-default.error {
  @apply border-red;
  box-shadow: 1px 2px 4px 0px rgba(226, 31, 38, 0.16);
}
.text-input-default.success {
  @apply border-green;
  box-shadow: 1px 2px 4px 0px rgba(54, 226, 31, 0.16);
}
</style>
