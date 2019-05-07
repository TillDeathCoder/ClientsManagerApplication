import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {Client} from '../entity/client';
import {OperationType} from '../entity/operation-type';
import {Operation} from '../entity/operation';
import {environment} from '../../environments/environment';
import * as path from 'path';
import {remote} from 'electron';

@Injectable({
    providedIn: 'root'
})
export class DatabaseConnectionHolder {

    public connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {

        const appPath = remote.app.getAppPath();
        const dbPath = path.join(appPath, '/database/');
        const database = path.join(dbPath, environment.databaseConfiguration.databaseName);

        console.log(database);
        // @ts-ignore
        this.options = {
            type: environment.databaseConfiguration.type,
            database: database,
            logging: environment.databaseConfiguration.logging,
            entities: [Client, OperationType, Operation]
        };
        this.connection = createConnection(this.options);
    }
}
