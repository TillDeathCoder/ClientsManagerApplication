import {Injectable} from '@angular/core';
import {Operation} from '../entity/operation';
import {from} from 'rxjs';
import {DatabaseService} from './database.service';
import {OperationType} from '../entity/operation-type';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private databaseService: DatabaseService) {
  }

  async getAllOperationTypes() {
    return this.databaseService
      .connection
      .then(() => OperationType.find());
  }

  getAllOperations() {
    return this.databaseService
      .connection
      .then(() => Operation.find({relations: ['operationType', 'client']}));
  }

  async updateOperation(operation: Operation) {
    const entity = this.prepareObject(operation);

    return this.databaseService
      .connection
      .then(() => Operation.update(operation.id, entity));
  }

  async createOperation(operation: Operation) {
    const entity = this.prepareObject(operation);
    return this.databaseService
      .connection
      .then(() => Operation.create(entity));
  }

  prepareObject(operation: Operation) {
    return {
      operationTypeId: operation.operationType.id,
      clientId: operation.client.id,
      date: operation.date,
      start: operation.startTime,
      finish: operation.finishTime,
      price: operation.price,
      comment: operation.comment,
      status: operation.status
    };
  }

}
