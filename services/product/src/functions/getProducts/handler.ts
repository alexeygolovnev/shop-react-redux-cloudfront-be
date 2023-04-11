import { ValidatedEventAPIGatewayProxyEvent } from '@Types';
import { ProductService, StockService } from '@Services';
import { formatJSONResponse, logEvent } from '@Utils';
import { dynamoDbClient } from '@Db';

export const getProducts: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => { 
  try {
    logEvent(event);
    const productService = new ProductService(dynamoDbClient, process.env.PRODUCTS_TABLE!);
    const stockService = new StockService(dynamoDbClient, process.env.STOCKS_TABLE!);
    const products = await productService.getAllProducts();

    const productsWithStocks = await Promise.all(products.map(async (product) => {
      const stock = await stockService.getStockByProductId(product?.id ?? '');
      return {
        ...product,
        count: stock ? stock?.count : 0,
      };
    }));
  
    return formatJSONResponse(200, productsWithStocks);
  }
  catch (error) {
    return formatJSONResponse(500, error);
  }

};
 