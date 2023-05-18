import { Cart, CartItem } from '../../../cart/models';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export default class CartSeed {
  async run(dataSource: DataSource) {
    const cartRepository = dataSource.getRepository(Cart);
    const cartItemRepository = dataSource.getRepository(CartItem);

    const carts = [
      {
        id: '59205672-e908-4474-9ba7-d1132ae62c5a',
        userId: '7986896d-12b7-4fd0-895a-eb3ca23de66b',
      },
      {
        id: '35efd8e3-a281-40db-8856-bb44b08ddd69',
        userId: '328a876e-b574-4665-a397-bc317d234069',
      },
      {
        id: '419982bd-746e-461b-af81-176c54d31e84',
        userId: 'f1bb2ced-f3e3-4bc4-b291-7687a30b20a9',
      },
      {
        id: 'c005b3bf-ff58-40f1-b073-a92af292bec0',
        userId: '83c5839f-bed1-4f4d-bfbc-f9bb6fdc07fd',
      },
      {
        id: 'cf1bf3f6-c661-446d-b515-23ed8a836de1',
        userId: 'a86353c0-1ea8-413f-b315-08fc6cdf9dc4',
      },
    ].map((c) => {
      const newCart = new Cart();
      newCart.id = c.id;
      newCart.userId = c.userId;
      newCart.cartItems = null;

      return newCart;
    });
    await cartRepository.save(carts);
    const cartItems = [
      {
        cart: carts[0],
        id: uuidv4(),
        productId: '1f1b32d0-3a88-410c-ae6d-2eec82b70b72',
      },
      {
        cart: carts[0],
        id: uuidv4(),
        productId: '72a9e101-6fb1-4bfb-974b-88b4691d950b',
      },
    ].map((c) => {
      const newItem = new CartItem();
      newItem.cartId = c.cart.id;
      newItem.id = c.id;
      newItem.productId = c.productId;

      return newItem;
    });

 

    await cartItemRepository.save(cartItems);
  }
}
