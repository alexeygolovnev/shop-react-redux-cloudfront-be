import { dynamoDbClient } from '@Db';
import { getProductById } from './handler';
import { baseEventMock, productsMock, productsWithStocksMock } from '@Mocks';
import { ProductService, StockService } from '@Services';
import { ErrorResponse } from '@Types';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse } from '@Utils';

jest.spyOn(ProductService.prototype, 'getProductById')
  .mockResolvedValueOnce(productsMock[0])
  .mockResolvedValueOnce(null);

jest.spyOn(StockService.prototype, 'getStockByProductId')
  .mockResolvedValue({ productId: productsMock[0].id, count: productsWithStocksMock[0].count })

describe('Unit test for getProductById lambda', () => {
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

    it('should have correct response', async () => {
        const productId = productsMock[0].id;
        const res: APIGatewayProxyResultV2 = await getProductById({
            ...baseEventMock,
            body: { productId },
            pathParameters: { productId },
            path: '/products/{productId}',
            requestContext: {
                ...baseEventMock.requestContext,
                path: '/products/{productId}',
                resourcePath: '/products/{productId}'
            }
        }, null, null) as APIGatewayProxyResultV2;

        expect(res).toEqual(formatJSONResponse(200, { ...productsWithStocksMock.find((product) => product.id === productId)}));
    })

    it('should have error response', async () => {
        const productId = '1000';
        const res: APIGatewayProxyResultV2 = await getProductById({
            ...baseEventMock,
            body: { productId },
            pathParameters: { productId },
            path: '/products/{productId}',
            requestContext: {
                ...baseEventMock.requestContext,
                path: '/products/{productId}',
                resourcePath: '/products/{productId}'
            },
            resource: '/products/{productId}'
            
        }, null, null) as APIGatewayProxyResultV2;

        const errorResponse: ErrorResponse = {
            code: null,
            message: `Product with id ${productId} not found`,
        }

        expect(res.body).toEqual(JSON.stringify(errorResponse));
    })
});
