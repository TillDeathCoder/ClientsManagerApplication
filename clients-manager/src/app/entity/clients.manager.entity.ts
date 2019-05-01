import {BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

export abstract class  ClientsManagerEntity extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

}
