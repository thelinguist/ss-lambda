import managedLambda, { configure } from "./index"
import { describe, expect, it } from "vitest"

describe("expressive-lambda demo", () => {
    it("works with basic use case", async () => {
        // configure in file, or import the result
        configure({ domain: "myDomain" })

        // exports.handler = lambdaWrapper(() => { ...
        const invoke = managedLambda(() => {
            return {
                status: "ok",
            }
        })

        // simulate execution of lambda
        const results = await invoke({} as any, null, null)

        // expect a JSON string and common headers for a proxy lambda
        expect(results).toStrictEqual({
            body: '{"status":"ok"}',
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "myDomain",
                "Content-Type": "application/json",
            },
            isBase64Encoded: false,
            statusCode: 200,
        })
    })
})
