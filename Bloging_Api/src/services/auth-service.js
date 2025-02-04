const ApiError = require("../Utils/ApiError")
const StatusCode = require("../Utils/StatusCode")
const User = require("../models/User")
const { findUserByEmail, createUser, getUser, verifyUserPassword, sendVerificationEmail, sendWelcomeEmail } = require("./User-service")
const jwt = require("jsonwebtoken")

const register = async (userData) => {
    const user = await findUserByEmail(userData.email)
    if (user) {
        throw new ApiError(StatusCode.BAD_REQUEST,"User already exists", ["email already in use",])
    }
    const newUser = await createUser(userData)

    await sendVerificationEmail({
        name: userData.name,
        email: userData.email,
    }
    )

    return generateJWT(newUser)
}

const verifyUser = async ({token, email}) => {
    const user = await findUserByEmail(email)
    if(!user) {
        throw new ApiError(StatusCode.BAD_REQUEST,"User not found")
    }
    if(user.verifiedAt) {
        throw new ApiError(StatusCode.BAD_REQUEST,"User already verified")
    }
    // console.log({user, token, email})
    if(user.verificationToken !== token) {
        throw new ApiError(StatusCode.BAD_REQUEST,"Invalid token")
    }
    
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        verifiedAt: new Date(),
    })
    await sendWelcomeEmail({
        name: userData.name,
        email: userData.email,
    }
    )
    return updatedUser
}

const generateJWT = (user) => {
    const userData = getUser(user)
    return jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN,
    })
}

const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const login = async (userData) => {
    const user = await findUserByEmail(userData.email)
    if(!user) {
        throw new ApiError(StatusCode.BAD_REQUEST, "User not found")
    }
    const isPasswordValid = await verifyUserPassword(
        userData.password,
        user.password,
    )
    if (!isPasswordValid) {
        throw new Error("Invalid password")
    }
    const userObject = user.toObject()
    return generateJWT(userObject)

}



module.exports = {
    register, login, verifyJWT, verifyUser,
}