const StatusCode = require("../Utils/StatusCode")
const { createCategory, verifyCategory, deleteCategory, updateCategory, getAllCategory } = require("../services/categories-service")
const asyncHandler = require("../Utils/async-handler")
const ApiResponse = require("../Utils/ApiREsponse")

const createCategoryController = asyncHandler(async (req, res) => {
    const response = req.body
    const category = await createCategory(response)
    res
    .status(201)
    .json(new ApiResponse(StatusCode.CREATED, "Category created", category))
})

const VerifyCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params
    const category = await verifyCategory(id)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "Category verified", category))
})

const deleteCategoryController = asyncHandler(async (req, res) => {
    const { id} = req.params
    const category = await deleteCategory(id)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "Category deleted", category))
})

const updateCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params
    const response = req.body
    const category = await updateCategory(id, response)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "Category updated", category))
})

const getAllCategoryController = asyncHandler(async (req, res) => {
    const categories = await getAllCategory()
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "All categories", categories))
})


module.exports = {
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    VerifyCategoryController,
    getAllCategoryController,
}