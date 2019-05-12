import {Injectable} from '@angular/core';
import {CRUDService} from '../../service/crud.service';
import {Operation} from '../../entity/operation';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatisticYearBuilder {

    constructor(private crudService: CRUDService) {

    }

    async build(year) {
        const operations = await this.crudService.getAll(Operation);
        const months = environment.calendar.configuration.monthNames;

        if (_.isArray(operations) && _.isArray(months)) {
            const info = [];
            for (let index = 0; index < months.length; index++) {
                const title = months[index];
                info.push(this.buildMonthInfo(year, index + 1, title, operations));
            }

            return info;
        }

        return [];
    }

    buildMonthInfo(year, index, title, operations) {
        let sum = 0;
        _.each(operations, operation => {
            if (this.checkOperationForCalculate(year, index, operation)) {
                sum += +operation.price;
            }
        });

        return {
            y: sum,
            label: title
        };
    }

    checkOperationForCalculate(year, index, operation) {
        if (operation.status !== environment.operations.CLOSED_STATUS) {
            return false;
        }

        return this.checkDateRange(year, index, operation);
    }

    checkDateRange(year, index, operation) {
        const parsedDate = operation.date.split('-');
        if (+parsedDate[0] !== +year) {
            return false;
        }

        return +index === +parsedDate[1];
    }
}
