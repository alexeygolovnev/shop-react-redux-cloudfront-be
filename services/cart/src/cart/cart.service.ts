import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem } from './models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartService {
  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>;

  @InjectRepository(CartItem)
  private readonly cartItemRepository: Repository<CartItem>;

  async getAllCarts(): Promise<[Cart[], number]> {
    const result = await this.cartRepository.findAndCount();
    return result;
  }

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartRepository.findOne({
      where: {
        userId,
      },
    });
  }

  createCartItem(cartId: string, items: CartItem[]) {
    const newItems = items ?? {};
    this.cartItemRepository.create({ ...newItems, cartId });
  }

  createByUserId(userId: string, items: CartItem[]) {
    const id: string = v4(v4());
    const cart = this.cartRepository.create({ id, userId });
    this.createCartItem(id, items);

    return cart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId, null);
  }

  async updateByUserId(userId: string, item: CartItem) {
    const cart = await this.findOrCreateByUserId(userId);

    await this.cartItemRepository.update(item.id, { ...item });

    return await this.findByUserId(userId);
  }

  async findCartItems(cartId: string) {
    return await this.cartItemRepository.findAndCount({ where: { cartId } });
  }

  async removeByUserId(userId) {
    return await this.cartRepository.delete(userId);
  }
}
