import type { SQSEvent } from "aws-lambda"
import { formatJSONResponse, logEvent } from '@Utils';
import { ProductService } from '@Services';
import { dynamoDbClient } from '@Db';
import { CreateProduct } from "@DTOs/product";

export const catalogBatchProcess = async (event: SQSEvent) => { 
    try {  
      logEvent(event);
      const productService = new ProductService(dynamoDbClient, process.env.PRODUCTS_TABLE!);
      await Promise.all(event.Records.map(({ body }) => {
        const newProductPayload: CreateProduct = JSON.parse(body);
        return productService.createProduct({...newProductPayload, price: +newProductPayload.price, count: +newProductPayload.count }, process.env.STOCKS_TABLE!);
      }))
  
      return formatJSONResponse(200, { event: JSON.stringify(event) });
    }
    catch (error) {
      return formatJSONResponse(500, error);
    }
  };
   