import { Product } from '@Models';

interface IDb { 
    products: Product[],
    getProducts: () => Promise<Product[]>
    getProductById: (id: Product['id']) => Promise<Product | null>,
}

export { IDb };
