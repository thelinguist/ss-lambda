import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { LambdaEventOverride, WrappedHandler, WrapperValidator } from './LambdaWrapper';

interface Opts {
    responsePassThru?: boolean;
    bodyPassThru?: boolean;
    validators?: WrapperValidator | WrapperValidator[];
    skipAuth?: boolean;
}
export type ManagedLambda = <ReqBody = {}, QueryParams = {}, PathParams = {}>(handler: WrappedHandler<ReqBody, {}, QueryParams, PathParams>, opts?: Opts) => (event: LambdaEventOverride<ReqBody, QueryParams, PathParams>, context?: any, callback?: any) => Promise<APIGatewayProxyStructuredResultV2> | APIGatewayProxyStructuredResultV2;
export {};
