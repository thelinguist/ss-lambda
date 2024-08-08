import { expect, describe, it } from "vitest"
import { createBodyValidator, createParamsValidator } from "./requestCheckers"
describe("requestCheckers", () => {
    describe("createBodyValidator", async () => {
        it("Should not throw if the body is valid", async () => {
            const handler = createBodyValidator(["key1", "key2"])
            expect(() =>
                handler({
                    body: { key1: "item", key2: "item" },
                } as any)
            ).not.toThrowError()
        })

        it("Should throw if the body is invalid", async () => {
            const handler = createBodyValidator(["key1", "key2"])
            expect(() =>
                handler({
                    body: { key1: "item" },
                } as any)
            ).toThrowError()
        })
    })

    describe("createParamsValidator", async () => {
        it("Should not throw if the params are valid", async () => {
            const handler = createParamsValidator(["key1", "key2"])
            expect(() =>
                handler({
                    queryStringParameters: { key1: "item", key2: "item" },
                } as any)
            ).not.toThrowError()
        })

        it("Should throw if the params are invalid", async () => {
            const handler = createParamsValidator(["key1", "key2"])
            expect(() =>
                handler({
                    queryStringParameters: { key1: "item" },
                } as any)
            ).toThrowError()
        })
    })
})
