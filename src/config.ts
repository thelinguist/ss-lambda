import { Config } from "./types/config"

let config: Config = {}

const getConfig = () => config

const setConfig = newConfig => (config = newConfig)

export { setConfig, getConfig }
