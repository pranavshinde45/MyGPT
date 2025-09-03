import getOpenAiApiResponse from "../utils/openAi.js";
import Thread from "../models/thread.js";

export const getAllThreads=async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        //descending order of updatedAt...most recent data on top
        res.json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
}

export const getThread=async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({ threadId });

        if (!thread) {
            res.status(404).json({ error: "Thread not found" });
        }

        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
}

export const deleteThread=async (req, res) => {
    const { threadId } = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });

        if (!deletedThread) {
            res.status(404).json({ error: "Thread not found" });
        }

        res.status(200).json({ success: "Thread deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete thread" });
    }
}

export const gpt=async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        res.status(400).json({ error: "missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            //create a new thread in Db
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getOpenAiApiResponse(message);
        const safeReply = (typeof assistantReply === "string" && assistantReply.trim() !== "")
            ? assistantReply
            : "⚠️ Sorry, I couldn’t generate a reply.";

        thread.messages.push({ role: "assistant", content: safeReply });
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: assistantReply });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" });
    }
}