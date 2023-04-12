import { ServerlessFunction } from '@Types';
import { handlerPath } from '@Utils';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products/{productId}',
      },
    },
  ],
} as ServerlessFunction;
