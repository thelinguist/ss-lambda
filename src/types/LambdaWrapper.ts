// this typescript stuff allows the consumer of lambdaWrapper to specify a Body type and QueryParams
import {
    APIGatewayProxyEventV2WithLambdaAuthorizer,
    APIGatewayProxyStructuredResultV2,
} from "aws-lambda/trigger/api-gateway-proxy"
import { Callback, Context } from "aws-lambda"

/**
 * same as APIGatewayProxyEventV2, but generics for most common inputs
 */
export type LambdaEventOverride<
    Body = {},
    QueryParams = {},
    PathParams = {},
    Auth = {},
> = APIGatewayProxyEventV2WithLambdaAuthorizer<Auth> & {
    body: Body
    queryStringParameters: QueryParams
    pathParameters: PathParams
    auth: Auth
}

/**
 * overrides the event:
 * - adds the auth key and values
 * - overrides event.body to be a parsed object
 */
export type WrappedHandler<ReqBody = {}, ResBody = {}, QueryParams = {}, PathParams = {}> = (
    event: LambdaEventOverride<ReqBody, QueryParams, PathParams>,
    context: Context,
    callback: Callback
) => ResBody | Promise<ResBody> | any

/**
 * wraps lambda function with basic functionality: validators, auto-parse json, auth parsing
 */
export type Wrapper = <ReqBody = {}, ResBody = {}, QueryParams = {}, PathParams = {}>(
    handler: WrappedHandler<ReqBody, ResBody, QueryParams>,
    options?: {
        validator?: WrapperValidator<ReqBody> | WrapperValidator<ReqBody>[]
        bodyPassthru?: boolean
        skipAuth?: boolean
    }
) => (
    event: LambdaEventOverride<ReqBody, QueryParams, PathParams>,
    context: Context,
    callback: Callback
) => Promise<APIGatewayProxyStructuredResultV2> | APIGatewayProxyStructuredResultV2

// throws if bad (with its own error)
export type WrapperValidator<Body = {}> = (
    event: LambdaEventOverride<Body>,
    context?: Context,
    callback?: Callback
) => Promise<void> | void
