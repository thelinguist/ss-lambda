import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';

/**
 * use this when you still need the default response, but you've set the opts.responsePassThru to true
 */
export declare const lambdaResponse: (body: any, statusCode?: number, headers?: {}, cookies?: string[]) => APIGatewayProxyStructuredResultV2;
/**
 * use this when you want to redirect a url easily.
 * NOTE: You must set the opts.responsePassThru to true
 * @param location
 */
export declare const redirectResponse: (location: any) => APIGatewayProxyStructuredResultV2;
