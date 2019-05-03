import {Injectable} from '@angular/core';
import {Operation} from '../entity/operation';
import {ClientsManagerTimeFormatter} from './clients-manager-time-formatter';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {OperationService} from '../service/operation.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class OperationValidator {

    constructor(private timeFormatter: ClientsManagerTimeFormatter,
                private operationService: OperationService) {
    }

    validateStartAndFinishTimeValue(operation: Operation) {
        const start: NgbTimeStruct = this.timeFormatter.formatTime(operation.startTime);
        const finish: NgbTimeStruct = this.timeFormatter.formatTime(operation.finishTime);

        if (start.hour > finish.hour) {
            return false;
        }

        if (start.hour === finish.hour) {
            if (start.minute === finish.minute || start.minute > finish.minute) {
                return false;
            }
        }

        return true;
    }

    validateDateTimeRange(operation: Operation) {
        return this.operationService.getAllOperations().then(response => {
            if (_.isArray(response)) {
                const result = _.filter(response, current => {
                    if (moment(current.date).isSame(moment(operation.date)) && current.status === 'OPEN' && current.id !== operation.id) {
                        return !this.validateTimeRange(current, operation);
                    }
                    return false;
                });

                if (result.length !== 0) {
                    return {error: true};
                }
            }
            return null;
        });
    }

    private validateTimeRange(current: Operation, operation: Operation) {
        const currentStart = this.timeFormatter.formatTime(current.startTime);
        const currentFinish = this.timeFormatter.formatTime(current.finishTime);

        const start = this.timeFormatter.formatTime(operation.startTime);
        const finish = this.timeFormatter.formatTime(operation.finishTime);

        if (currentStart.hour > finish.hour) {
            return true;
        }

        if (currentStart.hour === finish.hour) {
            return currentStart.minute >= finish.minute;
        }

        if (currentFinish.hour < start.hour) {
            return true;
        }

        if (currentFinish.hour === start.hour) {
            return currentFinish.minute <= start.minute;
        }

        return false;
    }

}
