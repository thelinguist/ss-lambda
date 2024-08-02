import { it, expect, describe } from "vitest"
import { redirectResponse } from "./response"

describe("redirectResponse", () => {
    it("works correctly", () => {
        const location = "www.npmjs.com/package/ss-lambda"
        expect(redirectResponse(location)).toEqual({
            body: undefined,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                location,
            },
            isBase64Encoded: false,
            statusCode: 307,
        })
    })
})
