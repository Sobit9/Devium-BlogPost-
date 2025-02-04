const ApiError = require("../Utils/ApiError")
const StatusCode = require("../Utils/StatusCode")

const schemaValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = await schema.parse(req.body)
            req.body = data
            next()
        } catch (err) {
            next(new ApiError(StatusCode.BAD_REQUEST, err))
        }
    }
}

module.exports = schemaValidator