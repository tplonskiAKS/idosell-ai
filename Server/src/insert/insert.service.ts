import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Insert } from 'src/typeorm/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsertService {
    constructor(
        @InjectRepository(Insert)
        private readonly insertRepository: Repository<Insert>,
    ) {}

    async createInsert(createInsertIdDto: Partial<Insert>): Promise<Insert> {
        const newInsertId = this.insertRepository.create(createInsertIdDto);
        return this.insertRepository.save(newInsertId);
    }
    async findLastInsert(): Promise<Insert> {
        return this.insertRepository.findOne({
            where: {
              /* You can leave this empty or add your own conditions */
            },
            order: { date: 'DESC' },
      });
    }
}
