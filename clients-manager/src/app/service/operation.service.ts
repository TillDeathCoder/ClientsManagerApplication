import {Injectable} from '@angular/core';
import {Operation} from '../entity/operation';
import {DatabaseService} from './database.service';
import {OperationType} from '../entity/operation-type';
import {NGXLogger} from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class OperationService {

    constructor(private databaseService: DatabaseService,
                private logger: NGXLogger) {
    }

    async getAllOperationTypes() {
        return await this.databaseService.connection
            .then(() => OperationType.find()).then(types => {
                this.logger.debug('OperationTypes: ');
                this.logger.debug('Size: ' + types.length);
                this.logger.debug(types);
                return types;
            }).catch(error => {
                this.logger.error(error);
                return [];
            });
    }

    getAllOperations() {
        return this.databaseService.connection
            .then(() => Operation.find({relations: ['operationType', 'client']})).then(operations => {
                this.logger.debug('Operations: ');
                this.logger.debug('Size: ' + operations.length);
                this.logger.debug(operations);
                return operations;
            }).catch(error => {
                this.logger.error(error);
                return [];
            });
    }

    async updateOperation(operation: Operation) {
        this.logger.debug('Update operation: ', operation);
        return await this.databaseService.connection
            .then(() => Operation.update(+operation.id, operation)).then(result => {
                this.logger.debug('Success.');
                this.logger.debug(result);
                return result;
            }).catch(error => {
                this.logger.error(error);
                return {};
            });

    }

    async createOperation(operation: Operation) {
        this.logger.debug('Create operation: ', operation);
        return await this.databaseService.connection
            .then(() => Operation.save(operation)).then(result => {
                this.logger.debug('Success.');
                this.logger.debug(result);
                return result;
            }).catch(error => {
                this.logger.error(error);
                return {};
            });
    }
}
