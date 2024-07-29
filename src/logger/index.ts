// lambda automatically saves console streams. I am mocking these in jest so they don't clutter the output
export const logger = {
    // eslint-disable-next-line no-console
    error: console.error,
    // eslint-disable-next-line no-console
    info: console.log,
    // eslint-disable-next-line no-console
    warn: console.warn,
}
