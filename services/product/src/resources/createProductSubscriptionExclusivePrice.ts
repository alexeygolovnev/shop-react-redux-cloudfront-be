import { Resource } from '@Types';

const createProductSubscriptionExclusivePriceResource: Resource = {
    createProductSubscriptionExclusivePrice: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
            Endpoint: '${self:custom.exclusiveProductPriceEmail}',
            Protocol: 'email',
            TopicArn: {
                Ref: 'createProductTopic'
            },
            FilterPolicy: {
                productPrice: ['Exclusive'],
            },
        }
    }
}

export default createProductSubscriptionExclusivePriceResource;
