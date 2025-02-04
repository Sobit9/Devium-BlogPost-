
const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const app = express();

const connectToDB = require('./Utils/db');
const authRoutes = require("./routes/auth-routes");
const postsRoutes = require("./routes/posts-routes");
const categoriesRoutes = require("./routes/categories-routes");
const { sendMail } = require('./services/mail-service');
const errorHandler = require('./middlewares/error.middleware');
const userAttachMiddleware = require('./middlewares/user-middleware');

const PORT = process.env.PORT || 5001

app.use(express.json({}))
app.use(
    express.urlencoded({
    extended: true,
})
)



app.get("/health", (req, res) =>{
    res.send("OK")
})

app.use(authRoutes)
app.use("/categories",categoriesRoutes)
app.use("/posts", postsRoutes)
app.use(userAttachMiddleware)


app.get('/test-email', async (req, res) =>{
    try {
        await sendMail({
            to: "hi@gmail.com",
            subject: "Test Email",
            html: "<h1>Test Email</h1>"
        })
        res.json({
            message: "Email sent",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
            stack: error.stack
        })
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("success: server is running on port", PORT)
    connectToDB()
})