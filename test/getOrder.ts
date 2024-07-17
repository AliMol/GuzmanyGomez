import { handler } from '../src/handlers/getOrder';
import * as AWS from 'aws-sdk';

jest.mock('aws-sdk');

const mockedGet = jest.fn();
AWS.DynamoDB.DocumentClient.prototype.get = mockedGet;

describe('getOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve an order by orderId', async () => {
    const event = {
      pathParameters: { orderId: '123' },
    };

    mockedGet.mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce({ Item: { orderId: '123', product: 'Widget', quantity: 10 } }),
    });

    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ orderId: '123', product: 'Widget', quantity: 10 });
  });

  it('should return 404 if the order does not exist', async () => {
    const event = {
      pathParameters: { orderId: '123' },
    };

    mockedGet.mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce({ Item: null }),
    });

    const response = await handler(event);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({ error: 'Order not found' });
  });
});
