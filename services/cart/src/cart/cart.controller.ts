import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  HttpStatus,
  Param,
  Post,
  Logger,
} from '@nestjs/common';

import { CartService } from './cart.service';

@Controller('api/carts')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getAllCarts() {
    const [carts, total] = await this.cartService.getAllCarts();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { carts, total },
    };
  }

  @Get(':userId')
  async findUserCart(@Param() params: { userId: string }) {
    const cart = await this.cartService.findOrCreateByUserId(params.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: cart.cartItems?.length - 1 },
    };
  }

  @Get(':userId/items')
  async findUserCartItems(@Param() params: { userId: string }) {
    const cart = await this.cartService.findByUserId(params.userId);
    const [cartItems, total] = await this.cartService.findCartItems(cart.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cartItems, total },
    };
  }

  @Post(':userId')
  async createCart(@Param() params: { userId: string }, @Body() body: any) {
    Logger.log({ body });
    const cart = this.cartService.createByUserId(params.userId, body);

    return {
      statusCode: HttpStatus.OK,
      body: {
        cart,
      },
    };
  }

  @Delete(':userId')
  clearUserCart(@Param() params: { userId: string }) {
    this.cartService.removeByUserId(params.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}
