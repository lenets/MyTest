import { useEnquiryForm } from '@/useEnquiryForm';
import { prepareDestination, getSiteData } from '@/helpers';

import {
  NewsletterAgreementOptions,
  PickedDateSelectionOption,
  travelDurationOptions,
  IsBookedAgreementOptions,
  TravelAgencyAgreementOptions,
  Steps,
} from '@/enquiryContentData';

import { computed } from 'vue';

const siteData = getSiteData();

interface IChildrensAge {
  child_1_age?: number;
  child_2_age?: number;
  child_3_age?: number;
  child_4_age?: number;
  child_5_age?: number;
  child_6_age?: number;
};

interface IAdultsAge {
  adults_1_age?: number;
  adults_2_age?: number;
  adults_3_age?: number;
  adults_4_age?: number;
  adults_5_age?: number;
  adults_6_age?: number;
  adults_7_age?: number;
  adults_8_age?: number;
};

function getAgeObj(type: string, ages: number[]) {
  if (type === 'child') {
    const childrensAge: IChildrensAge = {};
    ages.forEach((item, idx) => {
      const propName = `child_${idx + 1}_age`;
      childrensAge[propName as keyof typeof childrensAge] = item;
    })
    return childrensAge;
  }

  if (type === 'adult') {
    const adultsAge: IAdultsAge = {};
    ages.forEach((item, idx) => {
      const propName = `age_adult_${idx + 1}`;
      adultsAge[propName as keyof typeof adultsAge] = item;
    })
    return adultsAge;
  }
}

declare global { interface Window { dataLayer: any; } }

const { formData, utmData } = useEnquiryForm();

const getEcommerceID = () => window?.dataLayer?.ecommerce?.purchase?.actionField?.id;

const deal = computed(() => {
  const consent = formData.value.travelAgencyAgreementOptions === ''
    ? null
    : +(formData.value.travelAgencyAgreementOptions === TravelAgencyAgreementOptions.agreement);

  const travel_budget_min = formData.value.sendingStatus === Steps.second
    ? formData.value.budgetValue[0]
    : null;

  const travel_budget_max = formData.value.sendingStatus === Steps.second
    ? formData.value.budgetValue[1]
    : null;

  const destination = prepareDestination(formData.value.preferredDestinations);

  const dealName = formData.value.preferredDestinations.join(',')
    ? `${formData.value.firstName || formData.value.emailAdress} - ${formData.value.preferredDestinations.join(',')}`
    : `${formData.value.firstName || formData.value.emailAdress}`;

  const childrensAge = getAgeObj('child', formData.value.childrensAge);
  const adultsAge = getAgeObj('adult', formData.value.adultsAge);

  const dealOwner = formData.value.dealID ? null : siteData.deal_owner;

  return {
    id: formData.value.dealID,
    properties: {
      ...childrensAge,
      ...adultsAge,
      ...utmData.value,
      transaction_id: getEcommerceID() || null,
      hubspot_owner_id: dealOwner,
      dealname: dealName,
      destination: destination || null,
      metaitinerary: formData.value.metaItinerary || null,
      travel_dates_known: +(formData.value.pickedDateSelectionOption === PickedDateSelectionOption.calendars),
      travel_start_date: formData.value.selectedDateFrom,
      travel_end_date: formData.value.selectedDateTo,
      travel_dates: formData.value.selectedMonths.join(';'),
      travel_duration: travelDurationOptions.indexOf(formData.value.preferredTravelDuration) === -1 ? '' : travelDurationOptions.indexOf(formData.value.preferredTravelDuration),
      number_adt: formData.value.adultsCount,
      number_teenager: formData.value.childrensAge.filter((i: number) => i >= 12 && i <= 17).length,
      number_chd: formData.value.childrensAge.filter((i: number) => i >= 2 && i <= 11).length,
      number_inf: formData.value.childrensAge.filter((i: number) => i >= 0 && i <= 2).length,
      departure: formData.value.departureAirports.join(';'),
      travel_budget_min: travel_budget_min,
      travel_budget_max: travel_budget_max,
      travel_type: formData.value.preferredLeisureType.join(';'),
      notes: formData.value.additionalUserComment,
      travel_planned: formData.value.planingStageRate,
      consent: consent,
      shop_chosen: formData.value.travelAgency || null,
      sending_status: formData.value.sendingStatus,
      error_data: '',
      voucher_code: formData.value.voucherCode || null,
    },
    associations: [
      {
        to: {
          id: formData.value.contactID
        },
        types: [{
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: 3
        }]
      }
    ]
  };
});

const contact = computed(() => {
  const repeat_client = formData.value.isBookedAgreement === ''
    ? null
    : formData.value.isBookedAgreement === IsBookedAgreementOptions.agreement;

  const consent = formData.value.newsletterAgreement === ''
    ? null
    : formData.value.newsletterAgreement === NewsletterAgreementOptions.agreement;

  const contactOwner = formData.value.contactID ? null : siteData.contact_owner;
  const estBrand = `;${siteData.est_brand}`;
  const childrensAge = getAgeObj('children', formData.value.childrensAge);

  return {
    id: formData.value.contactID,
    properties: {
      ...childrensAge,
      email: formData.value.emailAdress,
      consent: consent,
      salutation: formData.value.salutationOption || null,
      firstname: formData.value.firstName || null,
      lastname: formData.value.lastName || null,
      phone: formData.value.phoneNumber || null,
      repeat_client: repeat_client,
      newsletter_email: formData.value.newsLetterEmail || null,
      est_brand: estBrand,
      hubspot_owner_id: contactOwner,
    }
  }
});

async function createContact() {
  const res = await fetch('api/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact.value),
  });

  const resBody = await res.json();

  if (res.ok) {
    return {
      status: 'create',
      id: resBody.id
    };
  } else if (resBody.message && resBody.message.includes('ID')) {
    return {
      status: 'update',
      id: resBody.message.match(/\d+/)[0]
    };
  }

  return {
    status: 'error'
  };
}

async function updateContact(id: string) {
  const res = await fetch('api/crm/v3/objects/contacts/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact.value),
  });

  const resBody = await res.json();

  formData.value.contactID = resBody.id;
}

async function createDeal() {
  let resBody;

  let res = await fetch('api/crm/v3/objects/deals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deal.value),
  });

  if (res.ok) {
    resBody = await res.json();
    formData.value.dealID = resBody.id;
  } else {
    deal.value.properties.destination = '';
    deal.value.properties.error_data = 'Destination: ' + formData.value.preferredDestinations.join(', ');

    res = await fetch('api/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deal.value),
    });

    resBody = await res.json();

    formData.value.dealID = resBody.id;
  }
}

async function updateDeal() {
  const res = await fetch('api/crm/v3/objects/deals/' + deal.value.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deal.value),
  });

  if (!res.ok) {
    deal.value.properties.destination = '';
    deal.value.properties.error_data = 'Destination: ' + formData.value.preferredDestinations.join(', ');

    await fetch('api/crm/v3/objects/deals/' + deal.value.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deal.value),
    })
  }
}

export async function proccess(isDeal: boolean = true) {
  if (contact.value.id) {
    await updateContact(contact.value.id);
  } else {
    const createContactRes = await createContact();

    if (createContactRes.status === 'update') {
      formData.value.contactID = createContactRes.id;
      await updateContact(formData.value.contactID);
    } else if (createContactRes.status === 'create') {
      formData.value.contactID = createContactRes.id
    } else {
      throw Error;
    }
  }

  if (!isDeal) return;

  if (!deal.value.id) {
    await createDeal();
  } else {
    await updateDeal();
  }
}