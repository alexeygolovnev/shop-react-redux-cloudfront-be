import { ValidatedEventAPIGatewayProxyEvent } from '@Types';
import { ProductService } from '@Services';
import { formatJSONResponse, logEvent } from '@Utils';
import { CreateProduct } from '@DTOs/product';


import { dynamoDbClient } from '@Db';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<CreateProduct> = async (event) => { 
  try {  
    logEvent(event);
    if (event?.body) {
      const productService = new ProductService(dynamoDbClient, process.env.PRODUCTS_TABLE!);

      const { count, description, price, title } = typeof event?.body === 'string' ? JSON.parse(event?.body) : event?.body;
        
      const { newProduct } = await productService.createProduct({ description, price, title, count } as CreateProduct, process.env.STOCKS_TABLE!);
      
      return formatJSONResponse(201, { id: newProduct?.id });
    }

    return formatJSONResponse(400, { message: 'Body is undefined' });
  }
  catch (error) {
    return formatJSONResponse(500, error);
  }

};
 