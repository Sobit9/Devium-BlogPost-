const ApiError = require("../Utils/ApiError")
const StatusCode = require("../Utils/StatusCode")
const isLoggedIn = require("./is-logged-in-middleware")

const isAdmin = (req, res, next) => {
    return isLoggedIn(req, res, () => {
        if (req.user.role === "admin")  
    {
        next()
    }else {
        next(new ApiError(StatusCode.FORBIDDEN, "You are not authorized to access this routes"))
    }
    })
}

module.exports = isAdmin