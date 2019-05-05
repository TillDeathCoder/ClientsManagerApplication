import {NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
import {isNull} from 'util';

@Injectable()
export class ClientsManagerDateFormatter extends NgbDateParserFormatter {
  format(date: NgbDateStruct): string {
    if (isNull(date)) {
      return '';
    }

    const year = date.year;
    const month = this.formatValue(date.month);
    const day = this.formatValue(date.day);

    return `${year}-${month}-${day}`;
  }

  private formatValue(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  parse(value: string): NgbDateStruct {
    if (isNull(value)) {
      return;
    }
    const parsedDate = value.split('-');
    return new NgbDate(+parsedDate[0], +parsedDate[1], +parsedDate[2]);
  }

}
