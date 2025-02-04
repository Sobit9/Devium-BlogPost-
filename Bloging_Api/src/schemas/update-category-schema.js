const { z } = require("zod");
const categorySchema = require("./category-schema");

const updateCategorySchema = categorySchema.extend({
    slug: z.string({
        required_errors: "Slug is required",
    }),
})

module.exports = updateCategorySchema