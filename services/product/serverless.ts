import type { AWS } from '@serverless/typescript';

import { getProductById, getProducts, runSeeds, createProduct, catalogBatchProcess } from '@Functions';
import { dynamoDbResource, catalogItemsQueueResource, createProductTopicResource, createProductSubscriptionExclusivePriceResource, createProductSubscriptionCommonResource } from '@Resources';

const serverlessConfiguration: AWS = {
  service: 'product',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'ahalauneu',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    httpApi: {
      cors: true,
      payload: '2.0',
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: { Ref: dynamoDbResource!.products!.Properties!.TableName },
      STOCKS_TABLE: { Ref: dynamoDbResource!.stocks!.Properties!.TableName },
      ACCOUNT_ID: '390857316109',
      CATALOG_ITEMS_QUEUE: 'catalogItemsQueue',
      REGION: '${self:provider.region}',
      CREATE_PRODUCT_TOPIC: 'createProductTopic',
      CREATE_PRODUCT_TOPIC_ARN: 'arn:aws:sns:${self:provider.region}:390857316109:createProductTopic'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:BatchWriteItem',
        ],
        Resource: [
          {
            "Fn::GetAtt": [dynamoDbResource!.products!.Properties!.TableName, 'Arn'],
          },
          {
            "Fn::GetAtt": [dynamoDbResource!.stocks!.Properties!.TableName, 'Arn']
          },
        ],
      },
      {
        Effect: 'Allow',
        Action: 'SQS:*',
        Resource: [
          {
            "Fn::GetAtt": [catalogItemsQueueResource!.catalogItemsQueue!.Properties!.QueueName, 'Arn'],
          },
        ]
      },
      {
        Effect: 'Allow',
        Action: 'SNS:*',
        Resource: ['arn:aws:sns:us-east-1:390857316109:createProductTopic']
      }
    ]
  },
  functions: { getProducts, getProductById, runSeeds, createProduct, catalogBatchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    commonProductPriceEmail: 'golovnevalexey@gmail.com',
    exclusiveProductPriceEmail: 'golovnevalexey@yandex.by',
  },
  resources: {
    Resources: {
      ...dynamoDbResource,
      ...catalogItemsQueueResource,
      ...createProductTopicResource,
      ...createProductSubscriptionExclusivePriceResource,
      ...createProductSubscriptionCommonResource,
    }
  }
};

module.exports = serverlessConfiguration;
