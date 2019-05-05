import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ClientsManagerEntity} from './clients.manager.entity';

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

  static getClientForCreate() {
    const client = new Client();
    client.firstName = '';
    client.phoneNumber = '';
    return client;
  }

}
