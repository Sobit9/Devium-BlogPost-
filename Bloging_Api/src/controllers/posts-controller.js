const StatusCode = require("../Utils/StatusCode")
const { createPost, deletePost, updatePost, getAllPost, getPost, reactOnPost, unReactOnPost } = require("../services/posts-service")
const asyncHandler = require("../Utils/async-handler")
const ApiResponse = require("../Utils/ApiREsponse")
const ApiError = require("../Utils/ApiError")

const createPostController = asyncHandler(async (req, res) => {
    if(!req.file){
        throw new ApiError(StatusCode.BAD_REQUEST, "Thumbnail is required")
    }
    const response = req.body
    const post = await createPost(
       {
        ...response,
        thumbnail : req.file.path,
        userId: req.user._id,
       }
    )
    res
    .status(201)
    .json(new ApiResponse(StatusCode.CREATED, "Post created", post))
})

const deletePostController = asyncHandler(async (req, res) => {
    const { id} = req.params
    const post = await deletePost(id, req.user._id)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "Post deleted", post))
})

const updatePostController = asyncHandler(async (req, res) => {
    const { id } = req.params
    const response = req.body
    const post = await updatePost(id, req.user._id, response)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "Post updated", post))
})

const getPostController = asyncHandler(async (req, res) => {
    const { id} = req.params
    const post = await getPost(id)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "Post fetched", post))
})

const getAllPostController = asyncHandler(async (req, res) => {
    const {
        page = 1,
        perPage= 10,
        sortBy= "createdAt",
        status = "published",
        q,
        } = req.query
    const { data, meta} = await getAllPost({
        page,
        perPage,
        sortBy,
        status,
        q,
    })
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "All posts", data,meta))
})

const reactOnPostController = asyncHandler(async (req, res) => {
    const { id} = req.params
    const post = await reactOnPost(id)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "Reacted on post", post))
})

const unReactOnPostController = asyncHandler(async (req, res) => {
    const { id} = req.params
    const post = await unReactOnPost(id)
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK, "UnReacted on post", post))
})


module.exports = {
    createPostController,
    updatePostController,
    deletePostController,
    getAllPostController,
    getPostController,
    reactOnPostController,
    unReactOnPostController,
}