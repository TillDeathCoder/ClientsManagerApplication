import {Injectable} from '@angular/core';
import {Client} from '../entity/client';
import {DatabaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private databaseService: DatabaseService) {
  }

  async getAllClients() {
    return await this.databaseService.connection
        .then(() => Client.find());
  }

  async updateClient(client: Client) {
    return await this.databaseService.connection
        .then(() => Client.update(client.id, client));
  }

  async createClient(client: Client) {
    return await this.databaseService.connection
        .then(() => Client.save(client));
  }

}
