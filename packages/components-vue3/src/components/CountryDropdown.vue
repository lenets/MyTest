<template>
  <div class="mb-24 w-full md:w-1/2 relative">
    <div v-click-away="close">
      <div class="">
        <div
          class="select cursor-pointer mr-0 md:mr-16"
          :class="[dropdownIsOpen ? 'active' : undefined]"
          @click="dropdownIsOpen = !dropdownIsOpen"
        >
          <span v-if="!!selectedCountry" class="text-black">
            {{ selectedCountry }}
          </span>
          <div v-else class="flex justify-between w-full">
            <span class="text-16"> Country of residence </span>
            <IconDropdownArrow class="ml-12" />
          </div>
        </div>
      </div>
      <Transition name="dropdown-fade">
        <div
          v-if="dropdownIsOpen && countryNames"
          class="absolute bg-white pt-16 z-10 shadow-box-1 rounded-md w-full md:w-[calc(100%-16px)]"
        >
          <TextInput
            :value="searchValue"
            @input="searchValue = $event"
            class="mx-16 mb-16"
            placeholder="Search Country"
          />
          <ul class="overflow-auto max-h-250">
            <li
              v-for="(item, index) in filteredCountres"
              :key="index"
              class="p-12 ml-16"
              :class="
                selectedCountry == item.country
                  ? 'bg-primary-light flex justify-between'
                  : ''
              "
              @click="
                $emit('input', item.country);
                close();
              "
            >
              <span class="text-14"> {{ item.country }}</span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
    <div v-if="errors" class="error-message">{{ errors }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { defaultPhoneCodes as countryNames } from '../defaultPhoneCodes';
import TextInput from './TextInput.vue';
import IconDropdownArrow from './icons/DropdownArrowIcon.vue';

export interface Props {
  placeholder: string;
  value: string;
  errors?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  value: '',
});

const selectedCountry = computed(() => {
  const countryIndex = countryNames.findIndex((x) => x.country === props.value);
  if (countryIndex > -1) {
    return countryNames[countryIndex].country;
  }
});

const dropdownIsOpen = ref(false);

function close() {
  dropdownIsOpen.value = false;
}

const searchValue = ref('');

const filteredCountres = computed(() =>
  searchValue.value
    ? countryNames.filter((x) =>
        x.country.toLowerCase().includes(searchValue.value.toLowerCase())
      )
    : countryNames
);

defineEmits(['input']);
</script>

<style scoped>
.select {
  @apply rounded p-16 h-48 flex items-center cursor-pointer text-grey-darkest border border-grey;
}

li:hover {
  @apply bg-primary-lighter cursor-pointer;
}
</style>
