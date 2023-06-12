<script setup lang="ts">
import { computed, ref } from 'vue';
import IconDropdownArrow from './icons/DropdownArrowIcon.vue';
import IconCheck from './icons/IconCheck.vue';

// import TextInput from '~/components/form/TextInput.vue';

export interface Props {
  items: Array<{
    id: string;
    name: string;
  }>;
  value?: string;
  valueKey?: 'id' | 'name'; // default is id, but there can be other values
  placeholder?: string;
  search?: boolean;
  errors?: Array<string>;
  help?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  valueKey: 'id',
  placeholder: 'Placeholder',
  search: true,
});

defineEmits(['input']);

const dropdownIsOpen = ref(false);
function close() {
  dropdownIsOpen.value = false;
}
const selectedItem = computed(() => {
  if (props.value) {
    return props.items.find(
      (x) => x[props.valueKey as keyof typeof x] === props.value
    );
  }

  return undefined;
});

const searchValue = ref('');

const matchingItems = computed(() => {
  if (searchValue.value) {
    return props.items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  }

  return props.items;
});

function toggleOpen() {
  const open = props.disabled ? false : !dropdownIsOpen.value;
  dropdownIsOpen.value = open;
}
</script>

<template>
  <div v-click-away="close" class="relative">
    <div
      tabindex="0"
      class="select"
      :class="[
        dropdownIsOpen ? 'active' : undefined,
        disabled ? 'disabled' : undefined,
      ]"
      @click="toggleOpen()"
      @keypress.enter="toggleOpen()"
      @keypress.space="toggleOpen()"
    >
      <span v-if="!!value" class="relative">
        <span
          class="text-black font-normal absolute -top-16 -left-2 px-2 leading-none bg-white text-12 whitespace-nowrap"
          >{{ placeholder }}</span
        >
        <span v-if="selectedItem" class="text-black">
          {{ selectedItem.name }}
        </span>
      </span>
      <span v-else class="text-16">
        {{ placeholder }}
      </span>
      <IconDropdownArrow v-if="!disabled"></IconDropdownArrow>
    </div>

    <span v-if="errors" class="error-message"> {{ errors }}</span>
    <span class="text-grey-dark text-12"> {{ help }}</span>

    <Transition name="dropdown-fade">
      <div
        v-if="dropdownIsOpen && items"
        class="absolute bg-white pt-16 z-10 shadow-box-1 rounded-md w-full"
      >
        <!-- <TextInput
          v-if="search && items.length > 6"
          v-model="searchValue"
          class="mx-16"
          placeholder="Search"
        /> -->
        <ul
          :class="['overflow-auto', 'w-full', 'max-h-250']"
          :style="search ? 'min-height: 100px' : undefined"
        >
          <li
            v-for="item in matchingItems"
            :key="item[valueKey]"
            class="p-12 flex justify-between items-center"
            :class="value == item.id ? 'bg-secondary-lighter' : ''"
            @click="
              $emit('input', item[valueKey]);
              close();
            "
          >
            <span class="text-14">{{ item.name }}</span>
            <IconCheck
              class="h-12 text-secondary stroke-current"
              v-if="value == item.id"
            />
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.select {
  @apply w-full rounded-md p-16 font-medium h-48 bg-white flex items-center cursor-pointer text-grey border justify-between;
}
.active {
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.08);
}
.disabled {
  @apply bg-grey-lighter;
  &:hover {
    @apply border-grey-dark border cursor-not-allowed;
  }
}
.disabled span {
  @apply text-grey-darker;
}
li:hover {
  @apply bg-primary cursor-pointer;
}
.stroke-current {
  stroke: currentColor;
}
</style>
