class APIresponse {
    constructor(statusCode, data, successMessage = "success") {
        this.statusCode = statusCode,
            this.data = data,
            this.successMessage = successMessage,
            this.success = statusCode < 400
    }
}

export { APIresponse }