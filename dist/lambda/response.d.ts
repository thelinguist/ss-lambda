import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';

export declare const lambdaResponse: (body: any, statusCode?: number, headers?: {}, cookies?: string[]) => APIGatewayProxyStructuredResultV2;
export declare const redirectResponse: (location: any) => APIGatewayProxyStructuredResultV2;
