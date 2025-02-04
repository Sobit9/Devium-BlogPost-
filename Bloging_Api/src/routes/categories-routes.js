const {createCategoryController, VerifyCategoryController, deleteCategoryController, updateCategoryController, getAllCategoryController} = require("../controllers/categories-controller")
const isAdmin = require("../middlewares/is-admin.middleware")
const isLoggedIn = require("../middlewares/is-logged-in-middleware")
const schemaValidator = require("../middlewares/schema-validator")
const categorySchema = require("../schemas/category-schema")
const updateCategorySchema = require("../schemas/update-category-schema")

const router = require("express").Router()

router.get("/", getAllCategoryController)

router.post("/", isLoggedIn, schemaValidator(categorySchema), createCategoryController)

router.post("/:id/verify", isAdmin, VerifyCategoryController)

router.delete("/:id", isAdmin, deleteCategoryController)

router.patch("/:id", isAdmin,schemaValidator(updateCategorySchema), updateCategoryController)



module.exports = router