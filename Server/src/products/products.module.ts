import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawProduct, RawProductIds } from 'src/typeorm/product.entity';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RawProduct, RawProductIds])
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
