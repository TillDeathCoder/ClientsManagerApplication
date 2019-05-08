import {Operation} from '../../entity/operation';
import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationCalendarEventConverter {

    public convertArray(operations: Operation[], status) {
        if (_.isArray(operations)) {
            const events = [];
            _.each(operations, operation => {
                if (operation.status === status || status === environment.operations.ALL_STATUS) {
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
            color: this.findColor(operation),
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

    private findColor(operation: Operation) {
        switch (operation.status) {
            case environment.operations.CLOSED_STATUS:
                return environment.calendar.colors.CLOSED_COLOR;
            case environment.operations.OPEN_STATUS :
                if (operation.client.status === environment.clients.BANNED_STATUS) {
                    return environment.calendar.colors.CANCELLED_COLOR;
                }
                return environment.calendar.colors.OPEN_COLOR;
            case environment.operations.CANCELLED_STATUS:
                return environment.calendar.colors.CANCELLED_COLOR;
            default:
                return environment.calendar.colors.DEFAULT_COLOR;
        }
    }

}
