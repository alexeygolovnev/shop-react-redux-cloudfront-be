import { getProducts } from './handler';
import { baseEventMock, productsMock, productsWithStocksMock } from '@Mocks';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { ProductService, StockService } from '@Services';
import { dynamoDbClient } from '@Db';

jest.spyOn(ProductService.prototype, 'getAllProducts')
  .mockResolvedValueOnce(productsMock);

jest.spyOn(StockService.prototype, 'getStockByProductId')
  .mockResolvedValue({ productId: '1', count: productsWithStocksMock[0].count })


describe('Unit test for getProducts lambda', () => {
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
        const res: APIGatewayProxyResultV2 = await getProducts(baseEventMock, null, null) as APIGatewayProxyResultV2;

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(JSON.stringify(productsWithStocksMock));
    })
});
