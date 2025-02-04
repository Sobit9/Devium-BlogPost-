const StatusCode = require("../Utils/StatusCode")
const User = require("../models/User")

const resetPassword = async (req, res, next) => {
    const user = await findUserByEmail(userData.email)

    if(!user){
        throw new ApiError(StatusCode.NOT_FOUND, "User not found")
    }
}