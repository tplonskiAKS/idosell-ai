import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OfferIdsDto {
  @IsNotEmpty()
  @ApiProperty()
  productIds: string;
}
