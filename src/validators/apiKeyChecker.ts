import { WrapperValidator } from "../types/LambdaWrapper"
import { ApiError } from "../ApiError"

export const createApiChecker =
    (value: string, customInvalidReporting?: Record<string, any>): WrapperValidator =>
    event => {
        const apiKey = event.headers.apiKey || event.headers.apikey || event.headers.ApiKey
        if (!apiKey) {
            throw new ApiError("apiKey expected", 400)
        }
        if (apiKey !== value) {
            throw new ApiError(`apiKey not valid`, 401, customInvalidReporting)
        }
    }
