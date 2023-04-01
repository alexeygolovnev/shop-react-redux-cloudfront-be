import { productsMock } from '@Mocks';
import { ValidatedEventAPIGatewayProxyEvent } from '@Types';
import { formatJSONResponse, middyfy } from '@Utils';

const getProducts: ValidatedEventAPIGatewayProxyEvent<null> = async () => {
  return formatJSONResponse('success', productsMock);
};

export const main = middyfy(getProducts);
