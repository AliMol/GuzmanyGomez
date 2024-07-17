import { handler } from '../src/handlers/updateOrder';
import * as AWS from 'aws-sdk';

jest.mock('aws-sdk');

const mockedUpdate = jest.fn();
AWS.DynamoDB.DocumentClient.prototype.update = mockedUpdate;

describe('updateOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update an order and return the updated attributes', async () => {
    const event = {
      pathParameters: { orderId: '123' },
      body: JSON.stringify({ quantity: 20 }),
    };

    mockedUpdate.mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce({ Attributes: { orderId: '123', product: 'Widget', quantity: 20 } }),
    });

    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ orderId: '123', product: 'Widget', quantity: 20 });
    expect(mockedUpdate).toHaveBeenCalled();
  });

  it('should handle update errors', async () => {
    const event = {
      pathParameters: { orderId: '123' },
      body: JSON.stringify({ quantity: 20 }),
    };

    mockedUpdate.mockReturnValueOnce({
      promise: jest.fn().mockRejectedValueOnce(new Error('Update failed')),
    });

    const response = await handler(event);
    expect(response.statusCode).toBe(500);
  });
});
