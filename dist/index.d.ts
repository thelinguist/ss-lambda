import { ManagedLambda } from './types/ManagedLambda';
import { WrapperValidator } from './types/LambdaWrapper';
import { ApiError } from './ApiError';

/**
 * wraps lambda function allowing more fetch like experience (headers, body, return as json)
 */
declare let ssLambda: ManagedLambda;
/**
 * set global variables such as cors headers
 * @param newConfig
 */
declare const configure: (newConfig: any) => void;
export default ssLambda;
export { configure, ManagedLambda, WrapperValidator, ApiError };
