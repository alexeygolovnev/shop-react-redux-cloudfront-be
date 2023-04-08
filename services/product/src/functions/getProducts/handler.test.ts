import { getProducts } from './handler';
import { baseEventMock, productsMock } from '@Mocks';
import { APIGatewayProxyResult } from 'aws-lambda';

describe('Unit test for getProducts lambda', () => {
    it('should have correct response', async () => {
        const res: APIGatewayProxyResult = await getProducts(baseEventMock, null, null) as APIGatewayProxyResult;

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(JSON.stringify(productsMock));
    })
});
