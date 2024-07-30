import { lambdaResponse } from "./response"
import { LambdaEventOverride, WrapperValidator } from "../types/LambdaWrapper"
import { jsonBody } from "../middleware/jsonBody"
import { formatError } from "./formatError"
import { APIGatewayProxyEvent } from "aws-lambda"
import { logger } from "../logger"
import { ApiError } from "../ApiError"
import { ManagedLambda } from "../types/ManagedLambda"

export const managedLambda: ManagedLambda = (handler, opts) => async (event, context, callback) => {
    const { responsePassThru, bodyPassThru, validators } = opts ?? {}
    try {
        if (!bodyPassThru) {
            event.body = jsonBody(event as unknown as APIGatewayProxyEvent, bodyPassThru)
        }

        await checkValidators(validators, event, context, callback)

        const res = await handler(event, context, callback)

        if (responsePassThru) {
            return res
        } else {
            return lambdaResponse(res, 200)
        }
    } catch (e: ApiError | Error | any) {
        logger.error(e)
        return lambdaResponse(formatError(e), e.statusCode ?? 500)
    }
}

const checkValidators = async (
    validators: WrapperValidator | WrapperValidator[] | undefined,
    event,
    context,
    callback
) => {
    try {
        if (validators) {
            if (Array.isArray(validators)) {
                await Promise.all(validators.map(validate => validate(event as LambdaEventOverride, context, callback)))
            } else {
                await validators(event as LambdaEventOverride, context, callback)
            }
        }
    } catch (e: any | ApiError) {
        if (!e.statusCode) {
            e.statusCode = 400
        }
        throw e
    }
}
