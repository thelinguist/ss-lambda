export class ApiError extends Error {
    public statusCode?: number
    public reporting?: Record<string, any>
    /**
     * @param message
     * @param statusCode if left out then lambda will return 500 with generic error and log actual error
     * @param reporting
     */
    constructor(message: string, statusCode?: number, reporting?: Record<string, any>) {
        super(message)
        this.name = "ApiError"
        this.statusCode = statusCode
        this.reporting = reporting
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}
