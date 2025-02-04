const { default: mongoose } = require("mongoose");

const reactionsSchema = new mongoose.Schema({
    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
},{
    timestamp: true,
})

const Reaction = mongoose.model("Reaction", reactionsSchema)

module.exports = Reaction