import { ValidatedEventAPIGatewayProxyEvent } from '@Types';
import { formatJSONResponse, middyfy } from '@Utils';
import { productsMock } from '@Mocks';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;
  const product = productsMock.find((product) => product.id === productId);

  return formatJSONResponse('success', { ...product });
};

export const main = middyfy(getProductById);
