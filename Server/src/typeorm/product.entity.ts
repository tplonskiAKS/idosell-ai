import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RawProduct {
  @PrimaryGeneratedColumn()
  internal_id: number;

  @Column({
    type: 'int',
    name: 'id',
  })
  @ApiProperty({ example: 1 })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  @ApiProperty({ example: 'MOV2424' })
  external_id: string;

  @Column({
    nullable: false, 
    default: '',
  })
  @ApiProperty({ example: 'MOBY PLAY 2LP' })
  product_name: string;

  @Column({
    nullable: false, 
    type: 'int',
  })
  @ApiProperty({ example: 2 }) 
  insert_id: number;
}

@Entity()
export class Insert {
  @PrimaryColumn({
    type: 'int',
    name: 'insert_id',
  })
  @ApiProperty({ example: 1 })
  insert_id: number;

  @Column({
    nullable: false,
    type: "timestamptz",
  })
  date: Date;
}

@Entity()
export class RawProductIds {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: false, 
    type: 'int',
  })
  @ApiProperty({ example: 2 }) 
  insert_id: number;
}