import {PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from 'typeorm';

export abstract class  ClientsManagerEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

}
