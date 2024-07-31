import { Config } from './types/config';

declare const getConfig: () => Config;
declare const setConfig: (newConfig: any) => any;
export { setConfig, getConfig };
