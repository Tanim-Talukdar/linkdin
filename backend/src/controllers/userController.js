import User from "../models/userModel.js";
import Profile from "../models/profileModel.js"
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// const JwtSecret = process.env.JWT_SECRET ;

export const register = async (req, res) => {
    const {name, email ,password, username } = req.body;
    
    if(!name || !email || !password || !username ) return res.status(400).json({message: "All field are required"});

    const existinguser = await User.find({email});

    if(!existinguser) return res.status(400).json({message: "user already exists"});
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
    const profile = new Profile({userid: user._id})
    return res.status(201).json({
        message: "User created successfully",
    });
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }); 
    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role || "user" },
        JwtSecret,
        { expiresIn: "1h" , algorithm: 'HS256'}
    );
    console.log(JwtSecret);
    console.log("User Logged In");

    
    return res.status(httpStatus.OK).json({
        message: "User logged in successfully",
        token,
    });
};
