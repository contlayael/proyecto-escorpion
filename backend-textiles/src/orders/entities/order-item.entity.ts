import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
// Asegúrate de que la ruta hacia tu producto sea correcta dependiendo de tu estructura
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  // Guardamos el precio al que se vendió en ese momento (por si luego sube el precio del catálogo)
  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  // Relación: Este item pertenece a UNA orden
  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;

  // Relación: Este item representa a UN producto
  @ManyToOne(() => Product)
  product!: Product;
}
