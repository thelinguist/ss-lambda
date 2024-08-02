import { ApiError } from "../ApiError"

export function formatError(error: ApiError) {
    const message = {
        Error: error.message,
    }

    for (const key in error.reporting) {
        message[key] = error.reporting[key]
    }

    return message
}
