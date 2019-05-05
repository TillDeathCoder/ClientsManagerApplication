import {Operation} from '../../entity/operation';
import * as _ from 'lodash';
import {OperationType} from '../../entity/operation-type';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationCalendarEventConverter {

    public convertArray(operations: Operation[]) {
        if (_.isArray(operations)) {
            const events = [];
            _.each(operations, operation => {
                if (environment.operations.OPEN_STATUS === operation.status) {
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
            color: this.findColor(operation.operationType),
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

    private findColor(operationType: OperationType) {
        switch (+operationType.id) {
            case environment.operationTypes.SIMPLE_EYELASH_EXTENSION_TYPE_ID:
                return environment.calendar.colors.SIMPLE_EYELASH_EXTENSION_TYPE_COLOR;
            case environment.operationTypes.EYELASH_REMOVAL_TYPE_ID :
                return environment.calendar.colors.EYELASH_REMOVAL_TYPE_COLOR;
            case environment.operationTypes.COMBO_TYPE_ID:
                return environment.calendar.colors.COMBO_TYPE_COLOR;
            default:
                return environment.calendar.colors.DEFAULT_COLOR;
        }
    }

}
