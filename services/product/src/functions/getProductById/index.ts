import { ServerlessFunction } from '@Types';
import { handlerPath } from '@Utils';


export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        request: {
          parameters: {
            paths: {
              productId: true,
            }
          }
        },
        cors: true,
      },
    },
  ],
} as ServerlessFunction;
