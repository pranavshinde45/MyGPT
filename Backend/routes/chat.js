import express from "express";
import Thread from "../models/thread.js";
import { deleteThread, getAllThreads, getThread, gpt } from "../controller/gptController.js";

const router = express.Router();

//test
// router.post("/test", async (req, res) => {
//     try {
//         const thread = new Thread({
//             threadId: "abc",
//             title: "Testing New Thread2"
//         });

//         const response = await thread.save();
//         res.send(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Failed to save in DB" });
//     }
// });

//Get all threads
router.get("/thread",getAllThreads );

router.get("/thread/:threadId",getThread );

router.delete("/thread/:threadId", deleteThread);

router.post("/chat", gpt);


export default router;