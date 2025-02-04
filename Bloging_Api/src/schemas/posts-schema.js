const {z} = require ("zod")

const postsSchema = z.object({
    title: z.string({
        required_error: "title is required",
    }),
    content: z.string({
        required_error: "content is required",
    }),
    categoryId: z.string({
        required_error: "Category is required",
    }),
    status: z.enum(["draft", "published"], {
        required_error: "status is required",
        invalid_type_error: "status must be either 'draft' or 'published'",
    }),
})

module.exports = postsSchema