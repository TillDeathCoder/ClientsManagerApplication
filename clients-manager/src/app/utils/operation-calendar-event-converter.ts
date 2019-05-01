import {Operation} from '../entity/operation';
import * as _ from 'lodash';
import {OperationType} from '../entity/operation-type';
import {Injectable} from '@angular/core';

const SIMPLE_EYELASH_EXTENSION_TYPE_ID = 1;
const EYELASH_REMOVAL_TYPE_ID = 2;
const COMBO_TYPE_ID = 3;

const SIMPLE_EYELASH_EXTENSION_TYPE_COLOR = '#ffab82';
const EYELASH_REMOVAL_TYPE_COLOR = '#84ff78';
const COMBO_TYPE_COLOR = '#8298ff';
const DEFAULT_COLOR = '#ff62ee';

const OPEN_STATUS = 'OPEN';

@Injectable({
  providedIn: 'root'
})
export class OperationCalendarEventConverter {

  public convertArray(operations: Operation[]) {
    if (_.isArray(operations)) {
      const events = [];
      _.each(operations, operation => {
        if (OPEN_STATUS === operation.status) {
          const event = this.convert(operation);
          events.push(event);
        }
      });

      return _.compact(events);
    }

    return [];
  }

  public convert(operation: Operation) {
    return {
      id: operation.id,
      title: this.buildTitle(operation),
      start: this.buildDateTime(operation.date, operation.startTime),
      end: this.buildDateTime(operation.date, operation.finishTime),
      color: this.definyColor(operation.operationType),
      editable: false,
      fullData: operation
    };
  }

  private buildTitle(operation: Operation) {
    if (operation.client.lastName) {
      return `${operation.client.lastName} ${operation.client.firstName}`;
    }

    return operation.client.firstName;
  }

  private buildDateTime(date: string, time: string) {
    return `${date}T${time}`;
  }

  private definyColor(operationType: OperationType) {
    switch (operationType.id) {
      case SIMPLE_EYELASH_EXTENSION_TYPE_ID:
        return SIMPLE_EYELASH_EXTENSION_TYPE_COLOR;
      case EYELASH_REMOVAL_TYPE_ID :
        return EYELASH_REMOVAL_TYPE_COLOR;
      case COMBO_TYPE_ID:
        return COMBO_TYPE_COLOR;
      default:
        return DEFAULT_COLOR;
    }
  }
}
