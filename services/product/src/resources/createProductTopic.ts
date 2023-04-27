import { Resource } from '@Types';

const createProductTopicResource: Resource = {
    createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
            TopicName: 'createProductTopic',
        }
    }
}

export default createProductTopicResource;
