import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Usuario por defecto
      password: 'greenevilday15', // LA QUE PUSISTE AL INSTALAR
      database: 'db_textiles',
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //entities: [Product],
      entities: [__dirname + '/products/entities/*.entity{.ts,.js}'],
      //autoLoadEntities: true, // Esto cargará nuestras clases automáticamente
      //synchronize: true, // ¡IMPORTANTE! Crea las tablas automáticamente (solo en desarrollo)
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
