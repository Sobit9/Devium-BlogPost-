

const ApiError = require("../Utils/ApiError")
const ApiResponse = require("../Utils/ApiREsponse")
const StatusCode = require("../Utils/StatusCode")
const asyncHandler = require("../Utils/async-handler")
const User = require("../models/User")
const registerSchema = require("../schemas/register-schema")
const { sendVerificationEmail, resetPassword, sendResetPasswordEmail } = require("../services/User-service")
const { register, login, verifyUser } = require("../services/auth-service")


/**
 * 
 * @param {import("express").Request} req 
 * @param {*} res 
 */
const registerController = asyncHandler(async (req, res) => {
    const avatar = req.file;
    if (!avatar) {
        throw new ApiError(StatusCode.BAD_REQUEST, "Avatar is required", ["Avatar is required",])
    }
        const response = req.body

        const token = await register({
            ...response,
            avatar: avatar.path,
        })

        res.status(201).json(
            new ApiResponse(StatusCode.CREATED,"User registered successfully", {token})
        )
})
const loginController = async (req, res) => {
    try{
        const response = req.body
        const token = await login(response)
        res
        .status(StatusCode.OK)
        .json(new ApiResponse(StatusCode.OK, " Logged in successfully" , {token}))
    } catch(err){
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        })
    }
}

const currentUserController = asyncHandler(async (req, res) => {
    const user = req.user
    const userFromDb = await User.findById(user._id).select(
        "-password -verificationToken -resetToken"
    )
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK,"You've logged in", req.user))
})

const verifyUserController = asyncHandler(async (req, res) => {
    const user = req.user;
    const email = user.email;
    const {token} = req.body
    // console.log(token)
    await verifyUser({token, email})
    return res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK, "User verified successfully"))
})

const resendVerificationEmailController = asyncHandler(async (req, res) => {
    const user = req.user;
    const email = user.email;
    const name = user.name;
    await sendVerificationEmail({
        name,
        email,
    })
    return res
    .status(StatusCode.OK)
    .json(new ApiResponse(StatusCode.OK,"Verification email sent successfully"))
})

const resetPasswordController = async (req, res) => {
    try{
        const response = req.body
        const token = await resetPassword(response.email)
        res
        .status(StatusCode.OK)
        .json(new ApiResponse(StatusCode.OK, " Reset Token Sent" , {token}))
    } catch(err){
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        })
    }
}

const resendResetPasswordController = asyncHandler(async (req, res) => {
    const user = req.user;
    const email = user.email;
    const name = user.name;
    await sendResetPasswordEmail({
        name,
        email,
    })
    return res
    .status(StatusCode.OK)
    .json(new ApiResponse(StatusCode.OK,"ResetPassword email sent successfully"))
})

module.exports = {
    registerController,
    loginController,
    currentUserController,
    verifyUserController,
    resendVerificationEmailController,
    resetPasswordController,
    resendResetPasswordController,
}