import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {Client} from '../entity/client';
import {OperationType} from '../entity/operation-type';
import {Operation} from '../entity/operation';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {
        this.options = {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'clients_manager_database',
            entities: [Client, OperationType, Operation],
            logging: false
        };
        this.connection = createConnection(this.options);
    }
}
