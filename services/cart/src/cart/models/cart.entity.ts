import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty } from 'class-validator';
import { CartItem } from './cartItem.entity';

//     id - uuid (Primary key)
//     user_id - uuid, not null (It's not Foreign key, because there is no user entity in DB)
//     created_at - date, not null
//     updated_at - date, not null
//     status - enum ("OPEN", "ORDERED")

enum Status {
  OPEN,
  ORDERED,
}

@Entity({ name: 'Carts' })
export class Cart extends BaseEntity {
  @Column({ type: 'varchar', name: 'user_id', nullable: false })
  @IsNotEmpty()
  userId: string;

  @Column({ type: 'enum', enum: Status, default: Status.OPEN })
  status: string;

  @OneToMany((type) => CartItem, (cartItem) => cartItem)
  @JoinColumn({
    name: 'id',
  })
  cartItems: CartItem[];
}
