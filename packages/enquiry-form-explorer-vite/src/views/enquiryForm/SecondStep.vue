<script lang="ts" setup>
import {
  Button,
  MenuPills,
  MultiSelect,
  PointerHeading,
  TextArea,
  SliderRangeWithNumberInput,
  Submit,
  Rate,
  Spinner,
} from 'components-vue3';

import { useRouter } from 'vue-router';
import { useEnquiryForm } from '@/useEnquiryForm';
import { proccess } from '@/hubspot';
import { ref } from 'vue';

import EnquiryFormWrapper from '@/components/EnquiryFormWrapper.vue';
import { roundNumber, getSiteData } from '@/helpers';

import {
  departureAirportsOptions,
  preferredLeisureTypeList,
  additionalUserCommentPlaceholder,
  planingStageRateSubLabels,
  Steps,
} from '@/enquiryContentData';

const router = useRouter();
const isPending = ref(false);
const siteData = getSiteData();

const { formData, validateForm, getFieldErrors, scrollToErrorMessage } =
  useEnquiryForm();

function isStepValid() {
  return validateForm(['departureAirports', 'preferredLeisureType', 'planingStageRate']);
}

async function submit() {
  if (!isStepValid()) {
    scrollToErrorMessage();
    return;
  }

  isPending.value = true;

  try {
    await proccess();
  } finally {
    formData.value.sendingStatus = Steps.fulfilled;

    router.push({ name: 'third' });
    isPending.value = false;
  }
}

const sliderMinValue = formData.value.metaPrice ? +formData.value.metaPrice : 1500;
const sliderMaxValue = formData.value.metaPrice ? Math.ceil(roundNumber(+formData.value.metaPrice * 1.15, 10)) : 8000;
const sliderStep = formData.value.metaPrice ? Math.ceil((sliderMaxValue - sliderMinValue) / 30) : 150;

</script>

<template>
  <EnquiryFormWrapper>
    <div class="mt-48 mb-50 second-step">
      <h1 class="step-title">
        {{ siteData.secondStepTitle }}
      </h1>

      <form
        @submit.prevent="submit()"
      >
        <fieldset class="mb-50">
          <PointerHeading
            title="Von wo aus willst Du fliegen? *"
            subtitle="(Maximal 4 Flughäfen)"
          />
          <MultiSelect
            valueProp="name"
            placeholder="Flughafen hinzufügen"
            iconName="airport"
            :errors="getFieldErrors('departureAirports')"
            :value="formData.departureAirports"
            :options="departureAirportsOptions"
            :maxItemsSelected="4"
            @change="formData.departureAirports = $event"
          ></MultiSelect>
        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading
            title="Wieviel planst Du für Deine Reise pro Person ungefähr ausgeben?"
            class="mb-8"
          />
          <div class="slider-sub-title text-grey-dark font-normal mb-60 font-secondary">
            (Die Budgetempfehlung ist geschätzt)
          </div>
          <SliderRangeWithNumberInput
            :value="formData.budgetValue"
            :min="sliderMinValue"
            :max="sliderMaxValue"
            :step="sliderStep"
            currency="EUR"
            @change="formData.budgetValue = $event"
          />
        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading
            title="Was für eine Art von Reise wünscht Du Dir? *"
            subtitle="(Du kannst mehrere Optinen auswählen)"
          />
          <MenuPills
            :items="preferredLeisureTypeList"
            :errors="getFieldErrors('preferredLeisureType')"
            name="Whom travel"
            mode="multi"
            :value="formData.preferredLeisureType"
            @change="formData.preferredLeisureType = $event"
          ></MenuPills>
        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading
            title="Was ist Dir sonst noch auf Deiner Reise wichtig?"
          />
          <TextArea
            class="h-360 note"
            v-model="formData.additionalUserComment"
            :placeholder="additionalUserCommentPlaceholder"
          ></TextArea>
        </fieldset>

        <fieldset class="mb-50">
          <PointerHeading
            title="Wie weit bist Du mit Deiner Reiseplanung? *"
          />
          <Rate
            name="planingStageRate"
            v-model="formData.planingStageRate"
            :maxRate="5"
            :subLabels="planingStageRateSubLabels"
            :errors="getFieldErrors('planingStageRate')"
          />
        </fieldset>
        <div class="flex justify-between">
          <Button
            class="btn-primary-outline h-48 py-16 px-28"
            @click="router.push({ name: 'first' })"
          >
            Zurück
          </Button>
          <Spinner class="mr-10 md:mr-20 height-[48px]" v-if="isPending" />
          <Submit v-if="!isPending" class="btn-secondary h-48 py-10 px-16 w-140">Weiter</Submit>
        </div>
      </form>
    </div>
  </EnquiryFormWrapper>
</template>

<style scoped>
.note {
  @apply md:h-[162px];
}
</style>