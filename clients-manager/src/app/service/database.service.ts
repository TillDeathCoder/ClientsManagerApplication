import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {OperationType} from '../entity/operation-type';
import {Operation} from '../entity/operation';
import {Client} from '../entity/client';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public connection: Promise<Connection>;
  private readonly options: ConnectionOptions;

  constructor() {
    this.options = {
      type: 'mysql',
      entities: [OperationType, Client, Operation],
      synchronize: true,
      logging: true,
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'clients_manager_database',
    };
    this.connection = createConnection(this.options);
  }
}
