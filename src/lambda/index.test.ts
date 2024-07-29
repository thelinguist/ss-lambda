import { managedLambda } from "."
import { describe, expect, it, vi } from "vitest"
import { ApiError } from "../ApiError"
import { logger } from "../logger"

describe("managedLambda", () => {
    it("formats JSON from handler", async () => {
        const handler = managedLambda<{ test: string }>(event => {
            return { status: event.body.test }
        })
        const response = await handler({
            // @ts-ignore
            body: JSON.stringify({ test: "working" }),
        })
        expect(response).toStrictEqual({
            body: '{"status":"working"}',
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            isBase64Encoded: false,
            statusCode: 200,
        })
    })

    it("formats JSON to handler", async () => {
        const spy = vi.fn()
        spy.mockReturnValue(Promise.resolve({ status: "ok" }))
        const handler = managedLambda(spy)
        // @ts-ignore
        await handler({ body: JSON.stringify({ test: "working" }) })
        expect(spy).toBeCalledWith(
            {
                // auth: {},
                body: { test: "working" },
            },
            undefined,
            undefined
        )
    })

    it("throws an error when the supplied body is not json", async () => {
        vi.spyOn(logger, "error").mockImplementationOnce(() => {})
        const handler = managedLambda(event => {
            // @ts-ignore
            return { status: event.body.test }
        })
        // @ts-ignore
        const response = await handler({ body: "working" })
        expect(response).toStrictEqual({
            body: '{"Error":"bad request"}',
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            isBase64Encoded: false,
            statusCode: 400,
        })
    })

    it("does not throw an error when there is no body", async () => {
        const handler = managedLambda(() => {
            return { status: "ok" }
        })
        // @ts-ignore
        const response = await handler({ body: undefined })
        expect(response).toStrictEqual({
            body: '{"status":"ok"}',
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            isBase64Encoded: false,
            statusCode: 200,
        })
    })

    it("handles body passthrough", async () => {
        const mockLambda = event => {
            return { status: event.body }
        }
        const handler = managedLambda(mockLambda, { bodyPassThru: true })
        const response = await handler({
            body: "this is a string",
            // @ts-ignore
            requestContext: {
                authorizer: {
                    lambda: {
                        ["custom:ticket"]: "x",
                        sub: "y",
                    },
                },
            },
        })
        expect(response).toStrictEqual({
            body: '{"status":"this is a string"}',
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            isBase64Encoded: false,
            statusCode: 200,
        })
    })

    it("handles response passthrough", async () => {
        const mockResponse = {
            headers: {
                redirect: true,
            },
            statusCode: 302,
        }
        const mockLambda = () => {
            return mockResponse
        }
        const handler = managedLambda(mockLambda, { responsePassThru: true })
        // @ts-ignore
        const response = await handler({})
        expect(response).toStrictEqual(mockResponse)
    })

    it("runs validator", async () => {
        const spy = vi.fn().mockReturnValue(Promise.resolve({ status: "ok" }))
        const validateSpy = vi.fn().mockReturnValue(undefined)
        const handler = managedLambda(spy, { validators: validateSpy })
        // @ts-ignore
        await handler({ body: JSON.stringify({ test: "working" }) })
        expect(validateSpy).toBeCalled()
        expect(spy).toBeCalled()
    })

    it("runs multiple validators", async () => {
        const spy = vi.fn().mockReturnValue(Promise.resolve({ status: "ok" }))
        const validateSpy = vi.fn().mockReturnValue(undefined)
        const validateSpy2 = vi.fn().mockReturnValue(undefined)
        const handler = managedLambda(spy, {
            validators: [validateSpy, validateSpy2],
        })
        // @ts-ignore
        await handler({ body: JSON.stringify({ test: "working" }) })
        expect(validateSpy).toBeCalled()
        expect(validateSpy2).toBeCalled()
        expect(spy).toBeCalled()
    })

    it("passes handler statusCode on error", async () => {
        vi.spyOn(logger, "error").mockImplementationOnce(() => {})
        const spy = vi.fn()
        spy.mockRejectedValue(new ApiError("idk something bad", 413))
        const handler = managedLambda(spy, { skipAuth: true })
        // @ts-ignore
        const res = await handler({ body: JSON.stringify({ test: "working" }) })
        expect(res.statusCode).toBe(413)
    })

    it("responds with 400 when validation fails", async () => {
        vi.spyOn(logger, "error").mockImplementationOnce(() => {})
        const spy = vi.fn().mockReturnValue(Promise.resolve({ status: "ok" }))
        const validateSpy = vi.fn().mockReturnValue(Promise.reject(new Error("bad things")))
        const handler = managedLambda(spy, { validators: validateSpy })
        // @ts-ignore
        const res = await handler({ body: JSON.stringify({ test: "working" }) })
        expect(res.statusCode).toBe(400)
    })

    it("responds with validation status code if provided", async () => {
        vi.spyOn(logger, "error").mockImplementationOnce(() => {})
        const spy = vi.fn().mockReturnValue(Promise.resolve({ status: "ok" }))
        const validateSpy = vi.fn().mockReturnValue(Promise.reject(new ApiError("bad things", 413)))
        const handler = managedLambda(spy, { validators: validateSpy })
        // @ts-ignore
        const res = await handler({ body: JSON.stringify({ test: "working" }) })
        expect(res.statusCode).toBe(413)
    })
})
