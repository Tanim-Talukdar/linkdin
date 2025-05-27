import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    School: {
        type: String,
        default: ''
    },
    degree: {
        type: String,
        default: ''
    },
    fieldOfStudey: {
        type: String,
        default: '',
    }
});

const workSchema = new mongoose.Schema({
    company: {
        type: String,
        default: ''
    },
    possition: {
        type: String,
        default: ''
    },
    years: {
        type: String,
        default: '',
    }
});

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
        default: ''
    },
    currentPost: {
        type: String,
        default: ''
    },
    pastWork: {
        type: [workSchema],
        default: [],
    },
    education: {
        type: [educationSchema],
        default: [],
    }

});


export default Profile = mongoose.model("Profile", profileSchema)


