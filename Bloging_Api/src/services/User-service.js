

const ApiError = require("../Utils/ApiError");
const StatusCode = require("../Utils/StatusCode");
const User = require("../models/User")
const argon2 = require("argon2");
const { sendMail } = require("./mail-service");
const path = require('path');
const fs = require('fs');
const hbs = require("handlebars");


const hashPassword = async (password) => {
    return argon2.hash(password)
}

const createUser = async (userData) => {
    try {
        const hashedPassword = await hashPassword(userData.password);
        const user = new User({
            email: userData.email,
            password: hashedPassword,
            username: userData.username,
            name: userData.name,
            avatar: userData.avatar,
            role: userData.role,

        })
        await user.save()
        return user.toObject()
    } catch (error) {
        if(error.code === 11000){
            throw new ApiError(StatusCode.CONFLICT,"Username already in use")
        }
       throw new Error(error)
    }
}

const generateVerificationToken = async ({email}) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("User not found")
    }
    const token = generateToken()
    await User.findByIdAndUpdate(user._id,{
        verificationToken: token,
    })
    return token
}

const sendVerificationEmail = async ({ name, email }) => {
    const token = await generateVerificationToken({email})
    const emailTemplateFilePath = path.join(__dirname,"../templetes/verify-email.hbs")
    const hbsContent = fs.readFileSync(emailTemplateFilePath,"utf8")
    const hbsHtml = hbs.compile(hbsContent)
    const html = hbsHtml({
        name,
        token,
    })
return sendMail({
    to: email,
    subject: "Verify your email",
    html,
})
}

const sendWelcomeEmail = async ({ name, email }) => {
    const emailTemplateFilePath = path.join(__dirname,"../templetes/welcome-email.hbs")
    const hbsContent = fs.readFileSync(emailTemplateFilePath,"utf8")
    const hbsHtml = hbs.compile(hbsContent)
    const html = hbsHtml({
        name,
    })
return sendMail({
    to: email,
    subject: "Welcome to Devium.",
    html,
})
}

const findUserByEmail = async (email) => {
    return User.findOne({
        email,
    })
}

const getUser = (user) => {
    const {password, verificationToken, resetToken, ...rest} = user
    return rest
}


const generateToken = () => {
    return Math.random().toString(36).substring(2,8)
}

const verifyUserPassword = async (password, hashedPassword) => {
    return argon2.verify(hashedPassword, password)
}

const resetPassword = async (email) => {
    const user = await findUserByEmail(email)

    if(!user){
        throw new ApiError(StatusCode.NOT_FOUND, "User not found")
    }
    const token = generateToken()
    await User.findByIdAndUpdate(user._id,{
        resetToken: token,
    })
    return token
}

const sendResetPasswordEmail = async ({ name, email }) => {
    const token = await resetPassword({email})
    const emailTemplateFilePath = path.join(__dirname,"../templetes/resetPassword-email.hbs")
    const hbsContent = fs.readFileSync(emailTemplateFilePath,"utf8")
    const hbsHtml = hbs.compile(hbsContent)
    const html = hbsHtml({
        name,
        token,
    })
return sendMail({
    to: email,
    subject: "Reset Password",
    html,
})
}

module.exports = {
    createUser,
    findUserByEmail,
    getUser,
    verifyUserPassword,
    sendVerificationEmail,
    sendWelcomeEmail,
    generateToken,
    resetPassword,
    sendResetPasswordEmail,
}
