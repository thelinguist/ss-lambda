import { describe, it, expect } from "vitest"
import { ApiError } from "../ApiError"
import { formatError } from "./formatError"

describe("formatError", () => {
    it("outputs an error message in a clear way", () => {
        expect(formatError(new ApiError("this is an error"))).toEqual({
            Error: "this is an error",
        })
    })

    it("outputs any additional parameters", () => {
        const actual = formatError(
            new ApiError("this is an error", 413, {
                teapot: "hot",
                kettle: "metal",
            })
        )
        expect(actual).toEqual({
            Error: "this is an error",
            teapot: "hot",
            kettle: "metal",
        })
    })
})
