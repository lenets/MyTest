import { prepareDestination, getSiteData } from './helpers';
import { useNewsletterForm } from './useNewsletterForm';
import { computed } from 'vue';

const { formData } = useNewsletterForm();
const siteData = getSiteData();


const contact = computed(() => {
  const destination = prepareDestination(formData.value.preferredDestinations);
  const contactOwner = formData.value.contactID ? null : siteData.contact_owner;
  const estBrand = `;${siteData.est_brand}`;

  return {
    id: formData.value.contactID,
    properties: {
      salutation: formData.value.salutationOption || null,
      firstname: formData.value.firstName || null,
      lastname: formData.value.lastName || null,
      email: formData.value.emailAdress,
      destination: destination || null,
      travel_type: formData.value.preferredLeisureType.join(';'),
      consent: formData.value.newsletterAgreement.length !== 0,
      est_brand: estBrand,
      contact_owner: contactOwner,
    }
  }
})

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

export async function proccess() {
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
}