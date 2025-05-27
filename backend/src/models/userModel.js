import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        path: String,
        filename: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    CryptoToken: {
        type: String,
        default: ''
    }
});

export default User = mongoose.model("User", userSchema);

