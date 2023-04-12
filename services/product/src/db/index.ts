import { insertSeeds } from './seeds/run';
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDbClient = new DocumentClient();

export { insertSeeds, dynamoDbClient };
