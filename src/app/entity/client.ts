import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ClientsManagerEntity} from './clients.manager.entity';
import {Operation} from './operation';

@Entity('clients')
export class Client extends ClientsManagerEntity {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  nickname: string;

  @Column()
  internetLink: string;

  @Column()
  phoneNumber: string;

  @Column()
  avatarPath: string;

  @Column()
  status: string;

  @OneToMany(type => Operation, operation => operation.client)
  operations: Operation[];

  static getClientForCreate() {
    const client = new Client();
    client.firstName = '';
    client.phoneNumber = '';
    return client;
  }

}
