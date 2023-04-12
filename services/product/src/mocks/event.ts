import { ValidatedAPIGatewayProxyEvent } from "@Types";

const baseEventMock: ValidatedAPIGatewayProxyEvent<unknown> = {
   body: null,
   headers: {
    CustomHeader1: 'customHeader1',
    CustomHeader2: 'customHeader2',
   },
   httpMethod: 'GET',
   isBase64Encoded: true,
   multiValueHeaders: {},
   multiValueQueryStringParameters: null,
   path: '/products',
   queryStringParameters: {},
   requestContext: {
    accountId: '000000000000',
    apiId: 'qweqweqwe1',
    authorizer: {},
    protocol: 'HTTP/1.1',
    httpMethod: 'GET',
    identity: null,
    path: '/dev/products',
    stage: 'dev',
    requestId: 'testreqid',
    requestTimeEpoch: 1680422278787,
    resourceId: '123',
    resourcePath: '/products'
   },
   resource: '/products',
   stageVariables: null,
   pathParameters: null,
}

export default baseEventMock;
