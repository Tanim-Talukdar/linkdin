import User from "../models/userModel.js";
import Profile from "../models/profileModel.js"
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { convertUserDataTOPDF } from "../utils/CreatePdf.js";
dotenv.config();

// const JwtSecret = process.env.JWT_SECRET ;

export const register = async (req, res) => {
    const {name, email ,password, username } = req.body;
    
    if(!name || !email || !password || !username ) return res.status(400).json({message: "All field are required"});

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already in use" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        username
    });

    await user.save();

    // const token = jwt.sign(
    //     { id: user._id, email: user.email, role: user.role || "user" }, 
    //     JwtSecret,
    //     { expiresIn: '1h', algorithm: 'HS256' }
    // );
    const profile = new Profile({userId: user._id})
    await profile.save();

    return res.status(201).json({
        message: "User created successfully",
    });
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }); 
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const CryptoToken = crypto.randomBytes(32).toString("hex")
    
    user.CryptoToken = CryptoToken;
    await user.save();
    // const token = jwt.sign(
    //     { id: user._id, email: user.email, role: user.role || "user" },
    //     JwtSecret,
    //     { expiresIn: "1h" , algorithm: 'HS256'}
    // );

    
    return res.status(201).json({
        message: "User logged in successfully",
        CryptoToken
    });
};


export const uploadProfilePicture = async (req,res) => {
    const { CryptoToken } = req.body;
    if (!CryptoToken) return res.status(400).json({ message: "CryptoToken is required" });

    const user = await User.findOne({CryptoToken});
    if(!user) return res.status(404).json({message: "User Not Found"});


    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    

    const path = req.file.path;
    const filename = req.file.filename;
    user.profilePicture.path = path;
    user.profilePicture.filename = filename;

    await user.save();

    return res.status(200).json({message: "profile picture updated"})
}

export const updateUserProfile = async (req, res) => {
    const { CryptoToken, ...newUserdata } = req.body;
    if (!CryptoToken) return res.status(400).json({ message: "CryptoToken is unavailbe"});

    const user = User.findOne({CryptoToken});
    if(!user) return res.status(404).json({message: "User Not Found"});

    const {username, email} = newUserdata;
    const existingUser = await User.findOne({$or: [{username}, {email}]});
    if (existingUser || String(existingUser._id) !== String(user._id)) return res.status(400).json({message: "user already exists"});

    Object.assign(user, existingUser);
    await user.save();

    return res.status(200).json({message: "user update successfully"})
}

export const getUserAndProfile = async (req, res) => {
    const { CryptoToken } = req.body;
    if (!CryptoToken) return res.status(400).json({ message: "CryptoToken is not available" });

    const user = User.findOne({CryptoToken});
    if(!user) return res.status(404).json({message: "User Not Found"});

    const userProfile = await Profile.findOne({userID: user._id}).populate('userId', 'name email username profilePicture');
    return  res.json(userProfile);

}

export const UpdateProfileData =async (req,res) => {
    const { CryptoToken, ...newProfileData } = req.body;
    if (!CryptoToken) return res.status(400).json({ message: "CryptoToken is  not available" });

    const user = User.findOne({CryptoToken});
    if(!user) return res.status(404).json({message: "User Not Found"});

    const userProfile = await Profile.findOne({userID: user._id});
    Object.assign(userProfile, newProfileData)

    await userProfile.save();
    return res.status(200).json({messsage: "profile update done"});
}

export const getAllUser = async (req,res) => {
    const profile = await Profile.find({}).populate('userId', 'name email username profilePicture');
    return res.status(200).json({profile});
}

export const downloadUserInfo = async (req, res) => {
    const userId = req.query.id;

    const userProfile = await Profile.findOne({userId}).populate('userId', 'name email username profilePicture');
    const outputPath = await convertUserDataTOPDF(userProfile);
    return res.json({"message": outputPath})
}