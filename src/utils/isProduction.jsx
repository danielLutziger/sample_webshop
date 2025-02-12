export const isProduction = () => {
    // eslint-disable-next-line no-undef
    return process.env.NODE_ENV === "production"
}
