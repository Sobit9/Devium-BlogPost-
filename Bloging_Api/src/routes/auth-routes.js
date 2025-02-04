
const {
    loginController,
    registerController,
    
    currentUserController,
    verifyUserController,
    resendVerificationEmailController,
    resetPasswordController,
} = require("../controllers/auth-controller")
const isLoggedIn = require("../middlewares/is-logged-in-middleware")
const schemaValidator = require("../middlewares/schema-validator")
const userAttachMiddleware = require("../middlewares/user-middleware")
const loginSchema = require("../schemas/login-schema")
const registerSchema = require("../schemas/register-schema")
const verifyUserSchema = require("../schemas/verify-user-schema")
const { register } = require("../services/auth-service")
const upload = require("../Utils/multer")

const router = require("express").Router()

router.post("/login",schemaValidator(loginSchema), loginController)
// router.post("/updatePassword",updatePassword, updatePasswordController)
router.post("/reset-password", resetPasswordController)
router.post("/register", upload.single("avatar"), schemaValidator(registerSchema) ,registerController)
router.get("/me", isLoggedIn ,currentUserController)
router.post('/verify', isLoggedIn, schemaValidator(verifyUserSchema), verifyUserController)
router.get('/resend-verification-email', isLoggedIn, resendVerificationEmailController)

module.exports = router