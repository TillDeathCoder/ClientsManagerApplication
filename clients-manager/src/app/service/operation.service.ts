import {Injectable} from '@angular/core';
import {Operation} from '../entity/operation';
import {DatabaseService} from './database.service';
import {OperationType} from '../entity/operation-type';

@Injectable({
    providedIn: 'root'
})
export class OperationService {

    constructor(private databaseService: DatabaseService) {
    }

    async getAllOperationTypes() {
        return await this.databaseService.connection
            .then(() => OperationType.find());
    }

    getAllOperations() {
        return this.databaseService.connection
            .then(() => Operation.find({relations: ['operationType', 'client']}));
    }

    async updateOperation(operation: Operation) {
        return await this.databaseService.connection
            .then(() => Operation.update(operation.id, Operation));

    }

    async createOperation(operation: Operation) {
        return await this.databaseService.connection
            .then(() => Operation.save(operation));
    }
}
