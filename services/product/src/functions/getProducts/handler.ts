import { ValidatedEventAPIGatewayProxyEvent } from '@Types';
import { formatJSONResponse } from '@Utils';
import db from '@Db';

export const getProducts: ValidatedEventAPIGatewayProxyEvent<null> = async () => { 
  const products = await db.getProducts();
  return formatJSONResponse('success', products);
};
