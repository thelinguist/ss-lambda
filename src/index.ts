import { managedLambda as lambdaWrapper } from "./lambda"
import { setConfig } from "./config"
import type { ManagedLambda } from "./types/ManagedLambda"
import type { WrapperValidator } from "./types/LambdaWrapper"
import { ApiError } from "./ApiError"

/**
 * wraps lambda function allowing more fetch like experience (headers, body, return as json)
 */
let ssLambda = lambdaWrapper

/**
 * set global variables such as cors headers
 * @param newConfig
 */
const configure = newConfig => {
    setConfig(newConfig)
    ssLambda = lambdaWrapper
}
export default ssLambda
export { configure, ManagedLambda, WrapperValidator, ApiError }
