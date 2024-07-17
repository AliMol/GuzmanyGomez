# Orders API

## Overview

This project implements a simple REST API for managing orders using AWS Lambda, API Gateway, and DynamoDB. The API supports creating, retrieving, and updating orders through the following endpoints:

- **POST /orders**: Create a new order.
- **GET /orders/{orderId}**: Retrieve an order by its ID.
- **PUT /orders/{orderId}**: Update an order by its ID.

- POST Sample Payload: 
{
  "orderId": "12345",
  "customerName": "John Doe",
  "items": [
    {
      "productId": "abc",
      "quantity": 2
    }
  ]
}

- Get Sample Header: 12345

- Put Sample parameter : 12345
- Put Sample Payload:
{
  "customerName": "kazi",
  "items": [
    {
      "productId": "abc",
      "quantity": 2
    }
  ]
}

## Technologies Used

- **AWS Lambda**: Serverless compute service to run the API.
- **API Gateway**: Managed service for creating and exposing APIs.
- **DynamoDB**: NoSQL database service for storing orders.
- **Serverless Framework**: Infrastructure as code for deploying the application.

## Prerequisites

- Node.js (version 18.x or later)
- AWS CLI configured with your AWS credentials
- Serverless Framework installed globally:
  ```bash
  npm install -g serverless

## ToDO

- Finish Unit Tests .....
