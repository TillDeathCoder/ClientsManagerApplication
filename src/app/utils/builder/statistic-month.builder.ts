import {CRUDService} from '../../service/crud.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StatisticMonthBuilder {

    constructor(private crudService: CRUDService) {

    }

}
