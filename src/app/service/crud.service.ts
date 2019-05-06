import {DatabaseConnectionHolder} from './database.connection.holder';
import {NGXLogger} from 'ngx-logger';
import {ErrorService} from './error.service';
import {Injectable} from '@angular/core';
import {ClientsManagerEntity} from '../entity/clients.manager.entity';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CRUDService {

    constructor(private databaseService: DatabaseConnectionHolder,
                private logger: NGXLogger,
                private errorService: ErrorService) {
    }

    async getAll(clazz) {
        return await this.databaseService.connection
            .then(() => clazz.find()).then(result => {
                this.logger.debug('Find all: ');
                this.logger.debug('Size: ' + result.length);
                return result;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATABASE_FIND_ERROR, error);
                return [];
            });
    }

    async getAllWithJoin(clazz, relations) {
        return await this.databaseService.connection
            .then(() => clazz.find(relations)).then(result => {
                this.logger.debug('Find all with join: ');
                this.logger.debug('Size: ' + result.length);
                return result;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATABASE_FIND_ERROR, error);
                return [];
            });
    }

    async update(clazz, entity: ClientsManagerEntity) {
        this.logger.debug('Update entity: ', entity);
        return await this.databaseService.connection
            .then(() => clazz.update(entity.id, entity)).then(result => {
                this.logger.debug('Success.');
                return result;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATABASE_EDIT_ERROR, error);
                return {};
            });
    }

    async create(clazz, entity: ClientsManagerEntity) {
        this.logger.debug('Create entity: ', entity);
        return await this.databaseService.connection
            .then(() => clazz.save(entity)).then(result => {
                this.logger.debug('Success.');
                return result;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATABASE_SAVE_ERROR, error);
                return {};
            });
    }

}
