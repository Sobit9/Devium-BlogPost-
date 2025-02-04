const ApiError = require("../Utils/ApiError")
const StatusCode = require("../Utils/StatusCode")
const Post = require("../models/Post")
const Reaction = require("../models/Reaction")

const createPost = async (data) => {
    const category = await Category.findById(data.categoryId)
    if (category.verifiedAt === null){
        throw new ApiError(StatusCode.BAD_REQUEST, "Category not verified")
    }
    const newPost = new Post({
        ...data,
    })
    await newPost.save()
    return post.toObject()
}

const deletePost = async (id, userId) => {
    const post = await Post.findById(id)
    if(!post) {
        throw new ApiError(StatusCode.NOT_FOUND, "Post not found")
    }
    if (post.user !== userId) {
        throw new ApiError(StatusCode.FORBIDDEN, "You are not allowed to delete this post")
    }
    await post.deleteOne()
    return post.toObject()
}

const updatePost = async (id, userId, data) => {
    const post = await Post.findById(id)
    if(!post) {
        throw new ApiError(StatusCode.NOT_FOUND, "Post not found")
    }
    if (post.userId.equals(userId)) {
        throw new ApiError(StatusCode.FORBIDDEN, "You are not allowed to update this post")
    }
    post.set(data)

    try {
        await post.save()
    } catch (err) {
        if (err.code === "MongoError" && err.code === 11000){
            throw new ApiError(StatusCode.BAD_REQUEST, "Post slug already exists")
        }
    }
    return post.toObject()
}

const getPost = async (id) => {
    const post = await Post.findById(id)
    if(!post) {
        throw new ApiError(StatusCode.NOT_FOUND, "Post not found")
    }
    return post.toObject()
}

const getAllPost = async ({
    page,
    perPage = 10,
    sortBy = "createdAt",
    status = "published",
    q,
}) => {
    const filters = {
        title: {
            $regex: q || "",
            $options: "i",
        },
        status,
    }
    const posts = await Post.find(filters).sort({
        [sortBy]: -1,
    })
    .limit(perPage)
    .skip(perPage * (page - 1))
    const postsCount = await Post.countDocuments(filters)
    return {
        data: posts,
        meta: {
            currentPage: page,
            perPage: perPage,
            totalPages: Math.ceil(postsCount / perPage),
        },
    }
}

const reactOnPost = async (id, userId) => {
    const post = await Post.findById(id)
    if(!post) {
        throw new ApiError(StatusCode.NOT_FOUND, "Post not found")
    }
    const reaction = new Reaction({
        postId: id,
        userId : userId,
    })
    await reaction.save()
    post.reactionCount += 1
    await post.save()

    return post.toObject()
}

const unReactOnPost = async (id, userId) => {
    const post = await Post.findById(id)
    if(!post) {
        throw new ApiError(StatusCode.NOT_FOUND, "Post not found")
    }
    await Reaction.findOneAndDelete({
        postId: id,
        userId : userId,
    })
    post.reactionCount -= 1
    await post.save()

    return post.toObject()
}

const getPostReactions = async (id) => {
    const reactions = await Reaction.find({
        postId: id,
    })
    return reactions
}

const isCurrentUserReacted = async (id, userId) => {
    
    const reaction = new Reaction.findOne({
        postId: id,
        userId : userId,
    })

    return !! reaction
}

module.exports = {
    createPost,
    deletePost,
    getAllPost,
    updatePost,
    getPost,
    reactOnPost,
    unReactOnPost,
    getPostReactions,
    isCurrentUserReacted,
}