import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Usuario por defecto
      password: 'greenevilday15', // LA QUE PUSISTE AL INSTALAR
      database: 'db_textiles',
      entities: [__dirname + '/***.entity{.ts,.js}'],
      //entities: [Product],
      //entities: [__dirname + '/products/entities/*.entity{.ts,.js}'],
      /*autoLoadEntities: true, // Esto cargará nuestras clases automáticamente
      synchronize: true, // ¡IMPORTANTE! Crea las tablas automáticamente (solo en desarrollo)
    }),*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Usará la URL de la nube si existe, si no, intentará conectarse en local
      url:
        process.env.DATABASE_URL ||
        'postgresql://postgres:greenevilday15@localhost:5432/db_textiles',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Necesario para la nube
    }),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
