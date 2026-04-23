import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
      autoLoadEntities: true, // Esto cargará nuestras clases automáticamente
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡IMPORTANTE! Crea las tablas automáticamente (solo en desarrollo)
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
