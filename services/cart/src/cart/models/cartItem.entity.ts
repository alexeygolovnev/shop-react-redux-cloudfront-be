import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty } from 'class-validator';
import { Cart } from './cart.entity';

//   cart_id - uuid (Foreign key from carts.id)
//   product_id - uuid
//   count - integer (Number of items in a cart)

@Entity({ name: 'CartItems' })
export class CartItem extends BaseEntity {
  @Column({ type: 'varchar', name: 'cart_id' })
  @ManyToOne((type) => Cart, (cart) => cart.id)
  cartId: Cart['id'];

  @Column({ type: 'varchar', name: 'product_id' })
  @IsNotEmpty()
  productId: string;

  @Column({ type: 'int', name: 'count', default: 0 })
  @IsNotEmpty()
  count: number;
}
