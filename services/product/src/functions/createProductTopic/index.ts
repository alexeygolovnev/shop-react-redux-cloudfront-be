import { ServerlessFunction } from '@Types';
import { handlerPath } from '@Utils';

export default {
  handler: `${handlerPath(__dirname)}/handler.createProductTopic`,
  events: [
    {
        sns: {
            arn: '!Ref createProductTopic',
        }
    }
  ],
} as ServerlessFunction;
