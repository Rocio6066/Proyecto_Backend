import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({
    unique: true,
    length: 100,
  })
  correo: string;

  @Column()
  password: string;

  @Column({
    default: 'ADMIN',
  })
  rol: string;

  @Column({
    default: true,
  })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;
}