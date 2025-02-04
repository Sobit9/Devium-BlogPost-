class ApiResponse {
    constructor(statusCode, message = "Success", data = null, meta = {}) {
        this.statusCode = statusCode
        this.data = data
        this.meta = meta;
        this.message = message
        this.success = statusCode < 400
        this.error = null
    }
}

module.exports = ApiResponse