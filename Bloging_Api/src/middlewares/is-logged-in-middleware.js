const ApiError = require("../Utils/ApiError")
const StatusCode = require("../Utils/StatusCode")
const userAttachMiddleware = require("./user-middleware")

const isLoggedIn = (req, res, next) => {
    return userAttachMiddleware(req, res, () => {
        if (req.user) 
    {
        next()
    }else {
        next(new ApiError(StatusCode.UNAUTHORIZED, "You are not logged in"))
    }
    })
}

module.exports = isLoggedIn