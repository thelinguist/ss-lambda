import { ApiError } from "../ApiError"

export function formatError(error: ApiError) {
    const message = {
        Error: error.message,
    }

    for (const key in error.reporting) {
        if (key) {
            message[key] = error[key]
        }
    }

    return message
}
