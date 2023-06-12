import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';

export function handleInputEvent(event: Event) {
  return (event.target as HTMLInputElement).value;
}

export function getMonths(data: Date) {
  const arrayWithMonths = [];
  const numberOfMonths = 6;
  for (let i = 0; i < numberOfMonths; i++) {
    arrayWithMonths.push({
      name: format(addMonths(data, i), 'MMMM'),
      year: format(addMonths(data, i), 'yyy'),
      id: format(addMonths(data, i), 'yyy-MM'),
    });
  }
  return arrayWithMonths;
}

export function maxNumberOfValues(event: Event, quantity: number) {
  (event.target as HTMLInputElement).value = (
    event.target as HTMLInputElement
  ).value.slice(0, quantity);
}

export function getNumberOfZeros(number: number): number {
  return +Math.trunc(number).toString().length
}