import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    media: {
        path: {
            type: String,
        },
        filename: {
            type: String,
        }
    },
    fileType: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

export default Post;
