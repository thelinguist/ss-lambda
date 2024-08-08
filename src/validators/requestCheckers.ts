import { WrapperValidator } from "../types/LambdaWrapper"
import { ApiError } from "../ApiError"

export const createBodyValidator =
    (reqKeys): WrapperValidator =>
    event => {
        const missingKeys = reqKeys.filter(key => !event.body[key])
        if (missingKeys.length) {
            throw new ApiError(`missing required keys in body: ${missingKeys}`, 400)
        }
    }

export const createParamsValidator =
    (reqKeys): WrapperValidator =>
    event => {
        const missingKeys = reqKeys.filter(key => !event.queryStringParameters[key])
        if (missingKeys.length) {
            throw new ApiError(`missing required queryStringParams: ${missingKeys}`, 400)
        }
    }
