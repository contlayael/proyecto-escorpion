import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // 1. Preparamos el objeto estructurado
    const newOrder = this.orderRepository.create({
      fullName: createOrderDto.fullName,
      email: createOrderDto.email,
      phone: createOrderDto.phone,
      address: createOrderDto.address,
      city: createOrderDto.city,
      zipCode: createOrderDto.zipCode,
      total: createOrderDto.total,
      // Mapeamos los items del carrito para que TypeORM los entienda
      items: createOrderDto.items.map((item) => ({
        product: { id: item.productId }, // Solo necesitamos el ID del producto
        quantity: item.quantity,
        price: item.price,
      })),
    });

    // 2. Guardamos en la base de datos (¡Esto guarda en las 2 tablas a la vez!)
    return await this.orderRepository.save(newOrder);
  }
}
