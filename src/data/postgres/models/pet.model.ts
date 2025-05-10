import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*export enum PetStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}*/

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', {
    nullable: false,
  })
  weight: number;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    length: 30,
    nullable: false,
    default: 'unknown',
  })
  breed: string;

  @Column('boolean', {
    default: true,
    nullable: false,
  })
  status: boolean;
  /*@Column("enum", {
    enum: PetStatus,
    default: PetStatus.ACTIVE,
  })
  status: PetStatus;*/
}
