import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {Client} from '../entity/client';
import {OperationType} from '../entity/operation-type';
import {Operation} from '../entity/operation';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {
        // @ts-ignore
        this.options = {
            type: environment.databaseConfiguration.type,
            database: environment.databaseConfiguration.database,
            logging: environment.databaseConfiguration.logging,
            entities: [Client, OperationType, Operation]
        };
        this.connection = createConnection(this.options);
    }
}
