import { Stock } from "@Models";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { stock as stockSchema } from '@Schemas';

class StockService {
    constructor(
        private readonly docClient: DocumentClient,
        private readonly tableName: string
      ) {}

    async getAllStocks(): Promise<Stock[]> {
        const result = await this.docClient
            .scan({ TableName: this.tableName })
            .promise();

        return result.Items as Stock[];
    }

    async getStockByProductId(id: string): Promise<Stock> {
        const result = await this.docClient
            .get({ TableName: this.tableName, Key: { productId: id } })
            .promise();

        return result.Item as Stock;
    }

    async createStock(stock: Stock): Promise<Stock | typeof stockSchema.validate.errors> {
        const isValid = stockSchema.validate(stock); 
        if (isValid) {
            await this.docClient
            .put({ TableName: this.tableName, Item: stock })
            .promise();
             
            return stock;
        } else {
            throw new Error(JSON.stringify(stockSchema.validate.errors));
        }

    }
}

export default StockService;
