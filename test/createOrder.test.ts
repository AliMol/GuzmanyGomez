import { handler } from '../src/handlers/createOrder';
import * as AWS from 'aws-sdk';

jest.mock('aws-sdk');

const mockedPut = jest.fn();
AWS.DynamoDB.DocumentClient.prototype.put = mockedPut;

describe('createOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new order and return orderId', async () => {
    const event = {
      body: JSON.stringify({ product: 'Widget', quantity: 10 }),
    };
    const context = {}; // Provide a dummy context

    mockedPut.mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce({}),
    });

    const response = await handler(event);
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toHaveProperty('orderId');
    expect(mockedPut).toHaveBeenCalled();
  });

  it('should handle JSON parsing error', async () => {
    const event = {
      body: '{ invalid JSON }',
    };
    const context = {}; // Provide a dummy context

    const response = await handler(event, context);
    expect(response.statusCode).toBe(400);
  });
});

