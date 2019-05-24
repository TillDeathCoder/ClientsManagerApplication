import {OperationType} from './operation-type';
import {Client} from './client';
import {ClientsManagerEntity} from './clients.manager.entity';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {environment} from '../../environments/environment';

@Entity('operations')
export class Operation extends ClientsManagerEntity {

    @OneToOne(type => OperationType, operationType => operationType.id)
    @JoinColumn()
    operationType: OperationType;

    @OneToOne(type => Client, client => client.id)
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

        operation.operationType = operationType;
        operation.date = date;
        operation.startTime = environment.operations.DEFAULT_START;
        operation.finishTime = environment.operations.DEFAULT_FINISH;
        operation.price = environment.operations.DEFAULT_PRICE;
        operation.status = environment.operations.OPEN_STATUS;

        return operation;
    }
}
