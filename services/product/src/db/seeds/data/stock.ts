import BaseSeed from './base-seed';
import { stocksMock } from '@Mocks';
import { DynamoDB } from "aws-sdk";


export default class StockSeed extends BaseSeed {
  constructor() {
    super();
  }
  async run (client: DynamoDB.DocumentClient): Promise<void | any> {
    const tableName = process.env.STOCKS_TABLE!;

    if (tableName) {
      const stocks: DynamoDB.DocumentClient.WriteRequests = stocksMock.map((stock) => {
        return {
          PutRequest: {
            Item: {
              ...stock,
            },
          }
        }
      });
  
      const params: DynamoDB.DocumentClient.BatchWriteItemInput = {
        RequestItems: {
          [tableName]: [...stocks]
        }
      }
  
      return client.batchWrite(params).promise();
    }
  }
}
