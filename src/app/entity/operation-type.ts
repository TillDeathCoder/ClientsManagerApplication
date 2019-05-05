import {ClientsManagerEntity} from './clients.manager.entity';
import {Column, Entity} from 'typeorm';

@Entity('operation_types')
export class OperationType extends ClientsManagerEntity {

    @Column()
    title: string;

    @Column()
    description: string;
}
