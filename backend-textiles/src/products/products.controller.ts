import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. RUTA SEED (Debe ir antes que la ruta con :id)
  @Get('seed')
  seedDatabase() {
    return this.productsService.seed();
  }

  // 2. RUTA PARA VER TODOS
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // 3. RUTA POR ID (La que estaba causando el NaN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} product`;
  }
}
