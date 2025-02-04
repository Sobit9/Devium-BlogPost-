const {z} = require ("zod")

const categorySchema = z.object({
    name: z.string({
        required_error: "name is required",
    }),
    
})

module.exports = categorySchema