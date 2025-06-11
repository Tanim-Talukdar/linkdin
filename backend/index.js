import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js"
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import connectionRoutes from "./src/routes/connectionRoutes.js";


if (process.env.NODE_ENV != "production"){
dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));
app.use(express.static("uploads"));

const port = process.env.Port || 8000;
const db = process.env.MONGO_DB_URL;

async function main() {
    await mongoose.connect(db);
}
main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/connection", connectionRoutes);


app.get("/", (req,res) => {
    res.send("testing done");
    
})

app.listen(port, (req,res) => {console.log(`app is running on http://localhost:${port}/api/v1`)});