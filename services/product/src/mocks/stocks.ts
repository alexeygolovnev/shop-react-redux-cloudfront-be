import { Stock } from '@Models';
import productsMock from './products';

const stocksMock: Stock[] = productsMock.map((product) => ({
    productId: product.id,
    count: Math.floor(Math.random() * (100 - 10) + 10),
}));

export default stocksMock;
