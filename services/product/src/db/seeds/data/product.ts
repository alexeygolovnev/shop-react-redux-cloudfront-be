import BaseSeed from './base-seed';
import { productsMock } from '@Mocks';
import { DynamoDB } from "aws-sdk";

export default class ProductSeed extends BaseSeed {
  constructor() {
    super();
  };

  async run (client: DynamoDB.DocumentClient): Promise<void | any> {
    const tableName = process.env.PRODUCTS_TABLE;
   
    if (tableName) {
      const products: DynamoDB.DocumentClient.WriteRequests = productsMock.map((product) => {
        return {
          PutRequest: {
            Item: {
              ...product,
            },
          }
        }
      });

      const params: DynamoDB.DocumentClient.BatchWriteItemInput = {
        RequestItems: {
          [tableName]: [...products]
        }
      }

      return client.batchWrite(params).promise();
    }
  }
}
