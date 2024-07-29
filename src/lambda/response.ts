import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy"
import { getConfig } from "../config"

export const lambdaResponse = (
    body,
    statusCode = 200,
    headers = {},
    cookies?: string[]
): APIGatewayProxyStructuredResultV2 => ({
    statusCode,
    isBase64Encoded: false,
    headers: {
        "Access-Control-Allow-Origin": getConfig()?.domain || "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        ...headers,
    },
    ...(cookies ? { cookies } : {}),
    body: body ? JSON.stringify(body) : undefined,
})

export const redirectResponse = (location): APIGatewayProxyStructuredResultV2 => ({
    isBase64Encoded: false,
    headers: {
        "Access-Control-Allow-Origin": getConfig()?.domain || "*",
        "Access-Control-Allow-Credentials": true,
        location,
    },
    statusCode: 307,
    body: undefined,
})
