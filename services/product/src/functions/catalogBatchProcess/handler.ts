import type { SQSEvent } from "aws-lambda"
import { formatJSONResponse, logEvent } from '@Utils';
import { ProductService } from '@Services';
import { dynamoDbClient } from '@Db';
import { CreateProduct } from "@DTOs/product";
import { SNS } from "aws-sdk";

export const catalogBatchProcess = async (event: SQSEvent) => { 
    try {  
      logEvent(event);
      const sns = new SNS({ region: process.env.REGION });
      const productService = new ProductService(dynamoDbClient, process.env.PRODUCTS_TABLE!);
      await Promise.all(event.Records.map(async ({ body }) => {
        const newProductPayload: CreateProduct = JSON.parse(body);

        await productService.createProduct({...newProductPayload, price: +newProductPayload.price, count: +newProductPayload.count }, process.env.STOCKS_TABLE!);

        return sns.publish({
          Message: `${body} was created`,
          TopicArn: process.env.CREATE_PRODUCT_TOPIC_ARN,
          MessageAttributes: {
            productPrice: {
              DataType: 'String',
              StringValue: newProductPayload.price < 100 ? 'Exclusive' : 'Common'
            }
          }
        }).promise();
      }))
  
      return formatJSONResponse(200, { event: JSON.stringify(event) });
    }
    catch (error) {
      return formatJSONResponse(500, error);
    }
  };
