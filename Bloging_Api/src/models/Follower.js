const { default: mongoose } = require("mongoose");

const followersSchema = new mongoose.Schema({
    followerTd:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creatorTd:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{
    timestamps: true,
})

const Follower = mongoose.model("Follower", followersSchema);

module.exports = Follower