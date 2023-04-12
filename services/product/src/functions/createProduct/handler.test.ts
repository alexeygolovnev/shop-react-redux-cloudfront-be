import { dynamoDbClient } from '@Db';
import { createProduct } from './handler';
import { baseEventMock } from '@Mocks';
import { ProductService, StockService } from '@Services';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { Product, Stock } from '@Models';
import { CreateProduct } from '@DTOs/product';

const newProductId = '123';
const newProductPayload: CreateProduct = { description: '123', price: 123, title: '123', count: 123 };
const newProduct: Product & Pick<CreateProduct, 'count'> = { ...newProductPayload, id: newProductId };

const newStock: Stock = { count: newProductPayload.count, productId: newProductId };

jest.mock('uuid', () => ({ v4: () => newProductId }));

jest.spyOn(ProductService.prototype, 'createProduct')
  .mockResolvedValueOnce({ newProduct, newStock })

jest.spyOn(StockService.prototype, 'createStock')
  .mockResolvedValue(newStock)


describe('Unit test for createProduct lambda', () => {
    let productService;
    let stockService;

    beforeEach(() => {
        productService = new ProductService(dynamoDbClient, 'products');
        stockService = new StockService(dynamoDbClient, 'stocks');
    });

    it('services should be defined', () => {
        expect(productService).toBeDefined();
        expect(stockService).toBeDefined();
    });

    it('should create a new product', async () => {

        const res: APIGatewayProxyResultV2 = await createProduct({
            ...baseEventMock,
            body: { ...newProductPayload },
            path: '/products',
            requestContext: {
                ...baseEventMock.requestContext,
                path: '/products',
                resourcePath: '/products'
            },
            httpMethod: 'POST',
        }, null, null) as APIGatewayProxyResultV2;

        expect(res.body).toEqual(JSON.stringify({ id: newProductId }));
    })
});
