import { DynamoDB } from "aws-sdk";
import { seeds } from './data';

export async function insertSeeds () {
  let dynamoDb;
  try {
    dynamoDb = new DynamoDB.DocumentClient();
  } catch (error) {
    return { status: 'failed', message: 'Database initialization error', data: error };
  }

  if (dynamoDb) {
    try {
      const responses = await Promise.all(seeds.map(async (Seed) => {
        const seedInstance = new Seed();
    
        return seedInstance.run(dynamoDb);
      }));

      return { status: 'succeed', message: 'Seeds inserted', data: responses };
    }
    catch(error) {
      return { status: 'failed', message: 'Seeds inserting error', data: error };
    }
  }
}
