import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body: {
        type: String,
        required: true,
    },
    number: {
        type: number,
        default: 0,
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    media: {
        path: String,
        filename: String,
        required: true
    },

    fileType: {
        type: String,
        default: ''
    }
});

export default Post = mongoose.model("Post", postSchema);

