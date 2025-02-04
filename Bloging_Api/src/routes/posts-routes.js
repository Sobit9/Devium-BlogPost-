const upload = require("../Utils/multer")
const {createPostController, deletePostController, updatePostController, getPostController, getAllPostController, reactOnPostController, unReactOnPostController} = require("../controllers/posts-controller")
const isAdmin = require("../middlewares/is-admin.middleware")
const isLoggedIn = require("../middlewares/is-logged-in-middleware")
const schemaValidator = require("../middlewares/schema-validator")
const postSchema = require("../schemas/posts-schema")

const router = require("express").Router()

router.get("/", getAllPostController)

router.get("/:id", getPostController)

router.post("/", upload.single("thumbnail"), isLoggedIn, schemaValidator(postSchema), createPostController)

router.delete("/:id", isLoggedIn, deletePostController)

router.patch("/:id", isLoggedIn,schemaValidator(postSchema), updatePostController)

router.post("/:id/react", isLoggedIn, reactOnPostController)

router.delete("/:id/react", isLoggedIn, unReactOnPostController)

module.exports = router