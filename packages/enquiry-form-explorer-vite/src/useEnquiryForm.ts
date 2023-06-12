import { computed, ref, watch, type Ref } from 'vue';
import {
  enquiryDataSchema,
  utmDataSchema,
  PickedDateSelectionOption,
} from './enquiryContentData';
import { getDataFromStorage, saveOnSessionStorage } from './helpers';

const formData = ref<typeof enquiryDataSchema>();
const utmData = ref<typeof utmDataSchema>();
const dataFromStorage = getDataFromStorage('enquirySessionData');
const utmDataFormStorage = getDataFromStorage('utmSessionData');

watch(
  formData,
  (newData) => {
    saveOnSessionStorage('enquirySessionData', newData);
  },
  { deep: true }
);

watch(
  utmData,
  (newData) => {
    saveOnSessionStorage('utmSessionData', newData)
  },
  { deep: true }
);

type formFieldKey = keyof typeof enquiryDataSchema;

const formErrors = ref<Record<formFieldKey, string> | undefined>();
const hasErrors = computed(
  () => formErrors.value && !!Object.keys(formErrors.value).length
);

function scrollToErrorMessage() {
  setTimeout(() => {
    const errorElement: HTMLElement | null =
      document.querySelector('.error-message');
    if (errorElement === null) return;
    const yOffset = -250;
    const y =
      errorElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, 200);
}

function validateForm(formFields: Array<formFieldKey>): boolean {
  const errors = {} as Record<formFieldKey, string>;
  for (const formField of formFields) {
    const fieldValue = formData.value![formField];
    if (
      !fieldValue &&
      formField !== 'phoneNumber' &&
      formField !== 'selectedDateFrom' &&
      formField !== 'selectedDateTo' &&
      formField !== 'preferredTravelDuration'
    ) {
      errors[formField] = 'Feld darf nicht leer sein';
    } else if (Array.isArray(enquiryDataSchema[formField])) {
      if (
        (fieldValue as string[])?.length === 0 &&
        formField !== 'selectedMonths'
      ) {
        errors[formField] = 'Feld darf nicht leer sein';
      }
    }

    if (formField === 'emailAdress') {
      if (!(fieldValue as string).includes('@')) {
        errors[formField] = 'Bitte korrekte E-Mail-Adresse angeben';
      }
    }

    if (formField === 'phoneNumber' && String(fieldValue).length !== 0) {
      const numberPhoneRegex = new RegExp(/^\+[0-9]*$/, 'g');
      if (!numberPhoneRegex.test(fieldValue as string)) {
        errors[formField] = 'Bitte korrekte Telefonnummer angeben';
      }
    }

    if (
      formField === 'pickedDateSelectionOption' &&
      fieldValue === PickedDateSelectionOption.calendars
    ) {
      if (
        !formData.value?.selectedDateFrom.length ||
        !formData.value?.selectedDateTo.length
      ) {
        errors[formField] = 'Sie müssen ein Datum oder einen Monat auswählen';
      }
    }

    if (
      formField === 'pickedDateSelectionOption' &&
      fieldValue === PickedDateSelectionOption.monthPicker
    ) {
      if (!formData.value?.selectedMonths.length) {
        errors[formField] = 'Sie müssen ein Datum oder einen Monat auswählen';
      }
    }

    if (
      formField === 'preferredTravelDuration' &&
      formData.value?.pickedDateSelectionOption ===
      PickedDateSelectionOption.monthPicker
    ) {
      if (!formData.value?.preferredTravelDuration.length) {
        errors[formField] = 'Bitte geben Sie die ungefähre Reisedauer an';
      }
    }
  }

  formErrors.value = errors;

  const hasErrors = !!Object.keys(errors).length;
  return !hasErrors;
}

function getFieldErrors(key: formFieldKey) {
  return formErrors.value?.[key];
}

export function useEnquiryForm() {
  if (dataFromStorage) {
    formData.value = dataFromStorage;
  } else {
    formData.value = enquiryDataSchema;
  }

  if (utmDataFormStorage) {
    utmData.value = utmDataFormStorage;
  } else {
    utmData.value = utmDataSchema;
  }

  return {
    formData: formData as Ref<typeof enquiryDataSchema>,
    utmData: utmData as Ref<typeof utmDataSchema>,
    validateForm,
    getFieldErrors,
    scrollToErrorMessage,
  };
}
