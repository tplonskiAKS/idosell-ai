import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RawProduct {
  @PrimaryColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  external_id: string;

  @Column({
    nullable: false, 
    default: '',
  })
  product_name: string;

  @Column({
    nullable: false, 
    type: 'int',
  })
  insert_id: number;
}

@Entity()
export class Insert {
  @PrimaryColumn({
    type: 'int',
    name: 'insert_id',
  })
  insert_id: number;

  @Column({
    nullable: false,
    type: "timestamptz",
  })
  date: Date;
}