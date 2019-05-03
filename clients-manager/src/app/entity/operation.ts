import {OperationType} from './operation-type';
import {Client} from './client';
import {ClientsManagerEntity} from './clients.manager.entity';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';

const OPEN_STATUS = 'OPEN';
const DEFAULT_PRICE = 25;

@Entity('operations')
export class Operation extends ClientsManagerEntity {

    @OneToOne(type => OperationType)
    @JoinColumn()
    operationType: OperationType;

    @OneToOne(type => Client)
    @JoinColumn()
    client: Client;

    @Column()
    date: string;

    @Column()
    startTime: string;

    @Column()
    finishTime: string;

    @Column()
    price: number;

    @Column()
    comment: string | null;

    @Column()
    status: string;

    static getOperationForCreate(date) {
        const operation = new Operation();

        const operationType = new OperationType();
        operationType.id = 1;

        const client = new Client();
        client.id = 1;

        operation.operationType = operationType;
        operation.client = client;

        // TODO add new date + 2 days
        operation.date = date;
        operation.startTime = '10:00';
        operation.finishTime = '12:00';
        operation.price = DEFAULT_PRICE;
        operation.status = OPEN_STATUS;

        return operation;
    }
}
