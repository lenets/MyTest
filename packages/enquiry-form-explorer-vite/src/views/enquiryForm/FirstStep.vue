<script setup lang="ts">
import {
  Submit,
  RadioButton,
  ToggleSwitch,
  MenuPills,
  TextInput,
  DatePicker,
  MultiSelect,
  MonthPicker,
  PointerHeading,
  MultiInputsWithCounter,
  Spinner
} from 'components-vue3';

import {
  destinationsOptions,
  pickedDateOptions,
  newsletterAgreementOptions,
  travelDurationOptions,
  PickedDateSelectionOption,
  Steps,
} from '@/enquiryContentData';

import {
  getMonths,
  focusDatePickerInput,
  blurDatePickerInput,
  hasUrlParam,
  getSiteData,
} from '@/helpers';
import parse from 'date-fns/parse';

import { useEnquiryForm } from '@/useEnquiryForm';
import { proccess } from '@/hubspot';
import { useRouter, useRoute } from 'vue-router';

import IconEmail from '@/components/icons/IconEmail.vue';
import EnquiryFormWrapper from '@/components/EnquiryFormWrapper.vue';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const isPending = ref(false);
const siteData = getSiteData();

const monthPickerItems = getMonths(new Date());

const { formData, utmData, validateForm, getFieldErrors, scrollToErrorMessage } =
  useEnquiryForm();

function isStepValid() {
  return validateForm([
    'emailAdress',
    'preferredDestinations',
    'pickedDateSelectionOption',
    'newsletterAgreement',
    'preferredTravelDuration',
  ]);
}

const currentCalendar = ref('first');
const isMobile = ref(false);

const firstDatePicker = ref<InstanceType<typeof DatePicker> | null>(null);
const secondDatePicker = ref<InstanceType<typeof DatePicker> | null>(null);

function focusFirstDatePicker() {
  isMobile.value = window.innerWidth <= 768;
  if (isMobile.value) {
    focusDatePickerInput(firstDatePicker.value!);
  }
}

// Exception type any as LocationQuery;
const urlParams: any = route.query;

function setMetaParamsWithDestinationsOptions() {
  const additionalOptions: typeof destinationsOptions = [];
  const destinationsFromParams: string[] = [];
  const hasDestinationParam = hasUrlParam(urlParams, 'destination');
  const hasItineraryParam = hasUrlParam(urlParams, 'itinerary');
  const hasPriceParam = hasUrlParam(urlParams, 'price');
  const hasRegionParam = hasUrlParam(urlParams, 'region');
  const hasThumbnailUrl = hasUrlParam(urlParams, 'thumbnailUrl');

  for (let key in urlParams) {
    if(key === 'utm_campaign' || key === 'utm_medium' || key === 'utm_source') {
      utmData.value[key] = urlParams[key];
    }
  }

  if (hasPriceParam && Math.trunc(urlParams.price) !== 0) {
    formData.value.metaPrice = Math.trunc(urlParams.price).toString();
    formData.value.budgetValue[0] = +urlParams.price;
    formData.value.budgetValue[1] = Math.ceil(urlParams.price * 1.15);
  }

  if (hasRegionParam) {
    formData.value.metaRegion = urlParams.region;
  }

  if (hasDestinationParam) {
    additionalOptions.push({
      name: urlParams.destination,
      isSecondary: false,
    });

    destinationsFromParams.push(urlParams.destination);

    formData.value.metaDestination = urlParams.destination;
  }

  if (hasItineraryParam) {
    formData.value.metaItinerary = urlParams.itinerary;
  }

  if (destinationsFromParams.length > 0) {
    formData.value.preferredDestinations = destinationsFromParams;
  }

  if (formData.value.preferredDestinations.length > 0) {
    formData.value.preferredDestinations.forEach((item) => {
      if (item === formData.value.metaDestination) {
        additionalOptions.push({
          name: item,
          isSecondary: false,
        });
      }

      if (item === formData.value.metaItinerary) {
        additionalOptions.push({ name: item, isSecondary: true });
      }
    });
  }

  if (hasThumbnailUrl) {
    formData.value.metaThumbnailUrl = urlParams.thumbnailUrl;
  }

  return [...additionalOptions, ...destinationsOptions];
}

const destinationsOptionsWithParams = setMetaParamsWithDestinationsOptions();

async function submit() {
  if (!isStepValid()) {
    scrollToErrorMessage();
    return;
  }

  isPending.value = true;

  try {
    await proccess();
  } finally {
    formData.value.sendingStatus = Steps.second;
    router.push({ name: 'second' });
    isPending.value = false;
  }
}

const destinationScroll = ref<null | HTMLElement>(null);
function scrollToDestination() {
  if(window.innerWidth <= 600) {
    destinationScroll.value?.scrollIntoView({ behavior: "smooth" });
  }
}

router.replace('/');

</script>

<template>
  <EnquiryFormWrapper>
    <div class="mt-48 mb-50 first-step">
      <h1 class="step-title">
        {{ siteData.firstStepTitle }}
      </h1>
      <div class="mb-40 mb:mb-48 flex" v-if="formData.metaDestination">
        <div v-if="formData.metaThumbnailUrl" class="mr-24">
          <img class="rounded-[8px]" :src="formData.metaThumbnailUrl" :alt="formData.metaDestination">
        </div>
        <div class="font-secondary">
          <h2 class="text-18 font-bold mb-16 text-primary-dark">{{ formData.metaDestination }}</h2>
          <span class="text-primary font-semibold font-18" v-if="formData.metaPrice">ab € {{ new Intl.NumberFormat('de-DE').format(+formData.metaPrice) }},-</span>
        </div>
      </div>
      <form
        @submit.prevent="submit()"
      >
        <fieldset class="mb-48 relative" v-if="!formData.metaItinerary">
          <div class="absolute top-[-90px]" ref="destinationScroll"></div>
          <PointerHeading
            title="Wohin willst Du reisen? *"
            subtitle="(Maximal 3 Ziele)"
          />
          <MultiSelect
            valueProp="name"
            placeholder="Ziel hinzufügen"
            iconName="location"
            :errors="getFieldErrors('preferredDestinations')"
            :value="formData.preferredDestinations"
            :options="destinationsOptionsWithParams"
            :maxItemsSelected="3"
            @change="formData.preferredDestinations = $event"
            @open="scrollToDestination"
          ></MultiSelect>
        </fieldset>

        <fieldset class="mb-48">
          <PointerHeading
            title="Weißt Du bereits, wann genau Du reisen willst? *"
          />
          <ToggleSwitch
            :items="pickedDateOptions"
            :modelValue="formData.pickedDateSelectionOption"
            @update:modelValue="($event) => {
              if($event === PickedDateSelectionOption.calendars) {
                formData.selectedMonths = [];
                formData.preferredTravelDuration = '';
              } else {
                formData.selectedDateFrom = '';
                formData.selectedDateTo = '';
              }
              formData.pickedDateSelectionOption = $event;
            }"
          />
          <div
            v-if="
              formData.pickedDateSelectionOption ===
              PickedDateSelectionOption.calendars
            "
          >
            <div class="max-w-[400px] md:flex mt-24">
              <DatePicker
                format="yyyy-MM-dd"
                :value="formData.selectedDateFrom"
                :minDate="new Date()"
                ref="firstDatePicker"
                @vue:mounted="focusFirstDatePicker()"
                @update="
                  formData.selectedDateFrom = $event;
                  currentCalendar = 'second';
                  isMobile ? focusDatePickerInput(secondDatePicker!) : null;
                "
                @focus="currentCalendar = 'first'"
                :showDropdown="isMobile ? currentCalendar === 'first' : true"
                :placeholder="siteData.datePickerStartLabel"
                btnTextClear="löschen"
                btnTextToday="heute"
                lang="de"
                inputClass="text-input-default h-[40px]"
              ></DatePicker>
              <DatePicker
                class="mt-32 md:mt-0 md:ml-32"
                format="yyyy-MM-dd"
                ref="secondDatePicker"
                :value="formData.selectedDateTo"
                :minDate="
                  parse(formData.selectedDateFrom, 'dd.MM.yyyy', new Date())
                "
                @update="
                  formData.selectedDateTo = $event;
                  currentCalendar = '';
                  isMobile ? blurDatePickerInput(secondDatePicker!) : null;
                "
                @focus="currentCalendar = 'second'"
                :showDropdown="isMobile ? currentCalendar === 'second' : true"
                :placeholder="siteData.datePickerEndLabel"
                btnTextClear="löschen"
                btnTextToday="heute"
                lang="de"
                inputClass="text-input-default h-[40px]"
              ></DatePicker>
            </div>
            <div class="error-message">
              {{ getFieldErrors('pickedDateSelectionOption') }}
            </div>
          </div>

          <div
            v-if="
              formData.pickedDateSelectionOption ===
              PickedDateSelectionOption.monthPicker
            "
          >
            <MonthPicker
              class="mt-24"
              :items="monthPickerItems"
              name="month picker"
              @change="formData.selectedMonths = $event"
              :value="formData.selectedMonths"
            ></MonthPicker>
            <div class="error-message">
              {{ getFieldErrors('pickedDateSelectionOption') }}
            </div>

            <p
              class="mt-12 mb-24 text-16 text-grey-darker font-bold"
            >
              Und wie lange soll Deine Reise dauern?
            </p>

            <div class="flex justify-center">
              <MenuPills
                class="flex justify-center flex-wrap"
                :items="travelDurationOptions"
                name="howLongTravelGroup"
                mode="single"
                :value="formData.preferredTravelDuration"
                @change="formData.preferredTravelDuration = $event"
              ></MenuPills>
            </div>
            <div class="error-message empty:mt-0">
              {{ getFieldErrors('preferredTravelDuration') }}
            </div>
          </div>
        </fieldset>

        <fieldset class="mb-48">
          <PointerHeading title="Mit wem wirst Du reisen? *" />
          <div class="grid gap-50 grid-cols-1 md:grid-cols-[auto_auto] items-start">
              <div class="multi-inputs-wrapper">
                <MultiInputsWithCounter
                  class="mt-0 mb-0 font-secondary"
                  counterTitle="Erwachsene"
                  counterSubTitle="(> 17 Jahre)"
                  :min="2"
                  :max="8"
                  title="Alter zur Reisezeit - für Jugend- & Studenten-Tarife"
                  beforeInputTitle="Erwachsener"
                  afterInputTitle="Jahre"
                  v-model:counter="formData.adultsCount"
                  v-model:values="formData.adultsAge  "
                  :minValue="18"
                  :maxValue="99"
                  itemsWrapperClasses="justify-end"
                />
              </div>
              <div class="multi-inputs-wrapper md:ml-auto">
                <MultiInputsWithCounter
                  class="mt-0 mb-0 font-secondary"
                  counterTitle="Kinder"
                  :max="6"
                  title="Alter der Kinder zur Reisezeit"
                  beforeInputTitle="Kind"
                  afterInputTitle="Jahre"
                  v-model:counter="formData.childrenCount"
                  v-model:values="formData.childrensAge"
                  :minValue="0"
                  :maxValue="17"
                />
              </div>
          </div>
        </fieldset>

        <fieldset class="mb-48">
          <PointerHeading
            title="Über welche E-Mail Adresse können wir Dich für Deine Reiseplanung erreichen? *"
          />
          <TextInput
            :value="formData.emailAdress"
            @input="formData.emailAdress = $event"
            placeholder="E-Mail Adresse *"
            :errors="getFieldErrors('emailAdress')"
            :hasIcon="true"
            inputClass="text-input-default h-[48px]"
            autocomplete="email"
          >
            <IconEmail class="email-icon h-14 text-primary" />
          </TextInput>
        </fieldset>

        <fieldset>
          <p class="mb-18 font-secondary text-16 text-primary-dark">
            Möchtest Du unseren E-Mail-Newsletter mit Angeboten und
            Reiseinspirationen erhalten? Natürlich ohne Spam, im
            10-Tages-Rhythmus. Du kannst Dich jederzeit abmelden. *
          </p>
          <RadioButton
            class="font-secondary font-semibold"
            layout="row"
            name="newsletterAgreement"
            :errors="getFieldErrors('newsletterAgreement')"
            :items="newsletterAgreementOptions"
            v-model="formData.newsletterAgreement"
          />
        </fieldset>

        <div class="flex justify-center">
          <Submit
            v-if="!isPending"
            class="btn-secondary first-step__submit-btn h-48 my-50 w-full md:w-auto text-center font-extrabold"
            >Starte meine Reiseplanung</Submit
          >
          <Spinner class="my-50 ml-auto mr-auto height-[48px]" v-if="isPending" />
        </div>
      </form>

      <div>
        <div class="footer-text">
          <p class="mb-16 text-14">
            Mit dem Absenden dieser Anfrage stimme ich den
            <a target="_blank" class="font-semibold border-b" :href="siteData.conditionLink">AGB</a> und
            <a target="_blank" class="font-semibold border-b" :href="siteData.privacyPolicyLink">Datenschutzbestimmungen</a>
            zu und erlaube Explorer Fernreisen, mich für Rückfragen, Zusatzinformationen
            oder Zusatzprodukten zu meiner geplanten Reise und für ähnliche Reiseprodukte
            per eMail zu kontaktieren.
          </p>
          <p class="mb-16 text-14">
            Die Anfrage für eine individuell erstellte Reise ist nicht mit einer
            Verpflichtung zur Buchung verbunden.
          </p>
        </div>
      </div>
    </div>
  </EnquiryFormWrapper>
</template>

<style scoped>
.footer-text {
  @apply font-secondary text-[#333];
}
</style>