import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/chat.js";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// ✅ Health route first
app.get("/api", (req, res) => {
  res.send("✅ API is running!");
});

// ✅ Routers after
app.use("/api", router);
app.use("/api", userRouter);

// ✅ MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
main();

// ✅ Server
app.listen(PORT, () => {
  console.log(`🚀 App is listening on port ${PORT}`);
});
