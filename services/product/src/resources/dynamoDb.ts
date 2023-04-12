import type  { AWS } from '@serverless/typescript'; 

const dynamoDbResource: AWS['resources']  = {
    Resources: {
        products: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
                TableName: 'products',
                AttributeDefinitions: [
                    {
                        AttributeName: 'id',
                        AttributeType: 'S',
                    }
                ],
                KeySchema: [
                    {
                        AttributeName: 'id',
                        KeyType: 'HASH',
                    }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1,
                }
            }
        },
        stocks: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
                TableName: 'stocks',
                AttributeDefinitions: [
                    {
                        AttributeName: 'productId',
                        AttributeType: 'S',
                    }
                ],
                KeySchema: [
                    {
                        AttributeName: 'productId',
                        KeyType: 'HASH',
                    }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1,
                }
            }
        }
    }
    
}

export default dynamoDbResource;
