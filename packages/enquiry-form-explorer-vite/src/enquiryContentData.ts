import destinationList from './data/destinationList.json';
import { getSiteData } from './helpers';
const siteData = getSiteData();

export enum PickedDateSelectionOption {
  calendars = 'Ja',
  monthPicker = 'Nein, nur ungefähr',
};

export enum Steps {
  first = 'first',
  second = 'second',
  fulfilled = 'fulfilled',
};

export const enquiryDataSchema = {
  preferredDestinations: [] as string[],
  pickedDateSelectionOption: PickedDateSelectionOption.calendars,
  selectedDateFrom: '',
  selectedDateTo: '',
  selectedMonths: [] as string[],
  preferredTravelDuration: '',
  emailAdress: '',
  newsLetterEmail: '',
  newsletterAgreement: '',
  travelAgencyAgreementOptions: '',
  travelAgency: '',
  childrenCount: 0,
  childrensAge: [] as number[],
  departureAirports: [] as string[],
  adultsCount: 2,
  adultsAge: [0, 0] as number[],
  preferredLeisureType: [] as string[],
  budgetValue: [2000, 6000],
  additionalUserComment: '',
  salutationOption: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  metaItinerary: '',
  metaDestination: '',
  metaRegion: '',
  metaPrice: '',
  metaTransactionID: '',
  planingStageRate: 0,
  isBookedAgreement: '',
  metaThumbnailUrl: '',
  sendingStatus: Steps.first,
  contactID: '',
  dealID: '',
  voucherCode: '',
};

export const utmDataSchema = {
  utm_campaign: '',
  utm_medium: '',
  utm_source: '',
};

export const destinationsOptions = destinationList
  .map((item) => ({
    name: item.Country,
    isSecondary: false,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export enum NewsletterAgreementOptions {
  agreement = 'Ja, bitte',
  disagreement = 'Nein, danke',
}

export const newsletterAgreementOptions: any = [
  {
    id: NewsletterAgreementOptions.agreement,
    name: NewsletterAgreementOptions.agreement,
  },
  {
    id: NewsletterAgreementOptions.disagreement,
    name: NewsletterAgreementOptions.disagreement,
  },
];

export const pickedDateOptions = Object.values(PickedDateSelectionOption).map(
  (value) => {
    return { id: value, name: value };
  }
);

export const departureAirportsOptions = [
  { name: 'Frankfurt' },
  { name: 'Düsseldorf' },
  { name: 'Hamburg' },
  { name: 'Berlin' },
  { name: 'München' },
  { name: 'Wien' },
  { name: 'Zürich' },
  { name: 'Bern' },
].sort((a, b) => a.name.localeCompare(b.name));

export const preferredLeisureTypeList: Array<string> = siteData.preferredLeisureTypeList;

export const additionalUserCommentPlaceholder =
  'Beschreibe kurz deinem Reiseberater, was du dir von deiner Reise wünschst. Das hilft uns ein Angebot zu erstellen, das wirklich zu deinen Vorstellungen passt - zum Beispiel besondere Erlebnisse oder Sehenswürdigkeiten, die nicht fehlen dürfen oder Verpflegungsart, Art der Unterkunft etc.';

export const salutationOptions: {
  id: string;
  name: string;
}[] = [
    {
      id: 'Herr',
      name: 'Herr',
    },
    {
      id: 'Frau',
      name: 'Frau',
    },
    {
      id: 'Anderes',
      name: 'Anderes',
    },
  ];

export const travelDurationOptions: Array<string> = [
  'bis zu 1 Woche',
  'bis zu 2 Wochen',
  '3 - 4 Wochen',
  'länger',
  'noch nicht sicher',
];

export enum TravelAgencyAgreementOptions {
  agreement = 'Ja, gerne',
  disagreement = 'Nein, danke',
};

export const travelAgencyAgreementOptions: any = [
  {
    id: TravelAgencyAgreementOptions.agreement,
    name: TravelAgencyAgreementOptions.agreement,
  },
  {
    id: TravelAgencyAgreementOptions.disagreement,
    name: TravelAgencyAgreementOptions.disagreement,
  },
];

export const agencyItems: {
  id: string,
  name: string
}[] = siteData.agencyList
  .map((item, idx) => ({
    id: `${idx}`,
    name: item
  }));

export const planingStageRateSubLabels: Array<string> = [
  'Inspiration',
  'Planung',
  'Abflugbereit',
];

export enum IsBookedAgreementOptions {
  agreement = 'Ja',
  disagreement = 'Nein',
};

export const isBookedAgreementOptions: any = [
  {
    id: IsBookedAgreementOptions.agreement,
    name: IsBookedAgreementOptions.agreement,
  },
  {
    id: IsBookedAgreementOptions.disagreement,
    name: IsBookedAgreementOptions.disagreement,
  },
];