import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';

@Entity('publicaciones')
export class Publicacion {

  @PrimaryGeneratedColumn()
  id: number;

  // 🔗 RELACIÓN CON PRODUCTO
  @Column()
  productoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  // 🖼 IMAGEN DE SUPABASE
    @Column('text', { nullable: true })
    imagenUrl: string;

  @Column({
    default: true,
  })
  activa: boolean;

  @Column({
    default: 0,
  })
  likes: number;

  @CreateDateColumn()
  createdAt: Date;
}