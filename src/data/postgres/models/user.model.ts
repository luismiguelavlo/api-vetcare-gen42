import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.model';
import { Appointment } from './appointment.model';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  DOCTOR = 'doctor',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 80, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  phone_number: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default:
      'https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid&w=740',
  })
  photo_url: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  rol: UserRole;

  @Column({ type: 'boolean', default: false, nullable: false })
  status: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @OneToMany(() => Pet, (pet) => pet.user)
  pet: Pet[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
