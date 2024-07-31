export declare class ApiError extends Error {
    statusCode?: number;
    reporting?: Record<string, any>;
    /**
     * @param message
     * @param statusCode if left out then lambda will return 500 with generic error and log actual error
     * @param reporting
     */
    constructor(message: string, statusCode?: number, reporting?: Record<string, any>);
}
