class ErrorDealer extends Error {
    constructor(
        statusCode,
        message = "didn't went well",
        error = [],
        errorStack = ""
    ) {
        super(message)
        this.statusCode = statusCode,
            this.data = null,
            this.message = message,
            this.success = false,
            this.errors = error,
            this.stack = errorStack
    }
}

export { ErrorDealer }