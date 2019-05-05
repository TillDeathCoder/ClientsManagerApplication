import {Injectable} from '@angular/core';

const TIME_SEPARATOR = ':';
const DEFAULT_TIME = {hour: 9, minute: 0, second: 0};

@Injectable({
  providedIn: 'root'
})
export class ClientsManagerTimeFormatter {

  formatTime(value: string) {
    if (!value || value.length === 0) {
      return DEFAULT_TIME;
    }
    const parsedValue = value.split(TIME_SEPARATOR);

    if (parsedValue.length < 2) {
      return DEFAULT_TIME;
    }

    return {
      hour: +parsedValue[0],
      minute: +parsedValue[1],
      second: 0
    };
  }

  formatString(value) {
    const hours = this.formatZero(value.hour);
    const minutes = this.formatZero(value.minute);

    return `${hours}:${minutes}:00`;
  }

  formatZero(value) {
    if (+value === 0) {
      return '00';
    }
    return value;
  }

}
