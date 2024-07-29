import { APIGatewayEvent } from "aws-lambda"
import { ApiError } from "../../ApiError"

export const jsonBody = (event: APIGatewayEvent, bodyPassthru?: boolean) => {
    if (!bodyPassthru) {
        try {
            if (event.body) {
                return JSON.parse(event.body)
            } else return event.body
        } catch (e) {
            throw new ApiError("bad request", 400)
        }
    }
}
