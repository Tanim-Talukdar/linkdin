import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import connectionRoutes from "./src/routes/connectionRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 8000;   // Port fix (uppercase)
const db = process.env.MONGO_DB_URL;

async function main() {
  await mongoose.connect(db);
}
main()
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err);
  });

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/connection", connectionRoutes);
app.use("/api/v1", postRoutes);

app.get("/", (req, res) => {
  res.send("Testing done 🚀");
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}/api/v1`);
});
