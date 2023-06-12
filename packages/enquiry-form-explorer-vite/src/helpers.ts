import type { DatePicker } from 'components-vue3';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import deLocale from 'date-fns/locale/de';
import type { LocationQuery } from 'vue-router';
import siteData from '@/data/siteData.json';

export function getMonths(data: Date) {
  const arrayWithMonths = [];
  const numberOfMonths = 9;
  for (let i = 0; i < numberOfMonths; i++) {
    arrayWithMonths.push({
      name: format(addMonths(data, i), 'MMMM', {
        locale: deLocale,
      }),
      year: format(addMonths(data, i), 'yyy', {
        locale: deLocale,
      }),
      id: format(addMonths(data, i), 'MMMM'),
    });
  }

  return arrayWithMonths;
}

export function saveOnSessionStorage(key: string, value: any) {
  const valueToString = JSON.stringify(value);
  sessionStorage.setItem(key, valueToString);
}

export function getDataFromStorage(key: string) {
  return JSON.parse(sessionStorage.getItem(key) as string);
}

export function focusDatePickerInput(
  datePickerValue: InstanceType<typeof DatePicker>
) {
  datePickerValue.$el.querySelector('input').focus();
}

export function blurDatePickerInput(
  datePickerValue: InstanceType<typeof DatePicker>
) {
  datePickerValue.$el.querySelector('input').blur();
}

export function hasUrlParam(params: LocationQuery, paramName: string) {
  return Object.keys(params).some((item) => item === paramName);
}

export function roundNumber(number: number, precision: number) {
  return number % precision ? (number + precision) - (number % precision) : number;
}

export function prepareDestination(destinations: string[]) {
  const wrongData = ['australien/alle', 'kanada/alle', 'usa/alle'];

  return destinations.map(i => {
    if (wrongData.includes(i.replace(/\s/g, '').toLowerCase())) {
      return i.replace(/\s+/g, '')
        .replace(/[\s-\/]/g, '_')
        .toLowerCase();
    }
    let preparedDestination = i.trim().toLowerCase().split('/').pop() ?? '';

    return preparedDestination.trim().replace(/[\s-]/g, '_');
  }).join(';');
}

export function getSiteData() {
  return siteData[import.meta.env.VITE_SITE];
}

export const getImageUrl = (name: string) => {
  return new URL(`/src/assets/${name}`, import.meta.url).href
}