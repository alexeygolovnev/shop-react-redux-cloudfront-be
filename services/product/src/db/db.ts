import { productsMock } from '@Mocks';
import { Product } from '@Models';
import { IDb } from './types';

class Db implements IDb {
  products: Product[]

  constructor() {
    this.products = [...productsMock];
  }

  async getProducts() {
    return Promise.resolve(this.products);
  }

  async getProductById(id: Product['id']) {
    return Promise.resolve(this.products.find((product) => product.id === id));
  }
}

export default Db;
