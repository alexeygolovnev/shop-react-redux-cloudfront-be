import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from "aws-lambda"

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEventV2, 'body' | 'pathParameters'> & { body: S, pathParameters?: S }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResultV2>
