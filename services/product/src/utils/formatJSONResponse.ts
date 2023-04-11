import { ErrorResponse } from "@Types";
import { APIGatewayProxyResultV2 } from "aws-lambda";

const formatJSONResponse = (status: number, response: Record<string, unknown> | Array<unknown> | ErrorResponse): APIGatewayProxyResultV2  => {
    return {
      statusCode: status,
      body: JSON.stringify(response),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  }

export default formatJSONResponse;
