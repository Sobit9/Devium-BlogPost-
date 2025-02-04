const { hash } = require("argon2")
const User = require("../models/User")

const createAdmin = async () => {
    const admin = new User({
        name: "Sobit Thapa",
        email: "sobitthapa@gmail.com",
        password: await hash("123pass"),
        role: "admin",
        username: "admin",
        avatar: "no-image",
    })
    await admin.save()
}

module.exports = createAdmin