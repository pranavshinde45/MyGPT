import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import router from "./routes/chat.js";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});

async function main(){
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connection successful")
}
main();

app.use("/api",router)
app.use("/api",userRouter)


// app.post("/test", async (req, res) => {
//   const userMessage = req.body.message || "What is the meaning of life?";
//   try {
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
//         "Content-Type": "application/json",
//         "HTTP-Referer": "http://localhost:8080",  
//         "X-Title": "MyGptApp"
//       },
//       body: JSON.stringify({
//         model: "openai/gpt-4o",
//         max_tokens:2500,
//         messages: [
//           {
//             role: "user",
//             content: userMessage
//           }
//         ]
//       })
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("OpenRouter API Error:", errorText);
//       return res.status(response.status).json({ error: errorText });
//     }

//     const data = await response.json();
//     res.json({response:data.choices[0].message.content});
//     console.log(data.choices[0].message.content)
//   } catch (error) {
//     console.error("Fetch error:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


