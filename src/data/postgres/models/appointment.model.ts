import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.model';
import { User } from './user.model';

export enum AppointmentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', {
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
    nullable: false,
  })
  status: AppointmentStatus;

  @Column('timestamp', {
    nullable: false,
  })
  date: Date;

  @Column('text', {
    nullable: false,
  })
  reason: string;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @ManyToOne(() => Pet, (pet) => pet.appointments)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'doctor_id' })
  user: User;
}
