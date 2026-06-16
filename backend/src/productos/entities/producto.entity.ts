import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
  })
  nombre: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  precio: number;

  @Column()
  stock: number;

  @Column('text')
  detalle: string;

  @Column({
    default: true,
  })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;
}