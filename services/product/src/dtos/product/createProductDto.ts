import { Product, Stock } from '@Models';

type CreateProduct = Pick<Product, 'price' | 'description' | 'title'> & Pick<Stock, 'count'>;
  
export default CreateProduct;
