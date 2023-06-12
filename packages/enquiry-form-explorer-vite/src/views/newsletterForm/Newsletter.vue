<script lang="ts" setup>
import {
  MenuPills,
  MultiSelect,
  PointerHeading,
  TextInput,
  RadioButton,
  Checkbox,
  Spinner,
  Submit,
} from 'components-vue3';

import { useRouter, useRoute } from 'vue-router';
import { useNewsletterForm } from '@/useNewsletterForm';
import { proccess } from '@/newsLetterHubspot';

import IconEmail from '@/components/icons/IconEmail.vue';

import NewsletterWrapper from '@/components/NewsletterWrapper.vue';

import {
  salutationOptions,
  destinationsOptions,
  preferredLeisureTypeList,
  newsletterAgreement,
} from '@/newsletterContentData';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const urlParams: any = route.query;
const { formData, utmData, validateForm, getFieldErrors, scrollToErrorMessage } = useNewsletterForm();


for (let key in urlParams) {
  if(key === 'utm_campaign' || key === 'utm_medium' || key === 'utm_source') {
    utmData.value[key] = urlParams[key];
  }
}

function isFormValid() {
  return validateForm([
    'emailAdress',
    'salutationOption',
    'preferredDestinations',
    'preferredLeisureType',
  ]);
}

const isPending = ref(false);

async function submitForm() {
  if (!isFormValid()) {
    scrollToErrorMessage();
    return;
  }

  isPending.value = true;

  try {
    await proccess();
  } finally {
    const FORMSPARK_ACTION_URL = `https://submit-form.com/${
    import.meta.env.VITE_NEWSLETTER_PAGE_FORMSPARK
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

    router.push({ name: 'newsletterThankYou' });
    isPending.value = false;
  }
}
</script>

<template>
  <NewsletterWrapper>
    <div class="newsletter mt-48 mb-50">
      <h1 class="step-title">
        Explorer Fernreisen Newsletter
      </h1>
      <div class="text-16 leading-7 font-secondary">
        Mit unserem Newsletter erhältst du regelmäßig unsere besten Reiseangebote, 
        Inspiration für deinen nächsten Traumurlaub und wertvolle Experten-Tipps. 
        Die digitale Explorer-Post ist mehr als nur ein Newsletter. Werde Teil 
        der Explorer-Familie!
      </div>

      <form @submit.prevent="submitForm()">
        <fieldset class="mb-40 mt-40">
          <PointerHeading class="mb-20 mr-16" title="Wie heißt du? *" />
          <div class="mb-24">
            <RadioButton
              name="salutationOption"
              layout="row"
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

        <fieldset class="mb-40">
          <PointerHeading title="Wie lautet deine Email Adresse? *" />
          <TextInput
            :value="formData.emailAdress"
            @input="formData.emailAdress = $event"
            :errors="getFieldErrors('emailAdress')"
            placeholder="E-Mail Adresse *"
            :hasIcon="true"
          >
            <IconEmail class="h-14 text-primary" />
          </TextInput>
        </fieldset>

        <fieldset class="mb-40">
          <PointerHeading
            title="Welche Reiseziele interessieren dich? *"
            subtitle="(Maximal 3 Ziele)"
          />
          <MultiSelect
            valueProp="name"
            placeholder="Ziel hinzufügen"
            iconName="location"
            :value="formData.preferredDestinations"
            :options="destinationsOptions"
            :maxItemsSelected="3"
            @change="formData.preferredDestinations = $event"
            :errors="getFieldErrors('preferredDestinations')"
          ></MultiSelect>
        </fieldset>

        <fieldset class="mb-40">
          <PointerHeading
            title="Und welche Art von Reisen? *"
            subtitle="(Du kannst mehrere Optionen auswählen)"
          />
          <MenuPills
            :items="preferredLeisureTypeList"
            name="Preferred Leisure"
            mode="multi"
            :value="formData.preferredLeisureType"
            @change="formData.preferredLeisureType = $event"
            :errors="getFieldErrors('preferredLeisureType')"
          ></MenuPills>

          <Checkbox
            class="mt-40 font-secondary"
            name="bookTrip"
            mode="single"
            :items="newsletterAgreement"
            :value="formData.newsletterAgreement"
            @change="formData.newsletterAgreement = $event"
          />
        </fieldset>

        <div class="flex justify-center">
          <Submit
            v-if="!isPending"
            class="btn-secondary submit-btn h-48 py-10 px-16 w-full md:w-auto"
            >Newsletter anfordern</Submit
          >

          <Spinner v-if="isPending" />
        </div>
      </form>

      <div class="mt-50">
        <div class="text-14 leading-7 font-normal font-secondary text-black">
          Der Newsletter ist kostenlos. Deine Daten werden vertraulich behandelt
          und nicht an Dritte weitergegeben. Die Einwilligung zur Nutzung deiner
          im Rahmen der Newsletter-Anmeldung erhobenen personenbezogenen Daten
          und E-Mail-Adresse kannst du jederzeit über den Abmelde-Link im Newsletter
          widerrufen.
        </div>
      </div>
    </div>
  </NewsletterWrapper>
</template>

<style scoped>
</style>