import { ValidatedEventAPIGatewayProxyEvent } from '@Types';
import { formatJSONResponse } from '@Utils';
import db from '@Db';

import schema from './schema';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;
  const product = await db.getProductById(productId)
  
  if (!product) {
    return formatJSONResponse('failed', { code: null, message: `Product with id ${productId} not found` });
  }

  return formatJSONResponse('success', { ...product });
};
