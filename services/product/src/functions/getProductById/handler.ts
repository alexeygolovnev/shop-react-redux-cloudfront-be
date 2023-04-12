import { ValidatedEventAPIGatewayProxyEvent } from '@Types';
import { ProductService, StockService } from '@Services';
import { formatJSONResponse, logEvent } from '@Utils';

import { GetProductById } from '@DTOs/product';
import { dynamoDbClient } from '@Db';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<GetProductById> = async (event) => {
  try {
    logEvent(event);
    const productService = new ProductService(dynamoDbClient, process.env.PRODUCTS_TABLE!);
    const stockService = new StockService(dynamoDbClient, process.env.STOCKS_TABLE!);

    let productId: string;
   
    if (!event?.pathParameters?.productId) {
      return formatJSONResponse(400, { code: null, message: 'Product id is not specified' });
    }

    productId = event?.pathParameters?.productId;
  
    const product = await productService.getProductById(productId);
    const stock = await stockService.getStockByProductId(productId);
  
    if (!product) {
      return formatJSONResponse(400, { code: null, message: `Product with id ${productId} not found` });
    }
  
    return formatJSONResponse(200, { ...product, count: stock ? stock.count : 0 });
  }
  catch (error) {
    return formatJSONResponse(500, error);
  }
};
