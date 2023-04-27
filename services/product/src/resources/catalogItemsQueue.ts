import { Resource } from '@Types';

const catalogItemsQueueResource: Resource = {
    catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
            QueueName: 'catalogItemsQueue',
        }
    }
}

export default catalogItemsQueueResource;
