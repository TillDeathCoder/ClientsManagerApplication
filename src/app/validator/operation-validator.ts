import {Injectable} from '@angular/core';
import {Operation} from '../entity/operation';
import {ClientsManagerTimeFormatter} from '../formatter/clients-manager-time-formatter';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {CRUDService} from '../service/crud.service';
import {isNumber} from 'util';

@Injectable({
    providedIn: 'root'
})
export class OperationValidator {

    constructor(private timeFormatter: ClientsManagerTimeFormatter,
                private crudService: CRUDService) {
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
        return this.crudService.getAllWithJoin(Operation, {relations: ['client', 'operationType']})
            .then(operations => {
            if (_.isArray(operations)) {
                const result = _.filter(operations, current => {
                    if (this.checkEqualsCriteria(current, operation)) {
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

    private checkEqualsCriteria(current, operation) {
        return moment(current.date).isSame(moment(operation.date))
            && current.status === environment.operations.OPEN_STATUS
            && current.client.status !== environment.clients.BANNED_STATUS
            && operation.status === environment.operations.OPEN_STATUS
            && current.id !== operation.id;
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
