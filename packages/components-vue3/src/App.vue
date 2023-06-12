<script setup lang="ts">
import { ref } from 'vue';

import MenuPills from './components/MenuPills.vue';
import Button from './components/Button.vue';
import RadioButton from './components/RadioButton.vue';
import Dropdown from './components/Dropdown.vue';
import TextInput from './components/TextInput.vue';
import SelectInput from './components/SelectInput.vue';
import Counter from './components/Counter.vue';
import ToggleSwitch from './components/ToggleSwitch.vue';
import Stepper from './components/Stepper.vue';
import MultiSelect from './components/MultiSelect.vue';
import DatePicker from './components/DatePicker.vue';
import SliderRangeWithNumberInput from './components/SliderRangeWithNumberInput.vue';
import PhoneNumberInput from './components/PhoneNumberInput.vue';
import TextArea from './components/TextArea.vue';
import MonthPicker from './components/MonthPicker.vue';

import TextInputIconEmail from './components/icons/IconEmail.vue';
import { getMonths } from './helpers';

const menuPillsCheckedMultiValues = ref([]);
const menuPillsCheckedSingleValue = ref();
const menuPillsItems: Array<string> = [
  'up to 1 week',
  'up to 2 weeks',
  'longer',
  'not sure yet',
];

const selectInputValue = ref();
const selectInputItems: Array<{ name: string; id: string }> = [
  { id: '1', name: 'Cat' },
  { id: '2', name: 'Dog' },
  { id: '3', name: 'Wasp' },
];

const radioButtonOption = ref('');
const radioButtonOptionsList: {
  id: string;
  name: string;
}[] = [
  {
    id: 'A',
    name: 'A',
  },
  {
    id: 'B',
    name: 'B',
  },
  {
    id: 'C',
    name: 'C',
  },
];

const counterAdultsCount = ref<number>(3);
const counterChildrenNumber = ref<number>(2);

const textInputName = ref('Bob');
const textInputSurname = ref('Kowalsky');

const stepperCurrentStep = ref(2);
interface Step {
  name?: string;
  key: string;
  link: string;
}

const stepperAvailableSteps: Step[] = [
  { key: '1', link: 'first' },
  { key: '2', link: 'second' },
  { key: '3', link: 'third' },
  { key: '4', link: 'fourth' },
];
const stepperPrevStep = () => stepperCurrentStep.value--;
const stepperNextStep = () => stepperCurrentStep.value++;

const toggleSwitchValue = ref('0');
const toggleSwitchOptions = [
  {
    id: '0',
    name: 'Choose dates',
  },
  {
    id: '1',
    name: 'I have a rough idea',
  },
];

const multiSelectOptions = [
  {
    name: 'Judy',
    isSecondary: false,
  },
  {
    name: 'Jane',
    isSecondary: true,
  },
  {
    name: 'John',
    isSecondary: false,
  },
  {
    name: 'Joe',
    isSecondary: true,
  },
  {
    name: 'Peter',
    isSecondary: true,
  },
  {
    name: 'Igor',
    isSecondary: false,
  },
];
const multiSelectedBeforeOptions = ['Igor'];
const multiSelectValues = ref(multiSelectedBeforeOptions);

const textInputEmail = ref('');

const selectedDate = ref('');
const selectedDateFrom = ref('');
const selectedDateTo = ref('');

const sliderMin = ref(0);
const sliderMax = ref(100);
const sliderRangeValues = ref([20, 50]);

const phoneInputNumber = ref('');

const textAreaContent = ref('Some content from App.vue');
const textAreaPlaceholder =
  'Tell your local travel expert more about what you are looking for in your trip. This helps them to fit in things you might love or need - be it special sights or experiences, specific food, or assistance.';

const monthPickerItems = getMonths(new Date());

const monthPickerValues = ref(['2022-10']);
</script>

<template>
  <h1>Component list</h1>
  <main class="main-container">
    <section>
      <label> PhoneNumberInput </label>
      <div class="mb-32">PhoneNumberInput: {{ phoneInputNumber }}</div>
      <PhoneNumberInput
        :value="phoneInputNumber"
        @input="phoneInputNumber = $event"
        placeholder="Phone number"
      />
    </section>

    <section>
      <label> Menu Pills </label>
      <div>
        <b>menuPillsCheckedMultiValues:</b> {{ menuPillsCheckedMultiValues }}
      </div>
      <div class="mb-16">
        <b>menuPillsCheckedSingleValue:</b> {{ menuPillsCheckedSingleValue }}
      </div>
      <MenuPills
        :items="menuPillsItems"
        name="enterNameForThisGroupOfCheckboxes"
        mode="multi"
        @change="menuPillsCheckedMultiValues = $event"
        :value="menuPillsCheckedMultiValues"
      ></MenuPills>

      <MenuPills
        :items="menuPillsItems"
        name="enterNameForThisGroupOfRadios"
        mode="single"
        @change="menuPillsCheckedSingleValue = $event"
        :value="menuPillsCheckedSingleValue"
      ></MenuPills>
    </section>

    <section>
      <label> Button </label>
      <Button class="btn-primary h-48 py-10 px-16 m-12"> btn-primary </Button>
      <Button class="btn-secondary h-48 py-10 px-16 m-12">
        btn-secondary
      </Button>
      <Button class="btn-primary-outline h-48 py-10 px-16 m-12">
        btn-primary-outline
      </Button>
      <Button class="btn-secondary-outline h-48 py-10 px-16 m-12">
        btn-secondary-outline
      </Button>
      <Button class="btn-disabled h-48 py-10 px-16 m-12"> btn-disabled </Button>
    </section>

    <section>
      <label> Counter </label>
      <div>Number of Adults {{ counterAdultsCount }}</div>
      <div>Number of Children {{ counterChildrenNumber }}</div>
      <Counter :title="'Adults'" v-model="counterAdultsCount" />

      <Counter
        :title="'Children'"
        v-model="counterChildrenNumber"
        :subTitle="'Age 2 to 12 years'"
      />
    </section>

    <section>
      <label> Dropdown </label>
      <Button class="btn-primary-outline px-24 py-16">
        Click to open dropdown
        <Dropdown>content</Dropdown>
      </Button>
    </section>

    <section>
      <label> Select </label>
      <SelectInput
        :items="selectInputItems"
        :value="selectInputValue"
        @input="selectInputValue = $event"
        placeholder="Example placeholder"
      ></SelectInput>
    </section>

    <section>
      <label> RadioButton </label>
      <div class="mb-12">
        Example value of radio button: {{ radioButtonOption }}
      </div>
      <RadioButton
        name="nameOfRadioButtonsGroup"
        :items="radioButtonOptionsList"
        v-model="radioButtonOption"
      />
    </section>

    <section>
      <label> TextInput </label>
      <div class="my-24">Your Name: {{ textInputName }}</div>

      <TextInput
        class="mb-24"
        :value="textInputName"
        @input="textInputName = $event"
        placeholder="Your Name"
      />
      <TextInput
        class="mb-24"
        :value="textInputSurname"
        @input="textInputSurname = $event"
        :errors="'We have an error'"
        placeholder="Your Surname"
      />
      <TextInput
        class="mb-24"
        :value="textInputEmail"
        @input="textInputEmail = $event"
        placeholder="E-mail Address"
        :hasIcon="true"
      >
        <TextInputIconEmail class="h-14 text-primary" />
      </TextInput>
    </section>

    <section>
      <label> Stepper </label>
      <div class="my-24">Current Step: {{ stepperCurrentStep }}</div>
      <Stepper
        :active-step="String(stepperCurrentStep)"
        :active-step-number="stepperCurrentStep"
        :steps="stepperAvailableSteps"
      />

      <Button class="m-12" @click="stepperPrevStep">prev Step</Button>
      <Button class="m-12" @click="stepperNextStep">next Step</Button>
    </section>

    <section>
      <label> ToggleSwitch </label>
      <div class="mb-16">toggleSwitchValue: {{ toggleSwitchValue }}</div>
      <ToggleSwitch :items="toggleSwitchOptions" v-model="toggleSwitchValue" />
    </section>

    <section>
      <label> MultiSelect </label>
      <div class="mb-16">multiSelectValues: {{ multiSelectValues }}</div>
      <MultiSelect
        valueProp="name"
        placeholder="Add destination"
        iconName="location"
        :value="multiSelectedBeforeOptions"
        :options="multiSelectOptions"
        @change="multiSelectValues = $event"
      ></MultiSelect>
    </section>

    <section>
      <label> Datepicker </label>
      <div class="my-24">Selected date: {{ selectedDate }}</div>
      <DatePicker
        format="dd.MM.yyyy"
        :value="selectedDate"
        :minDate="new Date()"
        @update="selectedDate = $event"
      ></DatePicker>
      <div class="my-24">Selected date FROM: {{ selectedDateFrom }}</div>
      <DatePicker
        format="dd.MM.yyyy"
        :value="selectedDateFrom"
        :minDate="new Date()"
        @update="selectedDateFrom = $event"
      ></DatePicker>
      <div class="my-24">Selected date TO: {{ selectedDateTo }}</div>
      <DatePicker
        format="dd.MM.yyyy"
        :value="selectedDateTo"
        :minDate="new Date(selectedDateFrom.split('.').reverse().join('-'))"
        @update="selectedDateTo = $event"
      ></DatePicker>
    </section>

    <section>
      <label> Slider Range </label>
      <div class="mt-24 mb-48">
        Slider range values: {{ sliderRangeValues }}
      </div>

      <SliderRangeWithNumberInput
        :value="sliderRangeValues"
        :min="sliderMin"
        :max="sliderMax"
        @change="sliderRangeValues = $event"
      />
    </section>

    <section>
      <label> TextArea </label>
      <textarea class="mb-32">{{ textAreaContent }}</textarea>
      <TextArea
        v-model="textAreaContent"
        :placeholder="textAreaPlaceholder"
      ></TextArea>
    </section>

    <section>
      <label> Month Picker </label>
      <div class="my-28">Month picker values: {{ monthPickerValues }}</div>
      <MonthPicker
        :items="monthPickerItems"
        name="enterNameForThisGroupOfCheckboxes"
        @change="monthPickerValues = $event"
        :value="monthPickerValues"
      ></MonthPicker>
    </section>
  </main>
</template>

<style scoped>
.main-container section {
  @apply block border border-dotted border-grey-light p-20;
}

section + section {
  @apply mt-32;
}

.main-container label {
  @apply block font-bold mb-24;
}
</style>
