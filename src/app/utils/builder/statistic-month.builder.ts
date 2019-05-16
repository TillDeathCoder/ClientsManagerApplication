import {CRUDService} from '../../service/crud.service';
import {Injectable} from '@angular/core';
import {Operation} from '../../entity/operation';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';
import {DateUtils} from '../date.utils';

@Injectable({
    providedIn: 'root'
})
export class StatisticMonthBuilder {

    constructor(private crudService: CRUDService) {

    }

    async build(year, month) {
        console.log(month);
        const operations = await this.crudService.getAll(Operation);
        if (_.isArray(operations)) {
            const result = {
                info: [],
                sum: 0
            };
            const closedStatistic = this.buildClosedOperationStatistic(year, month, operations);
            result.sum = closedStatistic.sum;
            result.info.push(closedStatistic.info);

            const cancelledStatistic = this.buildCancelledOperationStatistic(year, month, operations);
            result.info.push(cancelledStatistic);

            return result;
        }

        return {
            info: [],
            sum: 0
        };
    }

    checkOperationForCalculate(year, month, operation, status) {
        return DateUtils.checkDateRange(year, month, operation) && operation.status === status;
    }

    buildClosedOperationStatistic(year, month, operations) {
        let sum = 0;
        let count = 0;
        _.each(operations, operation => {
            if (this.checkOperationForCalculate(year, month, operation, environment.operations.CLOSED_STATUS)) {
                sum += +operation.price;
                count++;
            }
        });

        return {
            sum: sum,
            info: {y: count, name: environment.operations.STATISTIC_CLOSED_TITLE}
        };
    }

    buildCancelledOperationStatistic(year, month, operations) {
        let count = 0;
        _.each(operations, operation => {
            if (this.checkOperationForCalculate(year, month, operation, environment.operations.CANCELLED_STATUS)) {
                count++;
            }
        });

        return {y: count, name: environment.operations.STATISTIC_CANCELLED_TITLE, exploded: true, color: 'orange'};
    }
}
