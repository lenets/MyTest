<template>
  <div :class="errors ? 'mb-24' : ''">
    <div class="relative flex justify-between">
      <div v-click-away="close" class="flex-shrink-0">
        <div class="relative w-120">
          <div
            class="select cursor-pointer"
            :class="[dropdownIsOpen ? 'active' : undefined]"
            @click="dropdownIsOpen = !dropdownIsOpen"
          >
            <span v-if="!!selectedCode" class="flex w-100">
              <span class="relative text-black">
              +{{ selectedCode }}
              </span>
              <IconDropdownArrow class="ml-auto" />
              </span>
            <span v-else class="flex items-center">
              <span class="text-16"> Land </span>
              <IconDropdownArrow class="ml-12" />
            </span>
          </div>
        </div>
        <Transition name="dropdown-fade">
          <div
            v-if="dropdownIsOpen && phoneCodes"
            class="absolute bg-white pt-16 z-10 shadow-box-1 rounded-md"
          >
            <TextInput
              :value="searchValue"
              @input="searchValue = $event"
              class="mx-16"
              placeholder="Search Country"
            />
            <ul class="overflow-auto w-250 max-h-250">
              <li
                v-for="(item, index) in filteredPhoneCodes"
                :key="index"
                class="p-12"
                :class="
                  selectedCode == item.code
                    ? 'bg-primary-light flex justify-between'
                    : ''
                "
                @click="
                  $emit('input', '+' + item.code + onlyNumber);
                  close();
                "
              >
                <span class="text-14"
                  ><span class="font-bold w-60 inline-block"
                    >+{{ item.code }}</span
                  >
                  <span>{{ item.country }}</span></span
                >
              </li>
            </ul>
          </div>
        </Transition>
      </div>
      <!-- type is text because in phones we should have a not a all keyboard but only numbers -->
      <input
        class="text-input-default ml-24"
        inputmode="numeric"
        type="text"
        :value="onlyNumber"
        :placeholder="placeholder"
        @input="
          $emit(
            'input',
            !!selectedCode
              ? '+' + selectedCode + handleInputEvent($event)
              : handleInputEvent($event)
          )
        "
      />
    </div>
    <div v-if="errors" class="error-message">{{ errors }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { defaultPhoneCodes } from '../defaultPhoneCodes';
import { germanPhoneCodes } from '../germanPhoneCodes';
import { handleInputEvent } from '../helpers';
import TextInput from './TextInput.vue';
import IconDropdownArrow from './icons/DropdownArrowIcon.vue';

export interface Props {
  placeholder: string;
  value: string;
  errors?: string;
  phoneCodesLang?: 'en' | 'de';
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  value: '',
  phoneCodesLang: 'en',
});

const phoneCodes =
  props.phoneCodesLang === 'en' ? defaultPhoneCodes : germanPhoneCodes;

const selectedCode = computed(() => {
  if (props.value[0] === '+') {
    for (let i = 1; i < 4; i++) {
      const codeIndex = phoneCodes.findIndex(
        (x) => x.code === props.value.substr(1, i)
      );
      if (codeIndex > -1) {
        return phoneCodes[codeIndex].code;
      }
    }
  } else {
    return '';
  }
});

const onlyNumber = computed(() => {
  if (props.value[0] === '+') {
    return props.value.substr((selectedCode.value?.length || -1) + 1);
  } else {
    return props.value;
  }
});

const dropdownIsOpen = ref(false);

function close() {
  dropdownIsOpen.value = false;
}

const searchValue = ref('');

const filteredPhoneCodes = computed(() =>
  searchValue.value
    ? phoneCodes.filter(
        (x) =>
          x.country.toLowerCase().includes(searchValue.value.toLowerCase()) ||
          x.code.includes(
            searchValue.value.startsWith('+')
              ? searchValue.value.slice(1)
              : searchValue.value
          )
      )
    : phoneCodes
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
