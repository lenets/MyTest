<script lang="ts" setup>
import {
  Button,
  RadioButton,
  TextInput,
  PointerHeading,
  PhoneNumberInput,
  Spinner,
  Submit,
  SelectInput,
} from 'components-vue3';

import {
  salutationOptions,
  travelAgencyAgreementOptions,
  TravelAgencyAgreementOptions,
  agencyItems,
  isBookedAgreementOptions,
} from '@/enquiryContentData';

import { useRouter } from 'vue-router';
import { useEnquiryForm } from '@/useEnquiryForm';
import { proccess } from '@/hubspot';
import { ref } from 'vue';
import EnquiryFormWrapper from '@/components/EnquiryFormWrapper.vue';

const router = useRouter();
const { formData, validateForm, getFieldErrors, scrollToErrorMessage } =
  useEnquiryForm();

const isPending = ref(false);

function isStepValid() {
  return validateForm([
    'phoneNumber',
    'travelAgencyAgreementOptions',
    'salutationOption',
    'isBookedAgreement',
  ]);
}

async function submitForm() {
  if (!isStepValid()) {
    scrollToErrorMessage();
    return;
  }

  isPending.value = true;

  try {
    await proccess();
  } finally {
    const FORMSPARK_ACTION_URL = `https://submit-form.com/${
    import.meta.env.VITE_ENQUIRY_PAGE_FORMSPARK
    }`;

    await fetch(FORMSPARK_ACTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...formData.value,
      }),
    });

    router.push({ name: 'thankYou' });
    isPending.value = false;
  }
}



</script>

<template>
  <EnquiryFormWrapper>
    <div class="third-step mt-48 mb-220 md:mb-300 w-full h-full">
      <h1 class="mb-40 md:mb-50 font-bold text-22 text-primary font-secondary">
        Wie können wir Dich für Deine Reiseplanung?
      </h1>

      <form @submit.prevent="submitForm()">
        <fieldset class="mb-50">
          <PointerHeading title="Was ist Deine Anrede? *" class="md:mb-12" />
          <div class="mb-12">
            <RadioButton
              name="salutationOption"
              layout="row"
              class="font-secondary font-medium"
              :items="salutationOptions"
              v-model="formData.salutationOption"
              :errors="getFieldErrors('salutationOption')"
            />
          </div>
          <div class="flex justify-between">
            <TextInput
              class="w-full mr-16"
              :value="formData.firstName"
              @input="formData.firstName = $event"
              placeholder="Vorname"
            />
            <TextInput
              class="w-full ml-16"
              :value="formData.lastName"
              @input="formData.lastName = $event"
              placeholder="Nachname"
            />
          </div>
        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading
            title="Wenn Du mit Deinem Reiseberater sprechen möchtest, gib Deine Telefonnummer an."
          />
          <PhoneNumberInput
            :value="formData.phoneNumber"
            @input="formData.phoneNumber = $event"
            placeholder="Telefonnummer"
            :errors="getFieldErrors('phoneNumber')"
            phoneCodesLang="de"
          />
        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading title="Wünscht Du Beratung durch eine bestimmtes Reisebüro?*" />
          <div>
            <RadioButton
              name="travelAgencyAgreement"
              layout="row"
              class="font-secondary font-medium"
              :items="travelAgencyAgreementOptions"
              :modelValue="formData.travelAgencyAgreementOptions"
              @update:modelValue="{
                formData.travelAgencyAgreementOptions = $event;
                if($event === TravelAgencyAgreementOptions.disagreement) {
                  formData.travelAgency = '';
                }
              }"
              :errors="getFieldErrors('travelAgencyAgreementOptions')"
            />
            <div
              v-if="formData.travelAgencyAgreementOptions === TravelAgencyAgreementOptions.agreement"
              class="mt-20"
            >
              <SelectInput
                placeholder="Reisebüro auswählen"
                :items="agencyItems"
                :value="formData.travelAgency"
                valueKey="name"
                @input="formData.travelAgency = $event"
              />
            </div>
          </div>

        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading title="Hast Du schon einmal eine Reise mit uns gebucht? *" />
          <div>
            <RadioButton
              name="isBookedAgreement"
              layout="row"
              class="font-secondary font-medium"
              :items="isBookedAgreementOptions"
              v-model="formData.isBookedAgreement"
              :errors="getFieldErrors('isBookedAgreement')"
            />
          </div>
        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading title="Hast Du einen Aktions-Code?" class="md:mb-20" />
          <div class="flex justify-between">
            <TextInput
              class="w-full"
              :value="formData.voucherCode"
              @input="formData.voucherCode = $event"
              placeholder="Voucher Code hier eingeben"
            />
          </div>
        </fieldset>

        <div class="md:flex justify-between">
          <Button
            class="btn-primary-outline prev-btn h-48 px-28 py-16 w-full md:w-auto mb-24 md:mb-0"
            @click="router.push({ name: 'second' })"
            type="button"
          >
            Zurück
          </Button>

          <Submit
            v-if="!isPending"
            class="btn-secondary submit-btn h-48 w-full md:w-auto"
            >Jetzt meine Traumreise anfragen</Submit
          >

          <Spinner class="height-[48px] mr-110" v-if="isPending" />
        </div>
      </form>
    </div>
  </EnquiryFormWrapper>
</template>

<style scoped>
</style>