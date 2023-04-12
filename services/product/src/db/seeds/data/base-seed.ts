import { DynamoDB } from "aws-sdk";

export default abstract class BaseSeed {
  abstract run (client: DynamoDB.DocumentClient);
}
