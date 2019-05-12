import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';

const I18N_VALUES_RU = {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    shortMonths: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
    fullMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
};

@Injectable()
export class ClientsManagerDatepickerLocaleFormatter extends NgbDatepickerI18n {
  getDayAriaLabel(date: NgbDateStruct): string {
    return '';
  }
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES_RU.weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES_RU.shortMonths[month - 1];
  }
  getMonthFullName(month: number): string {
    return I18N_VALUES_RU.fullMonths[month - 1];
  }

}
