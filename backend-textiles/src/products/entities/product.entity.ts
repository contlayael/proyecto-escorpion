// src/products/entities/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products') // Nombre de la tabla en la DB
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'float', precision: 10, scale: 2 })
  price_retail!: number; // Precio unitario (menudeo)

  @Column({ type: 'float', precision: 10, scale: 2 })
  price_wholesale!: number; // Precio mayoreo

  @Column()
  stock!: number;

  // Campos para el cálculo de envío (Cubicaje)
  @Column({ type: 'float' })
  weight!: number; // en kg

  @Column({ type: 'float' })
  width!: number; // en cm

  @Column({ type: 'float' })
  height!: number; // en cm

  @Column({ type: 'float' })
  length!: number; // en cm
}
