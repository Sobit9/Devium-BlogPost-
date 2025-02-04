const ApiError = require("../Utils/ApiError")
const StatusCode = require("../Utils/StatusCode")
const Category = require("../models/Category")

const createCategory = async ({name}) => {
    const category = await Category.create({
        name,
    }) 
    return category.toObject()
}

const verifyCategory = async (id) => {
    const category = await Category.findById(id)
    if(!category) {
        throw new ApiError(StatusCode.NOT_FOUND, "Category not found")
    }
    if (category.verifiedAt) {
        throw new ApiError(StatusCode.BAD_REQUEST, "Category already verified")
    }
    category.verifiedAt = new Date()
    await category.save()
    return category.toObject()
}

const deleteCategory = async (id) => {
    const category = await Category.findById(id)
    if(!category) {
        throw new ApiError(StatusCode.NOT_FOUND, "Category not found")
    }
    await category.deleteOne()
    return category.toObject()
}

const updateCategory = async (id, {  name, slug }) => {
    const category = await Category.findById(id)
    if(!category) {
        throw new ApiError(StatusCode.NOT_FOUND, "Category not found")
    }
    category.name = name
    category.slug = slug
    try {
        await category.save()
    } catch (err) {
        if (err.code === "MongoError" && err.code === 11000){
            throw new ApiError(StatusCode.BAD_REQUEST, "Category slug already exists")
        }
    }
    return category.toObject()
}

const getAllCategory = async () => {
    const categories = await Category.find({
        verifiedAt: { $ne: null},
    })
    return categories
}

const getAllUnverifiedCategory = async () => {
    const categories = await Category.find({
        verifiedAt: null,
    })
    return categories
}

module.exports = {
    createCategory,
    verifyCategory,
    deleteCategory,
    getAllCategory,
    updateCategory,
    getAllUnverifiedCategory,
}