import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RawProduct, RawProductIds } from 'src/typeorm/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(RawProduct)
        private readonly productsRepository: Repository<RawProduct>,
        @InjectRepository(RawProductIds)
        private readonly productIdsRepository: Repository<RawProductIds>
    ) { }

    async insertBatchProducts(products: Record<string, string>[]) {
        await this.productsRepository.createQueryBuilder()
            .insert()
            .into(RawProduct)
            .values(products)
            .execute();
    }

    async insertBatchProductIds(ids: Record<string, string>) {
        
    }
}
