import { expect, describe, it } from "vitest"
import { createApiChecker } from "./apiKeyChecker"
import { ApiError } from "../ApiError"

describe("apiKeyChecker", () => {
    it("allows valid api key", () => {
        const handler = createApiChecker("secretValue")
        expect(() =>
            handler({
                headers: {
                    apiKey: "secretValue",
                },
            } as any)
        ).not.toThrowError()
    })

    it("blocks invalid api key", () => {
        const handler = createApiChecker("secretValue")
        expect(() =>
            handler({
                headers: {
                    apiKey: "nonce",
                },
            } as any)
        ).toThrowError()
    })

    it("returns a 400 if no api key", () => {
        expect.assertions(1)
        const handler = createApiChecker("secretValue")
        try {
            handler({
                headers: {
                    nonce: "secretValue",
                },
            } as any)
        } catch (e: ApiError | any) {
            expect(e.statusCode).toBe(400)
        }
    })
})
