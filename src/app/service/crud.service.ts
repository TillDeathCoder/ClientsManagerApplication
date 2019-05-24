import {DatabaseConnectionHolder} from './database.connection.holder';
import {ErrorService} from './error.service';
import {Injectable} from '@angular/core';
import {ClientsManagerEntity} from '../entity/clients.manager.entity';
import {environment} from '../../environments/environment';
import {Logger} from '../utils/logger';

@Injectable({
    providedIn: 'root'
})
export class CRUDService {

    constructor(private databaseService: DatabaseConnectionHolder,
                private logger: Logger,
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

    async getById(clazz, id) {
        return await this.databaseService.connection
            .then(() => clazz.find({where: {id: id}})).then(result => {
                this.logger.debug('Find by id: ' + id);
                this.logger.debug('Size: ' + result.length);
                return result;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATABASE_FIND_ERROR, error);
                return [];
            });
    }

    async getByIdWithJoin(clazz, id, relations) {
        return await this.databaseService.connection
            .then(() => clazz.find({where: {id: id}, relations: relations})).then(result => {
                this.logger.debug('Find with join by id: ' + id);
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
                this.logger.debug(result);
                return result;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATABASE_EDIT_ERROR, error);
                return {};
            });
    }

    async create(clazz, entity: ClientsManagerEntity) {
        this.logger.debug('Create entity: ', entity);
        return await this.databaseService.connection
            .then(() => clazz.insert(entity)).then(result => {
                this.logger.debug('Success.');
                this.logger.debug(result);
                entity.id = result.raw;
                return entity;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATABASE_SAVE_ERROR, error);
                return {};
            });
    }

}
