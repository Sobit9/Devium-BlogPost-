const dotenv = require ("dotenv");
const connectToDB = require("../Utils/db");
const createAdmin = require("./user-seader");
const CreatePosts = require("./posts-seeder");
dotenv.config()

const runSeeder = async () => {
    await connectToDB()

    // await createAdmin()

    await CreatePosts()
}

runSeeder()
.then(() => {
    console.log("Success: seeder ran successfully")
    process.exit(0)
})
.catch((err) => {
    console.error("Error: seeder failed to run", err)
    process.exit(1)
})