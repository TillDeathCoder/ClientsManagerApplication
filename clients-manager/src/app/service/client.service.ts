import {Injectable} from '@angular/core';
import {Client} from '../entity/client';
import {DatabaseService} from './database.service';
import {NGXLogger} from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private databaseService: DatabaseService,
                private logger: NGXLogger) {
    }

    async getAllClients() {
        return await this.databaseService.connection
            .then(() => Client.find()).then(clients => {
                this.logger.debug('Clients: ');
                this.logger.debug('Size: ' + clients.length);
                this.logger.debug(clients);
                return clients;
            }).catch(error => {
                this.logger.error(error);
                return [];
            });
    }

    async updateClient(client: Client) {
        this.logger.debug('Update client: ', client);
        return await this.databaseService.connection
            .then(() => Client.update(client.id, client)).then(result => {
                this.logger.debug('Success.');
                this.logger.debug(result);
                return result;
            }).catch(error => {
                this.logger.error(error);
                return {};
            });
    }

    async createClient(client: Client) {
        this.logger.debug('Create client: ', client);
        return await this.databaseService.connection
            .then(() => Client.save(client)).then(result => {
                this.logger.debug('Success.');
                this.logger.debug(result);
                return result;
            }).catch(error => {
                this.logger.error(error);
                return {};
            });
    }

}
