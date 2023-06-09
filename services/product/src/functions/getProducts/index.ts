import { ServerlessFunction } from '@Types';
import { handlerPath } from '@Utils';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProducts`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products',
      },
    },
  ],
} as ServerlessFunction;
