import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

if (process.env.NODE_ENV != "production"){
dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

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

app.get("/", (req,res) => {
    res.send("testing done");
    
})

app.listen(port, (req,res) => {console.log(`app is running on http://localhost:${port} `)});