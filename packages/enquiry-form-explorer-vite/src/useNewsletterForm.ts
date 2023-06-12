import { computed, ref, watch, type Ref } from 'vue';
import { newsletterDataSchema, utmDataSchema } from './newsletterContentData';
import { getDataFromStorage, saveOnSessionStorage } from './helpers';

const formData = ref<typeof newsletterDataSchema>();
const utmData = ref<typeof utmDataSchema>();
const dataFromStorage = getDataFromStorage('newsletterSessionData');
const utmDataFormStorage = getDataFromStorage('utmSessionData');

watch(
  formData,
  (newData) => {
    saveOnSessionStorage('newsletterSessionData', newData);
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

type formFieldKey = keyof typeof newsletterDataSchema;

const formErrors = ref<Record<formFieldKey, string> | undefined>();
const hasErrors = computed(
  () => formErrors.value && !!Object.keys(formErrors.value).length
);

function validateForm(formFields: Array<formFieldKey>): boolean {
  const errors = {} as Record<formFieldKey, string>;
  for (const formField of formFields) {
    const fieldValue = formData.value![formField];
    if (!fieldValue) {
      errors[formField] = 'Feld darf nicht leer sein';
    } else if (Array.isArray(newsletterDataSchema[formField])) {
      if ((fieldValue as string[])?.length === 0) {
        errors[formField] = 'Feld darf nicht leer sein';
      }
    }

    if (formField === 'emailAdress') {
      if (!(fieldValue as string).includes('@')) {
        errors[formField] = 'Bitte korrekte E-Mail-Adresse angeben';
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

export function useNewsletterForm() {
  if (dataFromStorage) {
    formData.value = dataFromStorage;
  } else {
    formData.value = newsletterDataSchema;
  }

  if (utmDataFormStorage) {
    utmData.value = utmDataFormStorage;
  } else {
    utmData.value = utmDataSchema;
  }

  return {
    formData: formData as Ref<typeof newsletterDataSchema>,
    utmData: utmData as Ref<typeof utmDataSchema>,
    validateForm,
    getFieldErrors,
    scrollToErrorMessage,
  };
}
