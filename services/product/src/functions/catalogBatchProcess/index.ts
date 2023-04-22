import { catalogItemsQueueResource } from '@Resources';
import { ServerlessFunction } from '@Types';
import { handlerPath } from '@Utils';

export default {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  events: [
    {
        sqs: {
            batchSize: 5,
            arn: {
              "Fn::GetAtt": [catalogItemsQueueResource!.catalogItemsQueue!.Properties!.QueueName, 'Arn']
            }
        }
    }
  ],
} as ServerlessFunction;
