import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE || '';

export const handler: APIGatewayProxyHandler = async (event: any) => {
  try {
    const { body } = event;
    const order = JSON.parse(body);
    const orderId = uuidv4();

    const params = {
      TableName: TABLE_NAME,
      Item: {
        orderId,
        ...order,
      },
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ orderId }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }
};
