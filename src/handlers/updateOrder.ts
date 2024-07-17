import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE || '';

export const handler: APIGatewayProxyHandler = async (event: any) => {
  const { orderId } = event.pathParameters || {};
  const { body } = event;
  const updates = JSON.parse(body);

  // Use expression attribute names to avoid reserved keywords
  const updateExpression = Object.keys(updates)
    .map((key) => `#${key} = :${key}`)
    .join(', ');

  const expressionAttributeNames = Object.fromEntries(
    Object.keys(updates).map((key) => [`#${key}`, key])
  );

  const expressionAttributeValues = Object.fromEntries(
    Object.entries(updates).map(([key, value]) => [`:${key}`, value])
  );

  const params = {
    TableName: TABLE_NAME,
    Key: {
      orderId,
    },
    UpdateExpression: `SET ${updateExpression}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
};
