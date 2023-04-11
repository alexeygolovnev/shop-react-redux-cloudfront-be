import { Product } from "@Models";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { product as productSchema, stock as stockSchema } from '@Schemas';
import { CreateProduct } from "@DTOs/product";
import { v4 } from 'uuid';

class ProductService {
    constructor(
        private readonly docClient: DocumentClient,
        private readonly productTableName: string,
      ) {}

    async getAllProducts(): Promise<Product[]> {
        const result = await this.docClient
            .scan({ TableName: this.productTableName })
            .promise();

        return result.Items as Product[];
    }

    async getProductById(id: string): Promise<Product> {
        const result = await this.docClient
            .get({ TableName: this.productTableName, Key: { id } })
            .promise();

        return result.Item as Product;
    }

    async createProduct(product: CreateProduct, stockTableName: string) {
        const isValidProductData = productSchema.validate({ description: product?.description, price: product?.price, title: product?.title });
        const isValidStockData = stockSchema.validate({ count: product?.count }); 

        if (isValidProductData && isValidStockData) {
            const productId = v4();
            const newProduct = { ...product, id: productId };
            const newStock = { productId: productId, count: product.count };
            try {
                await this.docClient.transactWrite({
                    TransactItems: [
                        {
                            Put: {
                                TableName: this.productTableName,
                                Item: newProduct,
                                ConditionExpression: 'attribute_not_exists(id)'
                            }
                        },
                        {
                            Put: {
                                TableName: stockTableName,
                                Item: newStock,
                                ConditionExpression: 'attribute_not_exists(productId)'
                            }
                        }
                    ]
                }).promise();
            }
            catch (error) {
                throw new Error(`Transaction error: ${JSON.stringify(error)}`);
            }
            
            return { newProduct, newStock };
        } else {
            throw new Error(JSON.stringify(productSchema.validate.errors));
        }

    }
}

export default ProductService;
