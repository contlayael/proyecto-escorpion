import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'; // <-- Usamos DataSource en lugar de Repository
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  // Inyectamos la conexión global de la base de datos
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async seed() {
    // Obtenemos el repositorio directamente de la fuente de verdad
    const productRepo = this.dataSource.getRepository(Product);

    const testProducts = [
      {
        name: 'Cobertor Borrego King Size',
        description: 'Ultra suave, color gris Oxford. Ideal para frentes fríos.',
        price_retail: 850.00,
        price_wholesale: 600.00,
        stock: 50,
        weight: 3.5, width: 240, height: 5, length: 260
      },
      {
        name: 'Cobertor Ligero Individual',
        description: 'Ideal para primavera, estampado floral.',
        price_retail: 450.00,
        price_wholesale: 320.00,
        stock: 100,
        weight: 1.2, width: 150, height: 2, length: 220
      }
    ];

    await productRepo.save(testProducts);
    return { message: '✅ Base de datos poblada exitosamente' };
  }

  findAll() {
    const productRepo = this.dataSource.getRepository(Product);
    return productRepo.find();
  }

  // ... (puedes dejar los demás métodos abajo)
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }
  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }
  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}