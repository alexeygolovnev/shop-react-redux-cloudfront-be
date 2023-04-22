import { Resource } from '@Types';

const createProductSubscriptionCommonResource: Resource = {
    createProductSubscriptionCommonPrice: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
            Endpoint: '${self:custom.commonProductPriceEmail}',
            Protocol: 'email',
            TopicArn: {
                Ref: 'createProductTopic'
            },
            FilterPolicy: {
                productPrice: ['Common'],
            },
        }
    }
}

export default createProductSubscriptionCommonResource;
