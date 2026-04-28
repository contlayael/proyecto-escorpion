import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  zipCode!: string;

  // Total de la orden (10 dígitos en total, 2 decimales)
  @Column('decimal', { precision: 10, scale: 2 })
  total!: number;

  @CreateDateColumn()
  createdAt!: Date;

  // Relación: Una orden puede tener muchos "Items" (cobertores)
  // El cascade: true es mágico, nos permite guardar la orden y los items al mismo tiempo.
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];
}
