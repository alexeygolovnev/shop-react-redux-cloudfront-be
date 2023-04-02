import { getProductById } from './handler';
import { baseEventMock, productsMock } from '@Mocks';
import { ErrorResponse } from '@Types';
import { APIGatewayProxyResult } from 'aws-lambda';

describe('Unit test for getProductById lambda', () => {
    it('should have correct response', async () => {
        const productId = '1';
        const res: APIGatewayProxyResult = await getProductById({
            ...baseEventMock,
            body: null,
            pathParameters: { productId },
            path: '/products/{productId}',
            requestContext: {
                ...baseEventMock.requestContext,
                path: '/dev/products/{productId}',
                resourcePath: '/products/{productId}'
            }
        }, null, null) as APIGatewayProxyResult;

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(JSON.stringify(productsMock.find((product) => product.id === productId)));
    })

    it('should have error response', async () => {
        const productId = '1000';
        const res: APIGatewayProxyResult = await getProductById({
            ...baseEventMock,
            body: null,
            pathParameters: { productId },
            path: '/products/{productId}',
            requestContext: {
                ...baseEventMock.requestContext,
                path: '/dev/products/{productId}',
                resourcePath: '/products/{productId}'
            }
        }, null, null) as APIGatewayProxyResult;

        expect(res.statusCode).toBe(400);

        const errorResponse: ErrorResponse = {
            code: null,
            message: `Product with id ${productId} not found`,
        }

        expect(res.body).toEqual(JSON.stringify(errorResponse));
    })
});
