import { managedLambda } from "./lambda"
import { setConfig } from "./config"
import type { ManagedLambda } from "./types/ManagedLambda"
import type { WrapperValidator, LambdaEventOverride } from "./types/LambdaWrapper"
import { ApiError } from "./ApiError"
import { redirectResponse, lambdaResponse } from "./lambda/response"

/**
 * wraps lambda function allowing more fetch like experience (headers, body, return as json)
 */
let ssLambda = managedLambda

/**
 * set global variables such as cors headers
 * @param newConfig
 */
const configure = newConfig => {
    setConfig(newConfig)
    ssLambda = managedLambda
}
export default ssLambda
export { configure, redirectResponse, lambdaResponse, ManagedLambda, WrapperValidator, ApiError, LambdaEventOverride }
